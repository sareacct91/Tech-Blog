const { User, Blog, Comment } = require('../model');
const userData = require('./userData.json');
const blogData = require('./blogData.json');
const sequelize = require('../config/connection');


(async function () {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData);

  await Blog.bulkCreate(blogData);

  process.exit(0);
})();