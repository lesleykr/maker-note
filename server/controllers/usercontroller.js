const router = require('express').Router();
const User = require('../db').import('../models/user');

router.post('/create', function (req, res) {
    User.create({
        email: req.body.user.email,
        password: req.body.user.password
    })
    .then(
        function createSuccess(user) {
            res.json({
                user: user
            });
        }
    )
    .catch(err => res.status(500).json({ error: err }))
});

router.post('/login', function (req, res) {
    User.findOne({
        where: {
            email: req.body.user.email
        }
    })
    .then(
        function loginSuccess(user){
            res.json({
                user: user
            });
        }
    )
    .catch(err => res.status(500).json({ error: err }))
});

module.exports = router;