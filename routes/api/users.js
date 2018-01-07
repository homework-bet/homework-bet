const express = require('express');
const router = express.Router();
const settings = require('../../app_settings');
const UserModel = require('../../models/UserModel');
const authChecker = require('../../helpers/authChecker');

// TODO: consider security. do we really need to present all the information?
router.get('/', (req, res) => {
    const currentUser = req.session.user;

    if (!currentUser) {
        // no logged in user
        res.json({
            error: "No user logged in.",
        });
    } else  {
        UserModel.find({}, '-password')
        // find and present all users
        .then(users => {
            res.json({
                users: users,
            });
        }).catch(err => {
            // error finding users
            console.log(`User request error: ${err}`);
            res.json({
                error: err.errmsg,
            })
        });
    }
});

router.get('/current', (req, res) => {
    const currentUser = req.session.user;

    if (!currentUser) {
        // no logged in user
        res.json({
            error: "No user logged in.",
        });
    } else {
        // find the user and present the info
        UserModel.findById(currentUser._id, '-password').then(user => {
            res.json({
                user: user,
            });
        }).catch(err => {
            console.log(`User request error: ${err}`);
            res.json({
                error: errmsg,
            });
        });
    }
});

router.get('/:userId', (req, res) => {
    const currentUser = req.session.user;
    const requestUserId = req.params.userId;
    
    if (!currentUser) {
        // no logged in user
        res.json({
            error: "No user logged in.",
        });
    } else if(requestUserId === currentUser._id) {
        // find the user and present the info
        UserModel.findById(req.params.userId, '-password').then(user => {
            res.json({
                user: user,
            });
        }).catch(err => {
            console.log(`User request error: ${err}`);
            res.json({
                error: errmsg,
            });
        });
    } else {
        // userId does not match current logged in user.
        res.json({
            error: "Invalid request: attempt to access incorrect user.",
        })
    }
});

module.exports = router;