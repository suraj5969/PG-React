'use strict';

const eventData = require('../../data/events/client');

const getDashboardSlnSpecialist = async (req,res,next) => {
    try {
        const country = req.params.country;
        const data = await eventData.getDashboardSlnSpecialist(country);
        res.send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getDashboardSlnSpecialist
}