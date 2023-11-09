const { ObjectId } = require('mongodb');
const { getDbConnection } = require('./shared/getDbConnection');
const { middleware } = require('./shared/middleware');

const controller = async (event) => {
  const { guards = [] } = event.body;
  const db = await getDbConnection();

  const guardsWithId = guards.map((guard) => ({ _id: new ObjectId().toHexString(), createdAt: new Date(), ...guard }));

  await db.collection('guards').insertMany(guardsWithId);

  return { message: 'Guards saved successfully.' };
};

module.exports = { saveGuardsController: controller, controller: middleware(controller) } ;