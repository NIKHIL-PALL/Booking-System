
const express = require('express');
const UserController  = require('../controller/UserController');
const authenticateToken = require('../services/authentication.js');
const allowOnlyAdmin = require('../services/allowOnlyAdmin.js');
const router = express.Router();

router.get('/', authenticateToken, allowOnlyAdmin, UserController.getAllUsers);
router.get('/:uid', authenticateToken, allowOnlyAdmin, UserController.getUserById);
router.post('/login', UserController.login);
router.post('/signup', UserController.signup);




module.exports = router;