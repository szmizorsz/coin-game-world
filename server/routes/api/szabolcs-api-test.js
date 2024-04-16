const express = require('express');
const router = express.Router();
const { getAwards } = require('../../controllers/awards');
const validateToken = require('../../middleware/auth');

router.get(
  '/',
  [
    validateToken,
  ],
  getAwards,
);

module.exports = router;
