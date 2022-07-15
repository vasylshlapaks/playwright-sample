const { MongoClient } = require('mongodb');

const url = process.env.DB_DSN_PHI;

try {
    var client = MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}  catch (e) {
    throw new Error(e)
}

module.exports = client;
