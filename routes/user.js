const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



/**
 * @title signup Route
 *
 * @desc Used to signup new users
 *
 * @method POST
 *
 * @url /user/signup
 * @data email
 * @data password
 *
 * @success-code 201
 * @success-content
 * {
 *    token,
 *    message: 'User created'
 * }
 *
 * @error-code 409
 * @error-content
 * {
 *   message: 'Mail exists'
 * }
 */
router.post('/signup', (req, res, next) => {
    res.status(200);
    res.json({
        message: 'Success Endpoint test'
    })
});

/**
 * @title login Route
 *
 * @desc Used to login users
 *
 * @method POST
 *
 * @url /user/login
 * @data email
 * @data password
 *
 * @success-code 201
 * @success-content
 * {
 *    token,
 *    message: 'Auth successful'
 * }
 *
 * @error-code 401
 * @error-content
 * {
 *   message: 'Auth failed'
 * }
 */
router.post('/login', (req, res, next) => {
    res.status(200);
    res.json({
        message: 'Success Endpoint test'
    })
});

router.get('/:userId', (req, res, next) => {
    res.status(200);
    res.json({
        message: 'Success Endpoint test'
    })
});
router.patch('/:userId', (req, res, next) => {
    res.status(200);
    res.json({
        message: 'Success Endpoint test'
    })
});
router.delete('/:userId', (req, res, next) => {
    res.status(200);
    res.json({
        message: 'Success Endpoint test'
    })
});









// notice here I'm requiring my database adapter file
// and not requiring node-postgres directly
const db = require('../db')

// app.get('/:id', (req, res, next) => {
//   db.query('SELECT * FROM users WHERE id = $1', [id], (err, res) => {
//     if (err) {
//       return next(err)
//     }
//     res.send(res.rows[0])
//   })
// })

// ... many other routes in this file



module.exports = router;