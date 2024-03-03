const router = require('express').Router();
const renderRoutes = require('./renderRoutes');
const apiRoutes = require('./api');

router.use('/', renderRoutes);
router.use('/api', apiRoutes);

module.exports = router;