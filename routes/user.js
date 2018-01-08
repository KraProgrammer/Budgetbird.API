const express = require('express');
const router = express.Router();

const verifyToken = require('../modules/verifyToken');
const userController = require('../controllers/user');

/* endpoints */
router.post('/signup', userController.userSignup);
router.post('/login', userController.userLogin);

router.get('/:userId', verifyToken, userController.userGetDetails);
router.get('/search/:email', verifyToken, userController.userSearchEmail);

router.patch('/:userId', verifyToken, userController.patchUser);
router.delete('/:userId', verifyToken, userController.deleteUser);


module.exports = router;