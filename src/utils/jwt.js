const jwt = require("jsonwebtoken");
const createError = require("http-errors");
require("dotenv").config();

let tokenSecret = process.env.JWT_SECRET;

module.exports = {
  async signToken(ctx) {
   const token = await jwt.sign({ctx}, tokenSecret)

   if (!token) {
     createError.InternalServerError('Something went wrong')
   } else {
    return token
   }
  },
};
