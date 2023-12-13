const { Router } = require('express');
const router = Router();
const { register, login, getUserInfo } = require('../controllers/auth.js');
const { validateUser, authenticateToken } = require('../helpers/express.js');

router.get("/", authenticateToken, getUserInfo)
router.post('/register', validateUser, register);
router.post('/login', login);

module.exports = router;
