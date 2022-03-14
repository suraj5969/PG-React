'use strict';

const eventData = require('../../data/events/client');

const getClientNamesBySearch = async (req,res,next) => {
    try {
        const searchText = req.params.searchText;
        // console.log('controller called', searchText);
        const clientNames = await eventData.getClientNamesBySearch(searchText);
        res.send(clientNames);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getClientNamesBySearch
}