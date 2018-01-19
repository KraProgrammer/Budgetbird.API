const express = require('express');
const router = express.Router();
const transactionRoute = require('./transaction');

const verifyToken = require('../modules/verifyToken');
const helper = require('../modules/helper');
const journeyController = require('../controllers/journey');

router.use('/:journeyId/transaction', helper.saveJourney, transactionRoute);

 
/* endpoints */
router.get('/', verifyToken, journeyController.journeyGetAll);
router.post('/', verifyToken, journeyController.journeyCreate);

router.get('/:journeyId', verifyToken, journeyController.journeyGetDetails);

router.post('/:journeyId/user', verifyToken, journeyController.journeyAddUser);
router.delete('/:journeyId/user', verifyToken, journeyController.journeyRemoveUser);

router.patch('/:journeyId', verifyToken, journeyController.journeyPatch);
router.delete('/:journeyId', verifyToken, journeyController.journeyDelete);

module.exports = router;
