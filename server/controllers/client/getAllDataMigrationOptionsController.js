'use strict';

const eventData = require('../../data/events/client');

const getAllDataMigrationOptions = async (req,res,next) => {
    try {
        const data = await eventData.getAllDataMigrationOptions();
        res.send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllDataMigrationOptions
}