function userAuth(req, res, next) {
  if (req.session.loggedIn) {
    return next();
  }
  return res.status(401).redirect('/login');
};

module.exports = userAuth;