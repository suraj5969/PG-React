'use strict';

const eventData = require('../../data/events/admin');

const getMigrations = async (req,res,next) => {
    try {
        const getMigrations = await eventData.getMigrations();
        res.send(getMigrations);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getMigrations
}