'use strict';

const eventData = require('../../data/events/client');

const lockProposal = async (req, res, next) => {
    try {
        const proposal_no = req.params.proposal_no;
        const proposalStatus = await eventData.getProposalStatus(proposal_no);
        const status = Number(proposalStatus[0]?.status_id);
        if (status === 8) {
            const data = await eventData.lockProposal(proposal_no);
            res.send(data);
        } else {
            res.status(200).send('Cannot lock Proposal before It is Approved');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    lockProposal
}