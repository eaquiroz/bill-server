'use strict';
const {OrderModel} = require('@database/models');

const createOrder = async (req,res)=> {
    try {
        let body = req.body;
        let doc = await OrderModel(body).save();
        if(doc) {
            return res.status(201).send(doc);
        }

        return res.status(400).send({error:'Error Creating Order'});
    }catch (err){
        logger.error(err);
        let {message} = err;
        return res.status(400).json({error:{message:message}});
    }
}

module.exports = {
    createOrder:createOrder
};