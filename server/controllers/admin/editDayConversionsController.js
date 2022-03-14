'use strict';

const eventData = require('../../data/events/admin');

const editDayConversions = async (req,res,next) => {
    try {
        const id = req.params.id;
        const values = req.body;
        const editDayConversions = await eventData.editDayConversions(id,values);
        res.send(editDayConversions);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    editDayConversions
}