const { MongoClient } = require('mongodb');

const getDbConnection = async () => {
  const client = await MongoClient.connect(process.env.DB_URI || 'mongodb://localhost:27018/guards-db', {
    useNewUrlParser: true,
  });

  const db = client.db();

  return db;
};

module.exports = { getDbConnection };