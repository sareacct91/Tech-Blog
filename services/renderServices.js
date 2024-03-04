//@ts-check

const { BadRequestError } = require('../utils/errors');
const { findUserByName } = require('../utils/queries/user');
const { findAllBlogs, findBlogsByUser, findBlogByPk } = require('../utils/queries/blog');

async function renderHome(req, res) {
  const loggedIn = req.session.loggedIn;
  const blogs = await findAllBlogs();
  const blogsData = blogs.map(e => e.toJSON());

  res.status(200).render('home', { blogsData, loggedIn, });
};

async function renderDashboard(req, res) {
  const { user_id, loggedIn } = req.session;

  const blogs = await findBlogsByUser(+user_id);
  const blogsData = blogs.map(e => e.toJSON());

  res.status(200).render('dashboard', { blogsData, loggedIn, isDashboard: true });
}

function renderSignup(req, res) {
  res.status(200).render('signup', {});
}

function renderLogin(req, res) {
  res.status(200).render('login', {});
}

async function userLogin(req, res) {
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

async function renderBlog(req, res) {
  const { id } = req.params;
  const loggedIn = req.session;

  const blog = await findBlogByPk(+id);
  const blogData = blog.toJSON();

  res.status(200).render('blog-id', { blogData, loggedIn })
}

async function renderBlogEditForm(req, res) {
  const loggedIn = req.session.loggedIn;
  const { id } = req.params;
  const blog = await findBlogByPk(id);
  const blogData = blog.toJSON();

  res.status(200).render('blog-edit', {blogData, loggedIn, isDashboard: true});
}

function renderBlogNewForm(req, res) {
  const loggedIn = req.session.loggedIn;
  res.status(200).render('blog-new', {loggedIn, isDashboard: true})
}


module.exports = {
  renderHome,
  renderLogin,
  userLogin,
  userLogout,
  renderSignup,
  renderDashboard,
  renderBlog,
  renderBlogEditForm,
  renderBlogNewForm,

}