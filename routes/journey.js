const express = require('express');
const router = express.Router();
const userRoutes = require('./transaction');

router.use('/:journeyId/transaction', userRoutes);


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

router.get('/:journeyId', (req, res, next) => {
    res.status(200);
    res.json({
        message: 'Success Endpoint test'
    })
});
router.patch('/:journeyId', (req, res, next) => {
    res.status(200);
    res.json({
        message: 'Success Endpoint test'
    })
});
router.delete('/:journeyId', (req, res, next) => {
    res.status(200);
    res.json({
        message: 'Success Endpoint test'
    })
});

module.exports = router;