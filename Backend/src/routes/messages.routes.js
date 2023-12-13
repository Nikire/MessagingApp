const { Router } = require('express');
const router = Router();
const {
  getAllMessages,
  createMessage,
} = require('../controllers/messages');

router.get('/', getAllMessages);
router.post('/', createMessage);

module.exports = router;
