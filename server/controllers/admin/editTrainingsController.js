'use strict';

const eventData = require('../../data/events/admin');

const editTrainings = async (req,res,next) => {
    try {
        const id = req.params.id;
        const values = req.body;
        const editTrainings = await eventData.editTrainings(id,values);
        res.send(editTrainings);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    editTrainings
}