'use strict';

const mailToSalesManager = require('./mails/mailToSalesManager');
const mailToCommercialLead = require('./mails/mailToCommercialLead');
const mailToCFOApproval = require('./mails/mailToCFOApproval');
const mailToOPSteamApproval = require('./mails/mailToOPSteamApproval');
const mailToProposalApproval = require('./mails/mailToProposalApproval');

const eventData = require('../../data/events/client');
const adminEventData = require('../../data/events/admin');

const approveProposal = async (req, res, next) => {
    try {
        const proposal_no = req.params.proposal_no;
        const {user_id} = req.body;

        const clientProfile = await eventData.getClientProfile(proposal_no);
        const workflow = await adminEventData.getWorkflow();
        const proposalStatus = await eventData.getProposalStatus(proposal_no);
        const getClientDiscount = await eventData.getClientDiscount(proposal_no);

        const status = Number(proposalStatus[0]?.status_id);
        const discount = Number(getClientDiscount[0]?.discount_percent);

        let approversIds = {};
        approversIds['salesManager'] = workflow[0]?.aus_user_id;
        approversIds['commLead'] = workflow[1]?.aus_user_id;
        approversIds['cfo'] = workflow[2]?.aus_user_id;
        approversIds['opsTeam'] = workflow[3]?.aus_user_id;
        // if (clientProfile[0]?.country === 'Australia') {
        // }
        // else if (clientProfile[0]?.country === 'New Zealand') {
        //     approversIds['salesManager'] = workflow[0]?.nz_user_id;
        //     approversIds['commLead'] = workflow[1]?.nz_user_id;
        //     approversIds['cfo'] = workflow[2]?.nz_user_id;
        //     approversIds['opsTeam'] = workflow[3]?.nz_user_id;
        // }

        const salesToCommercial = async () => {
            try {
                const newApproverId = approversIds['commLead'];
                const switchApprovalStatus = await eventData.updateApprovalStatus(proposal_no, 5, status, Number(user_id)); // 5 for pending comm lead approval
                const mailResponse = await mailToCommercialLead.mailToCommercialLead(newApproverId, proposal_no);
                return {
                    status: 200,
                    message: switchApprovalStatus[0] ? 'Pending for Commercial Lead Approval' : 'failed',
                    mailResponse: mailResponse
                };

            } catch (error) {
                return {
                    status: 400,
                    message: error
                }
            }

        }

        const salesToOPS = async () => {
            try {
                const nextApproverId = approversIds['opsTeam'];
                // const newApprover = approversList[0].ops_approver;
                const switchApprovalStatus = await eventData.updateApprovalStatus(proposal_no, 7, status,  Number(user_id)); // 7 for pending ops team approval
                const mailResponse = await mailToOPSteamApproval.mailToOPSteamApproval(nextApproverId, proposal_no);
                return {
                    status: 200,
                    message: switchApprovalStatus[0] ? 'Pending for Ops Team Verification' : 'failed',
                    mailResponse: mailResponse
                };

            } catch (error) {
                return {
                    status: 400,
                    message: error
                }
            }

        }

        const commercialToCFO = async () => {
            try {
                //const nextApprover = approversList[0].next_approver;
                const newApproverId = approversIds['cfo'];
                const switchApprovalStatus = await eventData.updateApprovalStatus(proposal_no, 6, status,  Number(user_id)); // 6 for pending cfo approval
                const mailResponse = await mailToCFOApproval.mailToCFOApproval(newApproverId, proposal_no);
                return {
                    status: 200,
                    message: switchApprovalStatus[0] ? 'Pending for CFO Approval' : 'failed',
                    mailResponse: mailResponse
                };

            } catch (error) {
                return {
                    status: 400,
                    message: error
                }
            }

        }

        const commercialToOPS = async () => {
            try {
                const newApproverId = approversIds['opsTeam'];
                const switchApprovalStatus = await eventData.updateApprovalStatus(proposal_no, 7, status,  Number(user_id));
                const mailResponse = await mailToOPSteamApproval.mailToOPSteamApproval(newApproverId, proposal_no);
                return {
                    status: 200,
                    message: switchApprovalStatus[0] ? 'Pending for Ops Team Verification' : 'failed',
                    mailResponse: mailResponse
                };

            } catch (error) {
                return {
                    status: 400,
                    message: error
                }
            }
        }

        const CFOToOPS = async () => {
            try {
                //const nextApprover = approversList[0].next_approver;
                const newApproverId = approversIds['opsTeam'];
                const switchApprovalStatus = await eventData.updateApprovalStatus(proposal_no, 7, status,  Number(user_id));
                // console.log(switchApprovalStatus, 'switchApprovalStatus')
                const mailResponse = await mailToOPSteamApproval.mailToOPSteamApproval(newApproverId, proposal_no);
                return {
                    status: 200,
                    message: switchApprovalStatus[0] ? 'Pending for Ops Team Verification' : 'failed',
                    mailResponse: mailResponse
                };

            } catch (error) {
                return {
                    status: 400,
                    message: error
                }
            }

        }

        //This function is only for new zealand not for australia
        const salesToCFO = async () => {
            try {
                const newApproverId = approversIds['cfo'];
                const switchApprovalStatus = await eventData.updateApprovalStatus(proposal_no, 6, status,  Number(user_id)); // 6 for pending cfo approval
                const mailResponse = await mailToCFOApproval.mailToCFOApproval(newApproverId, proposal_no);
                return {
                    status: 200,
                    message: switchApprovalStatus[0] ? 'Pending for CFO Approval' : 'failed',
                    mailResponse: mailResponse
                };

            } catch (error) {
                return {
                    status: 400,
                    message: error
                }
            }

        }

        const approveProposal = async () => {
            try {
                const switchApprovalStatus = await eventData.updateApprovalStatus(proposal_no, 8, status,  Number(user_id));
                //Need to send email to user / client
                const mailResponse = await mailToProposalApproval.mailToProposalApproval(proposal_no);
                return {
                    status: 200,
                    message: switchApprovalStatus[0] ? 'Approved' : 'failed',
                    mailResponse: mailResponse
                };
            } catch (error) {
                return {
                    status: 400,
                    message: error
                }
            }
        }

        if (status === 8) {
            res.send({
                status: 200,
                message: 'The Proposal is Already Approved'
            });
            return;
        } else if (status === 1) {
            res.send({
                status: 200,
                message: 'The Proposal is rejected ,edit and resubmit the proposal!'
            })
            return;
        } else if (status === 2) {
            res.send({
                status: 200,
                message: "The Porposal is not submitted for approval! submit the proposal first!"
            });
            return;
        } else if (status === 3) {
            res.send({
                status: 200,
                message: "The is proposal without GCRM client, Cannot Approve it."
            });
            return;
        }

        if (discount > 20) {
            if (status === 4) {
                if (discount > 30) {
                    const result = await salesToCommercial();
                    res.send(result);
                } else {
                    const result = await salesToOPS();
                    res.send(result);
                }
            } else if (status === 5) {
                if (discount > 40) {
                    const result = await commercialToCFO();
                    res.send(result);
                } else {
                    const result = await commercialToOPS();
                    res.send(result);
                }
            } else if (status === 6) {
                const result = await CFOToOPS();
                res.send(result);
            } else if (status === 7) {
                const result = await approveProposal();
                res.send(result);
            } else {
                res.send({
                    status: 200,
                    message: "An Error Occured While Approving the Proposal"
                });
            }
        }
        // else if (clientProfile[0]?.country === 'New Zealand' && discount > 20) {
        //     if (status === 4) {
        //         if (discount > 30) {
        //             const result = await salesToCFO();
        //             res.send(result);
        //         } else {
        //             const result = await approveProposal();
        //             res.send(result);
        //         }
        //     } else if (status === 6) {
        //         const result = await approveProposal();
        //         res.send(result);
        //     } else {
        //         res.send({
        //             status: 200,
        //             message: "Status id is not Correct for Proposal."
        //         });
        //     }
        // }

    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    approveProposal
}