const User = require('../models/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.login_get = function (req, res) {
    console.log('Im here');
    res.render('login_form');
};

exports.login_post = function (req, res, next) {
    const { username, password } = req.body;
    User.findOne({ username: username }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: err, user: user, message: "Incorrect username" });
        }
        if (user.username === process.env.ADMIN_EMAIL) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const secret = process.env.SECRET_KEY;
                    const token = jwt.sign({ username }, secret);
                    return res
                        .status(200)
                        .json({ token, message: 'Auth passed' })
                        .redirect('/admin');
                } else {
                    return res.status(401).json({ message: 'Incorrect password' });
                }
            });
        } else {
            return res.status(403).json({ message: "You're not an admin." });
        }
    });
};
