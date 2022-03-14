'use strict';

const eventData = require('../../data/events/admin');

const getDayConversions = async (req,res,next) => {
    try {
        const getDayConversions = await eventData.getDayConversions();
        res.send(getDayConversions);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getDayConversions
}