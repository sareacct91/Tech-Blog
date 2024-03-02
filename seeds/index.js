const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../model');
const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

(async function () {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData);
  await Blog.bulkCreate(blogData);
  await Comment.bulkCreate(commentData);

  process.exit(0);
})();