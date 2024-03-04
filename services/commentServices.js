//@ts-check

const { BadRequestError } = require('../utils/errors');
const { createOneComment } = require('../utils/queries/comment');


async function createComment(req, res) {
  const { content, blog_id } = req.body;
  const { user_id } = req.session;

  const inputData = {
    content,
    user_id,
    blog_id
  };

  const comment = await createOneComment(inputData);
  const commentData = comment.toJSON();

  res.status(201).json({status: 'created', data: commentData})
}


module.exports = {
  createComment,
}