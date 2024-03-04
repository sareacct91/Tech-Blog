//@ts-check

const { BadRequestError, InternalServerError } = require('../errors');
const {User} = require('../../model');

/**
 *
 * @param {string} username
 * @returns
 */
async function findUserByName(username) {
  const result = await User.findOne({ where: { username } });

  if (!result) {
    throw new BadRequestError(`Incorrect username or password`);
  }

  return result;
};

/**
 *
 * @param {{
 *   username: string,
 *   password: string
 * }} userData
 * @returns
 */
async function createOneUser(userData) {
  const result = await User.create(userData);

  if (!result) {
    throw new InternalServerError(`Couldn't create user with data ${userData}`);
  }

  return result;
}


module.exports = {
  findUserByName,
  createOneUser,

}