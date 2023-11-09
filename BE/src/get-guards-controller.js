const { getDbConnection } = require('./shared/getDbConnection');
const { middleware } = require('./shared/middleware');

const controller = async (event) => {
  const filters = event.query || {};

  const { isActive = false } = filters;

  const db = await getDbConnection();

  const guards = await db.collection('guards').find({ 
    ...(isActive ? { isActive: true } : {}) 
  }).sort({ createdAt:-1 }).project({ _id:0, index:'$_id', name:1, phoneNumber:1, guardScore: { $ifNull:['$guardScore', 1] } }).toArray();

  return { guards };
};

module.exports = { getGuards: controller, controller: middleware(controller) } ;