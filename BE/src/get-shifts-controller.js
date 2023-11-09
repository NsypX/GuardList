const { getDbConnection } = require('./shared/getDbConnection');
const { middleware } = require('./shared/middleware');

const controller = async (event) => {
  const filters = event.query || {};

  const { isActive = false } = filters;

  const db = await getDbConnection();

  const shifts = await db.collection('shifts').find({ 
    ...(isActive ? { isActive: true } : {}) 
  }).sort({ createdAt:-1 }).project({ _id:0, index:'$_id', shiftHours:1, shiftPower:1 }).toArray();

  return { shifts };
};

module.exports = { getShifts: controller, controller: middleware(controller) } ;