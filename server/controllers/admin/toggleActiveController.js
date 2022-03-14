'use strict';

const eventData = require('../../data/events/admin');

const toggleActive = async (req,res,next) => {
    try {
        const id = req.params.id;
        const value = req.body.value === '1' ? '0' : '1';
        const toggleActive = await eventData.toggleActive(id,value);
        res.send(toggleActive);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    toggleActive
}