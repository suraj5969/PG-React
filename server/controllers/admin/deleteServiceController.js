'use strict';

const eventData = require('../../data/events/admin');

const deleteService = async (req,res,next) => {
    try {
        let id = req.params.id;
        const deleteService = await eventData.deleteService(id);
        res.send(deleteService);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    deleteService
}