//@ts-check

const { BadRequestError } = require('../utils/errors');
const { deleteBlogByPk, updateBlogByPk, createOneBlog } = require('../utils/queries/blog');

async function createBlog(req, res) {
  const { user_id } = req.session;
  const { title, content } = req.body;
  const inputData = { title, content, user_id };

  const blog = await createOneBlog(inputData);
  const blogData = blog.toJSON();

  res.status(201).json({
    status: 'Created',
    data: blogData,
  })
}

async function updateBlog(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;

  const inputData = {
    title,
    content,
  };

  const result = await updateBlogByPk(id, inputData);

  res.status(200).json({
    status: 'Updated',
    data: result
  })
}

async function deleteBlog(req, res) {
  const { id } = req.params;
  const result = await deleteBlogByPk(id);
  res.status(200).json({
    status: 'Deleted',
    data: result
  })
}

module.exports = {
  deleteBlog,
  updateBlog,
  createBlog,

}