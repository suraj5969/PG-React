'use strict';

const eventData = require('../../data/events/admin');

const getProductList = async (req,res,next) => {
    try {
        const getProductList = await eventData.getProductList();
        res.send(getProductList);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getProductList
}