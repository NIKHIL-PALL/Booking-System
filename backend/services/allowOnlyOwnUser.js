
const dotEnv = require('dotenv');


dotEnv.config();

const allowOnlyOwnUser = (req, res, next) => {
    let {userId} = req.params;
    if(!userId){
        userId = req.body.userId;
    }

    if(res.locals.userId === userId) {
        next();
    }
    else{

        return  res.sendStatus(401);
    }

}

module.exports = allowOnlyOwnUser;