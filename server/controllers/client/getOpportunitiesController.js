'use strict';

const eventData = require('../../data/events/client');

const getOpportunities = async (req,res,next) => {
    try {
        const clientNumber = req.params.clientNumber;
        // console.log('getOpportunities controller called', clientNumber);
        const data = await eventData.getOpportunities(clientNumber);
        res.send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getOpportunities
}