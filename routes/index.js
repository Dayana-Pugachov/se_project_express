const router = require("express").Router();
const auth = require("../middlewares/auth");
const userRouter = require("./users");
const clothesRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const { DOCUMENT_NOT_FOUND } = require("../utils/errors");

router.post("/signup", createUser);
router.post("/signin", login);

router.use("/users", auth, userRouter);
router.use("/items", clothesRouter);

router.use((req, res) =>
  res
    .status(DOCUMENT_NOT_FOUND)
    .send({ message: "The requested resource is not found" })
);

module.exports = router;
