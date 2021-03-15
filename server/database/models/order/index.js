'use strict';

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const objectId = mongoose.Schema.Types.ObjectId;
const {TaxModel} = require('../index');

const OrderItemSchema = new mongoose.Schema({
    refId: { type: objectId, ref: 'Item'},
    itemId: { type: Number},
    quantity: { type: String, required: true },
    itemPrice: { type: String, required: true },
    itemTotal: { type: String}
}, { versionKey: false });

const OrderSchema = new mongoose.Schema({
    items: [OrderItemSchema],
    name: { type: String, required: true },
    orderNumber: { type: Number },
    email: { type: String, required: true },
    total: { type: String, required: true },
    type: { type: String, enum:['drinks','combo'] },
    serviceTax: {type: String},
    invoice: {type: String}
}, { versionKey: false });

let getTotal = function (items){
    const sum = items
        .map(item => item.itemTotal)
        .reduce((prev, curr) => prev + curr, 0);
    return sum;
}

OrderSchema.pre('save', async function (next) {

    let items  = this.items;
    let orderType ='drink';
    items && items.length >0  && items.forEach((data)=>{
        if(data.itemId === 3 || data.itemId ===4){
            orderType = 'combo';
        }
        data.itemTotal = data.quantity * data.price;
    })

    let tax = await mongoose.models['TaxModel'].findOne({orderType: orderType});

    if (tax) {
        this.serviceTax = tax.tax;
        let total = getTotal(this.items) ;
        this.total = total + (total*100)/10;
    }
    next();
});


OrderSchema.plugin(AutoIncrement, {orderNumber:'order_seq',inc_field: 'orderNumber'});
const OrderModel = mongoose.model('Orders', OrderSchema);

module.exports = OrderModel;