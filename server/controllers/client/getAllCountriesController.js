'use strict';

const eventData = require('../../data/events/client');

const getAllCountries = async (req,res,next) => {
    try {
        const data = await eventData.getAllCountries();
        // const example = await eventData.editExample();
        res.send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllCountries
}