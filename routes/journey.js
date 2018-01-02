const express = require('express');
const router = express.Router();
const userRoutes = require('./transaction');
const db = require('../db');

const helper = require('../modules/helper');
const verifyToken = require('../modules/verifyToken');

router.use('/:journeyId/transaction', userRoutes);


/**
 * @title Get Journeys Route
 *
 * @desc Used to retrieve all journeys
 *
 * @method GET
 *
 * @url /journey
 * @data (Header) Bearer token
 *
 * @success-code 200
 * @success-content
 * {
 *   "count": 5,
 *        "journeys": [
 *            {
 *                "startdate": date,
 *                "enddate": date,
 *                "description": text,
 *                "destination": text,
 *                "currency": number,
 *                "request": {
 *                    "type": "GET",
 *                    "url": "http://localhost:3000/journey/2"
 *                }
 *            }
 * }
 *
 * @error-code 500
 * @error-content
 * {
 *   message: 'Error Message'
 * }
 */
router.get('/', verifyToken, (req, res, next) => {
    const statement = 'SELECT journeyid, journeyname, startdate, enddate, description, destination, defaultcurrencyid FROM public.journey JOIN userinjourney USING(journeyid) WHERE userid=$1;';
    const values = [req.userData.userId];

    db.any(statement, values)
        .then(dataArray => {
            const response = {
                count: dataArray.length, 
                journeys: dataArray.map(dataItem => {
                    return {
                        name: dataItem.journeyname,
                        startdate: dataItem.startdate,
                        enddate: dataItem.enddate,
                        description: dataItem.description,
                        destination: dataItem.destination,
                        currency: dataItem.defaultcurrencyid,
                        request: {
                            type: 'GET',
                            url: req.protocol + '://' + req.get('host') + req.originalUrl + '/' + dataItem.journeyid
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err.message
            });
        });
});

/**
 * @title New Journey Route
 *
 * @desc Used to create a new journey
 * 
 * @method POST
 *
 * @url /journey
 * @data name
 * @data start
 * @data end
 * @data description
 * @data destination
 * @data currency
 * @data (Header) Bearer token
 * 
 * @success-code 201
 * @success-content
 * {
 *   message: 'Successfully created journey',
 *   createdJourney: resultObject,
 *   request: {
 *       type: 'GET', 
 *       url: http://localhost:3000/journey/2
 * }   
 *
 * @error-code 500
 * @error-content
 * {
 *   message: 'Error Message'
 * }
 * 
 * @sample-call
 * POST /journey HTTP/1.1
 * Host: localhost:3000
 * Content-Type: application/json
 * Cache-Control: no-cache
 * Postman-Token: 5e8b8445-7615-aa65-ca72-21fc99f64b67
 * 
 * {
 * 	"name": "test2",
 * 	"start": "2018-01-02",
 * 	"end": "2018-01-07",
 * 	"description": "desc2",
 * 	"destination": "Wien",
 * 	"currency": 1
 * }
 * 
 */
router.post('/', verifyToken, (req, res, next) => {
    const statement = "INSERT INTO public.journey(journeyname, startdate, enddate, description, destination, defaultcurrencyid)" +
    " VALUES  ($1, to_date($2, 'YYYY-MM-DD') , to_date($3, 'YYYY-MM-DD'), $4, $5, $6)" +
    " RETURNING journeyid, journeyname, startdate, enddate,  description, destination, defaultcurrencyid;";
    const values = [req.body.name, req.body.start, req.body.end, req.body.description, req.body.destination, req.body.currency];
    
    // i am not sure if this is good design
    if (!(req.body.name && req.body.start && req.body.end && req.body.description && req.body.destination && req.body.currency)) {
        return res.status(422).json({
            message: 'Missing argument'
        });
    }

    db.one(statement, values)
    .then((result) => {
        const statement = "INSERT INTO public.userinjourney(userid, journeyid, isadmin) VALUES ($1, $2, $3);"
        const values = [req.userData.userId, result.journeyid, true]

        db.none(statement, values)
        .then(() => {
            res.status(201).json({
                message: 'Successfully created journey',
                createdJourney: result,
                request: {
                    type: 'GET', 
                    url: req.protocol + '://' + req.get('host') + req.originalUrl + '/' + result.journeyid
                }            
            })
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
});





/**
 * @title Get Journey Details Route
 *
 * @desc Used to retrieve all details to given journey
 *
 * @method GET
 *
 * @url /journey/:journeyId
 * @data (Header) Bearer token
 *
 * @success-code 200
 * @success-content
 * {
 *   message: 'Successfully retrieved journey details',
 *   journey: resultObject
 * }  
 *
 * @error-code 500
 * @error-content
 * {
 *   message: 'Error Message'
 * }
 */
router.get('/:journeyId', verifyToken, (req, res, next) => {
    const id = req.params.journeyId;
    const statement = 'SELECT journeyid, journeyname, startdate, enddate, description, destination, defaultcurrencyid' + 
                       ' FROM public.journey JOIN userinjourney USING(journeyid) WHERE journeyid = $1 AND userid=$2;';

    const values = [id, req.userData.userId];

    db.one(statement, values)
    .then((result) => {
        const statement = "SELECT userid, username, email FROM public.userinjourney JOIN public.alluser USING(userid) WHERE journeyid = $1;"
        const values = [result.journeyid]

        db.any(statement, values)
        .then((users) => {
            result.users = users;
            res.status(200).json({
                message: 'Successfully retrieved journey details',
                journey: result        
            })
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

});

/**
 * @title Add User to Journey
 *
 * @desc Used to add a user to a Journey
 *
 * @method POST
 *
 * @url /journey/:journeyId/user
 * @data (Header) Bearer token
 * @data userid
 *
 * @success-code 200
 * @success-content
 * {
 *   message: 'Successfully added user to journey',
 *   journey: resultObject
 * }  
 *
 * @error-code 500
 * @error-content
 * {
 *   message: 'Error Message'
 * }
 */
router.post('/:journeyId/user', verifyToken, (req, res, next) => {
    // check if journey exitst
    // check if journey rights
    // check if user exits
    // add user to journey

    res.status(200).json({
        message: 'Not implemented jet'     
    });

});

/**
 * @title Remove user from journey
 *
 * @desc Used to remove a user from a Journey
 *
 * @method DELETE
 *
 * @url /journey/:journeyId/user
 * @data (Header) Bearer token
 * @data userid
 *
 * @success-code 200
 * @success-content
 * {
 *   message: 'Successfully remove user from journey',
 *   journey: resultObject
 * }  
 *
 * @error-code 500
 * @error-content
 * {
 *   message: 'Error Message'
 * }
 */
router.DELETE('/:journeyId/user', verifyToken, (req, res, next) => {
    // check if journey exitst
    // check if journey rights
    // check if user exits
    // add user to journey
    res.status(200).json({
        message: 'Not implemented jet'     
    });

});


/**
 * @title PATCH Journey Details Route
 *
 * @desc Used to update all details to given journey
 *
 * @method PATCH
 *
 * @url /journey/:journeyId
 * @data (Header) Bearer token
 *
 * @success-code 200
 * @success-content
 * {
 *   message: 'Successfully updated journey details',
 *   journey: resultObject
 * }  
 *
 * @error-code 500
 * @error-content
 * {
 *   message: 'Error Message'
 * }
 * 
 * @sample-call
 * PATCH /journey/1 HTTP/1.1
 * Host: localhost:3000
 * Content-Type: application/json
 * Cache-Control: no-cache
 * Postman-Token: a1dbe3fe-9534-4bc4-8d27-2207640a841f
 * 
 * [
 * 	{"propName": "journeyname", "value": "change name"},
 * 	{"propName": "startdate", "value": "2019-01-02"},
 * 	{"propName": "enddate", "value": "2019-01-06"},
 * 	{"propName": "description", "value": "change desc"},
 * 	{"propName": "destination", "value": "chaange dest"},
 * 	{"propName": "defaultcurrencyid", "value": "1"}				
 * ]
 * 
 */
router.patch('/:journeyId', verifyToken, (req, res, next) => {
    const id = req.params.journeyId;
    var values = [id];
    var updateOpsStr = " ";
    var i = 2;
    for (const ops of req.body) {
        if (i != 2) {
            updateOpsStr += ", ";
        }
        updateOpsStr += " " + ops.propName + "=$" + i++;
        values.push(ops.value);
    }

    const statement = 'UPDATE public.journey SET' +
                        helper.escapeHtml(updateOpsStr) + 
                       ' WHERE journeyid = $1' +
                       " RETURNING journeyid, journeyname, startdate, enddate,  description, destination, defaultcurrencyid;";

    db.one(statement, values)
    .then((result) => {res.status(200).json({
            message: 'Successfully updated journey details',
            journey: result        
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
 * @title Delete Journey Details Route
 *
 * @desc Used to Delete a given Journey
 *
 * @method DELETE
 *
 * @url /journey/:journeyId
 * @data (Header) Bearer token
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
router.delete('/:journeyId', verifyToken, (req, res, next) => {
    const id = req.params.journeyId;
    const statement = 'DELETE FROM public.journey WHERE journeyID IN (SELECT journeyid FROM public.journey JOIN public.userInJOurney USING (journeyID) WHERE journeyID = $1 AND userid = $2);'; // on delete cascade
    const values = [id, req.userData.userId];

    db.result(statement, values)
    .then((result) => {res.status(200).json({
            message: 'Successfully removed journey',
            rowCount: result.rowCount        
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