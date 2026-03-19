const UserModel = require('../models/UserModel');

const updateProfile = async (req, res) => {
  try {
    const { name, avatar_url } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (avatar_url) updateData.avatar_url = avatar_url;

    const updatedUser = await UserModel.updateById(req.user.id, updateData);

    res.json({
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
      avatar_url: updatedUser.avatar_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating profile' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  updateProfile,
  getUserProfile,
  getAllUsers,
};
