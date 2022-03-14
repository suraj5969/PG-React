'use strict';

const eventData = require('../../data/events/admin');

const addUser = async (req,res,next) => {
    try {
        const values = req.body;
        const addUser = await eventData.addUser(values);
        res.send(addUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addUser
}