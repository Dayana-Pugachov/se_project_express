const { INVALID_DATA } = require("../errors");

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INVALID_DATA;
  }
}

module.exports = BadRequestError;
