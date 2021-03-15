'use strict';
const TaxModel       = require('../models/tax');
const mongoose        = require('../../lib/mongoose').connect();
mongoose.connection.on('connected', doMigration);
var ObjectId = require('mongodb').ObjectID;

let tax = [
    {
        _id : ObjectId('5e4e22d09e40d42f3b8fa15f'),
        orderType:'drinks',
        tax:0
    },
    {
        _id: ObjectId('5e4e22d09e40d42f3b8fa25f'),
        orderType: 'combo',
        tax: 10
    }
];

function doMigration () {
    TaxModel.remove({},(err,doc) => {
        if (err) {
            console.log(err,'TaxModel  Migration');
        } else {
            try {
                tax.forEach(async (data, index)=> {
                    if (index <= tax.length - 1) {
                        console.log('Migrating ..',index);
                        let docs = await  TaxModel(data).save();
                        if (index === tax.length - 1) {
                            console.log('TaxModel Migration Done');
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
