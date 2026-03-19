const ReviewModel = require('../models/ReviewModel');

const createReview = async (req, res) => {
  try {
    const {
      business_id,
      title,
      content,
      quality_rating,
      service_rating,
      value_rating,
      photos,
    } = req.body;

    if (!business_id || !title || !content || !quality_rating || !service_rating || !value_rating) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (
      quality_rating < 1 || quality_rating > 5 ||
      service_rating < 1 || service_rating > 5 ||
      value_rating < 1 || value_rating > 5
    ) {
      return res.status(400).json({ message: 'Ratings must be between 1 and 5' });
    }

    const review = await ReviewModel.create({
      business_id,
      user_id: req.user.id,
      title,
      content,
      quality_rating,
      service_rating,
      value_rating,
      photos: photos || [],
    });

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating review' });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const { status, business_id, user_id } = req.query;

    const filters = {};
    if (status) filters.status = status;
    if (business_id) filters.business_id = business_id;
    if (user_id) filters.user_id = user_id;

    const reviews = await ReviewModel.findAll(filters);
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching reviews' });
  }
};

const getReviewById = async (req, res) => {
  try {
    const review = await ReviewModel.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching review' });
  }
};

const getBusinessReviews = async (req, res) => {
  try {
    const { status } = req.query;
    const reviews = await ReviewModel.findByBusinessId(req.params.businessId, status || 'approved');
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching business reviews' });
  }
};

const getUserReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.findByUserId(req.user.id);
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching user reviews' });
  }
};

const updateReview = async (req, res) => {
  try {
    const review = await ReviewModel.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }

    if (review.status !== 'pending' && req.user.role !== 'admin') {
      return res.status(400).json({ message: 'Cannot update non-pending review' });
    }

    const updatedReview = await ReviewModel.updateById(req.params.id, req.body);
    res.json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating review' });
  }
};

const approveReview = async (req, res) => {
  try {
    const review = await ReviewModel.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.status !== 'pending') {
      return res.status(400).json({ message: 'Review is not pending' });
    }

    const approvedReview = await ReviewModel.approveReview(req.params.id, req.user.id);
    res.json(approvedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error approving review' });
  }
};

const rejectReview = async (req, res) => {
  try {
    const review = await ReviewModel.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.status !== 'pending') {
      return res.status(400).json({ message: 'Review is not pending' });
    }

    const rejectedReview = await ReviewModel.rejectReview(req.params.id, req.user.id);
    res.json(rejectedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error rejecting review' });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await ReviewModel.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    await ReviewModel.deleteById(req.params.id);
    res.json({ message: 'Review removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting review' });
  }
};

const getPendingReviewsCount = async (req, res) => {
  try {
    const count = await ReviewModel.getPendingCount();
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching pending reviews count' });
  }
};

module.exports = {
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
};
