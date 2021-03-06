const { MongoClient } = require('mongodb');

const MONGO_DB_URL = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';

const DBname = 'openbank';

let schema = null;

async function getConnection() {
  if (schema) return Promise.resolve(schema);
  return MongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DBname))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = { 
  getConnection,
};