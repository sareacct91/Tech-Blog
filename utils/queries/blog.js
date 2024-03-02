const { Blog, User } = require('../../model');
const { InternalServerError } = require('../errors');


async function findAllBlogs() {
  const result = Blog.findAll({
    include: [{ model: User, attributes: ['username'] }]
  });

  if (!result) {
    throw InternalServerError('blog', `Cannot find any blogs`);
  }

  return result;
}

module.exports = {
  findAllBlogs,

}