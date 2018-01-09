const db = require('../db');


const journeySelectAdmin = "SELECT journeyid FROM public.journey JOIN public.userInJOurney USING (journeyID) WHERE journeyID = $1 AND userid = $2 AND isAdmin = true";
const journeySelect = "SELECT journeyid FROM public.journey JOIN public.userInJOurney USING (journeyID) WHERE journeyID = $1 AND userid = $2";


/**
 * @title Transaction Route
 *
 * @desc Used get all transaction of a journey
 *
 * @method GET
 *
 * @url /journey/:journeyId/transaction
 * @data (Header) Bearer token *
 * 
 * @success-code 200
 * @success-content
 * {
 *     "count": 1,
 *     "transactions": [
 *         {
 *             "transactionID": 1,
 *             "journeyId": 5,
 *             "timestamp": "2018-01-09T19:14:33.401Z",
 *             "currencyId": 1,
 *             "categoryId": 1,
 *             "description": "desc1",
 *             "data": [
 *                 {
 *                     "userid": 1,
 *                     "amount": 10
 *                 },
 *                 {
 *                     "userid": 2,
 *                     "amount": 20
 *                 }
 *             ],
 *             "tsum": 30
 *         }
 *     ],
 *     "sum": 30
 * }
 *
 * @error-code 500
 * @error-content
 * {
 *   message: 'Error Message'
 * }
 * 
 * 
 */
exports.transactionGetAll = (req, res, next) => {
   
    const statement = "SELECT transactionid, journeyid, timestamp, description, currencyid, categoryid, array_agg(" + '\'{"userid": \' || userId || \', "amount": \' || amount::money::numeric::float8 || \'}\''+ ") AS data " +
                        "FROM public.transaction " +
                        "JOIN public.userInTransaction USING (journeyid, transactionid) " +
                       "WHERE journeyid IN ( "+ journeySelect + " ) " +
                    "GROUP BY transactionid, journeyId; ";

    const values = [req.journeyData.id, req.userData.userId];

    db.any(statement, values)
    .then((dataArray) => {
        var sum = 0; // maybe slow check latter
        var tsum = 0;
        const response = {
            count: dataArray.length, 
            transactions: dataArray.map(transaction => {
                tsum = 0;
                // return transaction;
                var returnObj = {
                    transactionID: transaction.transactionid, 
                    journeyId: transaction.journeyid,
                    timestamp: transaction.timestamp, 
                    currencyId: transaction.currencyid, 
                    categoryId: transaction.categoryid, 
                    description: transaction.description,
                    data: transaction.data.map(entry => {
                        entryJSON = JSON.parse(entry);
                        tsum += entryJSON.amount;
                        return entryJSON;
                    }),
                    tsum: tsum
                }
                sum += tsum;
                return returnObj;
            }),
            sum: sum
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err.message
        });
    });

}


/**
 * @title New Transaction Route
 *
 * @desc Used to create a new transaction
 * 
 * @method POST
 *
 * @url /journey/:journeyId/transaction
 * @data description
 * @data currencyid
 * @data categoryid
 * @data partition = [{"userid": number, "amount": number}]
 * @data (Header) Bearer token
 * 
 * @success-code 201
 * @success-content
 * {
 *   message: 'Successfully created transaction',
 *   createdTransaction: resultObject,
 *   request: {
 *       type: 'GET', 
 *       url: http://localhost:3000//journey/:journeyId/transaction
 * }   
 *
 * @error-code 500
 * @error-content
 * {
 *   message: 'Error Message'
 * }
 * 
 * 
 */

exports.transactionCreate = (req, res, next) => {
    const statement = "INSERT INTO public.transaction(" +
    'journeyid, "timestamp", description, currencyid, categoryid)' +
    "VALUES ($1, now(), $3, $4, $5);" +
    " RETURNING transactionid, journeyid, timestamp, description, currencyid, categoryid;";

    const values = [req.journeyData.id, req.userData.userId, req.body.description, req.body.currencyid, req.body.categoryid];
    const partition = req.body.partition;



    // i am not sure if this is good design
    if (!(req.body.description && req.body.currencyid && req.body.categoryid)) {
        return res.status(422).json({
            message: 'Missing argument'
        });
    }

    db.one(statement, values)
    .then((result) => {
        const statement = "INSERT INTO public.userintransaction(" +
                                "journeyid, transactionid, userid, amount)" +
                                "VALUES ($1, $2, $3, $4);"

        var valuesForInsert = []; /////////////////////////// create multiple insert 
        // foreach (entry in partition) { ////// foreach wrong?
        //     valuesForInsert.push([req.journeyData.id, result.transactionid, entry.userid, entry.amout]);
        // }

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
}


/**
 * @title Transaction Detail Route 
 *
 * @desc Used get all details to a transaction of a journey
 *
 * @method GET
 *
 * @url /journey/:journeyId/transaction/:transactionid
 * @data (Header) Bearer token *
 * 
 * @success-code 200
 * @success-content
 * {
 *    "transactionID": 1,
 *    "journeyId": 5,
 *    "timestamp": "2018-01-09T19:14:33.401Z",
 *    "currencyId": 1,
 *    "categoryId": 1,
 *    "description": "desc1",
 *    "data": [
 *        {
 *            "userid": 1,
 *            "amount": 10
 *        },
 *        {
 *            "userid": 2,
 *            "amount": 20
 *        }
 *    ],
 *    "tsum": 30
 * }
 *
 *
 * @error-code 500
 * @error-content
 * {
 *   message: 'Error Message'
 * }
 * 
 */

exports.transactionGetDetail = (req, res, next) => {
    const transactionId = req.params.transactionId;
    const statement = "SELECT transactionid, journeyid, timestamp, description, currencyid, categoryid, array_agg(" + '\'{"userid": \' || userId || \', "amount": \' || amount::money::numeric::float8 || \'}\''+ ") AS data " +
                        "FROM public.transaction " +
                        "JOIN public.userInTransaction USING (journeyid, transactionid) " +
                       "WHERE journeyid IN ( "+ journeySelect + " ) AND transactionid = $3" +
                    "GROUP BY transactionid, journeyId; ";

    const values = [req.journeyData.id, req.userData.userId, transactionId];

    db.one(statement, values)
    .then((transaction) => {
        
        var tsum = 0;
        var returnObj = {
            transactionID: transaction.transactionid, 
            journeyId: transaction.journeyid,
            timestamp: transaction.timestamp, 
            currencyId: transaction.currencyid, 
            categoryId: transaction.categoryid, 
            description: transaction.description,
            data: transaction.data.map(entry => {
                entryJSON = JSON.parse(entry);
                tsum += entryJSON.amount;
                return entryJSON;
            }),
            tsum: tsum
        }
        res.status(200).json(returnObj);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err.message
        });
    });
}

exports.transactionPatch = (req, res, next) => {
    res.status(200);
    res.json({
        message: 'Success Endpoint test'
    })
}

exports.transactionDelete = (req, res, next) => {
    res.status(200);
    res.json({
        message: 'Success Endpoint test'
    })
}