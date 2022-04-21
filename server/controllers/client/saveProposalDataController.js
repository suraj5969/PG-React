'use strict';

const eventData = require('../../data/events/client');
const adminEventData = require('../../data/events/admin');

const mailToSalesManager = require('./mails/mailToSalesManager');
const mailToProposalApproval = require('./mails/mailToProposalApproval');

const dotenv = require('dotenv');
dotenv.config();

const saveClientProfile = async (values) => {
    try {
        const result = await eventData.saveClientProfile(values);
        return result;
    } catch (error) {
        return error.message;
    }
}
const saveAttendingCourses = async (values) => {
    try {
        const result = await eventData.saveAttendingCourses(values);
        return result;
    } catch (error) {
        return error.message;
    }
}
const saveDefaultServices = async (values) => {
    try {
        const result = await eventData.saveDefaultServices(values);
        return result;
    } catch (error) {
        return error.message;
    }
}
const saveOptionalServices = async (values) => {
    try {
        const result = await eventData.saveOptionalServices(values);
        return result;
    } catch (error) {
        return error.message;
    }
}
const saveMiscellaneous = async (values) => {
    try {
        const result = await eventData.saveMiscellaneous(values);
        return result;
    } catch (error) {
        return error.message;
    }
}
const saveSalesNotes = async (values) => {
    try {
        const result = await eventData.saveSalesNotes(values);
        return result;
    } catch (error) {
        return error.message;
    }
}
const saveUpfrontCost = async (values) => {
    try {
        const result = await eventData.saveUpfrontCost(values);
        return result;
    } catch (error) {
        return error.message;
    }
}
const saveOngoingMaintenance = async (values) => {
    try {
        const result = await eventData.saveOngoingMaintenance(values);
        return result;
    } catch (error) {
        return error.message;
    }
}
const saveRepaymentCalc = async (values) => {
    try {
        const result = await eventData.saveRepaymentCalc(values);
        return result;
    } catch (error) {
        return error.message;
    }
}

const saveRepaymentDiscount = async (values) => {
    try {
        const result = await eventData.saveRepaymentDiscount(values);
        return result;
    } catch (error) {
        return error.message;
    }
}

const saveAffinityMobPopupValue = async (values) => {
    try {
        const result = await eventData.saveAffinityMobilePopup(values);
        return result;
    } catch (error) {
        return error.message;
    }
}
const saveSettlementPopupValue = async (values) => {
    try {
        const result = await eventData.saveSettlementPopup(values);
        return result;
    } catch (error) {
        return error.message;
    }
}
const saveEmpowerModules = async (values) => {
    try {
        const result = await eventData.saveEmpowerPopup(values);
        return result;
    } catch (error) {
        return error.message;
    }
}
const saveScopingPopupValue = async (values) => {
    try {
        const result = await eventData.saveScopingStudyPopup(values);
        return result;
    } catch (error) {
        return error.message;
    }
}
const saveAffinityServerPopupValues = async (values) => {
    try {
        const result = await eventData.saveAffinityServerPopup(values);
        return result;
    } catch (error) {
        return error.message;
    }
}
const saveProposalDetails = async (values) => {
    try {
        const result = await eventData.saveProposalDetails(values);
        return result;
    } catch (error) {
        return error.message;
    }
}


