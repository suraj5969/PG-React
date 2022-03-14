'use strict';

const eventData = require('../../data/events/admin');

const getWorkflow = async (req,res,next) => {
    try {
        const getWorkflow = await eventData.getWorkflow();
        res.send(getWorkflow);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getWorkflow
}