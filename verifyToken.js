var jwt = require('jsonwebtoken');


function verifyToken(req, res, next) {

    var token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).json({ auth: false, message: 'No token provided.' });
    }

    jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
        if (err) {
            return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        }
        // if everything good, save to request for use in other routes
        req.userId = decoded.userId;
        next();
    });
}
module.exports = verifyToken;



// const jwt = require('jsonwebtoken');

// function verifyToken(userid, headers) {
//     const token = headers['x-access-token'];
//     var resultObject = {auth: false};
//     if (token) {
//         jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {   
//             if (!err) {
//                 if (decoded.userId == userid) {
//                     resultObject.auth = true;
//                 } else {
//                     resultObject.auth = false;
//                     resultObject.message = 'Invalid token provided.'
//                 }
//             } else {
//                 resultObject.auth = false;
//                 resultObject.message = 'Failed to authenticate token.'
//             }
//         });
//     } else {
//         resultObject.auth = false;
//         resultObject.message = 'No token provided.'
//     }
//     return resultObject;
// }