const express = require('express');
const router = express.Router();

const copyleaksContro = require('../controllers/copyleaks');

// Hits when Webhook gets Completed!
router.post("/webhook/completed/:id",copyleaksContro.webhookCompleteHandler);

module.exports = router;