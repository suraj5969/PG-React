'use strict';

const eventData = require('../../data/events/admin');

const getAllUsers = async (req,res,next) => {
    try {
        const getAllUsers = await eventData.getAllUsers();
        res.send(getAllUsers);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllUsers
}