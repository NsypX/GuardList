const { getDbConnection } = require('./shared/getDbConnection');
const { middleware } = require('./shared/middleware');

const controller = async (event) => {
  const filters = event.query || {};

  const { isActive = true } = filters;

  const db = await getDbConnection();

  const shiftsGroups = await db.collection('shifts').find({ 
    ...(isActive ? { isActive: true } : {}) 
  }).sort({ createdAt:-1 }).toArray();

  return { shiftsGroups };
};

module.exports = { controller: middleware(controller) };