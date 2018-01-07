const express = require('express'),
      router = express.Router(),
      settings = require('../app_settings');

router.use('/users', require('./api/users'));
// router.use(require('./api/courses'));
// router.use(require('./api/pools'));

module.exports = router;
