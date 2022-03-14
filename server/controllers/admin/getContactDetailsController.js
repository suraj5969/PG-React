'use strict';

const eventData = require('../../data/events/admin');

const getContactDetails = async (req,res,next) => {
    try {
        const getContactDetails = await eventData.getContactDetails();
        res.send(getContactDetails);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getContactDetails
}