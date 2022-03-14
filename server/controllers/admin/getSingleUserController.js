'use strict';

const eventData = require('../../data/events/admin');

const getSingleUser = async (req,res,next) => {
    try {
        const getSingleUser = await eventData.getSingleUser();
        res.send(getSingleUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getSingleUser
}