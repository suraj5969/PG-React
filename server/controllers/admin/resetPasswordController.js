'use strict';

const eventData = require('../../data/events/admin');

const resetPassword = async (req, res, next) => {
    try {
        const {token, newPassword } = req.body;
        const passwordReset = await eventData.resetPassword(token, newPassword);
        // console.log(passwordReset, 'reset password rows affected');
        res.send(passwordReset);
    } catch (error) {
        res.status(400).send({
            message: error.message,
        });
    }
}

module.exports = {
    resetPassword
}