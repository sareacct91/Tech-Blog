const { ValidationError } = require('sequelize');
const { Blog, User, Comment } = require('../model');

function errorHandler(err, req, res, next) {
  console.log('\n\nerror-handler\n\n');
  console.log('err:', err);

  const errInstance = err.errors[0].instance || null;
  const customErr = {
    code: err.code || 500,
    msg: err.message || 'Something went wrong. Try again later',
  };

  if (err instanceof ValidationError && errInstance instanceof User) {
    customErr.code = 400;
    customErr.msg = 'Something went wrong, try another name'
  }

  return res.status(customErr.code).json({ msg: customErr.msg });
};

module.exports = errorHandler;