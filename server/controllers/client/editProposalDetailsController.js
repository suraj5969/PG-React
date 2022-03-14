'use strict';

const eventData = require('../../data/events/client');

const editProposalDetails = async (req, res, next) => {
    try {
        const proposal_no = req.params.proposal_no;
        const { user_id, reason } = req.body;
        const edit = await eventData.editProposalDetails(proposal_no, user_id, reason);
        res.send(edit);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    editProposalDetails
}