const router = require("express").Router();
const auth = require("../middlewares/auth");
const userRouter = require("./users");
const clothesRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const { DOCUMENT_NOT_FOUND } = require("../utils/errors");
const {
  validateRegistration,
  validateLogin,
} = require("../middlewares/validation");

router.post("/signup", validateRegistration, createUser);
router.post("/signin", validateLogin, login);

router.use("/users", auth, userRouter);
router.use("/items", clothesRouter);

router.use((req, res) =>
  res
    .status(DOCUMENT_NOT_FOUND)
    .send({ message: "The requested resource is not found" })
);

module.exports = router;
