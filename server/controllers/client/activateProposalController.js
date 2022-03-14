'use strict';

const eventData = require('../../data/events/client');

const activateProposal = async (req, res, next) => {
    try {
        const proposal_no = req.params.proposal_no;
        const activate = await eventData.activateProposal(proposal_no);
        res.send(activate);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    activateProposal
}