module.exports = {
  closeMongoDbConnection: async function() {
    const client = await require('./mongoDbConnection');
    const query = {id: 1};
    const db = await client.db('dev');

    // a bit tricky solution for always proper closing of mongo connection without errors and warnings
    await db.collection('test').findOne(query, function(err, obj) {
      if (err) throw err;
      client.close();
    });
  },

  getRemindersForPatient: async function(patientId) {
    const client = await require('./mongoDbConnection');
    const query = {patient_id: parseInt(patientId, 10)};

    const db = await client.db('dev');
    return await new Promise((resolve, reject) => {
      db.collection('reminders').find(query).toArray(async function(err, obj) {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(obj);
        }
      })
    }).then(function (obj) {
      return obj
    })
  }
};
