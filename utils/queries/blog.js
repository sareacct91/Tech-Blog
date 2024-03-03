const { InternalServerError, BadRequestError } = require('../errors');
const { Blog, User, Comment } = require('../../model');
const { where } = require('sequelize');


async function findAllBlogs() {
  const result = Blog.findAll({
    include: [{ model: User, attributes: ['username'] }]
  });

  if (!result) {
    throw InternalServerError('blog', `Cannot find any blogs`);
  }

  return result;
}

async function findBlogByPk(pk) {
  const result = await Blog.findByPk(pk, {
    include: [
      { model: User, attributes: ['username'] },
      { model: Comment,
        include: [{
          model: User
        }]
      }
    ]
  });

  if (!result) {
    throw new BadRequestError('blog', `No blog found with id ${pk}`);
  }

  return result;
}

async function findBlogsByUser(user_id) {
  const result = await Blog.findAll({ where: { user_id } });
  return result;
}

async function deleteBlogByPk(id) {
  const result = await Blog.destroy({ where: { id } });

  if (!result) {
    throw new InternalServerError('blog', `Couldn't delete blog with id ${blog_id}`);
  }

  return result;
}

async function updateBlogByPk(id, blogData) {
  const result = await Blog.update(blogData, { where: { id } });

  if (!result[0]) {
    throw new InternalServerError(`Couldn't update blog with id ${blog_id}`);
  }

  return result;
}

async function createOneBlog(blogData) {
  const result = await Blog.create(blogData);
  return result;
}

module.exports = {
  findAllBlogs,
  findBlogByPk,
  findBlogsByUser,
  deleteBlogByPk,
  updateBlogByPk,
  createOneBlog,

}