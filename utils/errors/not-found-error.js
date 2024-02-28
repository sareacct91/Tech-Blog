class NotFoundError extends Error {
  constructor(msg) {
    super(msg);
    this.code = 404;
  }
};

module.exports = NotFoundError;