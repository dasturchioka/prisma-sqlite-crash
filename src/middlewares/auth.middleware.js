const createError = require("http-errors");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

class AuthMiddleware {
  async register(req, res, next) {
    try {
      const { name, password, age } = req.body;
      if (!name || !password || !age) {
        return createError.Forbidden("All fields must be filled");
      }

      if (name.length < 2) {
        return createError.BadRequest(
          "The name field must be contained at least 2 characters"
        );
      }

      if (name.length > 38) {
        return createError.BadRequest(
          "The name field cannot exceed 38 characters"
        );
      }

      const user = await prisma.user.findUnique({ where: { name } });

      if (user) {
        return createError.BadRequest(
          "The name that you selected is unavailable. Choose another one"
        );
      }

      if (password.length < 8) {
        return createError.BadRequest(
          "The password field must be contained at least 8 characters"
        );
      }

      next();
    } catch (error) {
      return createError.InternalServerError(error.message);
    }
  }
  async login(req, res, next) {
    try {
      const { name, password } = req.body;
      if (!name || !password) {
        return createError.Forbidden("All fields must be filled");
      }

      const user = await prisma.user.findUnique({ where: { name } });

      if (!user) {
        return createError.NotFound("The account with this name is not found");
      }

      const comparedPass = await bcrypt.compare(password, user.password);

      if (!comparedPass) {
        return createError.Unauthorized("The password is wrong");
      }

      next();
    } catch (error) {
      return createError.InternalServerError(error.message);
    }
  }
}

module.exports = AuthMiddleware
