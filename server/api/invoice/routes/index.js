const router = require('express').Router();
const {InvoiceController} = require('../../controller');

router.post('/', InvoiceController.createInvoice);

module.exports = router;
