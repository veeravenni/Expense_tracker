const express =require('express');
const { addExpense, 
    getAllExpenses,
    deleteExpense,
    downloadExpenseExcel
} = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', protect, addExpense); // Route to add expense
router.get('/get', protect, getAllExpenses); // Route to get all expense records
router.get('/downloadexcel', protect, downloadExpenseExcel); // Route to download expense records as an Excel file      
router.delete('/:id', protect, deleteExpense); // Route to delete an expense record
module.exports = router; // Export the router to be used in the main app