/**
 * Import All  Mongoose Model Here
 */

const InvoiceModel                      = require('./invoice');
const ItemModel                         = require('./items');
const OrderModel                        = require('./order');
const TaxModel                          = require('./tax');

module.exports = {
    InvoiceModel,
    ItemModel,
    OrderModel,
    TaxModel
};