//@ts-check

const { InternalServerError, BadRequestError } = require('../errors');
const { Blog, User, Comment } = require('../../model');


async function findAllBlogs() {
  const result = Blog.findAll({
    include: [{ model: User, attributes: ['username'] }]
  });

  if (!result) {
    throw new InternalServerError(`Cannot find any blogs`);
  }

  return result;
}

/**
 *
 * @param {number} pk
 * @returns
 */
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
    throw new BadRequestError(`No blog found with id ${pk}`);
  }

  return result;
}

/**
 *
 * @param {number} user_id
 * @returns
 */
async function findBlogsByUser(user_id) {
  const result = await Blog.findAll({ where: { user_id } });
  return result;
}

/**
 *
 * @param {number} id
 * @returns
 */
async function deleteBlogByPk(id) {
  const result = await Blog.destroy({ where: { id } });

  if (!result) {
    throw new InternalServerError(`Couldn't delete blog with id ${id}`);
  }

  return result;
}

/**
 *
 * @param {number} id
 * @param {{title: (string|undefined),content: (string|undefined)}} blogData
 * @returns
 */
async function updateBlogByPk(id, blogData) {
  const result = await Blog.update(blogData, { where: { id } });

  if (!result[0]) {
    throw new InternalServerError(`Couldn't update blog with id ${id}`);
  }

  return result;
}

/**
 * 
 * @param {{title: string, content: string, user_id: number}} blogData 
 * @returns 
 */
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