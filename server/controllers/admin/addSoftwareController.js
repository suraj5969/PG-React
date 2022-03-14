'use strict';

const eventData = require('../../data/events/admin');

const addSoftware = async (req,res,next) => {
    try {
        const values = req.body;
        const addSoftware = await eventData.addSoftware(values);
        res.send(addSoftware);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addSoftware
}