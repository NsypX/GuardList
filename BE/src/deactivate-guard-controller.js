const { getDbConnection } = require('./shared/getDbConnection');
const { middleware } = require('./shared/middleware');

const controller = async (event) => {
  const { guardId = '' } = event.params;
  console.log('guardId', guardId);
  const db = await getDbConnection();

  await db.collection('guards').updateMany({ _id: guardId, isActive:true },{ $set: { isActive: false } });

  return { message: 'Guards deactivated successfully.' };
};

module.exports = { controller: middleware(controller) } ;