const express = require('express');
const router = express.Router();
const {
  createReview,
  getAllReviews,
  getReviewById,
  getBusinessReviews,
  getUserReviews,
  updateReview,
  approveReview,
  rejectReview,
  deleteReview,
  getPendingReviewsCount,
} = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getAllReviews)
  .post(protect, createReview);

router.get('/my-reviews', protect, getUserReviews);
router.get('/pending-count', protect, admin, getPendingReviewsCount);
router.get('/business/:businessId', protect, getBusinessReviews);

router.route('/:id')
  .get(protect, getReviewById)
  .put(protect, updateReview)
  .delete(protect, deleteReview);

router.put('/:id/approve', protect, admin, approveReview);
router.put('/:id/reject', protect, admin, rejectReview);

module.exports = router;
