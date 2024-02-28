const router = require('express').Router();
const services = require('../services');
const userAuth = require('../utils/auth');

router.route('/login')
  .get(services.renderLogin)
  .post(services.userLogin);

router.use(userAuth);

router.get('/', services.renderHome);



module.exports = router;