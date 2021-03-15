const router = require('express').Router();
const {OrderController} = require('../../controller');

router.post('/', OrderController.createOrder);

module.exports = router;
