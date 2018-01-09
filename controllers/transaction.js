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
 *   "count": 5,
 *        "transactions": [
 *            {
 * 
 *            }
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

exports.transactionCreate = (req, res, next) => {
    "INSERT INTO public.transaction("
        'journeyid, "timestamp", description, currencyid, categoryid)'
        "VALUES (5, now(), 'desc1', 1, 1);"

        "INSERT INTO public.userintransaction("
            "journeyid, transactionid, userid, amount)"
            "VALUES (5, 1, 1, 10);"

    res.status(200);
    res.json({
        message: 'Success Endpoint test'
    })
}

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