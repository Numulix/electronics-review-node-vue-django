const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mysql = require("mysql");

const db = require("../lib/db.js");
const userMiddleware = require("../middleware/users.js");
const { reset } = require("nodemon");
const { response } = require("express");

// Model schemas for Joi validation

const categorySchema = Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
});

const productSchema = Joi.object().keys({
  product_name: Joi.string().min(5).max(50).required(),
  category_id: Joi.number().integer().required(),
  product_description: Joi.string().min(5).max(1024),
  price: Joi.number().integer().min(1).required(),
});

const productReviewSchema = Joi.object().keys({
  user_id: Joi.number().integer().required(),
  product_id: Joi.number().integer().required(),
  review_text: Joi.string().min(5).max(1024).required(),
});

// USER REGISTRATION AND LOGIN HANDLING

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
  res.send("This is a test auth route");
});

router.get("/test-admin-route", userMiddleware.isAdmin, (req, res, next) => {
  res.send({
    message: "You're an admin!",
  });
});

// MODEL HANDLING

router.get("/products", (req, res) => {
  db.query("SELECT * FROM product", (err, result) => {
    if (err) res.status(500).send(err.sqlMessage);
    else res.send(result);
  });
});

router.get("/products/:id", (req, res) => {
  db.query(`SELECT * FROM product WHERE id=${req.params.id}`, (err, result) => {
    if (err) res.status(500).send(err.sqlMessage);
    else res.send(result);
  });
});

router.get("/categories", (req, res) => {
  db.query("SELECT * FROM category", (err, result) => {
    if (err) res.status(500).send(err.sqlMessage);
    else res.send(result);
  });
});

router.get("/categories/:id", (req, res) => {
  db.query(
    `SELECT * FROM product WHERE category_id=${req.body.id}`,
    (err, result) => {
      if (err) res.status(500).send(err.sqlMessage);
      else res.send(result);
    }
  );
});

router.get("/reviews", (req, res) => {
  db.query("SELECT * FROM product_review", (err, result) => {
    if (err) res.status(500).send(err.sqlMessage);
    else res.send(result);
  });
});

router.get("/reviews/:id", (req, res) => {
  db.query(
    `SELECT * FROM product_review WHERE product_id=${req.params.id}`,
    (err, result) => {
      if (err) res.status(500).send(err.sqlMessage);
      else res.send(result);
    }
  );
});

router.get("/reviews/user/:id", (req, res) => {
  db.query(
    `SELECT * FROM product_review WHERE user_id=${req.params.id}`,
    (err, result) => {
      if (err) res.status(500).send(err.sqlMessage);
      else res.send(result);
    }
  );
});

router.post("/categories", userMiddleware.isAdmin, (req, res) => {
  let { error } = categorySchema.validate(req.body);

  if (error) res.status(400).send(error.details[0].message);
  else {
    let query = "INSERT INTO category (name) VALUES (?)";
    let formatted = mysql.format(query, [req.body.name]);

    db.query(formatted, (err, response) => {
      if (err) res.status(500).send(err.sqlMessage);
      else {
        db.query(
          `SELECT * FROM category WHERE id=${response.insertId}`,
          (err, result) => {
            if (err) res.status(500).send(err.sqlMessage);
            else {
              res.send(result[0]);
            }
          }
        );
      }
    });
  }
});

router.post("/products", userMiddleware.isAdmin, (req, res) => {
  let { error } = productSchema.validate(req.body);

  if (error) res.status(400).send(error.details[0].message);
  else {
    let query =
      "INSERT INTO product (product_name, category_id, product_description, price) VALUES (?, ?, ?, ?)";
    let formatted = mysql.format(query, [
      req.body.product_name,
      req.body.category_id,
      req.body.product_description,
      req.body.price,
    ]);

    db.query(formatted, (err, response) => {
      if (err) res.status(500).send(err.sqlMessage);
      else {
        db.query(
          `SELECT * FROM product WHERE id=${response.insertId}`,
          (err, result) => {
            if (err) res.status(500).send(err.sqlMessage);
            else {
              res.send(result[0]);
            }
          }
        );
      }
    });
  }
});

router.post("/reviews", userMiddleware.isLoggedIn, (req, res) => {
  let { error } = productReviewSchema.validate(req.body);

  if (error) res.status(400).send(error.details[0].message);
  else {
    let query =
      "INSERT INTO product_review (user_id, product_id, review_text, posted_date, last_updated) VALUES (?, ?, ?, now(), now())";

    let formatted = mysql.format(query, [
      req.body.user_id,
      req.body.product_id,
      req.body.review_text,
    ]);

    db.query(formatted, (err, response) => {
      if (err) res.status(500).send(err.sqlMessage);
      else {
        db.query(
          `SELECT * FROM product_review WHERE id=${response.insertId}`,
          (err, result) => {
            if (err) res.status(500).send(err.sqlMessage);
            else res.send(result[0]);
          }
        );
      }
    });
  }
});

