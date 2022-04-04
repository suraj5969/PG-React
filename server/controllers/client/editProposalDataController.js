'use strict';

const eventData = require('../../data/events/client');
const adminEventData = require('../../data/events/admin');

const mailToSalesManager = require('./mails/mailToSalesManager');
const mailToProposalApproval = require('./mails/mailToProposalApproval');

const editClientProfile = async (values) => {
    try {
        const result = await eventData.editClientProfile(values);
        return result;
    } catch (error) {
        return error.message;
    }
}
const editAttendingCourses = async (values) => {
    try {
        const result = await eventData.editAttendingCourses(values);
        return result;
    } catch (error) {
        return error.message;
    }
}
const editDefaultServices = async (values) => {
    try {
        const result = await eventData.editDefaultServices(values);
        return result;
    } catch (error) {
        return error.message;
    }
}
const editOptionalServices = async (values) => {
    try {
        const result = await eventData.editOptionalServices(values);
        return result;
    } catch (error) {
        return error.message;
    }
}
const editMiscellaneous = async (values) => {
    try {
        const result = await eventData.editMiscellaneous(values);
        return result;
    } catch (error) {
        return error.message;
    }
}
const editSalesNotes = async (values) => {
    try {
        const result = await eventData.editSalesNotes(values);
        return result;
    } catch (error) {
        return error.message;
    }
}
const editUpfrontCost = async (values) => {
    try {
        const result = await eventData.editUpfrontCost(values);
        return result;
    } catch (error) {
        return error.message;
    }
}
const editOngoingMaintenance = async (values) => {
    try {
        const result = await eventData.editOngoingMaintenance(values);
        return result;
    } catch (error) {
        return error.message;
    }
}

const editRepaymentCalc = async (values) => {
    try {
        const result = await eventData.editRepaymentCalc(values);
        return result;
    } catch (error) {
        return error.message;
    }
}

const editRepaymentDiscount = async (values) => {
    try {
        const result = await eventData.editRepaymentDiscount(values);
        return result;
    } catch (error) {
        return error.message;
    }
}

const editAffinityMobPopupValue = async (values) => {
    try {
        const result = await eventData.editAffinityMobilePopup(values);
        return result;
    } catch (error) {
        return error.message;
    }
}
const editSettlementPopupValue = async (values) => {
    try {
        const result = await eventData.editSettlementPopup(values);
        return result;
    } catch (error) {
        return error.message;
    }
}
const editEmpowerModules = async (values) => {
    try {
        const result = await eventData.editEmpowerPopup(values);
        return result;
    } catch (error) {
        return error.message;
    }
}

const editScopingPopupValue = async (values) => {
    try {
        const result = await eventData.editScopingStudyPopup(values);
        return result;
    } catch (error) {
        return error.message;
    }
}

const editAffinityServerPopupValues = async (values) => {
    try {
        const result = await eventData.editAffinityServerPopup(values);
        return result;
    } catch (error) {
        return error.message;
    }
}


const editApprovalStatus = async (values) => {
    try {
        const workflow = await adminEventData.getWorkflow();
        const proposalStatus = await eventData.getProposalStatus(values.proposalNo);
        const prevStatus = Number(proposalStatus[0].status_id);

        if (prevStatus === 1 || prevStatus === 2 || prevStatus === 3) {
            const result = await eventData.editProposalDetails(values.proposalNo, values.user_id, '');
         }
        // console.log(workflow,'workflow')
        let approversIds = {};
        if (values.country === 'Australia') {
            approversIds['salesManager'] = workflow[0]?.aus_user_id;
        }
        else if (values.country === 'New Zealand') {
            approversIds['salesManager'] = workflow[0]?.nz_user_id;
        }

        if (prevStatus === 3 && values.clientFromGCRM === null) {
            // status = 3; // for client not from gcrm
            return;
        }
        let result = null;
        if (values.clientFromGCRM === false) {
            // status = 3; // for client not from gcrm
            result = await eventData.setApprovalStatus(values.proposalNo, 3);
        } else if (prevStatus === 2 && !values.submittedForWorkflow) {
            // status = 2; // for proposal not submtted for approval
            result = await eventData.setApprovalStatus(values.proposalNo, 2);
        } else if ((values.objective === 'Upsell' && values.upsell === 'Upgrade') ||
            (values.country === 'Australia' && Number(values.discount) <= 20) ||
            (values.country === 'New Zealand' && Number(values.discount) <= 20)) {
            // status = 8; // for approved proposal status
            result = await eventData.setApprovalStatus(values.proposalNo, 8);
            // console.log(result,'ser approval');
            const mailResponse = await mailToProposalApproval.mailToProposalApproval(values.proposalNo);
        } else if (values.submittedForWorkflow) {
            // status = 4; // for pending for sales manager approval status
            result = await eventData.setApprovalStatus(values.proposalNo, 4);
            // console.log(result,'ser approval');
            const mailResponse = await mailToSalesManager.mailToSalesManager(approversIds['salesManager'], values.proposalNo);
        }

        return result ? result : 'approval status of proposal not changed';
    } catch (error) {
        return error.message;
    }
}

const editProposalData = async (req, res, next) => {
    try {
        const proposalNo = req.params.proposal_no;
        const values = req.body;

        // console.log(saveProposalData,'saveProposalData');
        const clientProfile = await editClientProfile({ proposalNo, ...values.clientProfile });
        const attendingCourses = await editAttendingCourses({ proposalNo, ...values.attendingCourses });
        const defaultServices = await editDefaultServices({ proposalNo, ...values.defaultServices });
        const optionalServices = await editOptionalServices({ proposalNo, ...values.optionalServices });
        const miscellaneous = await editMiscellaneous({ proposalNo, ...values.miscellaneous });
        const notes = await editSalesNotes({ proposalNo, notes: values.notes });
        const upfrontCost = await editUpfrontCost({ proposalNo, ...values.upfrontCost });
        const ongoingMaintenance = await editOngoingMaintenance({ proposalNo, ...values.ongoingMnt });
        const repaymentCalc = await editRepaymentCalc({ proposalNo, ...values.repaymentCalc });
        const repaymentDiscount = await editRepaymentDiscount({ proposalNo, ...values.discountTable });
        // console.log(clientProfile,attendingCourses, defaultServices, repaymentCalc,'repaymentCalc');

        const affnityMobPopupValue = await editAffinityMobPopupValue({ proposalNo, affinityMobilePopUpValue: values.affinityMobilePopUpValue });
        const settlementPopupValue = await editSettlementPopupValue({ proposalNo, settlementPopUpValue: values.settlementPopUpValue });
        const empowerModules = await editEmpowerModules({ proposalNo, empowerModules: values.empowerModules });
        const scopingPopupValue = await editScopingPopupValue({ proposalNo, scopingStudyPopUpValue: values.scopingStudyPopUpValue });
        const affinityServerPopupValues = await editAffinityServerPopupValues({ proposalNo, ...values.affinityServerPopupValues });

        const status = editApprovalStatus({
            user_id: values.user_id,
            proposalNo: proposalNo,
            clientFromGCRM: values.clientFromGCRM,
            submittedForWorkflow: values.submittedForWorkflow,
            country: values.clientProfile.country,
            objective: values.clientProfile.objective,
            upsell: values.clientProfile.upsell,
            discount: values.discountTable.totalDis.discountPercent,
        })

        res.send('working');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    editProposalData
}