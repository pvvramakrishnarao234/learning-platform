const User = require('../models/User');

const getMyProfile = async (req, res) => {
  const user = await User.findOne({ firebaseUID: req.user.uid });
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json(user);
};

const updateMyProfile = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { firebaseUID: req.user.uid },
    req.body,
    { new: true }
  );
  res.json(user);
};

module.exports = {
  getMyProfile,
  updateMyProfile,
};
