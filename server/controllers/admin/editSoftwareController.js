'use strict';

const eventData = require('../../data/events/admin');

const editSoftware = async (req,res,next) => {
    try {
        const id = req.params.id;
        const values = req.body;
        const editSoftware = await eventData.editSoftware(id,values);
        res.send(editSoftware);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    editSoftware
}