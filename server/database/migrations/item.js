'use strict';
const ItemModel       = require('../models/items');
const mongoose        = require('../../lib/mongoose').connect();
mongoose.connection.on('connected', doMigration);
var ObjectId = require('mongodb').ObjectID;

let items = [
    {
        _id : ObjectId('5e4e22d09e40d42f3b8fa85f'),
        name:'Cola-Cold',
        type:'drink',
        price:'$0.5',
    },
    {
        _id : ObjectId('5e4e22d09e40d42f3b8fa45f'),
        name:'Coffee-Hot',
        type:'drink',
        price:'$1.00',
    },
    {
        _id : ObjectId('5e4e22d09e40d42f3b8fa55f'),
        name:'Cheese Sandwich',
        type:'combo',
        price:'$2.00'
    },
    {
        _id : ObjectId('5e4e22d09e40d42f3b8fa95f'),
        name:'Steak Sandwich',
        type:'combo',
        price:'$4.50'
    }
];

function doMigration () {
    ItemModel.remove({},(err,doc) => {
        if (err) {
            console.log(err,'Item  Migration');
        } else {
            try {
                items.forEach(async (data, index)=> {
                    if (index <= items.length - 1) {
                        console.log('Migrating ..',index);
                        let docs = await  ItemModel(data).save();
                        if (index === items.length - 1) {
                            console.log('Item Migration Done');
                            process.exit(1);
                        }
                    }
                });
            } catch (e){
                console.log(e);
            }
        }
    });
}
