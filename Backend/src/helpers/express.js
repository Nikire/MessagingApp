
module.exports = {
  errorHandler: () => (err, req, res) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error('ERROR ', err);
    res.status(status).json({ error: true, message });
  },
};