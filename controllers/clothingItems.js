const ClothingItem = require("../models/clothingItem");
const {
  INVALID_DATA,
  DOCUMENT_NOT_FOUND,
  SERVER_ERROR,
} = require("../utils/errors");

module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
    .orFail()
    .then((clothingItems) => {
      res.status(200).send({ data: clothingItems });
    })
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "DocumentNotFoundError") {
        return res.status(DOCUMENT_NOT_FOUND).send({ message: err.message });
      }
      {
        return res
          .status(SERVER_ERROR)
          .send({ message: "An error has occured on the server" });
      }
    });
};

module.exports.createClothingItem = (req, res) => {
  console.log(req.user._id);
  const { name, imageUrl, weather } = req.body;
  ClothingItem.create({ name, imageUrl, weather, owner: req.user })
    .then((clothingItem) => {
      console.log(req);
      res.status(201).send({ data: clothingItem });
    })
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "ValidationError") {
        return res.status(INVALID_DATA).send({ message: err.message });
      }
      {
        return res
          .status(SERVER_ERROR)
          .send({ message: "An error has occured on the server" });
      }
    });
};

module.exports.deleteClothingItem = (req, res) => {
  ClothingItem.findByIdAndRemove(req.params.itemId)
    .orFail()
    .then((clothingItem) => res.status(200).send({ data: clothingItem }))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(INVALID_DATA).send({ message: err.message });
      } else if (err.name === "DocumentNotFoundError") {
        return res.status(DOCUMENT_NOT_FOUND).send({ message: err.message });
      }
      {
        return res
          .status(SERVER_ERROR)
          .send({ message: "An error has occured on the server" });
      }
    });
};

module.exports.likeClothingItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((clothingItem) => res.status(200).send({ data: clothingItem }))
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "CastError") {
        return res.status(INVALID_DATA).send({ message: err.message });
      } else if (err.name === "DocumentNotFoundError") {
        return res.status(DOCUMENT_NOT_FOUND).send({ message: err.message });
      }
      {
        return res
          .status(SERVER_ERROR)
          .send({ message: "An error has occured on the server" });
      }
    });
};

module.exports.dislikeClothingItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((clothingItem) => res.status(200).send({ data: clothingItem }))
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "CastError") {
        return res.status(INVALID_DATA).send({ message: err.message });
      } else if (err.name === "DocumentNotFoundError") {
        return res.status(DOCUMENT_NOT_FOUND).send({ message: err.message });
      }
      {
        return res
          .status(SERVER_ERROR)
          .send({ message: "An error has occured on the server" });
      }
    });
};
