const router = require('express').Router();
const {TaxController} = require('../../controller');

router.post('/', TaxController.addTax);

module.exports = router;
