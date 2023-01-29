const express = require('express');
const router = express.Router();
const userAuth = require('../middleware/auth');
const purchaseController = require('../controllers/purchase');

router.get('/purchase-premium', userAuth.authenticate, purchaseController.getPurchasePremium);
router.post('/update-status', userAuth.authenticate, purchaseController.postUpdateStatus);

module.exports = router;