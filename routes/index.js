const router = require("express").Router();
const userRouter = require("./users");
const clothesRouter = require("./clothingItems");
const { DOCUMENT_NOT_FOUND } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothesRouter);

router.use((req, res) => res
    .status(DOCUMENT_NOT_FOUND)
    .send({ message: "The requested resource is not found" }));

module.exports = router;
