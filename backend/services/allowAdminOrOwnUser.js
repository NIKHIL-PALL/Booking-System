


const allowAdminOrOwnUser = (req, res, next) => {
    const {userId} = req.params;
    if(res.locals.role === "admin" || res.locals.userId == userId)  {
        next();
    }
    else{
        return res.sendStatus(401);
    }

    
}

module.exports = allowAdminOrOwnUser;