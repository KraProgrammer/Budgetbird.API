const express = require('express');
const router = express.Router();

const verifyToken = require('../modules/verifyToken');
const rootController = require('../controllers/root');



/* endpoints */
router.get('/category', verifyToken, rootController.categoryGetAll);
module.exports = router;