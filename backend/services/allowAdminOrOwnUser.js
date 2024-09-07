

const dotEnv = require('dotenv');


const allowAdminOrOwnUser = (req, res, next) => {
    const {userId} = req.params;

    if(res.locals.role === "admin" || res.locals.userId === userId)  {
        console.log("next is called ------------------------");
        next();
    }
    else{

        return res.sendStatus(401);
    }

    
}

module.exports = allowAdminOrOwnUser;