'use strict';

/**
 * Import All Controller Here
 */

const InvoiceController = require('./invoice/controllers');
const ItemController = require('./items/controllers');
const OrderController = require('./orders/controllers');
const TaxController = require('./tax/controllers');

module.exports = {
    InvoiceController,
    ItemController,
    OrderController,
    TaxController
};
