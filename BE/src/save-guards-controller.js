const { ObjectId } = require('mongodb');
const { getDbConnection } = require('./shared/getDbConnection');

const controller = async ({ guards }) => {
  const db = await getDbConnection();

  const guardsWithId = guards.map((guard) => ({ _id: new ObjectId().toHexString(), name: guard }));

  await db.collection('guards').insertMany(guardsWithId);
};

module.exports = controller ;