const express = require('express');
const router = express.Router();

const copyleaksContro = require('../controllers/copyleaks');

// Form will hit this endpoint & submit the Text which is to be scanned.
router.post("/scannow", copyleaksContro.scanNowHandler);

module.exports = router;