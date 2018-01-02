const express = require('express');
const router = express.Router();
const userRoutes = require('./transaction');
const db = require('../db');

router.use('/:journeyId/transaction', userRoutes);
function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

/**
 * @title Get Journeys Route
 *
 * @desc Used to retrieve all journeys
 *
 * @method GET
 *
 * @url /journey
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
router.get('/', (req, res, next) => {
    const statement = 'SELECT journeyid, journeyname, startdate, enddate, description, destination, defaultcurrencyid FROM public.journey;';
    const values = [];

    db.any(statement, values)
        .then(dataArray => {
            const response = {
                count: dataArray.length, 
                journeys: dataArray.map(dataItem => {
                    return {
                        name: dataItem.name,
                        startdate: dataItem.startdate,
                        enddate: dataItem.enddate,
                        description: dataItem.description,
                        destination: dataItem.destination,
                        currency: dataItem.defaultcurrencyid,
                        request: {
                            type: 'GET',
                            url: 'http://.../journey/' + dataItem.journeyid,
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
router.post('/', (req, res, next) => {
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
    .then((result) => {res.status(201).json({
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
});

/**
 * @title Get Journey Details Route
 *
 * @desc Used to retrieve all details to given journey
 *
 * @method GET
 *
 * @url /journey/:journeyId
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
router.get('/:journeyId', (req, res, next) => {
    const id = req.params.journeyId;
    const statement = 'SELECT journeyid, journeyname, startdate, enddate, description, destination, defaultcurrencyid' + 
                       ' FROM public.journey WHERE journeyid = $1;';
    const values = [id];

    db.one(statement, values)
    .then((result) => {res.status(200).json({
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

});

/**
 * @title PATCH Journey Details Route
 *
 * @desc Used to update all details to given journey
 *
 * @method PATCH
 *
 * @url /journey/:journeyId
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
router.patch('/:journeyId', (req, res, next) => {
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
                        escapeHtml(updateOpsStr) + 
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
router.delete('/:journeyId', (req, res, next) => {
    const id = req.params.journeyId;
    const statement = 'DELETE FROM public.journey WHERE journeyid = $1;';
    const values = [id];

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