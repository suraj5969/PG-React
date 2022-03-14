'use strict';

const eventData = require('../../data/events/client');

const getProposalDetails = async (req, res, next) => {
    try {
        const proposal_no = req.params.proposal_no;
        const data = await eventData.getProposalDetails(proposal_no);
        res.send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getProposalDetails
}