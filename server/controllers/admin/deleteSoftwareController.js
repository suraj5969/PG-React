'use strict';

const eventData = require('../../data/events/admin');

const deleteSoftware = async (req,res,next) => {
    try {
        let id = req.params.id;
        const deleteSoftware = await eventData.deleteSoftware(id);
        res.send(deleteSoftware);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    deleteSoftware
}