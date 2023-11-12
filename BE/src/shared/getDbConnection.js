const { MongoClient } = require('mongodb');

const getDbConnection = async () => {
  console.log('DB_URI: ', process.env.DB_URI);
  const client = await MongoClient.connect(process.env.DB_URI || 'mongodb://localhost:27018/guards-db', {});

  const db = client.db();

  return db;
};

module.exports = { getDbConnection };