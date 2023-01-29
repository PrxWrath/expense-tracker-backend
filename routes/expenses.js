const express = require('express');
const router = express.Router();
const userAuth = require('../middleware/auth');
const expenseController = require('../controllers/expenses');

router.get('/', userAuth.authenticate, expenseController.getExpenses);
router.get('/paginated/:page/:limit', userAuth.authenticate, expenseController.getPaginatedExpenses);
router.post('/add-expense', userAuth.authenticate, expenseController.postAddExpense);
router.post('/delete-expense',  expenseController.postDeleteExpense);
router.post('/edit-expense',  expenseController.postEditExpense);
router.get('/download', userAuth.authenticate, expenseController.getDownloadExpenses)
router.get('/previous-downloads', userAuth.authenticate, expenseController.getFileUrls)

module.exports = router;