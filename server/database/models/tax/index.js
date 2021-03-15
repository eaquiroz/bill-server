'use strict';

const mongoose = require('mongoose');

const taxSchema = new mongoose.Schema({
    orderType: { type: String, required: true, enum:['drinks','combo'] },
    tax:{ type: Number, required: true },
}, { versionKey: false });

const TaxModel = mongoose.model('Tax', taxSchema);
module.exports = TaxModel;