const { Blog, User, Comment } = require('../../model');
const { InternalServerError, BadRequestError } = require('../errors');


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

module.exports = {
  findAllBlogs,
  findBlogByPk,

}