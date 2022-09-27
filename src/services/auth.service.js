const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const { signToken } = require("../utils/jwt.js");

const prisma = new PrismaClient();

class AuthService {
  async register(data) {
    const { name, password, age } = data;

    const hashedPass = await bcrypt.hash(password, bcrypt.genSalt(12));
    const newUser = await prisma.user.create({
      data: {
        name,
        password: hashedPass,
        age,
      },
    });

    const token = await signToken(newUser);

    return { user: newUser, token };
  }

  async login(data) {
    const { name, password } = data;

    const user = await prisma.user.findUnique({
      where: {
        name,
        password: hashedPass,
      },
    });

    const token = await signToken(user);

    return { user, token };
  }
}

module.exports = AuthService;