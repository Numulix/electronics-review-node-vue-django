const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../lib/db.js");
const userMiddleware = require("../middleware/users.js");
const { reset } = require("nodemon");

router.post("/sign-up", userMiddleware.validateRegister, (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(
      req.body.username
    )});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          message: "This username is already in use",
        });
      } else {
        // Username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              message: err,
            });
          } else {
            // Hashed password, now inserting it into the db
            db.query(
              `INSERT INTO users (username, password, registered) VALUES (${db.escape(
                req.body.username
              )}, ${db.escape(hash)}, now())`,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    message: err,
                  });
                }
                return res.status(201).send({
                  message: "Registered successfully",
                });
              }
            );
          }
        });
      }
    }
  );
});

router.post("/login", (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
    (err, result) => {
      // User does not exist
      if (err) {
        return res.status(400).send({
          message: err,
        });
      }

      if (!result.length) {
        return res.status(401).send({
          message: "Username or password is incorrect!",
        });
      }

      // Check password
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          // Wrong password
          if (bErr) {
            return res.status(401).send({
              message: "Username or password is incorrect!",
            });
          }

          if (bResult) {
            const token = jwt.sign(
              {
                username: result[0].username,
                userId: result[0].id,
              },
              "SECRETKEY",
              {
                expiresIn: "7d",
              }
            );

            db.query(
              `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
            );

            return res.status(200).send({
              message: "Logged in!",
              token,
              user: result[0],
            });
          }
          return res.status(401).send({
            message: "Username or password is incorrect",
          });
        }
      );
    }
  );
});

router.get("/test-auth-route", userMiddleware.isLoggedIn, (req, res, next) => {
    console.log(req.userData);
    res.send('This is a test auth route');
});

router.get("/test-admin-route", userMiddleware.isAdmin, (req, res, next) => {
    res.send({
      message: "You're an admin!"
    })
});

module.exports = router;
