const BusinessModel = require('../models/BusinessModel');

const createBusiness = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      address,
      city,
      state,
      zip_code,
      phone,
      website,
      image_url,
    } = req.body;

    if (!name || !category || !description || !address || !city || !state || !zip_code) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const business = await BusinessModel.create({
      name,
      category,
      description,
      address,
      city,
      state,
      zip_code,
      phone,
      website,
      image_url,
    });

    res.status(201).json(business);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating business' });
  }
};

const getAllBusinesses = async (req, res) => {
  try {
    const { category, city, state, search } = req.query;

    const filters = {};
    if (category) filters.category = category;
    if (city) filters.city = city;
    if (state) filters.state = state;
    if (search) filters.search = search;

    const businesses = await BusinessModel.findAll(filters);
    res.json(businesses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching businesses' });
  }
};

const getBusinessById = async (req, res) => {
  try {
    const business = await BusinessModel.findById(req.params.id);

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    res.json(business);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching business' });
  }
};

const updateBusiness = async (req, res) => {
  try {
    const business = await BusinessModel.findById(req.params.id);

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    const updatedBusiness = await BusinessModel.updateById(req.params.id, req.body);
    res.json(updatedBusiness);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating business' });
  }
};

const deleteBusiness = async (req, res) => {
  try {
    const business = await BusinessModel.findById(req.params.id);

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    await BusinessModel.deleteById(req.params.id);
    res.json({ message: 'Business removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting business' });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await BusinessModel.getCategories();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching categories' });
  }
};

module.exports = {
  createBusiness,
  getAllBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
  getCategories,
};
