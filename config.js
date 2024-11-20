const jwt = require("jsonwebtoken");

const JWT_SECRET_USER = "userkajwtsecret";
const JWT_SECRET_ADMIN = "adminkajwtsecret";
module.exports = {
    JWT_SECRET_ADMIN,
    JWT_SECRET_USER
};