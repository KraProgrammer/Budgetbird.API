const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/signup', (req, res, next) => {});
router.post('/login', (req, res, next) => {});

router.get('/:userId', (req, res, next) => {});
router.patch('/:userId', (req, res, next) => {});
router.delete('/:userId', (req, res, next) => {});









// notice here I'm requiring my database adapter file
// and not requiring node-postgres directly
const db = require('../db')

app.get('/:id', (req, res, next) => {
  db.query('SELECT * FROM users WHERE id = $1', [id], (err, res) => {
    if (err) {
      return next(err)
    }
    res.send(res.rows[0])
  })
})

// ... many other routes in this file



module.exports = router;