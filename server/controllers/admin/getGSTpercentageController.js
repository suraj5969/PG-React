'use strict';

const eventData = require('../../data/events/admin');

const getGSTpercentage = async (req,res,next) => {
    try {
        const getGSTpercentage = await eventData.getGSTpercentage();
        res.send(getGSTpercentage);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getGSTpercentage
}