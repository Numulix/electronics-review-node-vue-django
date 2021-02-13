const jwt = require('jsonwebtoken');
const db = require('../lib/db.js');

module.exports = {
    validateRegister: (req, res, next) => {
        // Username 4 chars minimum
        if (!req.body.username || req.body.username.length < 4) {
            return res.status(400).send({
                message: 'Please enter a username with min. 4 characters!'
            });
        }

        // Password min 6 characters
        if (!req.body.password || req.body.password.length < 6) {
            return res.status(400).send({
                message: 'Please enter a password with min. 6 characters!'
            });
        }

        // Password confirmation does not match
        if (
            !req.body.password_repeat ||
            req.body.password != req.body.password_repeat
        ) {
            return res.status(400).send({
                message: 'Both passwords must match'
            });
        }

        next();
    },

    isLoggedIn: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(
                token,
                'SECRETKEY'
            );
            req.userData = decoded;
            next();
        } catch (err) {
            return res.status(401).send({
                message: 'Your session is not valid'
            });
        }
    },

    isAdmin: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                res.status(403).send({
                    message: "Unauthorized"
                })
            }
            const user_id = jwt.verify(
                token,
                'SECRETKEY'
            ).userId;
            db.query(
                `SELECT admin FROM users WHERE id = ${user_id}`,
                (err, result) => {
                    if (err) {
                        res.status(500).send({
                            message: err
                        });
                    }

                    if (result.length > 0 && result[0].admin == 1) {
                        return next();
                    }
                    
                    res.status(403).send('Unauthorized');
                }
            )
        } catch (err) {
            return res.status(401).send({
                message: 'Your session is not valid'
            });
        }
    }
};