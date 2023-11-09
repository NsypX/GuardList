const { getDbConnection } = require('./shared/getDbConnection');

const controller = async () => {
  const db = await getDbConnection();

  const guards = await db.collection('guards').find({}).sort({ createdAt:-1 }).toArray();

  return guards;
};

module.exports = controller ;