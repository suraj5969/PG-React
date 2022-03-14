'use strict';

const eventData = require('../../data/events/admin');

const verifyUser = async (req,res,next) => {
    try {
        const {usermail,password} = req.body;
        const verifyUser = await eventData.verifyUser(usermail,password);
        res.send(verifyUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    verifyUser
}