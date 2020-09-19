const express=require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');

router.get('/', homeController.home);
router.use('/users', require('./users'));
// if the requst address is localhost:8000/address/location, it matches with address word in below line
// so it will require address file in this same folder
router.use('/address',require('./address'));

router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/likes', require('./likes'));

router.use('/api', require('./api'));



module.exports = router;
