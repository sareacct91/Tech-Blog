//@ts-check

const { createOneUser } = require('../utils/queries/user');
const { BadRequestError } = require('../utils/errors');

async function createUser(req, res) {
  const { username, password } = req.body;

  const inputData = {
    username,
    password,
  };

  const user = await createOneUser(inputData);

  req.session.save(() => {
    req.session.loggedIn = true;
    req.session.user_id = user.id;

    res.status(201).json({ msg: 'created' });
  })
}


module.exports = {
  createUser,

}