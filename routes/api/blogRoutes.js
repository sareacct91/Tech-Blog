const router = require('express').Router();
const services = require('../../services/blogServices');


router.route('/:id')
  .get(services.renderBlog)


module.exports = router;