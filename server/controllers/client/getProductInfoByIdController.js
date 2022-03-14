'use strict';

const eventData = require('../../data/events/client');

const getProductInfoById = async (req,res,next) => {
    try {
        const productId = req.params.productId;
        // console.log('getProductInfoById controller called', clientName);
        const data = await eventData.getProductInfoById(productId);
        res.send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getProductInfoById
}