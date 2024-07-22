const BadRequestError = require("../utils/error-constructors/BadRequestError");
const NotFoundError = require("../utils/error-constructors/NotFoundError");
const UnauthorizedError = require("../utils/error-constructors/UnauthorizedError");
const ConflictError = require("../utils/error-constructors/ConflictError");

module.exports = (err, req, res, next) => {
  if (err.name === "CastError" || err.name === "ValidationError") {
    return next(new BadRequestError("Invalid data"));
  } if (err.name === "DocumentNotFoundError") {
    return next(new NotFoundError("The requested resource is not found"));
  } if (err.message === "Incorrect email or password") {
    return next(
      new UnauthorizedError("Access is denied due to invalid credentials")
    );
  } if (err.code === 11000) {
    return next(new ConflictError("User with this email alredy exists"));
  } 
    next(err);
  
};
