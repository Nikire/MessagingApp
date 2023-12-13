const { Router } = require('express');

// Import routes
const messagesRouter = require('./messages.routes.js');
const authRouter = require('./auth.routes.js');

// Middlewares
const { authenticateToken } = require('../helpers/express.js');

// Routes setup
const router = Router();

router.use('/auth', authRouter);
router.use('/messages', authenticateToken, messagesRouter);

module.exports = router;
