const jwt = require("jsonwebtoken");

const {JWT_SECRET_USER} = require("../config");


function usermiddleware(req,res,next)
{
    const token = req.headers.token;
    const confirm = jwt.verify(token , JWT_SECRET_USER);

    if(confirm)
    {
        req.userID = confirm.id;
        next();        
    }
    else
    {
        res.status(404).send({
            msg : "The given token is incorrect"
        });
    }
}

module.exports = {
    usermiddleware : usermiddleware
};
