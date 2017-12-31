const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {});
router.post('/', (req, res, next) => {});

router.get('/:transactionId', (req, res, next) => {});
router.patch('/:transactionId', (req, res, next) => {});
router.delete('/:transactionId', (req, res, next) => {});

module.exports = router;