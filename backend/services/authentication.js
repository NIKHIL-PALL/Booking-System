
const dotEnv = require('dotenv');
const jwt  = require('jsonwebtoken');

dotEnv.config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];
    if(token === undefined) {
        return res.sendStatus(401);
    }
    else{
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, resp) => {
            if(err) {
                return res.sendStatus(403);
            }

            res.locals = resp;
            next();
        })
    }
}

module.exports = authenticateToken;