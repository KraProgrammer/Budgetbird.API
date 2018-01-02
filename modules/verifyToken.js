var jwt = require('jsonwebtoken');


function verifyToken(req, res, next) {
    try {
        // using Bearer header
        const token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}

module.exports = verifyToken;

