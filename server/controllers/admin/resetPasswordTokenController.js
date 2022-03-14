'use strict';

const eventData = require('../../data/events/admin');

const resetPasswordToken = async (req, res, next) => {
    try {
        const { token } = req.body;
        const passwordReset = await eventData.resetPasswordToken(token);
        res.send(passwordReset);
    } catch (error) {
        res.status(400).send({
            message: error.message,
        });
    }
}

module.exports = {
    resetPasswordToken
}