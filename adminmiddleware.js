const jwt = require("jsonwebtoken");

const {JWT_SECRET_ADMIN} = require("../config");

function adminmiddleware(req,res,next)
{
    const token = req.headers.token;
    const confirm = jwt.verify(token , JWT_SECRET_ADMIN);

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
    adminmiddleware : adminmiddleware
};
