const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../db')


/**
 * @title Signup Route
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
 * @title Login Route
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















module.exports = router;