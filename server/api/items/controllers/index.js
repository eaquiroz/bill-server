'use strict';

const {ItemModel} = require('@database/models');

const addItem = async (req,res)=> {
    try {
        let body = req.body;
        let doc = await ItemModel(body).save();
        if(doc) {
            return res.status(201).send(doc);
        }
        return res.status(400).send({error:'Error Saving Item'});
    }catch (err){
        logger.error(err);
        let {message} = err;
        return res.status(400).json({error:{message:message}});
    }
}

module.exports = {
    addItem:addItem
};
