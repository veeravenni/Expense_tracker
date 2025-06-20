const express = require('express');
const { addIncome, 
    getAllIncome,
    deleteIncome,
  downloadIncomeExcel
} = require('../controllers/incomeController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
// Route to add income
router.post('/add', protect, addIncome);
// Route to get all income records
router.get('/get', protect, getAllIncome);
// Route to download income records as an Excel file
router.get('/downloadIncomeExcel', protect, downloadIncomeExcel);
// Route to delete an income record
router.delete('/:id', protect, deleteIncome);

module.exports = router;