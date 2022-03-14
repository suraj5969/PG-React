'use strict';

const eventData = require('../../data/events/client');

const archiveProposal = async (req, res, next) => {
    try {
        const proposal_no = req.params.proposal_no;
        const archive = await eventData.archiveProposal(proposal_no);
        res.send(archive);

    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    archiveProposal
}