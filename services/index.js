const { BadRequestError } = require('../utils/errors');
const { findUserByName } = require('../utils/queries/user');
const { findAllBlogs } = require('../utils/queries/blog');

async function renderHome(req, res) {
  const loggedIn = req.session.loggedIn;
  const blogs = await findAllBlogs();
  const blogsData = blogs.map(e => e.toJSON());

  res.status(200).render('home', { blogsData, loggedIn });
};

function renderSignup(req, res) {
  res.status(200).render('signup', {});
}

function renderLogin(req, res) {
  res.status(200).render('login', {});
}

async function userLogin(req, res) {
  // console.log('\n\nuserlogin\n', req.body, '\n\n');
  const { username, password } = req.body;

  const user = await findUserByName(username);

  if (!user.checkPW(password)) {
    throw new BadRequestError(`Incorrect username or password`);
  }

  const userData = user.toJSON();

  req.session.save(() => {
    req.session.loggedIn = true;
    req.session.user_id = userData.id;
    req.session.username = userData.username;

    res.status(200).json({ msg: 'success' });
  });
}

function userLogout(req, res) {
  req.session.destroy(() => {
    res.status(200).json({ msg: 'logged out' });
  })
}


module.exports = {
  renderHome,
  renderLogin,
  userLogin,
  userLogout,
  renderSignup
}