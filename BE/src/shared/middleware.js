
const { StatusCodes } = require('http-status-codes');

const rapMessage = (res, code, data = {}) => {
  res.status(code).send({ ...data });
};

const middleware = (func) => {  
  return async (req, res) =>{
    try{

      console.log('Received message, starting process',{ req });
      const data = await func(req);
      rapMessage(res, StatusCodes.OK, data);    
    }catch(err){
      rapMessage(res, StatusCodes.OK, { message: err.message });    
    }  
  };
};

module.exports = { middleware };