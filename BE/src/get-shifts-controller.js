const { getDbConnection } = require('./shared/getDbConnection');
const { middleware } = require('./shared/middleware');
const { uniqueId } = require('lodash');

const controller = async (event) => {
  const filters = event.query || {};

  const { isActive = true } = filters;

  const db = await getDbConnection();

  const shiftsGroupsFromDb = await db.collection('shifts').find({ 
    ...(isActive ? { isActive: true } : {}) 
  }).sort({ createdAt: -1 }).toArray();

  const shiftsGroups = shiftsGroupsFromDb.map(({ shifts, _id, ...rest }) => ({
    ...rest,
    _id,
    key: uniqueId(),
    shifts:shifts.map((shift) => ({
      ...shift,
      key: uniqueId()
    }))
  }));

  return { shiftsGroups };
};

module.exports = { controller: middleware(controller) };