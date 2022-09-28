const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { signToken } = require("../utils/jwt.js");

const prisma = new PrismaClient();

class AuthService {
  async register(data) {
    try {
      const { name, password, age } = data;
      console.log("Service is working");

      const hashedPass = await bcrypt.hash(password, 14);
      const newUser = await prisma.user.create({
        data: {
          name,
          password: hashedPass,
          age,
        },
      });

      const token = await signToken(newUser);

      return { user: newUser, token };
    } catch (error) {
      return error.message;
    }
  }

  async login(data) {
    try {
      const { name, password } = data;


      const user = await prisma.user.findUnique({
        where: {
          name,
        },
      });

      const token = await signToken(user);

      return { user, token };
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = AuthService;
