const { BadRequestError } = require('../utils/errors');
const { findBlogByPk } = require('../utils/queries/blog');


async function renderBlog(req, res) {
  const { id } = req.params;
  const loggedIn = req.session;

  const blog = await findBlogByPk(id);
  const blogData = blog.toJSON();

  console.log(blogData);

  res.status(200).render('blog-id', { blogData, loggedIn })
}


module.exports = {
  renderBlog,

}