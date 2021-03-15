'use strict';

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const objectId = mongoose.Schema.Types.ObjectId;

const InvoiceSchema = new mongoose.Schema({
    orderId: { type: objectId, ref: 'Orders' },
    invoiceNumber: {type: Number}
}, { versionKey: false });

InvoiceSchema.plugin(AutoIncrement, {invoiceNumber:'invoice_seq',inc_field: 'invoiceNumber'});
const InvoiceModel = mongoose.model('Invoice', InvoiceSchema);

module.exports = InvoiceModel;
