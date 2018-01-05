const express = require('express'),
      router = express.Router(),
      settings = require('../app_settings');

router.get('/', function (req, res) {
    res.render('payments/index', {
        pageTitle: 'Payments',
    });
});

module.exports = router;