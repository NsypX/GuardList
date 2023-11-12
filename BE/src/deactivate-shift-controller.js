const { getDbConnection } = require('./shared/getDbConnection');
const { middleware } = require('./shared/middleware');

const controller = async (event) => {
  const { shiftGroupId = '' } = event.params;
  const db = await getDbConnection();

  await db.collection('shifts').updateMany({ _id: shiftGroupId, isActive:true },{ $set: { isActive: false } });

  return { message: 'Shift deactivated successfully.' };
};

module.exports = { controller: middleware(controller) } ;