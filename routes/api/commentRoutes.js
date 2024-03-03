const router = require('express').Router();
const services = require('../../services/commentServices');


router.route('/')
  .post(services.createComment)


module.exports = router;