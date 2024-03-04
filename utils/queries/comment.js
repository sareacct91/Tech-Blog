//@ts-check

const { InternalServerError, BadRequestError } = require('../errors');
const { Comment } = require('../../model');


/**
 *
 * @param {{
 *   content: string,
 *   user_id: number,
 *   blog_id: number
 * }} commentData
 * @returns
 */
async function createOneComment(commentData) {
  const result = await Comment.create(commentData);

  if (!result) {
    throw new InternalServerError(`Couldn't create comment with data ${commentData}`);
  }

  return result;
};


module.exports = {
  createOneComment,
}