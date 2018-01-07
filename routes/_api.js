const express = require('express'),
      router = express.Router(),
      settings = require('../app_settings');

router.use('/users', require('./api/users'));
router.use('/courses', require('./api/courses'));
// router.use(require('/pools/', './api/pools'));

module.exports = router;
