const router = require('express').Router();
const services = require('../services/renderServices');


router.route('/')
  .get(services.renderHome);

router.route('/dashboard')
  .get(services.renderDashboard);

router.route('/blog/new')
  .get(services.renderBlogNewForm)

router.route('/blog/:id')
  .get(services.renderBlog)

router.route('/blog/:id/edit')
  .get(services.renderBlogEditForm)

router.route('/signup')
  .get(services.renderSignup)

router.route('/login')
  .get(services.renderLogin)
  .post(services.userLogin);

router.route('/logout')
  .post(services.userLogout);


module.exports = router;