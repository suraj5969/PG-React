'use strict';

const eventData = require('../../data/events/admin');

const getMiscellanous = async (req,res,next) => {
    try {
        const getMiscellanous = await eventData.getMiscellanous();
        res.send(getMiscellanous);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getMiscellanous
}