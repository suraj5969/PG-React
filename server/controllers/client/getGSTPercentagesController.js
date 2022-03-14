'use strict';

const eventData = require('../../data/events/client');

const getGSTPercentages = async (req,res,next) => {
    try {
        // console.log('getGSTPercentages controller called');
        const data = await eventData.getGSTPercentages();
        res.send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getGSTPercentages
}