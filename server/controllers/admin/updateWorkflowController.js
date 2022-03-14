'use strict';

const eventData = require('../../data/events/admin');

const updateWorkflow = async (req,res,next) => {
    try {
        const row_id = req.params.id;
        const values = req.body;
        const update = await eventData.updateWorkflow(row_id,values);
        res.send(update);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    updateWorkflow
}