const router = require('express').Router();
const userAuth = require('../../utils/auth');
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');
const commentRoutes = require('./commentRoutes');


router.use('/users', userRoutes);
router.use('/blogs', userAuth, blogRoutes);
router.use('/comments', commentRoutes);


module.exports = router;