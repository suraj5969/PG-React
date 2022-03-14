'use strict';

const eventData = require('../../data/events/client');

const getAllEmpowerModules = async (req,res,next) => {
    try {
        // console.log('getAllEmpowerModules controller called');
        const data = await eventData.getAllEmpowerModules();
        res.send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllEmpowerModules
}