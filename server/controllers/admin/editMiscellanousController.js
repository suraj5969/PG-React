'use strict';

const eventData = require('../../data/events/admin');

const editMiscellanous = async (req,res,next) => {
    try {
        const id = req.params.id;
        const values = req.body;
        const editMiscellanous = await eventData.editMiscellanous(id,values);
        res.send(editMiscellanous);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    editMiscellanous
}