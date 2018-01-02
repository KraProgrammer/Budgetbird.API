const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const promise = require('bluebird');

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
 * @data username
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
 * 
 * @error-code 422
 * @error-content
 * {
 *   message: 'Missing argument'
 * }
 * 
 * @error-code 500
 * @error-content
 * {
 *   message: 'Error Message'
 * }
 * 
 */
router.post('/signup', (req, res, next) => {
    // i am not sure if this is good design
    if (!(req.body.email && req.body.password && req.body.username)) {
        return res.status(422).json({
            message: 'Missing argument'
        });
    }

    const statement = 'SELECT userid, email FROM public.ruser' + 
                       ' WHERE email = $1;';
    const values = [req.body.email];

    db.any(statement, values)
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Mail exitsts'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err.message
                    });
                } else {
                    const vUser = "INSERT INTO vUser (userName) VALUES ($1) RETURNING userId;";
                    const rUser = "INSERT INTO rUser (email, passwordHash, creationDate, userID) VALUES ($1, $2, now(), $3);"
                    var values = [req.body.email, hash];
                    db.one(vUser, [req.body.username])
                    .then(result => {
                        values.push(result.userid);

                        db.any(rUser, values)
                        .then(result => {
                            console.log(result);
                            res.status(201).json({
                                message: 'User created'
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err.message
                            });
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err.message
                        });
                    });
                }
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err.message
        });
    });
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
 * @success-code 200
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
   // i am not sure if this is good design
    if (!(req.body.email && req.body.password)) {
        return res.status(422).json({
            message: 'Missing argument'
        });
    }

    const statement = 'SELECT userid, email, passwordHash FROM public.ruser' + 
                       ' WHERE email = $1;';
    const values = [req.body.email];

    db.any(statement, values)
    .then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].passwordhash, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            if (result) {
                const token = jwt.sign(
                    {
                        email: user[0].email,
                        userId: user[0].userid
                    }, 
                    process.env.JWT_KEY, 
                    {
                        expiresIn: "1h"
                    }
                );
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                });
            }
            return res.status(401).json({
                message: 'Auth failed'
            });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err.message
        });
    });
});


/**
 * @title User Details Route
 *
 * @desc Used to retrieve users details
 *
 * @method GET
 *
 * @url /user/:userId
 *
 * @success-code 200
 * @success-content
 * {
 *     message: 'Successfully retrieved user details',
 *     user: resultObject   
 * }
 *
 * @error-code 500
 * @error-content
 * {
 *   message: err.message
 * }
 */
router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    const statement = 'SELECT userid, email, creationdate, username' + 
                       ' FROM public.alluser WHERE userid = $1;';
    const values = [id];

    db.one(statement, values)
    .then((result) => {res.status(200).json({
            message: 'Successfully retrieved user details',
            user: result        
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err.message
        });
    });

});

/**
 * @title PATCH user Details Route
 *
 * @desc Used to update all details to given user
 *
 * @method PATCH
 *
 * @url /user/:userId
 * @data email
 * @data username
 * 
 * 
 * @success-code 200
 * @success-content
 * {
 *     message: 'Successfully retrieved user details',
 *     user: resultObject   
 * }
 *
 * @error-code 500
 * @error-content
 * {
 *   message: err.message
 * }
 * 
 * 
 */
router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId;
    const email = req.body.email;
    const username = req.body.username;

    const values = [id, email, username];

    var returnObject = {length: 0};

    var setUsername = new Promise( (resolve, reject) => {
        if (username !== undefined) {
            const statement = 'UPDATE public.vuser SET username=$3 WHERE userid = $1 RETURNING username, userid;';

            db.one(statement, values)
            .then((result) => {
                returnObject.length += 1;
                returnObject.vmessage = 'Successfully updated username';
                returnObject.vuser = result;    
                return resolve(returnObject);
            })
        } else {
            return resolve();
        }
    });

    var setEmail = new Promise( (resolve, reject) => {
        if (email !== undefined) {
            const statement = 'UPDATE public.ruser SET email=$2 WHERE userid = $1 RETURNING email, userid;';

            db.one(statement, values)
            .then((result) => {
                returnObject.length += 1;
                returnObject.rmessage = 'Successfully updated email';
                returnObject.ruser = result;    
                return resolve(returnObject);
            })

        } else {
            return resolve();
        }
    });


    Promise.all([setEmail, setUsername])
    .then(() => {
        if (returnObject.length != 0) {
            res.status(200).json(returnObject);
        } else {
            res.status(200).json({
                message: 'Nothing to update'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err.message
        });
    });
});


/**
 * @title Delete User Details Route
 *
 * @desc Used to delete a given User
 *
 * @method DELETE
 *
 * @url /user/:userId
 *
 * @success-code 200
 * @success-content
 * {
 *     "message": "Successfully removed journey",
 *     "rowCount": 1
 * }
 *
 * @error-code 500
 * @error-content
 * {
 *   message: 'Error Message'
 * }
 * 
 */
router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    const statement = 'DELETE FROM public.ruser WHERE userId = $1;';
    const statement2 = 'DELETE FROM public.vuser WHERE userId = $1;';
    const values = [id];

    db.result(statement, values)
    .then((result) => {
        db.result(statement2,values)
        .then(result => {
            res.status(200).json({
                message: 'Successfully removed user',
                rowCount: result.rowCount        
            })
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err.message
        });
    });
});


module.exports = router;