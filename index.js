const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
 
const JWT_SECRET = "MYNAMEISBHAVESHJOSHIANDTHISISCOURSESELLINGAPP";
const app = express();
const {UserRouter} = require("./userrouter");
const {AdminRouter} = require("./adminrouter");

app.use(express.json());

app.use("/user" , UserRouter);
app.use("/admin" , AdminRouter);

  
async function main()
{
    await mongoose.connect("mongodb+srv://joshi2006bhavesh:Hdm2wJI06jcGGD5q@cluster0.nd6zk.mongodb.net/course-project");
    app.listen(3000);
    console.log("listning on port 3000");
}

main();