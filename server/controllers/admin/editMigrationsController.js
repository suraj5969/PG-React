'use strict';

const eventData = require('../../data/events/admin');

const editMigrations = async (req,res,next) => {
    try {
        const migration_id = req.params.id;
        const values = req.body;
        const editMigrations = await eventData.editMigrations(migration_id,values);
        res.send(editMigrations);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    editMigrations
}