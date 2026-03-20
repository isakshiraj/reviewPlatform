const express = require('express');
const router = express.Router();
const {
  createBusiness,
  getAllBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
  getCategories,
} = require('../controllers/businessController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getAllBusinesses)
  .post(protect, admin, createBusiness);

router.get('/categories', protect, getCategories);

router.route('/:id')
  .get(protect, getBusinessById)
  .put(protect, admin, updateBusiness)
  .delete(protect, admin, deleteBusiness);

module.exports = router;
