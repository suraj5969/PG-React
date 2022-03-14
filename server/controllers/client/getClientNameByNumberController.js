'use strict';

const eventData = require('../../data/events/client');

const getClientNameByNumber = async (req,res,next) => {
    try {
        const clientNumber = req.params.number;
        // console.log('controller called', searchText);
        const clientNames = await eventData.getClientNameByNumber(clientNumber);
        res.send(clientNames);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getClientNameByNumber
}