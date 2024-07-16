//BadRequestError — status code 400
//UnauthorizedError — status code 401
//ForbiddenError — status code 403
//NotFoundError — status code 404
//ConflictError — status code 409
const {
  INVALID_DATA,
  UNAUTHORIZED,
  DOCUMENT_NOT_FOUND,
  DUPLICATE_ERROR,
  FORBIDDEN,
} = require("./errors");

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INVALID_DATA;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = DOCUMENT_NOT_FOUND;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = DUPLICATE_ERROR;
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
