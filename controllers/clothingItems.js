const ClothingItem = require("../models/clothingItem");
const ForbiddenError = require("../utils/error-constructors/ForbiddenError");

module.exports.getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((clothingItems) => {
      res.send({ data: clothingItems });
    })
    .catch(next);
};

module.exports.createClothingItem = (req, res, next) => {
  const { name, imageUrl, weather } = req.body;
  ClothingItem.create({ name, imageUrl, weather, owner: req.user._id })
    .then((clothingItem) => {
      res.status(201).send({ data: clothingItem });
    })
    .catch(next);
};

module.exports.deleteClothingItem = (req, res, next) => {
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then((clothingItem) => {
      if (!clothingItem.owner.equals(req.user._id)) {
        throw new ForbiddenError("No permission to delete this resource");
      }
      return clothingItem
        .deleteOne()
        .then(() => res.send({ message: "Item has been deleted" }));
    })
    .catch(next);
};

module.exports.likeClothingItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((clothingItem) => res.send({ data: clothingItem }))
    .catch(next);
};

module.exports.dislikeClothingItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((clothingItem) => res.send({ data: clothingItem }))
    .catch(next);
};
