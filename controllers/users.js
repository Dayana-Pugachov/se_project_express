const User = require("../models/user");
const {
  INVALID_DATA,
  DOCUMENT_NOT_FOUND,
  SERVER_ERROR,
} = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "DocumentNotFoundError") {
        return res.status(DOCUMENT_NOT_FOUND).send({ message: err.message });
      }

      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occured on the server" });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "CastError") {
        return res.status(INVALID_DATA).send({ message: err.message });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(DOCUMENT_NOT_FOUND).send({ message: err.message });
      }

      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occured on the server" });
    });
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(INVALID_DATA).send({ message: err.message });
      }

      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occured on the server" });
    });
};
