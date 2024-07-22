const router = require("express").Router();
const auth = require("../middlewares/auth");
const userRouter = require("./users");
const clothesRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const {
  validateRegistration,
  validateLogin,
} = require("../middlewares/validation");
const NotFoundError = require("../utils/error-constructors/NotFoundError");

router.post("/signup", validateRegistration, createUser);
router.post("/signin", validateLogin, login);

router.use("/users", auth, userRouter);
router.use("/items", clothesRouter);

router.use((req, res, next) => {
  next(new NotFoundError("The requested resource is not found"));
});

module.exports = router;
