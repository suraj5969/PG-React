'use strict';

const eventData = require('../../data/events/client');

const getDayConversionInfo = async (req,res,next) => {
    try {
        const dayId = req.params.dayId;
        // console.log('info controller called', clientName);
        const data = await eventData.getDayConversionInfo(dayId);
        res.send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getDayConversionInfo
}