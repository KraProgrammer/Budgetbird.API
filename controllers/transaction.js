const db = require('../db');

/**
 * @title Transaction Route
 *
 * @desc Used get all transaction of journey
 *
 * @method GET
 *
 * @url /user/signup
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
    res.status(200);
    res.json({
        message: 'Success Endpoint test'
    })
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