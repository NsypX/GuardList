const { ObjectId } = require('mongodb');
const { getDbConnection } = require('./shared/getDbConnection');
const { middleware } = require('./shared/middleware');

const controller = async (event) => {
  const { guards = [] } = event.body;
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

  const minScore = Math.min(...dbGuards.map((dbGuard) => dbGuard.guardScore));
  const guardsWithId = guards.filter((guard)=> {    
    const guardExists = dbGuards.find((dbGuard) => dbGuard.phoneNumber === guard.phoneNumber);
    return !guardExists;    
  }).map((guard) => ({ _id: new ObjectId().toHexString(), createdAt: new Date(), isActive: true, guardScore: minScore, ...guard }));

  await db.collection('guards').insertMany(guardsWithId);

  return { message: 'Guards saved successfully.' };
};

module.exports = { saveGuardsController: controller, controller: middleware(controller) } ;