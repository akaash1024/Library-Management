const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Backedn Error";
  const extraDetails = err.extraDetails || "Backend error";
  const success = false;

  res.status(500).json({ status, message, extraDetails, success });
};

module.exports = errorMiddleware;
