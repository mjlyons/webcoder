const records = require('settings')().userRecords;
const bcrypt = require('bcrypt-nodejs');

exports.findById = (id, cb) => {
  process.nextTick(() => {
    const idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
};

exports.findByUsername = (username, cb) => {
  process.nextTick(() => {
    for (let i = 0, len = records.length; i < len; i++) {
      const record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
};

exports.isPasswordValidForUser = (userRecord, password) => {
  return bcrypt.compareSync(password, userRecord.passhash);
};
