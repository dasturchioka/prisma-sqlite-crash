const jwt = require("jsonwebtoken");
const createError = require("http-errors");
require("dotenv").config();

let tokenSecret = process.env.JWT_SECRET;

module.exports = {
  async signToken(ctx) {
    jwt.sign(
      { ctx },
      tokenSecret,
      {},
      (err,
      (token) => {
        if (err) {
          return createError.InternalServerError(
            "Something went wrong on src/utils/jwt.js"
          );
        } else {
          return token;
        }
      })
    );
  },
};
