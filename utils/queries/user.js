const {User} = require('../../model');
const { BadRequestError, InternalServerError } = require('../errors');

async function findUserPk(pk) {
  const result = User.findByPk(pk);

  if (!result) {
    throw InternalServerError(`Couldn't find user with id of ${pk}`);
  }

  return result.toJSON();
}

async function findUserByName(username) {
  const result = await User.findOne({ where: { username } });


  if (!result) {
    throw new BadRequestError(`Incorrect username or password`);
  }

  return result;
};


module.exports = {
  findUserByName,
  findUserPk,

}