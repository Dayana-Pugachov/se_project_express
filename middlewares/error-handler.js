module.exports = (err, req, res, next) => {
  console.error(err);
  const { statusCode = 500, message } = err;
  return res.status(statusCode).send({
    message: statusCode === 500 ? "An error occured on the server" : message,
  });
};
