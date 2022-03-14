'use strict';

const eventData = require('../../data/events/client');

const getCountryAddress = async (req,res,next) => {
    try {
        const clientNumber = req.params.clientNumber;
        // console.log('country address controller called', clientName);
        const data = await eventData.getCountryAddress(clientNumber);
        res.send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getCountryAddress
}