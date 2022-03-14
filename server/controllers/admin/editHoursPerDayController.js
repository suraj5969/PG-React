'use strict';

const eventData = require('../../data/events/admin');

const editHoursPerDay = async (req,res,next) => {
    try {
        const id = req.params.id;
        const values = req.body;
        const editHoursPerDay = await eventData.editHoursPerDay(id,values);
        res.send(editHoursPerDay);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    editHoursPerDay
}