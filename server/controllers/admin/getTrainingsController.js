'use strict';

const eventData = require('../../data/events/admin');

const getTrainings = async (req,res,next) => {
    try {
        const getTrainings = await eventData.getTrainings();
        res.send(getTrainings);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getTrainings
}