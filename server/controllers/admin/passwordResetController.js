'use strict';

const eventData = require('../../data/events/admin');

const passwordReset = async (req, res, next) => {
    try {
        const {user_id, currentPass, newPass } = req.body;
        const passwordReset = await eventData.passwordReset(user_id, currentPass, newPass);
        if (passwordReset.status === 200) {
            res.status(200).send('Password is changed');
        } 
        else {
            if (passwordReset.status === 203) {
                res.status(203).send('Current password does not match');
            }
            else {
                res.send(passwordReset);
            }
        }
    } catch (error) {
        res.status(400).send({
            message: error.message,
        });
    }
}

module.exports = {
    passwordReset
}