'use strict';

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    itemId: { type: Number },
    price: { type: String, required: true }
}, { versionKey: false });

ItemSchema.plugin(AutoIncrement, {itemId:'item_seq',inc_field: 'itemId'});

const ItemModel = mongoose.model('Items', ItemSchema);

module.exports = ItemModel;