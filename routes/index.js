const router = require("express").Router();
const userRouter = require("./users");
const clothesRouter = require("./clothingItems");

router.use("/users", userRouter);
router.use("/items", clothesRouter);

router.use((req, res) => {
  if (res.status === 404) {
    return res.send({ message: "Requested resource not found" });
  }
});
module.exports = router;
