// middleware/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    ...(err.details && { errors: err.details }),
  });
};