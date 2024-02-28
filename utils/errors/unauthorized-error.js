class UnauthorizedError extends Error {
  constructor(msg) {
    super(msg);
    this.code = 401;
  }
};

module.exports = UnauthorizedError; 