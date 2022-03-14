'use strict';

const eventData = require('../../data/events/admin');

const getQuickServices = async (req,res,next) => {
    try {
        const getQuickServices = await eventData.getQuickServices();
        res.send(getQuickServices);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getQuickServices
}