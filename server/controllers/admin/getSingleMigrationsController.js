'use strict';

const eventData = require('../../data/events/admin');

const getSingleMigrations = async (req,res,next) => {
    try {
        const migration_id = req.params.migration_id;
        const singleMigrations = await eventData.getSingleMigrations(migration_id);
        res.send(singleMigrations);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getSingleMigrations
}