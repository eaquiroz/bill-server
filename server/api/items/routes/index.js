const router = require('express').Router();
const {ItemController} = require('../../controller');

router.post('/', ItemController.addItem);

module.exports = router;
