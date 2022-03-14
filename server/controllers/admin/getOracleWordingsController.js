'use strict';

const eventData = require('../../data/events/admin');

const getOracleWordings = async (req,res,next) => {
    try {
        const getOracleWordings = await eventData.getOracleWordings();
        res.send(getOracleWordings);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getOracleWordings
}