//module.exports.JWT_SECRET = "my-secret-key";

const { JWT_SECRET = "super-strong-secret" } = process.env;

module.exports = {
  JWT_SECRET,
};