const setApprovalStatus = async (values) => {
    try {
        const workflow = await adminEventData.getWorkflow();
        // console.log(workflow,'workflow')
        let approversIds = {};
        approversIds['salesManager'] = workflow[0]?.aus_user_id;
        // if (values.country === 'Australia') {
        // }
        // else if (values.country === 'New Zealand') {
        //     approversIds['salesManager'] = workflow[0]?.nz_user_id;
        // }

        let status = null;
        if (!values.clientFromGCRM) {
            status = 3; // for client not from gcrm
        } else if (!values.submittedForWorkflow) {
            status = 2;  // for proposal not submtted for approval
        } else if ((values.objective === 'Upsell' && values.upsell === 'Upgrade') ||
            (values.country === 'Australia' && Number(values.discount) <= 20) ||
            (values.country === 'New Zealand' && Number(values.discount) <= 20)) {
            status = 8; // for approved proposal status
            const result = await eventData.setApprovalStatus(values.proposalNo, status);
            // console.log(result,'ser approval');
            const mailResponse = await mailToProposalApproval.mailToProposalApproval(values.proposalNo);
            return result;
        } else {
            status = 4; // for pending for sales manager approval status
            const result = await eventData.setApprovalStatus(values.proposalNo, status);
            // console.log(result,'ser approval');
            const mailResponse = await mailToSalesManager.mailToSalesManager(approversIds['salesManager'], values.proposalNo);
            return result;
        }
        const result = await eventData.setApprovalStatus(values.proposalNo, status);
        return 'proposal not gone to approval cycle';
    } catch (error) {
        return error.message;
    }
}

const saveProposalData = async (req, res, next) => {
    try {
        // const proposal_no = req.params.proposal_no;
        const values = req.body;
        const count = await eventData.getProposalCounter();
        const proposalNo = `LNPROP${count[0].counter}`;

        const ProposalDetails = {
            proposalNo: proposalNo,
            createdBy: Number(values.createdBy),
            dateOfSubmission: new Date(),
            submittedForWorkflow: values.submittedForWorkflow !== undefined ? Number(values.submittedForWorkflow) : null,
            statusId: null,
            lifecycleId: 1, // for active lifecycle
        }

        // console.log(values);
        const saveProposalData = await saveProposalDetails(ProposalDetails);
        // console.log(saveProposalData,'saveProposalData');
        const clientProfile = await saveClientProfile({ proposalNo, ...values.clientProfile });
        const attendingCourses = await saveAttendingCourses({ proposalNo, ...values.attendingCourses });
        const defaultServices = await saveDefaultServices({ proposalNo, ...values.defaultServices });
        const optionalServices = await saveOptionalServices({ proposalNo, ...values.optionalServices });
        const miscellaneous = await saveMiscellaneous({ proposalNo, ...values.miscellaneous });
        const notes = await saveSalesNotes({ proposalNo, notes: values.notes });
        const upfrontCost = await saveUpfrontCost({ proposalNo, ...values.upfrontCost });
        const ongoingMaintenance = await saveOngoingMaintenance({ proposalNo, ...values.ongoingMnt });
        const repaymentCalc = await saveRepaymentCalc({ proposalNo, ...values.repaymentCalc });
        const repaymentDiscount = await saveRepaymentDiscount({ proposalNo, ...values.discountTable });
        // console.log(repaymentCalc,'repaymentCalc');

        const affnityMobPopupValue = await saveAffinityMobPopupValue({ proposalNo, affinityMobilePopUpValue: values.affinityMobilePopUpValue });
        const settlementPopupValue = await saveSettlementPopupValue({ proposalNo, settlementPopUpValue: values.settlementPopUpValue });
        const empowerModules = await saveEmpowerModules({ proposalNo, empowerModules: values.empowerModules });
        const scopingPopupValue = await saveScopingPopupValue({ proposalNo, scopingStudyPopUpValue: values.scopingStudyPopUpValue });
        const affinityServerPopupValues = await saveAffinityServerPopupValues({ proposalNo, ...values.affinityServerPopupValues });

        const status = setApprovalStatus({
            proposalNo: proposalNo,
            clientFromGCRM: values.clientFromGCRM,
            submittedForWorkflow: values.submittedForWorkflow,
            country: values.clientProfile.country,
            objective: values.clientProfile.objective,
            upsell: values.clientProfile.upsell,
            discount: values.discountTable.totalDis.discountPercent,
        })

        res.send(saveProposalData);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    saveProposalData
}