router.delete("/categories/:id", userMiddleware.isAdmin, (req, res) => {
  db.query(
    `SELECT * FROM category WHERE id=${req.params.id}`,
    (err, response) => {
      if (err) res.status(500).send(err.sqlMessage);
      else {
        let row = response[0];
        db.query(
          `DELETE FROM category WHERE id=${req.params.id}`,
          (err, result) => {
            if (err) res.status(500).send(err.sqlMessage);
            else res.send(row);
          }
        );
      }
    }
  );
});

router.delete("/products/:id", userMiddleware.isAdmin, (req, res) => {
  db.query(
    `SELECT * FROM product WHERE id=${req.params.id}`,
    (err, response) => {
      if (err) res.status(500).send(err.sqlMessage);
      else {
        let row = response[0];
        db.query(
          `DELETE FROM product WHERE id=${req.params.id}`,
          (err, result) => {
            if (err) res.status(500).send(err.sqlMessage);
            else res.send(row);
          }
        );
      }
    }
  );
});

router.delete("/reviews/:id", userMiddleware.isLoggedIn, (req, res) => {
  db.query(
    `SELECT * FROM product_review WHERE id=${req.params.id}`,
    (err, response) => {
      if (err) res.status(500).send(err.sqlMessage);
      else {
        let userId = jwt.verify(
          req.headers.authorization.split(" ")[1],
          "SECRETKEY"
        ).userId;
        db.query(`SELECT * FROM users WHERE id=${userId}`, (err, result) => {
          if (err) res.status(500).send(err.sqlMessage);
          else {
            if (result[0].admin == 1 || userId == response[0].user_id) {
              db.query(
                `DELETE FROM product_review WHERE id=${req.params.id}`,
                (err, message) => {
                  if (err) res.status(500).send(err.sqlMessage);
                  else res.send(response[0]);
                }
              );
            } else
              res.status(403).send({
                message: "Unauthorized",
              });
          }
        });
      }
    }
  );
});

router.put("/categories/:id", userMiddleware.isAdmin, (req, res) => {
  let { error } = categorySchema.validate(req.body);

  if (error) res.status(400).send(error.details[0].message);
  else {
    let query = "UPDATE category SET name=? WHERE id=?";
    let formatted = mysql.format(query, [req.body.name, req.params.id]);

    db.query(formatted, (err, result) => {
      if (err) res.status(500).send(err.sqlMessage);
      else {
        db.query(
          `SELECT * FROM category WHERE id=${req.params.id}`,
          (err, response) => {
            if (err) res.status(500).send(err.sqlMessage);
            else res.send(response[0]);
          }
        );
      }
    });
  }
});

router.put("/products/:id", userMiddleware.isAdmin, (req, res) => {
  let { error } = productSchema.validate(req.body);

  if (error) res.status(400).send(error.details[0].message);
  else {
    let query =
      "UPDATE product SET product_name=?, category_id=?, product_description=?, price=? WHERE id=?";
    let formatted = mysql.format(query, [req.body.name, req.params.id]);

    db.query(formatted, (err, result) => {
      if (err) res.status(500).send(err.sqlMessage);
      else {
        db.query(
          `SELECT * FROM product WHERE id=${req.params.id}`,
          (err, response) => {
            if (err) res.status(500).send(err.sqlMessage);
            else res.send(response[0]);
          }
        );
      }
    });
  }
});

router.put("/reviews/:id", userMiddleware.isLoggedIn, (req, res) => {
  let userId = jwt.verify(req.headers.authorization.split(" ")[1], "SECRETKEY")
    .userId;
  db.query(`SELECT * FROM users WHERE id=${userId}`, (err, odg) => {
    if (err) res.status(500).send(err.sqlMessage);
    else {
      db.query(
        `SELECT * FROM product_review WHERE id=${req.params.id}`,
        (err, response) => {
          if (err) res.status(500).send(err.sqlMessage);
          else {
            if (odg[0].admin == 1 || response[0].user_id == userId) {
              db.query(
                `UPDATE product_review SET review_text='${req.body.review_text}', last_updated=now() WHERE id=${req.params.id}`,
                (err, odgovor) => {
                  if (err) res.status(500).send(err.sqlMessage);
                  else {
                    db.query(
                      `SELECT * FROM product_review WHERE id=${req.params.id}`,
                      (err, poruka) => {
                        if (err) res.status(500).send(err.sqlMessage);
                        else res.send(poruka);
                      }
                    );
                  }
                }
              );
            } else
              res.status(403).send({
                message: "Unauthorized",
              });
          }
        }
      );
    }
  });
});

module.exports = router;
