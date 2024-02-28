class InternalServerError extends Error {
  constructor(msg) {
    super(msg);
    this.code = 500;
  }
};

module.exports = InternalServerError;