const { PrismaClient } = require("@prisma/client");
const createError = require("http-errors");

const prisma = new PrismaClient();

class UserService {
  async getUsers() {
    try {
      const users = await prisma.user.findMany();

      if (!users) {
        return createError.NotFound("Users not found");
      }

      return users;
    } catch (error) {
      return error.message;
    }
  }

  async getUserById(id) {
    try {
      const user = await prisma.user.findUnique({ where: { id } });

      if (!user) {
        return createError.NotFound(`Use not found in this id: ${id}`);
      }

      return user;
    } catch (error) {
      return error.message;
    }
  }

  async getUserByName(name) {
    try {
      const user = await prisma.user.findUnique({ where: { name } });
      if (!user) {
        return createError.NotFound(`Use not found in this name: ${name}`);
      }

      return user;
    } catch (error) {
      return error.message
    }
  }
}

module.exports = UserService;
