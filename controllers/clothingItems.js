const ClothingItem = require("../models/clothingItem");
const {
  INVALID_DATA,
  DOCUMENT_NOT_FOUND,
  SERVER_ERROR,
  FORBIDDEN,
} = require("../utils/errors");

module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((clothingItems) => {
      res.send({ data: clothingItems });
    })
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occured on the server" });
    });
};

module.exports.createClothingItem = (req, res) => {
  const { name, imageUrl, weather } = req.body;
  ClothingItem.create({ name, imageUrl, weather, owner: req.user._id })
    .then((clothingItem) => {
      res.status(201).send({ data: clothingItem });
    })
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "ValidationError") {
        return res.status(INVALID_DATA).send({ message: "Invalid data." });
      }

      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occured on the server" });
    });
};

module.exports.deleteClothingItem = (req, res) => {
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then((clothingItem) => {
      if (!clothingItem.owner.equals(req.user._id)) {
        return res
          .status(FORBIDDEN)
          .send({ message: "No permission to delete this resource" });
      }
      return clothingItem
        .deleteOne()
        .then(() => res.send({ message: "Item has been deleted" }));
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(INVALID_DATA).send({ message: "Invalid data" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(DOCUMENT_NOT_FOUND)
          .send({ message: "The requested resource is not found" });
      }

      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occured on the server" });
    });
};

module.exports.likeClothingItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((clothingItem) => res.send({ data: clothingItem }))
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "CastError") {
        return res.status(INVALID_DATA).send({ message: "Invalid data" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(DOCUMENT_NOT_FOUND)
          .send({ message: "The requested resource is not found" });
      }

      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occured on the server" });
    });
};

module.exports.dislikeClothingItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((clothingItem) => res.send({ data: clothingItem }))
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "CastError") {
        return res.status(INVALID_DATA).send({ message: "Invalid data" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(DOCUMENT_NOT_FOUND)
          .send({ message: "The requested resource is not found" });
      }

      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occured on the server" });
    });
};
