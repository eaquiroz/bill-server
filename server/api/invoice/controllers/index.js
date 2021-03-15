'use strict';
const {invoiceModel} = require('@database/models');

const createInvoice = async (req,res)=> {
    try {
        let body = req.body;
        let inv = await invoiceModel(body).save();
        return res.status(201).json(inv);

    }catch (err){
        logger.error(err);
        let {message} = err;
        return res.status(400).json({error:{message:message}});
    }
}

module.exports = {
    createInvoice:createInvoice
}