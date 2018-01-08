const db = require('../db');

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
    
    const statement = "SELECT journeyId, transactionID, timestamp, currencyId, categoryId, description, array_agg('{' || userId || ',' || amount || '}')" +
                        'FROM public.transaction JOIN public.userInTransaction USING (journeyid, transactionid) WHERE journeyid IN (' + 
                            'SELECT journeyid FROM public.journey JOIN userinjourney USING(journeyid) WHERE journeyid = $1 AND userid=$2);';

    const values = [id, req.userData.userId];

    // db.any(statement, values)
    // .then((transactions) => {
    //     const statement = "SELECT userId, amount FROM public.userInTransaction WHERE journeyid = $1, transactionid = $2"
    //     var response = {
    //         count: transactions.length, 
    //         transactions: transactions.map(tranaction => {
    //             const values = [tranaction.journeyId, transaction.transactionID];
                
    //             return {
    //                 transactionID: transaction.transactionID, 
    //                 timestamp: transaction.timestamp, 
    //                 currencyId: transaction.currencyId, 
    //                 categoryId: transaction.categoryId, 
    //                 description: transaction.description,
    //                 data: {

    //                 }
    //             }
    //         })
    //     }
    // })
    // .catch(err => {
    //     console.log(err);
    //     res.status(500).json({
    //         error: err.message
    //     });
    // });
}

exports.transactionCreate = (req, res, next) => {
    res.status(200);
    res.json({
        message: 'Success Endpoint test'
    })
}

exports.transactionGetDetail = (req, res, next) => {
    res.status(200);
    res.json({
        message: 'Success Endpoint test'
    })
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