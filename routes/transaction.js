const express = require('express');
const router = express.Router();

const verifyToken = require('../modules/verifyToken');
const helper = require('../modules/helper');
const transactionController = require('../controllers/transaction');

/* endpoints */
router.get('/', verifyToken, transactionController.transactionGetAll);
router.post('/', verifyToken, transactionController.transactionCreate);

router.get('/:transactionId', verifyToken, transactionController.transactionGetDetail);
router.patch('/:transactionId', verifyToken, transactionController.transactionPatch);
router.delete('/:transactionId', verifyToken, transactionController.transactionDelete);

module.exports = router;