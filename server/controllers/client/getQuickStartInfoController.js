'use strict';

const eventData = require('../../data/events/client');

const getQuickStartInfo = async (req,res,next) => {
    try {
        // const serviceId = req.params.serviceId;
        // console.log('info controller called', clientName);
        const data = await eventData.getQuickStartInfo();
        res.send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getQuickStartInfo
}