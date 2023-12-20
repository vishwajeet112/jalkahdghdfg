// routes/complaintRoutes.js
const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

// Assuming a POST request to '/submit-complaint'
router.post('/submit', complaintController.submitComplaint);

module.exports = router;