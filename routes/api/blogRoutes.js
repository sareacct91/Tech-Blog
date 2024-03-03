const router = require('express').Router();
const services = require('../../services/blogServices');

router.route('/')
  .post(services.createBlog)

router.route('/:id')
  .patch(services.updateBlog)
  .delete(services.deleteBlog)

module.exports = router;