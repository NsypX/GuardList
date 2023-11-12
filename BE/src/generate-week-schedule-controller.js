const { ObjectId } = require('mongodb');
const { getDbConnection } = require('./shared/getDbConnection');
const { middleware } = require('./shared/middleware');

const controller = async (event) => {  
  const db = await getDbConnection();

  const dbGuards = await db.collection('guards').aggregate(
    [
      {
        $match: {
          isActive:{ $ne:false } 
        }
      },
      { 
        $project: {
          name:1,
          phoneNumber:1,
          guardScore:{ $ifNull:['$guardScore', 1] }
        }
      },
      {
        $sort:{
          guardScore:-1
        }
      }
    ]).toArray();

  const id = new ObjectId().toHexString();
  console.log('logs', { dbGuards, event, id });

  return { message: 'Schedule generated successfully.' };
};

module.exports = { controller: middleware(controller) } ;