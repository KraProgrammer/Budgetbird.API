const express = require('express');
const router = express.Router();
const userRoutes = require('./transaction');

router.use('/transaction', userRoutes);


router.get('/', (req, res, next) => {});
router.post('/', (req, res, next) => {});

router.get('/:journeyId', (req, res, next) => {});
router.patch('/:journeyId', (req, res, next) => {});
router.delete('/:journeyId', (req, res, next) => {});

module.exports = router;