const router = require('express').Router();
const services = require('../../services/userServices');


router.route('/')
  .post(services.createUser)


module.exports = router;