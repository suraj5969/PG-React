'use strict';

const eventData = require('../../data/events/client');

const saveClientProfile = async (req,res,next) => {
    try {
        const values = req.body;
        // console.log('save controller called', values);
        const result = await eventData.saveClientProfile(values);
        // console.log('done save controller query',result);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    saveClientProfile
}