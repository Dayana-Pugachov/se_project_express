const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ConflictError,
} = require("../utils/error-constructors");

module.exports = (err, req, res, next) => {
  if (err.name === "CastError" || err.name === "ValidationError") {
    return next(new BadRequestError("Invalid data"));
  } else if (err.name === "DocumentNotFoundError") {
    return next(new NotFoundError("The requested resource is not found"));
  } else if (err.message === "Incorrect email or password") {
    return next(
      new UnauthorizedError("Access is denied due to invalid credentials")
    );
  } else if (err.code === 11000) {
    return next(new ConflictError("User with this email alredy exists"));
  } else {
    next(err);
  }
};
