'use strict';

const eventData = require('../../data/events/client');
const adminEventData = require('../../data/events/admin');

const mailToRejectProposal = require('./mails/mailToRejectProposal');

const rejectProposal = async (req, res, next) => {
    try {
        const proposal_no = req.params.proposal_no;
        const { reason } = req.body;
        const proposalStatus = await eventData.getProposalStatus(proposal_no);
        const clientProfile = await eventData.getClientProfile(proposal_no);
        const workflow = await adminEventData.getWorkflow();
        // const approversList = await eventData.getApproversList(proposal_no);
        const status = Number(proposalStatus[0].status_id);
        // console.log(reason,'RejectedReacson')

        let approversIds = {}, designation = null;
        approversIds['salesManager'] = workflow[0]?.aus_user_id;
        approversIds['commLead'] = workflow[1]?.aus_user_id;
        approversIds['cfo'] = workflow[2]?.aus_user_id;
        approversIds['opsTeam'] = workflow[3]?.aus_user_id;

        if (status === 4) {
            designation = 'salesManager';
        } else if (status === 5) {
            designation = 'commLead';
        } else if (status === 6) {
            designation = 'cfo';
        } else if (status === 7) {
            designation = 'opsTeam';
        }
        // if (clientProfile[0]?.country === 'Australia') {
        // }
        // else if (clientProfile[0]?.country === 'New Zealand') {
        //     approversIds['salesManager'] = workflow[0]?.nz_user_id;
        //     approversIds['commLead'] = workflow[1]?.nz_user_id;
        //     approversIds['cfo'] = workflow[2]?.nz_user_id;
        //     approversIds['opsTeam'] = workflow[3]?.nz_user_id;

        //     if (status === 4) {
        //         designation = 'salesManager';
        //     } else if (status === 5) {
        //         designation = 'commLead';
        //     } else if (status === 6) {
        //         designation = 'cfo';
        //     } else if (status === 7) {
        //         designation = 'opsTeam';
        //     }
        // }

        if (status === 8 || status === 1 || status === 2 || status === 3) {
            res.send({
                status: 200,
                message: "You can't reject at this stage"
            });
            return;
        }

        const rejectProposal = await eventData.rejectProposal(proposal_no, approversIds[designation], reason);
        // console.log(rejectProposal, 'proposal rejected in controller');
        mailToRejectProposal.mailToRejectProposal(proposal_no)
            .then(mailResponse => console.log(`Mail Response : ${mailResponse}`))
            .catch(error => console.log('error while sending rejected proposal mail', error))

        res.send({
            status: 200,
            message: 'proposal rejected by : ' + approversIds[designation]
        })

    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    rejectProposal
}