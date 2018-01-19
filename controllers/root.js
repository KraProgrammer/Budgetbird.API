const db = require('../db');

/**
 * @title Get Categories Route
 *
 * @desc Used to retrieve all categories
 *
 * @method GET
 *
 * @url /category
 * @data (Header) Bearer token
 *
 * @success-code 200
 * @success-content
 * {
 *   "count": 1,
 *        "categories": [
 *            {
 *                "categoryid": number,
 *                "name": string
 *            },
 *            ...
 *         ]
 * }
 *
 * @error-code 500
 * @error-content
 * {
 *   message: 'Error Message'
 * }
 */

exports.categoryGetAll = (req, res, next) => {
    const statement = 'SELECT categoryid, categoryname FROM public.category;';
    const values = [];

    db.any(statement, values)
        .then(dataArray => {
            const response = {
                count: dataArray.length, 
                categories: dataArray.map(dataItem => {
                    return {
                        categoryid: dataItem.categoryid,
                        name: dataItem.categoryname
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
}