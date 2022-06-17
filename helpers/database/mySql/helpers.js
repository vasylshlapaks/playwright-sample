import {expect} from "@playwright/test";

module.exports = {
  getSmsCode: async function(email) {
    return await new Promise((resolve, reject) => {
      var pool = require('./mySqlConnection');
      let query = `SELECT code from sms_codes WHERE email_address = '${email}' LIMIT 10`;

      pool.query(query, function (err, results, fields) {
        if (err) {
          reject(new Error(err));
        }
        resolve(results);
      });

    }).then(function (result) {
      expect(result[0].code).not.toBeUndefined();
      return result[0].code
    })
  },

  closeMySqlConnection: async function() {
    try {
      await new Promise((resolve, reject) => {
        var pool = require('./mySqlConnection');
        pool.end(function (err) {
          if (err) {
            reject(new Error(err));
          } else {
            resolve();
          }
        });
      });
    } catch (e) {
    }
  }
};
