const { DOCUMENT_NOT_FOUND } = require("../errors");

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = DOCUMENT_NOT_FOUND;
  }
}

module.exports = NotFoundError;
