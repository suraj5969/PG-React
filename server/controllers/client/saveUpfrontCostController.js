'use strict';

const eventData = require('../../data/events/client');

const saveUpfrontCost = async (req,res,next) => {
    try {
        const values = req.body;
        // console.log('save controller called', values);
        const result = await eventData.saveUpfrontCost(values);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    saveUpfrontCost
}