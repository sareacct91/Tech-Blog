const router = require('express').Router();
const services = require('../services/renderServices');
const userAuth = require('../utils/auth');

router.route('/')
  .get(services.renderHome);

router.route('/signup')
  .get(services.renderSignup)

router.route('/login')
  .get(services.renderLogin)
  .post(services.userLogin);

router.route('/logout')
  .post(services.userLogout);



router.route('/dashboard')
  .get(userAuth, services.renderDashboard);

router.route('/blog/new')
  .get(userAuth, services.renderBlogNewForm)

router.route('/blog/:id')
  .get(userAuth, services.renderBlog)

router.route('/blog/:id/edit')
  .get(userAuth, services.renderBlogEditForm)


module.exports = router;