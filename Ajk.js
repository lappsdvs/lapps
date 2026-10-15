function ajkRoles_() {
  return ['YDP', 'NYDP', 'SU', 'NSU', 'BENDAHARI',
    'MJK1', 'MJK2', 'MJK3', 'MJK4', 'MJK5', 'MJK6',
    'DAERAH1', 'DAERAH2', 'DAERAH3', 'DAERAH4', 'DAERAH5', 'DAERAH6',
    'AUDIT1', 'AUDIT2'];
}

function ajkRoleGroup_(role) {
  return role.indexOf('DAERAH') === 0 ? 'DAERAH' :
    role.indexOf('AUDIT') === 0 ? 'AUDIT' : 'TERAS';
}

function ajkSession_(value) {
  const sesi = String(value || '').trim();
  if (!/^20\d{2}\/20\d{2}$/.test(sesi) ||
      Number(sesi.slice(5)) !== Number(sesi.slice(0, 4)) + 2) {
    throw new Error('Sesi mesti berbentuk 2026/2028 dengan tempoh dua tahun.');
  }
  return sesi;
}

function ajkSheet_(create) {
  const ss = SpreadsheetApp.openById(
    '1r25kF1RzY8CFnBpo2H4OEFq5ai6f0zZm4q61R0woIA4'
  );
  let sheet = ss.getSheetByName('AJKSesi');
  const headers = ['sesi', 'versi', 'status', 'dikemas_kini', 'data_json'];

  if (!sheet && create) {
    sheet = ss.insertSheet('AJKSesi');
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }

  if (sheet) {
    const actual = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
    if (headers.some((header, index) => actual[index] !== header)) {
      throw new Error('Struktur tab AJKSesi tidak sepadan.');
    }
  }
  return sheet;
}

function ajkLatest_(sheet, sesi, publishedOnly) {
  if (!sheet || sheet.getLastRow() < 2) return null;
  const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, 5).getValues();

  for (let i = rows.length - 1; i >= 0; i--) {
    const row = rows[i];
    if ((!sesi || String(row[0]) === sesi) &&
        (!publishedOnly || row[2] === 'DITERBITKAN')) {
      return {
        sesi: String(row[0]),
        version: Number(row[1]),
        status: String(row[2]),
        updatedAt: String(row[3]),
        members: JSON.parse(String(row[4]))
      };
    }
  }
  return null;
}

function ajkMembers_(members, publish) {
  if (!Array.isArray(members) ||
      (members.length !== 19 && (publish || members.length !== 11))) {
    throw new Error('Borang mesti mempunyai 19 ruangan AJK. Muat semula sesi.');
  }

  const roles = ajkRoles_();
  // Draf daripada frontend lama boleh dinaik taraf tanpa mengubah sejarah.
  if (members.length === 11 && roles.slice(0, 11).every(role =>
      members.filter(member => member && member.role === role).length === 1)) {
    members = members.concat(roles.slice(11).map(role => ({ role: role })));
  }
  const seen = new Set();

  function text(value, limit, label) {
    if (value !== undefined && value !== null && typeof value !== 'string') {
      throw new Error(label + ' tidak sah.');
    }
    const result = String(value || '').replace(/\s+/g, ' ').trim();
    if (result.length > limit) throw new Error(label + ' terlalu panjang.');
    return result;
  }

  return roles.map(role => {
    const matches = members.filter(member => member && member.role === role);
    if (matches.length !== 1) {
      throw new Error('Semak ruangan jawatan ' + role + '.');
    }

    const member = matches[0];
    const nama = text(member.nama, 200, 'Nama');
    const organisasi = text(member.organisasi, 200, 'Organisasi');
    const foto = text(member.foto, 1000, 'URL gambar');
    const profil = text(member.profil, 500, 'Profil');

    if (foto && !/^https:\/\/[^\s]+$/i.test(foto)) {
      throw new Error('URL gambar mesti bermula dengan https://.');
    }

    const undi = member.undi === '' || member.undi === null ||
      member.undi === undefined ? null : member.undi;

    if (undi !== null &&
        (typeof undi !== 'number' || !Number.isSafeInteger(undi) || undi < 0)) {
      throw new Error('Jumlah undi mesti nombor bulat sifar atau lebih.');
    }

    if (publish && (!nama || !organisasi)) {
      throw new Error('Nama dan organisasi diperlukan untuk ' + role + '.');
    }

    if (nama) {
      const key = ajkRoleGroup_(role) + ':' + nama.toUpperCase();
      if (seen.has(key)) {
        throw new Error('Nama berulang dalam kumpulan ' + ajkRoleGroup_(role) + ': ' + nama);
      }
      seen.add(key);
    } else if (organisasi || foto || profil || undi !== null) {
      throw new Error('Isi nama sebelum maklumat lain untuk ' + role + '.');
    }

    return {
      role: role, nama: nama, organisasi: organisasi,
      undi: undi, foto: foto, profil: profil
    };
  });
}

