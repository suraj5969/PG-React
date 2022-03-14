'use strict';

const eventData = require('../../data/events/admin');

const editOracleWordings = async (req,res,next) => {
    try {
        const id = req.params.id;
        const values = req.body;
        const editOracleWordings = await eventData.editOracleWordings(id,values);
        res.send(editOracleWordings);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    editOracleWordings
}