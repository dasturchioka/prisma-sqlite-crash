const router = require("express").Router();

const AuthService = require("../services/auth.service");
const AuthMiddleware = require("../middlewares/auth.middleware");

const authMiddleware = new AuthMiddleware();
const authService = new AuthService();

router.post("/register", authMiddleware.register, async (req, res) => {
  try {
    const result = await authService.register(req.body);

    res.json({
      result,
    });
  } catch (error) {
    return res.json({ status: 505, msg: error.message });
  }
});

router.post("/login", authMiddleware.login, async (req, res) => {
  try {
    const result = await authService.login(req.body);

    return res.json({
      result,
    });
  } catch (error) {
    return res.json({ status: 505, msg: error.message });
  }
});

module.exports = router;
