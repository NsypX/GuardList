const { getDbConnection } = require('./shared/getDbConnection');
const { middleware } = require('./shared/middleware');

const controller = async (event) => {
  const { shiftStation = '' } = event.params;
  const db = await getDbConnection();

  await db.collection('shifts').updateMany({ shiftStation, isActive:true },{ $set: { isActive: false } });

  return { message: 'Guards saved successfully.' };
};

module.exports = { saveShiftsController: controller, controller: middleware(controller) } ;