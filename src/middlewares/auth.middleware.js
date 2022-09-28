const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

class AuthMiddleware {
  async register(req, res, next) {
    try {
      const { name, password, age } = req.body;
      if (!name || !password || !age) {
        return res.json({
          message: "All fields must be filled",
        });
      }

      if (name.length < 2) {
        return res.json({
          message: "The name field must be contained at least 2 characters",
        });
      }

      if (name.length > 38) {
        return res.json({
          message: "The name field cannot exceed 38 characters",
        });
      }

      const user = await prisma.user.findUnique({ where: { name } });

      if (user) {
        return res.json({
          message:
            "The name that you selected is unavailable. Choose another one",
        });
      }

      if (password.length < 8) {
        return res.json({
          message: "The password field must be contained at least 8 characters",
        });
      }

      next();
    } catch (error) {
      return res.json({ message: error.message });
    }
  }
  async login(req, res, next) {
    try {
      const { name, password } = req.body;
      if (!name || !password) {
        return res.json({
          message: "All fields must be filled",
        });
      }

      const user = await prisma.user.findUnique({ where: { name } });

      if (!user) {
        return res.json({
          message: "The account with this name is not found",
        });
      }

      const comparedPass = await bcrypt.compare(password, user.password);

      if (!comparedPass) {
        return res.json({
          message: "The password is wrong",
        });
      }

      next();
    } catch (error) {
      return res.json({ message: error.message });
    }
  }
}

module.exports = AuthMiddleware;
