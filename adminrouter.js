const express = require('express')
const AdminRouter = express.Router();

const jwt = require("jsonwebtoken");
const { z } = require("zod");
const bcrpyt = require("bcryptjs");
 
const {JWT_SECRET_ADMIN} = require("../config");

const { adminmiddleware } = require("./adminmiddleware");

AdminRouter.use(express.json());


const {AdminModel} = require("../db");
const {courseModel} = require("../db")
AdminRouter.post("/login" , async function(req,res)
{
    const email = req.body.email;
    const password = req.body.password;

    const confirm = await AdminModel.findOne({
        email : email ,
    });

    if(confirm)
    {

        if(bcrpyt.compare(password, confirm.Password))
        {
            const token = jwt.sign({
                _id : confirm._Id
            } , JWT_SECRET_ADMIN);

            res.json({
                msg : token
            })
        }
        else
        {
            res.status(404).send({
                msg : "the password given is incorrect"
            });
        }
    }
    else
    {
        res.status(404).send({
            msg : " The credentials entered are wrong "
        });
    }
});

AdminRouter.post("/signup" , async function(req,res)
{
    const rightformat = z.object({
        email : z.string().min(4).max(40).email() ,
        name : z.string().min(4).max(40) , 
        Password : z.string().min(4).max(40)
    });

    const safeparse  = rightformat.safeParse(req.body);

    if(!safeparse)
    {
        res.status(404).send({
            msg : "duplicacy in email found !"
        })
        return;
    }
    
    const email = req.body.email;
    const name = req.body.name ;
    const password = req.body.password;
   
    try{
        const updatedpassword = await bcrpyt.hash(password , 5);
        await AdminModel.create(
            {
                email : email,
                name : name , 
                Password : updatedpassword  
            }
        );
        res.json({
            msg : "successfully registered the admin in database" 
        });
    }
    catch(e)
    {
        console.log(e);
        res.status(404).send({
            msg : "failed to register ! "
        })
    }
});

AdminRouter.get("/allcourse" , adminmiddleware , async function(req,res)
{
    const AdminId = req.userID;

    const courses = await courseModel.find({
        creatorid : AdminId        
    });

    if(courses)
    {
        res.json({
            courses : courses ,
            msg : "all courses processed "
        });
    }
    else
    {
        res.status(404).send({
            msg : "There was something error in fetching courses"
        })
    }
});

AdminRouter.post("/addcoursecontent" , adminmiddleware, async function(req,res)
{
    const AdminId = req.userID;
    const title = req.body.title;
    const discription = req.body.discription;
    const price = req.body.price;
    const ImageURL = req.body.ImageURL;
    
    try{
        const made = await courseModel.create({
            title : title , 
            discription : discription,
            price : price,
            ImageURL : ImageURL,
            creatorid : AdminId
        });
        res.json({
            course_id : made._id,
            msg : "Added Successfully "
        }); 
    }
    catch(e)
    {
        res.status(404).send({
            msg : "There was some error ! "
        })
    }

});
AdminRouter.put("/updateacourse" , adminmiddleware , async function(req,res)
{
    const userID = req.userID;

    const AdminId = req.userID;
    const title = req.body.title;
    const discription = req.body.discription;
    const price = req.body.price;
    const ImageURL = req.body.ImageURL;
    const courseId = req.body.courseId;

    const find = courseModel.updateOne({
        creatorid : userID,  
        _id : courseId
    },{
        title : title , 
        discription : discription,
        price : price,
        ImageURL : ImageURL,
    })
    if(find)
    {
        res.json({
            msg : "updated succesfully!"
        });
    }
    else
    {
        res.status(404).send({
            msg : "there was some error in updating the course ! "
        })
    }
});


module.exports = {
    AdminRouter : AdminRouter
}