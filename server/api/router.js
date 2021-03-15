'use strict';

const express = require("express");
const router = express.Router();

/**
 * Import All Express Router Here
 */

const itemRouter = require('./items/routes');
const invoiceRouter = require('./invoice/routes');
const orderRouter = require('./orders/routes');

router.use('/item', itemRouter);
router.use('/invoice', invoiceRouter);
router.use('/orders', orderRouter);

module.exports = router;


