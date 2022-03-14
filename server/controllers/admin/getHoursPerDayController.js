'use strict';

const eventData = require('../../data/events/admin');

const getHoursPerDay = async (req,res,next) => {
    try {
        const getHoursPerDay = await eventData.getHoursPerDay();
        res.send(getHoursPerDay);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getHoursPerDay
}