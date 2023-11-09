const { getDbConnection } = require('./shared/getDbConnection');

const controller = async ({ guards }) => {
  console.log('guards', guards);

  const db = await getDbConnection();

  await db.collection('guards').insertMany({ guards });
};

module.exports = controller ;