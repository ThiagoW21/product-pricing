const errorMiddleware = (err, _req, res, _next) => {
  const { name, message } = err;
  if (name && err.status) return res.status(err.status).json({ message });
  res.status(500).json({ message });
};

module.exports = errorMiddleware;
