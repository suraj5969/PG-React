'use strict';

const eventData = require('../../data/events/admin');

const OneUserDetails = async (req,res,next) => {
    try {
        const id = req.params.id;
        const oneUser = await eventData.getOneUserDeatils(id);
        res.send(oneUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    OneUserDetails
}