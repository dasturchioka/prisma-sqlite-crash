const router = require("express").Router();

const UserMiddleware = require("../middlewares/user.middleware");
const UserService = require("../services/user.service");

const userMiddleware = new UserMiddleware();
const userService = new UserService();

router.get("/", userMiddleware.checkUserValid, async (req, res) => {
  try {
    const result = await userService.getUsers();

    res.json(result);
  } catch (error) {
    return res.json({ status: 505, msg: error.message });
  }
});

router.get("/name/:name", userMiddleware.checkUserValid, async (req, res) => {
  try {
    const result = await userService.getUserByName(req.params.name);

    res.json(result);
  } catch (error) {
    return res.json({ status: 505, msg: error.message });
  }
});

router.get("/id/:id", userMiddleware.checkUserValid, async (req, res) => {
  try {
    const result = await userService.getUserById(+req.params.id);

    res.json(result);
  } catch (error) {
    return res.json({ status: 505, msg: error.message });
  }
});

module.exports = router;
