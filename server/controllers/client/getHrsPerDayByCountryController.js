'use strict';

const eventData = require('../../data/events/client');

const getHrsPerDayByCountry = async (req,res,next) => {
    try {
        const countryName = req.params.countryName;
        // console.log('getHrsPerDayByCountry controller called', countryName);
        const data = await eventData.getHrsPerDayByCountry(countryName);
        res.send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getHrsPerDayByCountry
}