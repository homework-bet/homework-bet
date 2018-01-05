const express = require('express'),
      router = express.Router(),
      settings = require('../app_settings');

router.get('/', function (req, res) {
    res.render('pools/index', {
        pageTitle: 'Pools',
    });
});

module.exports = router;