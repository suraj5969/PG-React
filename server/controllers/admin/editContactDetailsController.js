'use strict';

const eventData = require('../../data/events/admin');

const editContactDetails = async (req,res,next) => {
    try {
        const id = req.params.id;
        const values = req.body;
        const editContactDetails = await eventData.editContactDetails(id,values);
        res.send(editContactDetails);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    editContactDetails
}