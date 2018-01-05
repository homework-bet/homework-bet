const express = require('express'),
      router = express.Router(),
      settings = require('../app_settings');

router.get('/', function (req, res) {
    res.render('verifications/index', {
        pageTitle: 'Verifications',
    });
});

module.exports = router;