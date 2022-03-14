'use strict';

const eventData = require('../../data/events/client');

const getAllSolutionSpecialist = async (req,res,next) => {
    try {
        console.log('getAll solution Specialist controller called');
        const data = await eventData.getAllSolutionSpecialist();
        res.send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllSolutionSpecialist
}