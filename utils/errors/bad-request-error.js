class BadRequestError extends Error {
  constructor(msg) {
    super(msg);
    this.code = 400;
  }
};

module.exports = BadRequestError;