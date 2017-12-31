const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200);
    res.json({
        message: 'Success Endpoint test'
    })
});

router.post('/', (req, res, next) => {
    res.status(200);
    res.json({
        message: 'Success Endpoint test'
    })
});


router.get('/:transactionId', (req, res, next) => {
    res.status(200);
    res.json({
        message: 'Success Endpoint test'
    })
});

router.patch('/:transactionId', (req, res, next) => {
    res.status(200);
    res.json({
        message: 'Success Endpoint test'
    })
});

router.delete('/:transactionId', (req, res, next) => {
    res.status(200);
    res.json({
        message: 'Success Endpoint test'
    })
});

module.exports = router;