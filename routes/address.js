const express = require('express');
const router = express.Router();

//the addressController needs address_controller file in controllers folder
const addressController = require('../controllers/address_controller');

//as http://localhost:8000/address/location the word here matches with /location bellow it will need addressController
router.get('/location',addressController.address);

module.exports = router;