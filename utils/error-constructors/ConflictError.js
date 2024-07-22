const { DUPLICATE_ERROR } = require("../errors");

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = DUPLICATE_ERROR;
  }
}

module.exports = ConflictError;
