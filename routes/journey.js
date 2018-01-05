const express = require('express');
const router = express.Router();
const userRoutes = require('./transaction');

const verifyToken = require('../modules/verifyToken');
const journeyController = require('../controllers/journey');

router.use('/:journeyId/transaction', userRoutes);


/* endpoints */
router.get('/', verifyToken, journeyController.journeyGetAll);
router.post('/', verifyToken, journeyController.journeyCreate);

router.get('/:journeyId', verifyToken, journeyController.journeyGetDetails);

router.post('/:journeyId/user', verifyToken, journeyController.journeyAddUser);
router.delete('/:journeyId/user', verifyToken, journeyController.journeyRemoveUser);

router.patch('/:journeyId', verifyToken, journeyController.journeyPatch);
router.delete('/:journeyId', verifyToken, journeyController.journeyDelete);

module.exports = router;