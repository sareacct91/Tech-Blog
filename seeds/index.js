const { User, Blog, Comment } = require('../model');
const userData = require('./userData.json');
const sequelize = require('../config/connection');


(async function () {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
})();