function runAdminAjk(action, pin, payload) {
  const adminPin = PropertiesService.getScriptProperties()
    .getProperty('ADMIN_PIN');

  if (!adminPin || typeof pin !== 'string' || pin !== adminPin) {
    return { ok: false, error: 'PIN admin tidak sah atau belum ditetapkan.' };
  }

  let lock;
  try {
    const sesi = ajkSession_(payload && payload.sesi);

    if (action === 'getAjk') {
      const sheet = ajkSheet_(false);
      const analysis = runAdminNominationAnalysis(pin);
      if (!analysis.ok) return analysis;

      return {
        ok: true,
        sesi: sesi,
        roles: ajkRoles_(),
        record: ajkLatest_(sheet, sesi, false),
        published: ajkLatest_(sheet, sesi, true),
        candidateGroups: analysis.rankings
      };
    }

    if (action !== 'saveAjkDraft' && action !== 'publishAjk') {
      throw new Error('Tindakan AJK tidak disokong.');
    }

    const publish = action === 'publishAjk';
    if (publish && payload.confirmed !== true) {
      throw new Error('Sahkan barisan AJK sebelum penerbitan.');
    }

    const members = ajkMembers_(payload.members, publish);
    const json = JSON.stringify(members);
    if (json.length > 20000) {
      throw new Error('Maklumat AJK terlalu besar.');
    }

    if (!Number.isSafeInteger(payload.expectedVersion) ||
        payload.expectedVersion < 0) {
      throw new Error('Versi rekod diperlukan. Muat semula borang.');
    }

    lock = LockService.getScriptLock();
    lock.waitLock(10000);

    const sheet = ajkSheet_(true);
    const previous = ajkLatest_(sheet, sesi, false);
    const version = previous ? previous.version : 0;

    if (payload.members.length === 11 && previous && previous.members.length > 11) {
      throw new Error('Sesi ini menggunakan 19 ruangan AJK. Muat semula halaman admin sebelum menyimpan.');
    }

    if (payload.expectedVersion !== version) {
      throw new Error('Rekod telah berubah. Muat semula borang sebelum menyimpan.');
    }

    const record = {
      sesi: sesi,
      version: version + 1,
      status: publish ? 'DITERBITKAN' : 'DRAF',
      updatedAt: new Date().toISOString(),
      members: members
    };

    sheet.getRange(sheet.getLastRow() + 1, 1, 1, 5).setValues([
      [record.sesi, record.version, record.status, record.updatedAt, json]
    ]);
    SpreadsheetApp.flush();

    return { ok: true, record: record };
  } catch (error) {
    return { ok: false, error: error.message };
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

function getPublishedAjk_() {
  try {
    const record = ajkLatest_(ajkSheet_(false), '', true);
    if (!record) return { ok: true, record: null };

    return {
      ok: true,
      record: {
        sesi: record.sesi,
        updatedAt: record.updatedAt,
        members: record.members.map(member => ({
          role: member.role,
          nama: member.nama,
          organisasi: member.organisasi,
          foto: member.foto,
          profil: member.profil
        }))
      }
    };
  } catch (error) {
    return { ok: false, error: 'Senarai AJK tidak dapat dibaca.' };
  }
}
