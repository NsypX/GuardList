const { ObjectId } = require('mongodb');
const { getDbConnection } = require('./shared/getDbConnection');
const { middleware } = require('./shared/middleware');

const controller = async (event) => {
  const { shifts = [] } = event.body;
  const db = await getDbConnection();

  if (!shifts.length) throw new Error('No shifts provided.');

  const shiftStations = shifts.map(({ shiftStation }) => shiftStation);

  await db.collection('shifts').updateMany({ shiftStation: { $in: shiftStations }, isActive: true }, { $set: { isActive: false } });
  
  const guardsWithId = shifts.map((shift) => ({ _id: new ObjectId().toHexString(), createdAt: new Date(), isActive: true, ...shift }));

  await db.collection('shifts').insertMany(guardsWithId);

  return { message: 'Guards saved successfully.' };
};

module.exports = { controller: middleware(controller) } ;