function errorHandler(err, req, res, next) {
  console.log('\nerror-handler\n');
  console.log(err);

  const customErr = {
    code: err.code || 500,
    msg: err.message || 'Something went wrong. Try again later',
  };

  return res.status(customErr.code).json({ msg: customErr.msg });
};

module.exports = errorHandler;