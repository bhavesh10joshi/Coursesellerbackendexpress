const express = require('express')
const UserRouter = express.Router();

const jwt = require("jsonwebtoken");
const { z } = require("zod");
const bcrpyt = require("bcryptjs");
 
const {JWT_SECRET_USER} = require("./config");
UserRouter.use(express.json());

const { usermiddleware } = require("./usermiddleware")
const {UserModel , AdminModel , PaymentsModel , courseModel } = require("../db");
UserRouter.post("/login" , async function(req,res)
{
    const email = req.body.email;
    const password = req.body.password;
    const confirm = await UserModel.findOne({
        email : email,
    });
    
    if(confirm)
    {
        const check =  bcrpyt.compare(password, confirm.Password);
        
        if(check)
        {
            const token = jwt.sign({ id : confirm._Id } , JWT_SECRET_USER);
                res.json({
                    msg : token
            });
        }
        else
        {
            res.status(404).send({
                msg : " incorrect password ! " 
            });
        }
    }
    else{
        res.status(404).send(
            {
                msg : "wrong credentails!"
            }
        );
    }
});

UserRouter.post("/signup" , async function(req,res)
{
    const requiredbody = z.object({
        email : z.string().min(3).max(100).email(),
        name : z.string().min(3).max(100)
    });

    const safeparsedata = requiredbody.safeParse(req.body);

    if(!safeparsedata.success)
    {
        res.status(404).send
            ({
                msg : safeparsedata.error
                
            });
            return;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    if (!password) {
        res.status(400).send({ msg: "Password is required!" });
        return;
    }

        try{
            const updatedpassword = await bcrpyt.hash(password, 10);
            await UserModel.create({
                name : name , 
                email : email ,
                Password : updatedpassword       
             });
     
             res.json({
                 msg : "succesfully signed up , you cam now sign in ! "
             });
        }
        catch(error)
        {
            console.error(error)
            res.status(404).send
            ({
                msg : "duplicacy of email found!"
            });
            return;
        } 
});

UserRouter.post("/purchaseacourse" , usermiddleware , function(req,res)
{
    const userID = req.userID;
    const CourseId = req.body.CourseId;

    const made = PaymentsModel.create({
        courseId : CourseId ,
        userId : userID
    });

    if(made)
    {
        res.json({
            paymentID : made.ObjectId , 
            msg : "Payment was successfull !"
        });
    }
    else
    {
        res.status(404).send({
            msg : "Error Encountered while Purchasing ! "
        }); 
    }
});

UserRouter.get("/seecourse" , usermiddleware , async function(req,res)
{
    const userID = req.userID;
    
    const made = await PaymentsModel.find({
        userId : userID
    });

    let purchasedcourseids = [];

    for(let i = 0 ; i<made.length ; i++)
    {
        purchasedcourseids.push(made[i].courseId);
    }

    const Coursedata = await courseModel.find({
        _id : { $in: purchasedcourseids}
    });

    if(made)
    {
        res.json({
            Courses : made ,
            coursedata : Coursedata ,  
            msg : "Courses Found"
        });
    }
    else{
        res.status(404).send({
            msg : "There was some Erroe in fetching the courses ! " 
        });
    }
});

UserRouter.get("/preview" , async function(req,res)
{   
    const find = await courseModel.find({});
    
    if(find)
    {
        res.json({
            courses : find , 
            msg : "All courses are found"
        })
    }
    else
    {
        res.status(404).send(
        {
            msg : "there was some error in fetching the course details !"
        });
    }
})
module.exports = {
    UserRouter : UserRouter
}