'use strict';

const eventData = require('../../data/events/admin');

const editGSTpercentage = async (req,res,next) => {
    try {
        const id = req.params.id;
        const values = req.body;
        const editGSTpercentage = await eventData.editGSTpercentage(id,values);
        res.send(editGSTpercentage);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    editGSTpercentage
}