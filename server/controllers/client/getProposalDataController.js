'use strict';

const eventData = require('../../data/events/client');
const adminEventData = require('../../data/events/admin');

const getClientProfile = async (proposal_no) => {
    try {
        const values = await eventData.getClientProfile(proposal_no);
        return values;
    } catch (error) {
        return error.message;
    }
}
const getAttendingCourses = async (proposal_no) => {
    try {
        const values = await eventData.getAttendingCourses(proposal_no);
        return values;
    } catch (error) {
        return error.message;
    }
}
const getDefaultServices = async (proposal_no) => {
    try {
        const values = await eventData.getDefaultServices(proposal_no);
        return values;
    } catch (error) {
        return error.message;
    }
}
const getOptionalServices = async (proposal_no) => {
    try {
        const values = await eventData.getOptionalServices(proposal_no);
        return values;
    } catch (error) {
        return error.message;
    }
}
const getMiscellaneous = async (proposal_no) => {
    try {
        const values = await eventData.getMiscellaneous(proposal_no);
        return values;
    } catch (error) {
        return error.message;
    }
}
const getSalesNotes = async (proposal_no) => {
    try {
        const values = await eventData.getSalesNotes(proposal_no);
        return values;
    } catch (error) {
        return error.message;
    }
}
const getUpfrontCost = async (proposal_no) => {
    try {
        const values = await eventData.getUpfrontCostDetails(proposal_no);
        return values;
    } catch (error) {
        return error.message;
    }
}
const getOngoingMaintenance = async (proposal_no) => {
    try {
        const values = await eventData.getOngoingMainDetails(proposal_no);
        return values;
    } catch (error) {
        return error.message;
    }
}
const getRepaymentSoftwareServices = async (proposal_no) => {
    try {
        const values = await eventData.getRepaymentSoftwareServices(proposal_no);
        return values;
    } catch (error) {
        return error.message;
    }
}
const getRepaymentMaintenance = async (proposal_no) => {
    try {
        const values = await eventData.getRepaymentMaintenanceDetails(proposal_no);
        return values;
    } catch (error) {
        return error.message;
    }
}
const getRepaymentCalc = async (proposal_no) => {
    try {
        const values = await eventData.getRepaymentCalcDetails(proposal_no);
        return values;
    } catch (error) {
        return error.message;
    }
}
const getRepaymentDiscount = async (proposal_no) => {
    try {
        const values = await eventData.getRepaymentDiscount(proposal_no);
        return values;
    } catch (error) {
        return error.message;
    }
}

const getAffinityMobPopupValue = async (proposal_no) => {
    try {
        const values = await eventData.getAffinityMobPopupValue(proposal_no);
        return values;
    } catch (error) {
        return error.message;
    }
}
const getSettlementPopupValue = async (proposal_no) => {
    try {
        const values = await eventData.getSettlementPopupValue(proposal_no);
        return values;
    } catch (error) {
        return error.message;
    }
}
const getEmpowerModules = async (proposal_no) => {
    try {
        const values = await eventData.getEmpowerModuleDetails(proposal_no);
        return values;
    } catch (error) {
        return error.message;
    }
}
const getScopingPopupValue = async (proposal_no) => {
    try {
        const values = await eventData.getScopingStudyPopupValue(proposal_no);
        return values;
    } catch (error) {
        return error.message;
    }
}
const getAffinityServerPopupValues = async (proposal_no) => {
    try {
        const values = await eventData.getAffinityServerPopupValues(proposal_no);
        return values;
    } catch (error) {
        return error.message;
    }
}
const getUpfrontDiscounts = async (proposal_no) => {
    try {
        const values = await eventData.getUpfrontDiscounts(proposal_no);
        return values;
    } catch (error) {
        return error.message;
    }
}


