'use strict';

const eventData = require('../../data/events/client');

const getAllSoftwares = async (req,res,next) => {
    try {
        const data = await eventData.getAllSoftwares();
        res.send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllSoftwares
}