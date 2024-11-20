const mongoose = require("mongoose");
const schema  = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const user = new schema({
    _Id : ObjectId,
    name : String,
    email : {type : String , unique : true},
    Password : String, 
});

const admin = new schema({
    _Id : ObjectId,
    name : String , 
    email : {type : String , unique : true},
    Password : String
});

const course = new schema({
    title : String ,
    discription : String,
    price : Number,
    ImageURL : String ,
    creatorid : ObjectId
});

const payments = new schema({
    _Id : ObjectId ,
    courseId : ObjectId ,
    userId : ObjectId
});

const UserModel = mongoose.model("User" , user);
const courseModel = mongoose.model("Course" , course);
const AdminModel = mongoose.model("Admin" , admin);
const PaymentsModel = mongoose.model("Payments" , payments) ;

module.exports = {
    UserModel,
    AdminModel,
    PaymentsModel,
    courseModel
};