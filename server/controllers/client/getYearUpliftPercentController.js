'use strict';

const eventData = require('../../data/events/client');

const getYearUpliftPercent = async (req,res,next) => {
    try {
        // console.log('getYearUpliftPercent controller called');
        const data = await eventData.getYearUpliftPercent();
        res.send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getYearUpliftPercent
}