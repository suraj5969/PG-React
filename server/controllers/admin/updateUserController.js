'use strict';

const eventData = require('../../data/events/admin');

const updateUser = async (req,res,next) => {
    try {
        const user_id = req.params.id;
        const values = req.body;
        const updateUser = await eventData.updateUser(user_id,values);
        res.send(updateUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    updateUser
}