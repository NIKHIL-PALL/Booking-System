const dotEnv = require("dotenv");

dotEnv.config();

const allowOnlyAdmin = (req, res, next) => {
  
  if(res.locals.role === process.env.USER) {
    return res.sendStatus(401);
  }
  else{

    next();
  }
  
};

module.exports = allowOnlyAdmin;
