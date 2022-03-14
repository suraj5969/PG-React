'use strict';

const eventData = require('../../data/events/admin');

const editQuickServices = async (req,res,next) => {
    try {
        const id = req.params.id;
        const values = req.body;
        const editQuickServices = await eventData.editQuickServices(id,values);
        res.send(editQuickServices);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    editQuickServices
}