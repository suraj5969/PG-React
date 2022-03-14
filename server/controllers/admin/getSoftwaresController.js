'use strict';

const eventData = require('../../data/events/admin');

const getSoftwares = async (req,res,next) => {
    try {
        const getSoftwares = await eventData.getSoftwares();
        res.send(getSoftwares);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getSoftwares
}