const { InternalServerError, BadRequestError } = require('../errors');
const { Comment } = require('../../model');
const { } = require('../errors');


async function createOneComment(commentData) {
  const result = await Comment.create(commentData);

  if (!result) {
    throw new InternalServerError('user', `Couldn't create comment with data ${commentData}`);
  }

  return result;
};


module.exports = {
  createOneComment,

}