require("dotenv").config();

const jwt = require("jsonwebtoken");

class UserMiddleware {
  async checkUserValid(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.json({ status: 404, msg: "Token not found" });
    }

    const decodedToken = await jwt.decode(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.json({ status: 403, msg: "Token is not valid" });
    }

    next();
  }
}

module.exports = UserMiddleware;
