const { validationResult } = require('express-validator');
const User = require('../models/User');
const { getAwardsBalance } = require('../services/awardsService');

// @route   GET api/awards
// @desc    Get the awards (NFTs) for a User
// @access  Public
exports.getAwards = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let user;
  try {
    user = await User.findById(req.user.id).select('-password');
    if (!user || !user.address) {
      return res.status(404).json({
        errors: [{ msg: 'User not found or blockchain address missing' }],
      });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Internal server error: DB reading' });
  }

  try {
    const balance = await getAwardsBalance(user.address);
    return res.status(200).json({
      balance,
    });
  } catch (err) {
    console.error("Blockchain error:", err.message);
    return res.status(500).json({ msg: 'Error interacting with blockchain' });
  }

};
