const express = require('express');
const router = express.Router();

const premiumController = require('../controllers/premium');

router.get('/show-leaders', premiumController.getShowLeaders);


module.exports = router;