const getProposalData = async (req, res, next) => {
    try {
        const proposal_no = req.params.proposal_no;
        const { user_id } = req.body;
        // console.log('controller called', searchText);
        // const clientNames = await eventData.getProposalDetails(searchText);
        const clientProfile = await getClientProfile(proposal_no);
        const attendingCourses = await getAttendingCourses(proposal_no);
        const defaultServices = await getDefaultServices(proposal_no);
        const optionalServices = await getOptionalServices(proposal_no);
        const miscellaneous = await getMiscellaneous(proposal_no);
        const notes = await getSalesNotes(proposal_no);
        const upfrontCost = await getUpfrontCost(proposal_no);
        const ongoingMaintenance = await getOngoingMaintenance(proposal_no);
        const repaySoftServices = await getRepaymentSoftwareServices(proposal_no);
        const repayMaintenance = await getRepaymentMaintenance(proposal_no);
        const repaymentCalc = await getRepaymentCalc(proposal_no);
        const discountTable = await getRepaymentDiscount(proposal_no);

        const affnityMobPopupValue = await getAffinityMobPopupValue(proposal_no);
        const settlementPopupValue = await getSettlementPopupValue(proposal_no);
        const empowerModules = await getEmpowerModules(proposal_no);
        const scopingPopupValue = await getScopingPopupValue(proposal_no);
        const affinityServerPopupValues = await getAffinityServerPopupValues(proposal_no);
        const upfrontDiscounts = await getUpfrontDiscounts(proposal_no);


        let nextApproverId = null;
        const workflow = await adminEventData.getWorkflow();
        // const proposalStatus = await eventData.getProposalStatus(proposal_no);
        const proposalInfo = await eventData.getProposalDetails(proposal_no);
        const status = Number(proposalInfo[0]?.status_id);
        let generateDoc = false, showLockProposal = false;
        let approversIds = {};
        if (clientProfile[0]?.country === 'Australia') {
            approversIds['salesManager'] = workflow[0]?.aus_user_id;
            approversIds['commLead'] = workflow[1]?.aus_user_id;
            approversIds['cfo'] = workflow[2]?.aus_user_id;
            approversIds['opsTeam'] = workflow[3]?.aus_user_id;

            if (status === 4) {
                nextApproverId = approversIds['salesManager'];
            } else if (status === 5) {
                nextApproverId = approversIds['commLead'];
            } else if (status === 6) {
                nextApproverId = approversIds['cfo'];
            } else if (status === 7) {
                nextApproverId = approversIds['opsTeam'];
                generateDoc = true;
            } else if (status === 8) {
                generateDoc = true;
                if (approversIds['opsTeam'] === Number(user_id) && !Boolean(Number(proposalInfo[0]?.lock_proposal))) {
                    showLockProposal = true;
                }
            }

        } else if (clientProfile[0]?.country === 'New Zealand') {
            approversIds['salesManager'] = workflow[0]?.nz_user_id;
            approversIds['commLead'] = workflow[1]?.nz_user_id; //you will get null here
            approversIds['cfo'] = workflow[2]?.nz_user_id;
            approversIds['opsTeam'] = workflow[3]?.nz_user_id; // you will get null here

            if (status === 4) {
                nextApproverId = approversIds['salesManager'];
            } else if (status === 6) {
                nextApproverId = approversIds['cfo'];
                generateDoc = true;
            } else if (status === 8) {
                generateDoc = true;
                // if (approversIds['cfo'] === Number(user_id) && !Boolean(Number(proposalInfo[0]?.lock_proposal) {
                //     showLockProposal = true;
                // }
            }
        }

        const propStatus = {
            '1': 'Rejected',
            '2': 'Not Submitted for Approval',
            '3': 'Proposal without GCRM client',
            '4': 'Pending for Sales Approval',
            '5': 'Pending for Commercial Lead Approval',
            '6': 'Pending for CFO Approval',
            '7': 'Pending for Ops Team Approval',
            '8': 'Approved',
        }

        const proposalDetails = {
            proposalNo: proposal_no,
            createdBy: proposalInfo[0]?.created_by,
            clientProfile: clientProfile,
            attendingCourses: attendingCourses,
            defaultServicesValues: defaultServices,
            optionalServices: optionalServices,
            miscellaneous: miscellaneous,
            notes: notes,
            upfrontCost: upfrontCost,
            upfrontDiscounts: {
                softwareDiscount: upfrontDiscounts[0]?.software_discount,
                serviceDiscount: upfrontDiscounts[0]?.service_discount,
            },
            ongoingMnt: ongoingMaintenance,
            repaymentCalc: {
                totalsTable: repaySoftServices,
                mntTable: repayMaintenance,
                repayments: repaymentCalc
            },
            discountTable: discountTable,

            affinityMobilePopUpValue: affnityMobPopupValue,
            settlementPopUpValue: settlementPopupValue,
            empowerModules: {
                empowerModules: empowerModules,
                numOfUsers: empowerModules[0]?.num_of_users,
            },
            scopingStudyPopUpValue: scopingPopupValue,
            affinityServerPopupValues: affinityServerPopupValues,
            nextApproverId: nextApproverId,
            approversIds: approversIds,
            proposalStatus: propStatus[status],
            generateDoc: generateDoc,
            showLockProposal: showLockProposal,
            proposalLocked: proposalInfo[0]?.lock_proposal,
            proposalStatus: status,
        }

        res.send([proposalDetails]);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getProposalData
}