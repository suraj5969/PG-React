'use strict';

const eventData = require('../../data/events/client');

const getProposalCounter = async (req,res,next) => {
    try {
        // console.log('getProposalCounter controller called');
        const data = await eventData.getProposalCounter();
        res.send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getProposalCounter
}