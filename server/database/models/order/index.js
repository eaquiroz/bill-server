'use strict';

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const objectId = mongoose.Schema.Types.ObjectId;
const {TaxModel} = require('../index');

const OrderItemSchema = new mongoose.Schema({
    refId: { type: objectId, ref: 'Item'},
    itemId: { type: Number},
    quantity: { type: Number, required: true },
    itemPrice: { type: Number, required: true },
    itemTotal: { type: Number}
}, { versionKey: false });

const OrderSchema = new mongoose.Schema({
    items: [OrderItemSchema],
    name: { type: String, required: true },
    orderNumber: { type: Number },
    email: { type: String, required: true },
    total: { type: Number },
    type: { type: String, enum:['drinks','combo'] },
    serviceTax: {type: Number},
    invoice: {type: String}
}, { versionKey: false });

let getTotal = function (items){
    const sum = items
        .map(item => item.itemTotal)
        .reduce((prev, curr) => prev + curr, 0);
    return sum;
}

// OrderItemSchema.pre('save', async function (next) {
//
//     let items  = this.items;
//     console.log(items)
//     items= items.map((data)=>{
//        return  data.itemTotal = data.quantity * data.price;
//     })
//     next();
// });

OrderSchema.pre('save', async function (next) {

    let items  = this.items;
    let orderType ='drinks';
     items.forEach((data)=>{
        if(data.itemId === 3 || data.itemId ===4){
            orderType = 'combo';
        }
          data.itemTotal = data.quantity * data.itemPrice;
     })

    let tax = await mongoose.models['Tax'].findOne({orderType: orderType},{tax:1});
        this.type = orderType;
        console.log(tax,"tax")
    if (tax.tax) {
        this.serviceTax = tax.tax;
        let total = getTotal(this.items) ;
        this.total = total + (Number(total*10)/100);
    }else {
        this.serviceTax = tax.tax;
        let total = getTotal(this.items) ;
        this.total = total;
    }
    next();
});


OrderSchema.plugin(AutoIncrement, {orderNumber:'order_seq',inc_field: 'orderNumber'});
const OrderModel = mongoose.model('Orders', OrderSchema);

module.exports = OrderModel;