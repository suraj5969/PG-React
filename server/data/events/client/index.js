'use strict';

const utils = require('../../utils');
const config = require('../../../config');
const sql = require('mssql');

const getClientDiscount = async (proposal_no) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const getClientDiscount = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(sqlQueries.getClientDiscount);
        // pool.close();
        return getClientDiscount.recordset;
    } catch (error) {
        return error.message;
    }
}

const getProposalStatus = async (proposal_no) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const getProposalStatus = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(sqlQueries.getProposalStatus);
        // pool.close();
        return getProposalStatus.recordset;
    } catch (error) {
        return error.message;
    }
}

const lockProposal = async (proposal_no) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const lock = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .input('lock_proposal', sql.Int, 1)
            .query(sqlQueries.lockProposal);
        // pool.close();
        return lock.recordset;
    } catch (error) {
        return error.message;
    }
}

const setApprovalStatus = async (proposal_no, status) => {
    try {
        // only set status of proposal dont reject it form here or dont manage approval cycle here
        if (Number(status) === 2 || Number(status) === 3 ||
            Number(status) === 4 || Number(status) === 8) {
            let pool = await sql.connect(config.sql);
            const sqlQueries = await utils.loadSqlQueries('client');

            const setApprovalStatus = await pool.request()
                .input('proposal_no', sql.VarChar(50), proposal_no)
                .input('status', sql.Int, status)
                .query(sqlQueries.setApprovalStatus);
            // console.log(setApprovalStatus,'setApprovalStatus')
            // pool.close();
            return setApprovalStatus.rowsAffected;
        }

    } catch (error) {
        return error.message;
    }
}


const updateApprovalStatus = async (proposal_no, new_status, status, approver_id) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');

        if (Number(status) === 2 || Number(status) === 3 || Number(status) === 8) {
            return;
        }

        if (Number(status) === 4) {
            const setApprovalStatus = await pool.request()
                .input('proposal_no', sql.VarChar(50), proposal_no)
                .input('approval_status', sql.Int, new_status)
                .input('s_manager_approved_date', sql.SmallDateTime, new Date())
                .input('s_manager_id', sql.Int, approver_id)
                .query(sqlQueries.setSalesApprovalStatus);
            // pool.close();
            return setApprovalStatus.rowsAffected;
        } else if (Number(status) === 5) {
            const setApprovalStatus = await pool.request()
                .input('proposal_no', sql.VarChar(50), proposal_no)
                .input('approval_status', sql.Int, new_status)
                .input('comm_approved_date', sql.SmallDateTime, new Date())
                .input('comm_approver_id', sql.Int, approver_id)
                .query(sqlQueries.setCommercialApprovalStatus);
            // pool.close();
            return setApprovalStatus.rowsAffected;
        } else if (Number(status) === 6) {
            const setApprovalStatus = await pool.request()
                .input('proposal_no', sql.VarChar(50), proposal_no)
                .input('approval_status', sql.Int, new_status)
                .input('cfo_approved_date', sql.SmallDateTime, new Date())
                .input('cfo_approver_id', sql.Int, approver_id)
                .query(sqlQueries.setCFOApprovalStatus);
            // pool.close();
            return setApprovalStatus.rowsAffected;
        } else if (Number(status) === 7) {
            const setApprovalStatus = await pool.request()
                .input('proposal_no', sql.VarChar(50), proposal_no)
                .input('approval_status', sql.Int, new_status)
                .input('ops_approved_date', sql.SmallDateTime, new Date())
                .input('ops_approver_id', sql.Int, approver_id)
                .query(sqlQueries.setOPSApprovalStatus);
            // console.log(setApprovalStatus,'setApprovalStatus ')
            // pool.close();
            return setApprovalStatus.rowsAffected;
        }

    } catch (error) {
        return error.message;
    }
}


const getApproverMailID = async (user_id) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const getApproverMailID = await pool.request()
            .input('user_id', sql.Int, user_id)
            .query(sqlQueries.getApproverMailID);
        // pool.close()
        return getApproverMailID.recordset;
    } catch (error) {
        return error.message;
    }
}

const getUserNameByID = async (user_id) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const userName = await pool.request()
            .input('user_id', sql.Int, user_id)
            .query(sqlQueries.getUserNameByID);
        // console.log(userName);
        // pool.close();
        return userName.recordset;
    } catch (error) {
        return error.message;
    }
}

const getProposalDetails = async (proposal_no) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const getProposalDetails = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(sqlQueries.getProposalDetails);
        // pool.close();
        return getProposalDetails.recordset;
    } catch (error) {
        return error.message;
    }
}

const saveProposal = async (proposal_no) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const saveProposal = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(sqlQueries.saveProposal);
        // pool.close();
        return saveProposal.recordset;
    } catch (error) {
        return error.message;
    }
}

const getApproversList = async (proposal_no) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const getApproversList = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(sqlQueries.getApproversList);
        // pool.close();
        return getApproversList.recordset;
    } catch (error) {
        return error.message;
    }
}

//const getApproverDetails = async (proposal_no,next_approver) => {
//    try{
//        let pool = await sql.connect(config.sql);
//        const sqlQueries = await utils.loadSqlQueries('client');
//        const getApproverDetails = await pool.request()
//                                .input('proposal_no',sql.VarChar(50),proposal_no)
//                                .query(sqlQueries.getApproverDetails);
//        return getApproverDetails.recordset;
//    } catch (error) {
//        return error.message;
//    }
//
//}

const rejectProposal = async (proposal_no, rejected_by, rejected_reason) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const rejectProposal = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .input('approval_status', sql.Int, 1) // 1 for rejected status
            .input('rejected_by', sql.Int, rejected_by)
            .input('rejected_date', sql.SmallDateTime, new Date())
            .input('rejected_reason', sql.VarChar(555), rejected_reason)
            .query(sqlQueries.rejectProposal);
        // console.log(rejectProposal);
        // pool.close();
        return rejectProposal.recordset;
    } catch (error) {
        return error.message;
    }
}

const getProposalDetailsForDoc = async (proposal_no) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const getProposalDetailsForDoc = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(sqlQueries.getProposalDetailsForDoc);
        // pool.close()
        return getProposalDetailsForDoc.recordset;
    } catch (error) {
        return error.message;
    }
}

const getUserDetailsWithID = async (user_id) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const getUserDetailsWithID = await pool.request()
            .input('user_id', sql.Int, user_id)
            .query(sqlQueries.getUserDetailsWithID);
        // pool.close()
        return getUserDetailsWithID.recordset;
    } catch (error) {
        return error.message;
    }
}

const getEmpowerModuleDetails = async (proposal_no) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const getModuleDetails = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(sqlQueries.getModuleDetails);
        // pool.close()
        return getModuleDetails.recordset;
    } catch (error) {
        return error.message;
    }
}

const getOptionalServices = async (proposal_no) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const getOptionalServices = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(sqlQueries.getOptionalServices);
        // pool.close()
        return getOptionalServices.recordset;
    } catch (error) {
        return error.message;
    }
}

const getUpfrontCostDetails = async (proposal_no) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const getUpfrontCostDetails = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(sqlQueries.getUpfrontCostDetails);
        // pool.close()
        return getUpfrontCostDetails.recordset;
    } catch (error) {
        return error.message;
    }
}

const getOngoingMainDetails = async (proposal_no) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const values = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(sqlQueries.getOngoingMainDetails);
        // pool.close()
        return values.recordset;
    } catch (error) {
        return error.message;
    }
}

const getRepaymentCalcDetails = async (proposal_no) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const getRepaymentCalcDetails = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(sqlQueries.getRepaymentCalcDetails);
        // pool.close()
        return getRepaymentCalcDetails.recordset;
    } catch (error) {
        return error.message;
    }
}


const getRepaymentMaintenanceDetails = async (proposal_no) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const getRepaymentDetails = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(sqlQueries.getRepaymentMaintenanceDetails);
        // pool.close()
        return getRepaymentDetails.recordset;
    } catch (error) {
        return error.message;
    }
}

const getRepaymentDiscount = async (proposal_no) => {
    try {
        const query = `SELECT [id]
                        ,[proposal_no]
                        ,[label]
                        ,[amt_without_discount]
                        ,[discount_amount]
                        ,[amt_with_discount]
                        ,[discount_percent]
                    FROM [dbo].[repayment_discount]
                    WHERE [proposal_no]=@proposal_no`;
        let pool = await sql.connect(config.sql);
        // const sqlQueries = await utils.loadSqlQueries('client');
        const getRepaymentDetails = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(query);
        // pool.close();
        return getRepaymentDetails.recordset;
    } catch (error) {
        return error.message;
    }
}

const getMiscellaneous = async (proposal_no) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const getRepaymentDetails = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(sqlQueries.getMiscellaneous);
        // pool.close()
        return getRepaymentDetails.recordset;
    } catch (error) {
        return error.message;
    }
}

const getScopingStudyPopupValue = async (proposal_no) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const value = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(sqlQueries.getScopingStudyPopupValue);
        // pool.close()
        return value.recordset;
    } catch (error) {
        return error.message;
    }
}

const getUpfrontDiscounts = async (proposal_no) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const value = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(sqlQueries.getUpfrontDiscounts);
        // pool.close()
        return value.recordset;
    } catch (error) {
        return error.message;
    }
}


const getAffinityServerPopupValues = async (proposal_no) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const values = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(sqlQueries.getAffinityServerPopupValues);
        // pool.close()
        return values.recordset;
    } catch (error) {
        return error.message;
    }
}

const getPracticeAreaKitPopupValues = async (proposal_no) => {
    try {
        const query = `SELECT
    [practiceAreaKit_popup_modules].module_name AS kitName,
    [practiceAreaKit_popup_modules].selected,
    [practiceAreaKit_popup_users_value].num_of_users
    from [dbo].[practiceAreaKit_popup_modules] 
    inner join [dbo].[practiceAreaKit_popup_users_value]
    on  [practiceAreaKit_popup_modules].[proposal_no] =  [practiceAreaKit_popup_users_value].[proposal_no]
    where  [practiceAreaKit_popup_modules].[proposal_no] = @proposal_no`;
        let pool = await sql.connect(config.sql);
        // const sqlQueries = await utils.loadSqlQueries('client');
        const values = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(query);
        // pool.close()
        // console.log('getPracticeAreaKitPopupValues', values.recordset);
        return values.recordset;
    } catch (error) {
        return error.message;
    }
}

const getLnSearchPopupValue = async (proposal_no) => {
    try {
        const query = `SELECT provider AS kitName, selected FROM [dbo].[lexisnexis_search_popup_values] WHERE [proposal_no]=@proposal_no`;
        let pool = await sql.connect(config.sql);
        // const sqlQueries = await utils.loadSqlQueries('client');
        const values = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(query);
        // pool.close()
        // console.log('getLnSearchPopupValue', values.recordset);
        return values.recordset;
    } catch (error) {
        return error.message;
    }
}


const getClientProfile = async (proposal_no) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const clientProfile = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(sqlQueries.getClientProfile);
        // pool.close()
        return clientProfile.recordset;
    } catch (error) {
        return error.message;
    }
}

const getAttendingCourses = async (proposal_no) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const attending = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(sqlQueries.getAttendingCourses);
        // pool.close()
        return attending.recordset;
    } catch (error) {
        return error.message;
    }
}

const getDefaultServices = async (proposal_no) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const values = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(sqlQueries.getDefaultServices);
        // pool.close()
        return values.recordset;
    } catch (error) {
        return error.message;
    }
}

const getSalesNotes = async (proposal_no) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const notes = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(sqlQueries.getSalesNotes);
        // pool.close()
        return notes.recordset;
    } catch (error) {
        return error.message;
    }
}

const getAffinityMobPopupValue = async (proposal_no) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const value = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(sqlQueries.getAffinityMobilePopupValue);
        // pool.close()
        // console.log('affinity value',value.recordset)
        return value.recordset;
    } catch (error) {
        return error.message;
    }
}

const getMitimesPopupValue = async (proposal_no) => {
    try {
        const query = `SELECT num_of_users FROM [dbo].[mitimes_popup_value] WHERE [proposal_no]=@proposal_no`;
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const value = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(query);
        // pool.close()
        // console.log('mitimes value',value.recordset);
        return value.recordset;
    } catch (error) {
        return error.message;
    }
}

const getSettlementPopupValue = async (proposal_no) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const value = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(sqlQueries.getSettlementPopupValue);
        // pool.close()
        return value.recordset;
    } catch (error) {
        return error.message;
    }
}

const getRepaymentSoftwareServices = async (proposal_no) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const value = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .query(sqlQueries.getRepaymentSoftwareServices);
        // pool.close()
        return value.recordset;
    } catch (error) {
        return error.message;
    }
}

const getClientNamesBySearch = async (searchtext) => {
    try {
        // console.log('events called')
        const search = searchtext.replace("'", "''");
        let pool = await sql.connect(config.sql);
        // console.log(search, 'saerchtext')
        // const sqlQueries = await utils.loadSqlQueries('client');
        const query = 'SELECT DISTINCT [acct_id] AS id, [acct_name] AS label' +
            ' FROM [ProposalGenerator].[dbo].[GDW_ACCT_ADDRESS_D]' +
            ' WHERE [acct_name] LIKE N\'%' + search + '%\'';
        const data = await pool.request()
            .query(query);
        // pool.close()
        return data.recordset;
    } catch (error) {
        return error.message;
    }
}

const getClientNameByNumber = async (clientNumber) => {
    try {
        // console.log('events called')
        // const search = searchtext.replace("'", "''");
        let pool = await sql.connect(config.sql);
        // console.log(search, 'saerchtext')
        // const sqlQueries = await utils.loadSqlQueries('client');
        const query = 'SELECT DISTINCT [acct_id] AS id, [acct_name] AS label' +
            ' FROM [ProposalGenerator].[dbo].[GDW_ACCT_ADDRESS_D]' +
            ` WHERE [acct_id] = '${clientNumber}'`;
        const data = await pool.request()
            .query(query);
        // pool.close()
        return data.recordset;
    } catch (error) {
        return error.message;
    }
}


const getOpportunities = async (clientNumber) => {
    try {
        // console.log('events called')
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
            .input('clientNumber', sql.VarChar(150), clientNumber)
            .query(sqlQueries.getOpportunitiesData);
        // pool.close()
        return data.recordset;
    } catch (error) {
        return error.message;
    }
}

const getCountryAddress = async (clientNumber) => {
    try {
        // console.log('events called')
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
            .input('clientNumber', sql.VarChar(15), clientNumber)
            .query(sqlQueries.getCountryAddressData);
        // pool.close()
        return data.recordset;
    } catch (error) {
        return error.message;
    }
}


const getQuickStartInfo = async () => {
    try {
        // console.log('events called')
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
            // .input('service_id', sql.Int, serviceId)
            .query(sqlQueries.getQuickStartData);
        // pool.close()
        return data.recordset;
    } catch (error) {
        return error.message;
    }
}

const getDayConversionInfo = async (dayId) => {
    try {
        // console.log('events called')
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
            .input('day_id', sql.Int, dayId)
            .query(sqlQueries.getDayConversionData);
        // pool.close()
        return data.recordset;
    } catch (error) {
        return error.message;
    }
}

const getAllSolutionSpecialist = async () => {
    try {
        // console.log('events called')
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
            .query(sqlQueries.getAllSolutionSpecialistData);
        // pool.close()
        return data.recordset;
    } catch (error) {
        return error.message;
    }
}

const getAllSoftwares = async () => {
    try {
        // console.log('events called')
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
            .query(sqlQueries.getAllSoftwaresData);
        // pool.close()
        return data.recordset;
    } catch (error) {
        return error.message;
    }
}

const getAllCountries = async () => {
    try {
        // console.log('events called')
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
            .query(sqlQueries.getAllCountriesData);
        // pool.close()
        return data.recordset;
    } catch (error) {
        return error.message;
    }
}


const getHrsPerDayByCountry = async (countryName) => {
    try {
        // console.log('events called')
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
            .input('country_name', sql.VarChar(30), countryName)
            .query(sqlQueries.getHrsPerDayByCountryData);
        // pool.close()
        return data.recordset;
    } catch (error) {
        return error.message;
    }
}


const getAllDataMigrationOptions = async () => {
    try {
        // console.log('events called')
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
            .query(sqlQueries.getAllDataMigrationOptionsData);
        // pool.close()
        return data.recordset;
    } catch (error) {
        return error.message;
    }
}


const getGSTPercentages = async () => {
    try {
        // console.log('events called')
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
            .query(sqlQueries.getGSTPercentagesData);
        // pool.close()
        return data.recordset;
    } catch (error) {
        return error.message;
    }
}

const getProductInfoById = async (productId) => {
    try {
        // console.log('events called')
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
            .input('product_id', sql.VarChar(30), String(productId))
            .query(sqlQueries.getProductInfoByIdData);
        // pool.close()
        return data.recordset;
    } catch (error) {
        return error.message;
    }
}

const getAllEmpowerModules = async () => {
    try {
        // console.log('events called')
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
            .query(sqlQueries.getAllEmpowerModulesData);
        // pool.close()
        return data.recordset;
    } catch (error) {
        return error.message;
    }
}

const getYearUpliftPercent = async () => {
    try {
        // console.log('events called')
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
            .query(sqlQueries.getYearUpliftPercentData);
        // pool.close()
        return data.recordset;
    } catch (error) {
        return error.message;
    }
}

const getOracleWording = async () => {
    try {
        // console.log('events called')
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
            .query(sqlQueries.getOracleWording);
        // pool.close()
        return data.recordset;
    } catch (error) {
        return error.message;
    }
}

const getDashboardData = async (country) => {
    try {
        // console.log('events called')
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
            .input('country', sql.VarChar(50), country)
            .query(sqlQueries.getDashboardData);
        // pool.close()
        // console.log(data);
        return data.recordset;
    } catch (error) {
        return error.message;
    }
}

const archiveProposal = async (proposal_no) => {
    try {
        // console.log('events called')
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .input('lifecycle_id', sql.VarChar(50), 2) //2 as lifecycle_id for archive is 2
            .query(sqlQueries.archiveProposal);
        // pool.close()
        return data.recordset;
    } catch (error) {
        return error.message;
    }
}

const activateProposal = async (proposal_no) => {
    try {
        // console.log('events called')
        let pool = await sql.connect(config.sql);
        // const sqlQueries = await utils.loadSqlQueries('client');
        const query = `UPDATE [dbo].[proposal_details]
                        SET [lifecycle_id] = @lifecycle_id
                        WHERE [proposal_no] = @proposal_no`;
        const data = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .input('lifecycle_id', sql.VarChar(50), 1) //1 as lifecycle_id for active is 1
            .query(query);

        // pool.close();
        return data.rowsAffected;
    } catch (error) {
        return error.message;
    }
}

const getDashboardSlnSpecialist = async (country) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
            // .input('country', sql.VarChar(50), country)
            .query(sqlQueries.getDashboardSlnSpecialist);

        // pool.close();
        return data.recordset;
    } catch (error) {
        return error.message;
    }
}

const getProposalCounter = async () => {
    try {
        // console.log('events called')
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const data = await pool.request()
            .query(sqlQueries.getProposalCounterData);

        // pool.close();
        return data.recordset;
    } catch (error) {
        return error.message;
    }
}

const saveProposalDetails = async (values) => {
    try {
        // console.log('events called')
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');

        const data = await pool.request()
            // .input('c_client_id', sql.Int, 1234)
            .input('proposal_no', sql.VarChar(15), values.proposalNo)
            .input('created_by', sql.Int, values.createdBy)
            .input('date_of_submission', sql.SmallDateTime, values.dateOfSubmission)
            .input('submitted_for_workflow', sql.Int, values.submittedForWorkflow)
            .input('status_id', sql.Int, values.statusId)
            .input('lifecycle_id', sql.Int, values.lifecycleId)
            .query(sqlQueries.saveProposalDetails);
        // console.log(data);
        // pool.close();
        return data.rowsAffected;
    } catch (error) {
        return error.message;
    }
}

const saveClientProfile = async (values) => {
    try {
        // console.log('events called')
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');

        const data = await pool.request()
            // .input('c_client_id', sql.Int, 1234)
            .input('proposal_no', sql.VarChar(15), values.proposalNo)
            .input('c_name', sql.VarChar(200), values.clientName)
            .input('c_number', sql.VarChar(50), values.clientNumber)
            .input('c_opp_no', sql.VarChar(50), values.opportunityNumber)
            .input('c_opp_name', sql.VarChar(555), values.opportunityName)
            .input('c_nou', sql.VarChar(10), values.numOfUsers)
            .input('c_nofe', sql.VarChar(10), values.numOfFreeEarners)
            .input('c_country', sql.VarChar(20), values.country)
            .input('objective', sql.VarChar(20), values.objective)
            .input('commercial_objective', sql.VarChar(555), values.commercialObjective)
            .input('c_upsell', sql.VarChar(20), values.upsell)
            .input('c_solspeclist', sql.Int, Number(values.solutionSpecialistId))
            .input('c_qstart', sql.VarChar(10), values.quickStart)
            .input('c_address', sql.VarChar(555), values.address)
            .input('c_soft_curr', sql.Int, values.currentSoftwareId === '' ? null : Number(values.currentSoftwareId))
            .input('duration', sql.VarChar(20), values.duration)
            .input('c_pvaliddate', sql.DateTime, new Date(values.endValidDate))
            .input('c_closet_time', sql.VarChar(10), Number(values.hoursRequired))
            .input('c_pro_deltime', sql.VarChar(10), values.timeIncluded)
            .input('c_tr_method', sql.VarChar(50), values.traningMethod)
            .input('c_bpa_setup', sql.VarChar(50), values.bpaSetup)
            .input('special_condition', sql.VarChar(555), values.specialConditions)
            .input('currency', sql.VarChar(10), values.currency)
            .query(sqlQueries.saveClientProfile);
        // console.log(data);
        // pool.close();
        return data.rowsAffected;
    } catch (error) {
        return error.message;
    }
}

const saveAttendingCourses = async (values) => {
    try {
        // console.log('events called')
        let pool = await sql.connect(config.sql);

        const tvp = new sql.Table() // You can optionally specify table type name in the first argument.
        // Columns must correspond with type we have created in database.
        tvp.columns.add('proposal_no', sql.VarChar(50))
        tvp.columns.add('course_name', sql.VarChar(550))
        tvp.columns.add('nof_people', sql.VarChar(10))

        // Add rows
        tvp.rows.add(values.proposalNo, values.operationsAdminLabel, values.operationsAdmin) // Values are in same order as columns.
        tvp.rows.add(values.proposalNo, values.dataformsLabel, values.dataforms) // Values are in same order as columns.
        tvp.rows.add(values.proposalNo, values.endUserAccountLabel, values.endUserAccount) // Values are in same order as columns.
        tvp.rows.add(values.proposalNo, values.endUserBPALabel, values.endUserBPA) // Values are in same order as columns.

        const request = new sql.Request()
        request.input('tvp', tvp)
        // let resultData;
        const result = await request.execute('attending_insert_procedure');
        // pool.close();
        return result;
    } catch (error) {
        return error.message;
    }
}

const saveDefaultServices = async (values) => {
    try {
        const { proposalNo, projectMgmt, installationOracle, essentialsCourse, operationsCourse,
            administrationCourse, systemSetup, backprocessing, reconcileTakeUp,
            anticipatedDisbs, trainInBillTemp, endUserTraining, endOfMonth,
            documentMgmt, totalHrsBaseInstall, totalDays } = values;
        // console.log('events called')
        let pool = await sql.connect(config.sql);

        const tvp = new sql.Table() // You can optionally specify table type name in the first argument.
        // Columns must correspond with type we have created in database.
        tvp.columns.add('proposal_no', sql.VarChar(50))
        tvp.columns.add('task', sql.VarChar(550))
        tvp.columns.add('training_method', sql.VarChar(150))
        tvp.columns.add('team', sql.VarChar(150))
        tvp.columns.add('include', sql.VarChar(150))
        tvp.columns.add('pm', sql.VarChar(10))
        tvp.columns.add('tsg', sql.VarChar(10))
        tvp.columns.add('accounts_training', sql.VarChar(10))
        tvp.columns.add('accounts_consulting', sql.VarChar(10))
        tvp.columns.add('bpa_consulting', sql.VarChar(10))
        tvp.columns.add('travel', sql.VarChar(10))
        tvp.columns.add('total_hrs', sql.VarChar(10))

        tvp.rows.add(proposalNo, projectMgmt.task, projectMgmt.traningMethod, projectMgmt.team, projectMgmt.include, projectMgmt.PM, projectMgmt.TSG, projectMgmt.accountsTraining, projectMgmt.accountsConsulting, projectMgmt.BPAConsulting, projectMgmt.travel, projectMgmt.totalHrs)

        tvp.rows.add(proposalNo, installationOracle.task, installationOracle.traningMethod, installationOracle.team, installationOracle.include, installationOracle.PM, installationOracle.TSG, installationOracle.accountsTraining, installationOracle.accountsConsulting, installationOracle.BPAConsulting, installationOracle.travel, installationOracle.totalHrs)

        tvp.rows.add(proposalNo, essentialsCourse.task, essentialsCourse.traningMethod, essentialsCourse.team, essentialsCourse.include, essentialsCourse.PM, essentialsCourse.TSG, essentialsCourse.accountsTraining, essentialsCourse.accountsConsulting, essentialsCourse.BPAConsulting, essentialsCourse.travel, essentialsCourse.totalHrs)

        tvp.rows.add(proposalNo, operationsCourse.task, operationsCourse.traningMethod, operationsCourse.team, operationsCourse.include, operationsCourse.PM, operationsCourse.TSG, operationsCourse.accountsTraining, operationsCourse.accountsConsulting, operationsCourse.BPAConsulting, operationsCourse.travel, operationsCourse.totalHrs)

        tvp.rows.add(proposalNo, administrationCourse.task, administrationCourse.traningMethod, administrationCourse.team, administrationCourse.include, administrationCourse.PM, administrationCourse.TSG, administrationCourse.accountsTraining, administrationCourse.accountsConsulting, administrationCourse.BPAConsulting, administrationCourse.travel, administrationCourse.totalHrs)

        tvp.rows.add(proposalNo, systemSetup.task, systemSetup.traningMethod, systemSetup.team, systemSetup.include, systemSetup.PM, systemSetup.TSG, systemSetup.accountsTraining, systemSetup.accountsConsulting, systemSetup.BPAConsulting, systemSetup.travel, systemSetup.totalHrs)

        tvp.rows.add(proposalNo, backprocessing.task, backprocessing.traningMethod, backprocessing.team, backprocessing.include, backprocessing.PM, backprocessing.TSG, backprocessing.accountsTraining, backprocessing.accountsConsulting, backprocessing.BPAConsulting, backprocessing.travel, backprocessing.totalHrs)

        tvp.rows.add(proposalNo, reconcileTakeUp.task, reconcileTakeUp.traningMethod, reconcileTakeUp.team, reconcileTakeUp.include, reconcileTakeUp.PM, reconcileTakeUp.TSG, reconcileTakeUp.accountsTraining, reconcileTakeUp.accountsConsulting, reconcileTakeUp.BPAConsulting, reconcileTakeUp.travel, reconcileTakeUp.totalHrs)

        tvp.rows.add(proposalNo, anticipatedDisbs.task, anticipatedDisbs.traningMethod, anticipatedDisbs.team, anticipatedDisbs.include, anticipatedDisbs.PM, anticipatedDisbs.TSG, anticipatedDisbs.accountsTraining, anticipatedDisbs.accountsConsulting, anticipatedDisbs.BPAConsulting, anticipatedDisbs.travel, anticipatedDisbs.totalHrs)

        tvp.rows.add(proposalNo, trainInBillTemp.task, trainInBillTemp.traningMethod, trainInBillTemp.team, trainInBillTemp.include, trainInBillTemp.PM, trainInBillTemp.TSG, trainInBillTemp.accountsTraining, trainInBillTemp.accountsConsulting, trainInBillTemp.BPAConsulting, trainInBillTemp.travel, trainInBillTemp.totalHrs)

        tvp.rows.add(proposalNo, endUserTraining.task, endUserTraining.traningMethod, endUserTraining.team, endUserTraining.include, endUserTraining.PM, endUserTraining.TSG, endUserTraining.accountsTraining, endUserTraining.accountsConsulting, endUserTraining.BPAConsulting, endUserTraining.travel, endUserTraining.totalHrs)

        tvp.rows.add(proposalNo, endOfMonth.task, endOfMonth.traningMethod, endOfMonth.team, endOfMonth.include, endOfMonth.PM, endOfMonth.TSG, endOfMonth.accountsTraining, endOfMonth.accountsConsulting, endOfMonth.BPAConsulting, endOfMonth.travel, endOfMonth.totalHrs)

        tvp.rows.add(proposalNo, documentMgmt.task, documentMgmt.traningMethod, documentMgmt.team, documentMgmt.include, documentMgmt.PM, documentMgmt.TSG, documentMgmt.accountsTraining, documentMgmt.accountsConsulting, documentMgmt.BPAConsulting, documentMgmt.travel, documentMgmt.totalHrs)

        tvp.rows.add(proposalNo, totalHrsBaseInstall.task, totalHrsBaseInstall.traningMethod, totalHrsBaseInstall.team, totalHrsBaseInstall.include, totalHrsBaseInstall.PM, totalHrsBaseInstall.TSG, totalHrsBaseInstall.accountsTraining, totalHrsBaseInstall.accountsConsulting, totalHrsBaseInstall.BPAConsulting, totalHrsBaseInstall.travel, totalHrsBaseInstall.totalHrs)

        tvp.rows.add(proposalNo, totalDays.task, totalDays.traningMethod, totalDays.team, totalDays.include, totalDays.PM, totalDays.TSG, totalDays.accountsTraining, totalDays.accountsConsulting, totalDays.BPAConsulting, totalDays.travel, totalDays.totalHrs)

        const request = new sql.Request()
        request.input('tvp', tvp)
        // request.execute('default_insert_procedure')
        const result = await request.execute('default_insert_procedure');
        // pool.close();
        return result;
    } catch (error) {
        return error.message;
    }
}

const saveOptionalServices = async (values) => {
    try {
        const { proposalNo, totalHours, totalDays, grandTotalHours, grandTotalDays,
            dataMigrationRow, selfCustody, multyPartyBilling, reportWriting,
            dataformsMax, scripting, workflow, BPAEndUser, BPAEssentials,
            dataformsPhoneBook, addPrecedent, BPAGoLive, exchangeIntegration,
            softdocsIntegration, clientPortal, worksiteIntegration,
            affinityMobile, empower, settlementAdjuster, thirdPartyIT, mitimes } = values;
        // console.log('events called')
        let pool = await sql.connect(config.sql);


        const tvp = new sql.Table() // You can optionally specify table type name in the first argument.
        // Columns must correspond with type we have created in database.
        tvp.columns.add('proposal_no', sql.VarChar(50))
        tvp.columns.add('task', sql.VarChar(1000))
        tvp.columns.add('include', sql.VarChar(150))
        tvp.columns.add('training_method', sql.VarChar(150))
        tvp.columns.add('team', sql.VarChar(150))
        tvp.columns.add('pm', sql.VarChar(10))
        tvp.columns.add('tsg', sql.VarChar(10))
        tvp.columns.add('data_migration', sql.VarChar(10))
        tvp.columns.add('accounts_training', sql.VarChar(10))
        tvp.columns.add('accounts_consulting', sql.VarChar(10))
        tvp.columns.add('bpa_training', sql.VarChar(10))
        tvp.columns.add('bpa_consulting', sql.VarChar(10))
        tvp.columns.add('travel', sql.VarChar(10))
        tvp.columns.add('total_hrs', sql.VarChar(10))



        tvp.rows.add(proposalNo, dataMigrationRow.task, dataMigrationRow.include, dataMigrationRow.traningMethod, dataMigrationRow.team, dataMigrationRow.PM, dataMigrationRow.TSG, dataMigrationRow.dataMigration, dataMigrationRow.accountsTraining, dataMigrationRow.accountsConsulting, dataMigrationRow.BPATraining, dataMigrationRow.BPAConsulting, dataMigrationRow.travel, dataMigrationRow.totalHrs)

        tvp.rows.add(proposalNo, selfCustody.task, selfCustody.include, selfCustody.traningMethod, selfCustody.team, selfCustody.PM, selfCustody.TSG, selfCustody.dataMigration, selfCustody.accountsTraining, selfCustody.accountsConsulting, selfCustody.BPATraining, selfCustody.BPAConsulting, selfCustody.travel, selfCustody.totalHrs)

        tvp.rows.add(proposalNo, multyPartyBilling.task, multyPartyBilling.include, multyPartyBilling.traningMethod, multyPartyBilling.team, multyPartyBilling.PM, multyPartyBilling.TSG, multyPartyBilling.dataMigration, multyPartyBilling.accountsTraining, multyPartyBilling.accountsConsulting, multyPartyBilling.BPATraining, multyPartyBilling.BPAConsulting, multyPartyBilling.travel, multyPartyBilling.totalHrs)

        tvp.rows.add(proposalNo, reportWriting.task, reportWriting.include, reportWriting.traningMethod, reportWriting.team, reportWriting.PM, reportWriting.TSG, reportWriting.dataMigration, reportWriting.accountsTraining, reportWriting.accountsConsulting, reportWriting.BPATraining, reportWriting.BPAConsulting, reportWriting.travel, reportWriting.totalHrs)

        tvp.rows.add(proposalNo, dataformsMax.task, dataformsMax.include, dataformsMax.traningMethod, dataformsMax.team, dataformsMax.PM, dataformsMax.TSG, dataformsMax.dataMigration, dataformsMax.accountsTraining, dataformsMax.accountsConsulting, dataformsMax.BPATraining, dataformsMax.BPAConsulting, dataformsMax.travel, dataformsMax.totalHrs)

        tvp.rows.add(proposalNo, scripting.task, scripting.include, scripting.traningMethod, scripting.team, scripting.PM, scripting.TSG, scripting.dataMigration, scripting.accountsTraining, scripting.accountsConsulting, scripting.BPATraining, scripting.BPAConsulting, scripting.travel, scripting.totalHrs)

        tvp.rows.add(proposalNo, workflow.task, workflow.include, workflow.traningMethod, workflow.team, workflow.PM, workflow.TSG, workflow.dataMigration, workflow.accountsTraining, workflow.accountsConsulting, workflow.BPATraining, workflow.BPAConsulting, workflow.travel, workflow.totalHrs)

        tvp.rows.add(proposalNo, BPAEndUser.task, BPAEndUser.include, BPAEndUser.traningMethod, BPAEndUser.team, BPAEndUser.PM, BPAEndUser.TSG, BPAEndUser.dataMigration, BPAEndUser.accountsTraining, BPAEndUser.accountsConsulting, BPAEndUser.BPATraining, BPAEndUser.BPAConsulting, BPAEndUser.travel, BPAEndUser.totalHrs)

        tvp.rows.add(proposalNo, BPAEssentials.task, BPAEssentials.include, BPAEssentials.traningMethod, BPAEssentials.team, BPAEssentials.PM, BPAEssentials.TSG, BPAEssentials.dataMigration, BPAEssentials.accountsTraining, BPAEssentials.accountsConsulting, BPAEssentials.BPATraining, BPAEssentials.BPAConsulting, BPAEssentials.travel, BPAEssentials.totalHrs)

        tvp.rows.add(proposalNo, dataformsPhoneBook.task, dataformsPhoneBook.include, dataformsPhoneBook.traningMethod, dataformsPhoneBook.team, dataformsPhoneBook.PM, dataformsPhoneBook.TSG, dataformsPhoneBook.dataMigration, dataformsPhoneBook.accountsTraining, dataformsPhoneBook.accountsConsulting, dataformsPhoneBook.BPATraining, dataformsPhoneBook.BPAConsulting, dataformsPhoneBook.travel, dataformsPhoneBook.totalHrs)

        tvp.rows.add(proposalNo, addPrecedent.task, addPrecedent.include, addPrecedent.traningMethod, addPrecedent.team, addPrecedent.PM, addPrecedent.TSG, addPrecedent.dataMigration, addPrecedent.accountsTraining, addPrecedent.accountsConsulting, addPrecedent.BPATraining, addPrecedent.BPAConsulting, addPrecedent.travel, addPrecedent.totalHrs)

        tvp.rows.add(proposalNo, BPAGoLive.task, BPAGoLive.include, BPAGoLive.traningMethod, BPAGoLive.team, BPAGoLive.PM, BPAGoLive.TSG, BPAGoLive.dataMigration, BPAGoLive.accountsTraining, BPAGoLive.accountsConsulting, BPAGoLive.BPATraining, BPAGoLive.BPAConsulting, BPAGoLive.travel, BPAGoLive.totalHrs)

        tvp.rows.add(proposalNo, exchangeIntegration.task, exchangeIntegration.include, exchangeIntegration.traningMethod, exchangeIntegration.team, exchangeIntegration.PM, exchangeIntegration.TSG, exchangeIntegration.dataMigration, exchangeIntegration.accountsTraining, exchangeIntegration.accountsConsulting, exchangeIntegration.BPATraining, exchangeIntegration.BPAConsulting, exchangeIntegration.travel, exchangeIntegration.totalHrs)

        tvp.rows.add(proposalNo, softdocsIntegration.task, softdocsIntegration.include, softdocsIntegration.traningMethod, softdocsIntegration.team, softdocsIntegration.PM, softdocsIntegration.TSG, softdocsIntegration.dataMigration, softdocsIntegration.accountsTraining, softdocsIntegration.accountsConsulting, softdocsIntegration.BPATraining, softdocsIntegration.BPAConsulting, softdocsIntegration.travel, softdocsIntegration.totalHrs)

        tvp.rows.add(proposalNo, clientPortal.task, clientPortal.include, clientPortal.traningMethod, clientPortal.team, clientPortal.PM, clientPortal.TSG, clientPortal.dataMigration, clientPortal.accountsTraining, clientPortal.accountsConsulting, clientPortal.BPATraining, clientPortal.BPAConsulting, clientPortal.travel, clientPortal.totalHrs)

        tvp.rows.add(proposalNo, worksiteIntegration.task, worksiteIntegration.include, worksiteIntegration.traningMethod, worksiteIntegration.team, worksiteIntegration.PM, worksiteIntegration.TSG, worksiteIntegration.dataMigration, worksiteIntegration.accountsTraining, worksiteIntegration.accountsConsulting, worksiteIntegration.BPATraining, worksiteIntegration.BPAConsulting, worksiteIntegration.travel, worksiteIntegration.totalHrs)

        tvp.rows.add(proposalNo, affinityMobile.task, affinityMobile.include, affinityMobile.traningMethod, affinityMobile.team, affinityMobile.PM, affinityMobile.TSG, affinityMobile.dataMigration, affinityMobile.accountsTraining, affinityMobile.accountsConsulting, affinityMobile.BPATraining, affinityMobile.BPAConsulting, affinityMobile.travel, affinityMobile.totalHrs)

        tvp.rows.add(proposalNo, empower.task, empower.include, empower.traningMethod, empower.team, empower.PM, empower.TSG, empower.dataMigration, empower.accountsTraining, empower.accountsConsulting, empower.BPATraining, empower.BPAConsulting, empower.travel, empower.totalHrs)

        tvp.rows.add(proposalNo, settlementAdjuster.task, settlementAdjuster.include, settlementAdjuster.traningMethod, settlementAdjuster.team, settlementAdjuster.PM, settlementAdjuster.TSG, settlementAdjuster.dataMigration, settlementAdjuster.accountsTraining, settlementAdjuster.accountsConsulting, settlementAdjuster.BPATraining, settlementAdjuster.BPAConsulting, settlementAdjuster.travel, settlementAdjuster.totalHrs)

        tvp.rows.add(proposalNo, thirdPartyIT.task, thirdPartyIT.include, thirdPartyIT.traningMethod, thirdPartyIT.team, thirdPartyIT.PM, thirdPartyIT.TSG, thirdPartyIT.dataMigration, thirdPartyIT.accountsTraining, thirdPartyIT.accountsConsulting, thirdPartyIT.BPATraining, thirdPartyIT.BPAConsulting, thirdPartyIT.travel, thirdPartyIT.totalHrs)

        tvp.rows.add(proposalNo, totalHours.task, totalHours.include, totalHours.traningMethod, totalHours.team, totalHours.PM, totalHours.TSG, totalHours.dataMigration, totalHours.accountsTraining, totalHours.accountsConsulting, totalHours.BPATraining, totalHours.BPAConsulting, totalHours.travel, totalHours.totalHrs)

        tvp.rows.add(proposalNo, totalDays.task, totalDays.include, totalDays.traningMethod, totalDays.team, totalDays.PM, totalDays.TSG, totalDays.dataMigration, totalDays.accountsTraining, totalDays.accountsConsulting, totalDays.BPATraining, totalDays.BPAConsulting, totalDays.travel, totalDays.totalHrs)

        tvp.rows.add(proposalNo, grandTotalHours.task, grandTotalHours.include, grandTotalHours.traningMethod, grandTotalHours.team, grandTotalHours.PM, grandTotalHours.TSG, grandTotalHours.dataMigration, grandTotalHours.accountsTraining, grandTotalHours.accountsConsulting, grandTotalHours.BPATraining, grandTotalHours.BPAConsulting, grandTotalHours.travel, grandTotalHours.totalHrs)

        tvp.rows.add(proposalNo, grandTotalDays.task, grandTotalDays.include, grandTotalDays.traningMethod, grandTotalDays.team, grandTotalDays.PM, grandTotalDays.TSG, grandTotalDays.dataMigration, grandTotalDays.accountsTraining, grandTotalDays.accountsConsulting, grandTotalDays.BPATraining, grandTotalDays.BPAConsulting, grandTotalDays.travel, grandTotalDays.totalHrs)

        tvp.rows.add(proposalNo, mitimes.task, mitimes.include, mitimes.traningMethod, mitimes.team, mitimes.PM, mitimes.TSG, mitimes.dataMigration, mitimes.accountsTraining, mitimes.accountsConsulting, mitimes.BPATraining, mitimes.BPAConsulting, mitimes.travel, mitimes.totalHrs)

        const request = new sql.Request()
        request.input('tvp', tvp)
        // request.execute('optional_insert_procedure')
        const result = await request.execute('optional_insert_procedure');
        // pool.close();
        return result;
    } catch (error) {
        return error.message;
    }
}

const saveMiscellaneous = async (values) => {
    try {
        // console.log('events called')
        const { proposalNo, affinityServer, lexisResearch, scopingStudy,
            additionalReturn, propertyPresidency, practiceAreaKit, lnSearch, macrequineBank, pexaIntegration, feeSynergy, fileman } = values;
        let pool = await sql.connect(config.sql);

        const tvp = new sql.Table() // You can optionally specify table type name in the first argument.
        // Columns must correspond with type we have created in database.
        tvp.columns.add('proposal_no', sql.VarChar(50))
        tvp.columns.add('miscellaneous', sql.VarChar(550))
        tvp.columns.add('included', sql.VarChar(20))
        tvp.columns.add('hours', sql.VarChar(20))
        tvp.columns.add('price', sql.VarChar(20))

        // Add rows
        tvp.rows.add(proposalNo, affinityServer.miscellaneous, affinityServer.included, affinityServer.hours, affinityServer.price)
        tvp.rows.add(proposalNo, lexisResearch.miscellaneous, lexisResearch.included, lexisResearch.hours, lexisResearch.price)
        tvp.rows.add(proposalNo, scopingStudy.miscellaneous, scopingStudy.included, scopingStudy.hours, scopingStudy.price)
        tvp.rows.add(proposalNo, additionalReturn.miscellaneous, additionalReturn.included, additionalReturn.hours, additionalReturn.price)
        tvp.rows.add(proposalNo, propertyPresidency.miscellaneous, propertyPresidency.included, propertyPresidency.hours, propertyPresidency.price)
        tvp.rows.add(proposalNo, practiceAreaKit.miscellaneous, practiceAreaKit.included, practiceAreaKit.hours, practiceAreaKit.price)
        tvp.rows.add(proposalNo, lnSearch.miscellaneous, lnSearch.included, lnSearch.hours, lnSearch.price)
        tvp.rows.add(proposalNo, macrequineBank.miscellaneous, macrequineBank.included, macrequineBank.hours, macrequineBank.price)
        tvp.rows.add(proposalNo, pexaIntegration.miscellaneous, pexaIntegration.included, pexaIntegration.hours, pexaIntegration.price)
        tvp.rows.add(proposalNo, feeSynergy.miscellaneous, feeSynergy.included, feeSynergy.hours, feeSynergy.price)
        tvp.rows.add(proposalNo, fileman.miscellaneous, fileman.included, fileman.hours, fileman.price)
        // for (const i of Object.values(other)) {
        //     tvp.rows.add(proposalNo, i.miscellaneous, i.included, i.hours, i.price)
        // }

        const request = new sql.Request()
        request.input('tvp', tvp)
        // let resultData;
        // request.execute('miscellenous_insert_procedure', (err, result) => {
        //     // console.log(err, 'attending error') // {a: 'hello tvp', b: 777}
        //     // console.log(result, 'attending result') // {a: 'hello tvp', b: 777}
        //     resultData = result;
        // //     pool.close();
        // })
        // return resultData;

        const result = await request.execute('miscellenous_insert_procedure');
        // pool.close();
        return result;
    } catch (error) {
        return error.message;
    }
}

const saveSalesNotes = async (values) => {
    try {

        const { proposalNo, notes } = values;
        // console.log('events called')
        let pool = await sql.connect(config.sql);

        const tvp = new sql.Table() // You can optionally specify table type name in the first argument.
        // Columns must correspond with type we have created in database.
        tvp.columns.add('proposal_no', sql.VarChar(50))
        tvp.columns.add('date', sql.VarChar(50))
        tvp.columns.add('note', sql.VarChar(1500))
        tvp.columns.add('time', sql.VarChar(50))
        tvp.columns.add('user_name', sql.VarChar(50))
        tvp.columns.add('user_id', sql.Int)
        tvp.columns.add('note_no', sql.Int)

        // console.log(typeof notes, 'sales notes')
        notes.forEach(note => {
            tvp.rows.add(proposalNo, note.date, note.note, note.time, note.user, note.user_id, note.note_no)
        });

        const request = new sql.Request()
        request.input('tvp', tvp)
        // let resultData;
        // request.execute('sales_notes_insert_procedure', (err, result) => {
        //     // ... error checks

        //     // console.log(err, 'saveSalesNotes error') // {a: 'hello tvp', b: 777}
        //     // console.log(result, 'saveSalesNotes result') // {a: 'hello tvp', b: 777}
        //     resultData = result;
        // //     pool.close();
        // })
        // return resultData;
        const result = await request.execute('sales_notes_insert_procedure');
        // pool.close();
        return result;
    } catch (error) {
        return error.message;
    }
}

const saveUpfrontCost = async (values) => {
    try {
        // console.log('events called')

        const { proposalNo, softwareDiscount, serviceDiscount, lexisServerLicense, lexisUserLicense,
            oracleLicenses, clientPortal, affinityMobile, lexisSettleAdjuster, twoWayMicrosoft,
            empower, softDocs, ImplementServices, ImplementTraning, postImplementation,
            dataMigration, travelAllowance, scopingStudy, propertyPrecedent,
            subTotal, lessConfidential, totalInvesteExcl, GSTPayable, totalInvestePay,
            totalPerUser, } = values

        const query = `INSERT INTO [dbo].[upfront_discounts] VALUES ('${proposalNo}', '${softwareDiscount}', '${serviceDiscount}')`

        let pool = await sql.connect(config.sql);
        const data = await pool.request()
            .query(query);

        const tvp = new sql.Table() // You can optionally specify table type name in the first argument.
        // Columns must correspond with type we have created in database.

        tvp.columns.add('proposal_no', sql.VarChar(50))
        tvp.columns.add('label', sql.VarChar(550))
        tvp.columns.add('cost', sql.VarChar(50))
        tvp.columns.add('percentDiscount', sql.VarChar(50))
        tvp.columns.add('discountItemcost', sql.VarChar(50))
        tvp.columns.add('discountAmount', sql.VarChar(50))

        // Add rows
        tvp.rows.add(proposalNo, lexisServerLicense.label, lexisServerLicense.cost, lexisServerLicense.percentDiscount, lexisServerLicense.discountItemcost, lexisServerLicense.discountAmount)

        tvp.rows.add(proposalNo, lexisUserLicense.label, lexisUserLicense.cost, lexisUserLicense.percentDiscount, lexisUserLicense.discountItemcost, lexisUserLicense.discountAmount)

        tvp.rows.add(proposalNo, oracleLicenses.label, oracleLicenses.cost, oracleLicenses.percentDiscount, oracleLicenses.discountItemcost, oracleLicenses.discountAmount)

        tvp.rows.add(proposalNo, clientPortal.label, clientPortal.cost, clientPortal.percentDiscount, clientPortal.discountItemcost, clientPortal.discountAmount)

        tvp.rows.add(proposalNo, affinityMobile.label, affinityMobile.cost, affinityMobile.percentDiscount, affinityMobile.discountItemcost, affinityMobile.discountAmount)

        tvp.rows.add(proposalNo, lexisSettleAdjuster.label, lexisSettleAdjuster.cost, lexisSettleAdjuster.percentDiscount, lexisSettleAdjuster.discountItemcost, lexisSettleAdjuster.discountAmount)

        tvp.rows.add(proposalNo, twoWayMicrosoft.label, twoWayMicrosoft.cost, twoWayMicrosoft.percentDiscount, twoWayMicrosoft.discountItemcost, twoWayMicrosoft.discountAmount)

        tvp.rows.add(proposalNo, empower.label, empower.cost, empower.percentDiscount, empower.discountItemcost, empower.discountAmount)

        tvp.rows.add(proposalNo, softDocs.label, softDocs.cost, softDocs.percentDiscount, softDocs.discountItemcost, softDocs.discountAmount)

        tvp.rows.add(proposalNo, ImplementServices.label, ImplementServices.cost, ImplementServices.percentDiscount, ImplementServices.discountItemcost, ImplementServices.discountAmount)

        tvp.rows.add(proposalNo, ImplementTraning.label, ImplementTraning.cost, ImplementTraning.percentDiscount, ImplementTraning.discountItemcost, ImplementTraning.discountAmount)

        tvp.rows.add(proposalNo, postImplementation.label, postImplementation.cost, postImplementation.percentDiscount, postImplementation.discountItemcost, postImplementation.discountAmount)

        tvp.rows.add(proposalNo, dataMigration.label, dataMigration.cost, dataMigration.percentDiscount, dataMigration.discountItemcost, dataMigration.discountAmount)

        tvp.rows.add(proposalNo, travelAllowance.label, travelAllowance.cost, travelAllowance.percentDiscount, travelAllowance.discountItemcost, travelAllowance.discountAmount)

        tvp.rows.add(proposalNo, scopingStudy.label, scopingStudy.cost, scopingStudy.percentDiscount, scopingStudy.discountItemcost, scopingStudy.discountAmount)

        tvp.rows.add(proposalNo, propertyPrecedent.label, propertyPrecedent.cost, propertyPrecedent.percentDiscount, propertyPrecedent.discountItemcost, propertyPrecedent.discountAmount)

        tvp.rows.add(proposalNo, subTotal.label, subTotal.cost, subTotal.percentDiscount, subTotal.discountItemcost, subTotal.discountAmount)

        tvp.rows.add(proposalNo, lessConfidential.label, lessConfidential.cost, lessConfidential.percentDiscount, lessConfidential.discountItemcost, lessConfidential.discountAmount)

        tvp.rows.add(proposalNo, totalInvesteExcl.label, totalInvesteExcl.cost, totalInvesteExcl.percentDiscount, totalInvesteExcl.discountItemcost, totalInvesteExcl.discountAmount)

        tvp.rows.add(proposalNo, GSTPayable.label, GSTPayable.cost, GSTPayable.percentDiscount, GSTPayable.discountItemcost, GSTPayable.discountAmount)

        tvp.rows.add(proposalNo, totalInvestePay.label, totalInvestePay.cost, totalInvestePay.percentDiscount, totalInvestePay.discountItemcost, totalInvestePay.discountAmount)

        tvp.rows.add(proposalNo, totalPerUser.label, totalPerUser.cost, totalPerUser.percentDiscount, totalPerUser.discountItemcost, totalPerUser.discountAmount)


        const request = new sql.Request()
        request.input('tvp', tvp)
        // let resultData;
        // request.execute('upfront_cost_insert_procedure', (err, result) => {
        //     // ... error checks

        //     // console.log(err, 'upfront_cost error') 
        //     // console.log(result, 'upfront_cost result') 
        //     resultData = result;
        // //     pool.close();
        // })
        // return resultData;

        const result = await request.execute('upfront_cost_insert_procedure');
        // pool.close();
        return result;
    } catch (error) {
        return error.message;
    }
}

const saveOngoingMaintenance = async (values) => {
    try {
        // console.log('events called')
        const { proposalNo, annualAffinity, annualOracleCare, annualAffinityMobile, annualClient,
            annualEmpower, annualSoftDocs, annualSettlement, subTotal, lessConfidential,
            totalMntExclGST, GSTPayable, totalMntAnnual, totalMntMonthly,
            totalAnnualCost, totalCostMonth, } = values;

        let pool = await sql.connect(config.sql);

        const tvp = new sql.Table() // You can optionally specify table type name in the first argument.
        // Columns must correspond with type we have created in database.
        tvp.columns.add('proposal_no', sql.VarChar(50))
        tvp.columns.add('lexis_care', sql.VarChar(550))
        tvp.columns.add('cost', sql.VarChar(50))
        tvp.columns.add('percentDiscount', sql.VarChar(50))
        tvp.columns.add('discountItemcost', sql.VarChar(50))
        tvp.columns.add('discountAmount', sql.VarChar(50))

        tvp.rows.add(proposalNo, annualAffinity.label, annualAffinity.cost, annualAffinity.percentDiscount, annualAffinity.discountItemcost, annualAffinity.discountAmount)

        tvp.rows.add(proposalNo, annualOracleCare.label, annualOracleCare.cost, annualOracleCare.percentDiscount, annualOracleCare.discountItemcost, annualOracleCare.discountAmount)

        tvp.rows.add(proposalNo, annualAffinityMobile.label, annualAffinityMobile.cost, annualAffinityMobile.percentDiscount, annualAffinityMobile.discountItemcost, annualAffinityMobile.discountAmount)

        tvp.rows.add(proposalNo, annualClient.label, annualClient.cost, annualClient.percentDiscount, annualClient.discountItemcost, annualClient.discountAmount)

        tvp.rows.add(proposalNo, annualEmpower.label, annualEmpower.cost, annualEmpower.percentDiscount, annualEmpower.discountItemcost, annualEmpower.discountAmount)

        tvp.rows.add(proposalNo, annualSoftDocs.label, annualSoftDocs.cost, annualSoftDocs.percentDiscount, annualSoftDocs.discountItemcost, annualSoftDocs.discountAmount)

        tvp.rows.add(proposalNo, annualSettlement.label, annualSettlement.cost, annualSettlement.percentDiscount, annualSettlement.discountItemcost, annualSettlement.discountAmount)

        tvp.rows.add(proposalNo, subTotal.label, subTotal.cost, subTotal.percentDiscount, subTotal.discountItemcost, subTotal.discountAmount)

        tvp.rows.add(proposalNo, lessConfidential.label, lessConfidential.cost, lessConfidential.percentDiscount, lessConfidential.discountItemcost, lessConfidential.discountAmount)

        tvp.rows.add(proposalNo, totalMntExclGST.label, totalMntExclGST.cost, totalMntExclGST.percentDiscount, totalMntExclGST.discountItemcost, totalMntExclGST.discountAmount)

        tvp.rows.add(proposalNo, GSTPayable.label, GSTPayable.cost, GSTPayable.percentDiscount, GSTPayable.discountItemcost, GSTPayable.discountAmount)

        tvp.rows.add(proposalNo, totalMntAnnual.label, totalMntAnnual.cost, totalMntAnnual.percentDiscount, totalMntAnnual.discountItemcost, totalMntAnnual.discountAmount)

        tvp.rows.add(proposalNo, totalMntMonthly.label, totalMntMonthly.cost, totalMntMonthly.percentDiscount, totalMntMonthly.discountItemcost, totalMntMonthly.discountAmount)

        tvp.rows.add(proposalNo, totalAnnualCost.label, totalAnnualCost.cost, totalAnnualCost.percentDiscount, totalAnnualCost.discountItemcost, totalAnnualCost.discountAmount)

        tvp.rows.add(proposalNo, totalCostMonth.label, totalCostMonth.cost, totalCostMonth.percentDiscount, totalCostMonth.discountItemcost, totalCostMonth.discountAmount)


        const request = new sql.Request()
        request.input('tvp', tvp)
        // let resultData;
        // request.execute('ongoing_maintenance_insert_procedure', (err, result) => {
        //     // ... error checks

        //     // console.log(err, 'ongoing_maintenance_insert_procedure error') 
        //     // console.log(result, 'ongoing_maintenance_insert_procedure result') 
        //     resultData = result;
        // //     pool.close();
        // })
        // return resultData;

        const result = await request.execute('ongoing_maintenance_insert_procedure');
        // pool.close();
        return result;
    } catch (error) {
        return error.message;
    }
}

const saveRepaymentDiscount = async (values) => {
    try {
        // console.log('events called')
        const { proposalNo, softwareDis, serviceDis, lexisCareDis, totalDis } = values;

        let pool = await sql.connect(config.sql);

        const tvp = new sql.Table() // You can optionally specify table type name in the first argument.
        // Columns must correspond with type we have created in database.
        tvp.columns.add('proposal_no', sql.VarChar(50))
        tvp.columns.add('label', sql.VarChar(550))
        tvp.columns.add('amt_without_discount', sql.VarChar(20))
        tvp.columns.add('discount_amount', sql.VarChar(20))
        tvp.columns.add('amt_with_discount', sql.VarChar(20))
        tvp.columns.add('discount_percent', sql.VarChar(20))

        tvp.rows.add(proposalNo, softwareDis.label, softwareDis.totalAmount, softwareDis.discountAmount, softwareDis.amountAfterDiscount, softwareDis.discountPercent)

        tvp.rows.add(proposalNo, serviceDis.label, serviceDis.totalAmount, serviceDis.discountAmount, serviceDis.amountAfterDiscount, serviceDis.discountPercent)

        tvp.rows.add(proposalNo, lexisCareDis.label, lexisCareDis.totalAmount, lexisCareDis.discountAmount, lexisCareDis.amountAfterDiscount, lexisCareDis.discountPercent)

        tvp.rows.add(proposalNo, totalDis.label, totalDis.totalAmount, totalDis.discountAmount, totalDis.amountAfterDiscount, totalDis.discountPercent)


        const request = new sql.Request()
        request.input('tvp', tvp)
        // let resultData;
        // request.execute('repay_discount_insert_procedure', (err, result) => {
        //     // ... error checks 
        //     resultData = result;
        // //     pool.close();
        // })
        // return resultData;

        const result = await request.execute('repay_discount_insert_procedure');
        // pool.close();
        return result;
    } catch (error) {
        return error.message;
    }
}

const saveRepaymentCalc = async (values) => {
    try {
        // console.log('events called')

        const { proposalNo, totalsTable, mntTable, repayments } = values;

        const { software, services, sTotal, pricePerTool, priceTotal } = totalsTable;

        const { year1, year2, year3, year4, year5, mntTotal } = mntTable;

        const { initPayment, month1, month2, month3, month4, month5, month6, month7, month8,
            month9, month10, month11, month12, month13, month14, month15, month16, month17,
            month18, month19, month20, month21, month22, month23, month24, month25, month26,
            month27, month28, month29, month30, month31, month32, month33, month34, month35,
            month36, month37, month38, month39, month40, month41, month42, month43, month44,
            month45, month46, month47, month48, month49, month50, month51, month52, month53,
            month54, month55, month56, month57, month58, month59, month60, repaymentTotal } = repayments;

        let pool = await sql.connect(config.sql);

        const tvp = new sql.Table() // You can optionally specify table type name in the first argument.
        // Columns must correspond with type we have created in database.
        tvp.columns.add('proposal_no', sql.VarChar(50))
        tvp.columns.add('label', sql.VarChar(550))
        tvp.columns.add('cost', sql.VarChar(50))
        tvp.columns.add('gcrm_entries', sql.VarChar(50))

        tvp.rows.add(proposalNo, software.label, software.cost, software.gcrmEntries)
        tvp.rows.add(proposalNo, services.label, services.cost, services.gcrmEntries)
        tvp.rows.add(proposalNo, sTotal.label, sTotal.cost, sTotal.gcrmEntries)
        tvp.rows.add(proposalNo, pricePerTool.label, pricePerTool.cost, pricePerTool.gcrmEntries)
        tvp.rows.add(proposalNo, priceTotal.label, priceTotal.cost, priceTotal.gcrmEntries)

        const request = new sql.Request()
        request.input('tvp', tvp)
        // let resultData;
        // request.execute('repay_soft_services_insert_procedure', (err, result) => {
        //     // console.log(err, 'attending error') // {a: 'hello tvp', b: 777}
        //     // console.log(result, 'attending result') // {a: 'hello tvp', b: 777}
        //     resultData = result;
        // })
        const result1 = await request.execute('repay_soft_services_insert_procedure');

        const tvp2 = new sql.Table()

        tvp2.columns.add('proposal_no', sql.VarChar(50))
        tvp2.columns.add('label', sql.VarChar(550))
        tvp2.columns.add('cost', sql.VarChar(50))
        tvp2.columns.add('gcrm_entries', sql.VarChar(50))

        tvp2.rows.add(proposalNo, year1.label, year1.RRP, year1.discounted)
        tvp2.rows.add(proposalNo, year2.label, year2.RRP, year2.discounted)
        tvp2.rows.add(proposalNo, year3.label, year3.RRP, year3.discounted)
        tvp2.rows.add(proposalNo, year4.label, year4.RRP, year4.discounted)
        tvp2.rows.add(proposalNo, year5.label, year5.RRP, year5.discounted)
        tvp2.rows.add(proposalNo, mntTotal.label, mntTotal.RRP, mntTotal.discounted)

        const request2 = new sql.Request()
        request2.input('tvp', tvp2)
        // let resultData;
        // request2.execute('repay_maintenance_insert_procedure', (err, result) => {
        //     // console.log(err, 'attending error') // {a: 'hello tvp', b: 777}
        //     // console.log(result, 'attending result') // {a: 'hello tvp', b: 777}
        //     resultData = result;
        // })
        const result2 = await request2.execute('repay_maintenance_insert_procedure');


        const tvp3 = new sql.Table()

        tvp3.columns.add('proposal_no', sql.VarChar(50))
        tvp3.columns.add('label', sql.VarChar(550))
        tvp3.columns.add('payment', sql.VarChar(50))
        tvp3.columns.add('lexis_care', sql.VarChar(50))

        tvp3.rows.add(proposalNo, initPayment.label, initPayment.payments, initPayment.lexisCare)
        tvp3.rows.add(proposalNo, month1.label, month1.payments, month1.lexisCare)
        tvp3.rows.add(proposalNo, month2.label, month2.payments, month2.lexisCare)
        tvp3.rows.add(proposalNo, month3.label, month3.payments, month3.lexisCare)
        tvp3.rows.add(proposalNo, month4.label, month4.payments, month4.lexisCare)
        tvp3.rows.add(proposalNo, month5.label, month5.payments, month5.lexisCare)
        tvp3.rows.add(proposalNo, month6.label, month6.payments, month6.lexisCare)
        tvp3.rows.add(proposalNo, month7.label, month7.payments, month7.lexisCare)
        tvp3.rows.add(proposalNo, month8.label, month8.payments, month8.lexisCare)
        tvp3.rows.add(proposalNo, month9.label, month9.payments, month9.lexisCare)
        tvp3.rows.add(proposalNo, month10.label, month10.payments, month10.lexisCare)
        tvp3.rows.add(proposalNo, month11.label, month11.payments, month11.lexisCare)
        tvp3.rows.add(proposalNo, month12.label, month12.payments, month12.lexisCare)
        tvp3.rows.add(proposalNo, month13.label, month13.payments, month13.lexisCare)
        tvp3.rows.add(proposalNo, month14.label, month14.payments, month14.lexisCare)
        tvp3.rows.add(proposalNo, month15.label, month15.payments, month15.lexisCare)
        tvp3.rows.add(proposalNo, month16.label, month16.payments, month16.lexisCare)
        tvp3.rows.add(proposalNo, month17.label, month17.payments, month17.lexisCare)
        tvp3.rows.add(proposalNo, month18.label, month18.payments, month18.lexisCare)
        tvp3.rows.add(proposalNo, month19.label, month19.payments, month19.lexisCare)
        tvp3.rows.add(proposalNo, month20.label, month20.payments, month20.lexisCare)
        tvp3.rows.add(proposalNo, month21.label, month21.payments, month21.lexisCare)
        tvp3.rows.add(proposalNo, month22.label, month22.payments, month22.lexisCare)
        tvp3.rows.add(proposalNo, month23.label, month23.payments, month23.lexisCare)
        tvp3.rows.add(proposalNo, month24.label, month24.payments, month24.lexisCare)
        tvp3.rows.add(proposalNo, month25.label, month25.payments, month25.lexisCare)
        tvp3.rows.add(proposalNo, month26.label, month26.payments, month26.lexisCare)
        tvp3.rows.add(proposalNo, month27.label, month27.payments, month27.lexisCare)
        tvp3.rows.add(proposalNo, month28.label, month28.payments, month28.lexisCare)
        tvp3.rows.add(proposalNo, month29.label, month29.payments, month29.lexisCare)
        tvp3.rows.add(proposalNo, month30.label, month30.payments, month30.lexisCare)
        tvp3.rows.add(proposalNo, month31.label, month31.payments, month31.lexisCare)
        tvp3.rows.add(proposalNo, month32.label, month32.payments, month32.lexisCare)
        tvp3.rows.add(proposalNo, month33.label, month33.payments, month33.lexisCare)
        tvp3.rows.add(proposalNo, month34.label, month34.payments, month34.lexisCare)
        tvp3.rows.add(proposalNo, month35.label, month35.payments, month35.lexisCare)
        tvp3.rows.add(proposalNo, month36.label, month36.payments, month36.lexisCare)
        tvp3.rows.add(proposalNo, month37.label, month37.payments, month37.lexisCare)
        tvp3.rows.add(proposalNo, month38.label, month38.payments, month38.lexisCare)
        tvp3.rows.add(proposalNo, month39.label, month39.payments, month39.lexisCare)
        tvp3.rows.add(proposalNo, month40.label, month40.payments, month40.lexisCare)
        tvp3.rows.add(proposalNo, month41.label, month41.payments, month41.lexisCare)
        tvp3.rows.add(proposalNo, month42.label, month42.payments, month42.lexisCare)
        tvp3.rows.add(proposalNo, month43.label, month43.payments, month43.lexisCare)
        tvp3.rows.add(proposalNo, month44.label, month44.payments, month44.lexisCare)
        tvp3.rows.add(proposalNo, month45.label, month45.payments, month45.lexisCare)
        tvp3.rows.add(proposalNo, month46.label, month46.payments, month46.lexisCare)
        tvp3.rows.add(proposalNo, month47.label, month47.payments, month47.lexisCare)
        tvp3.rows.add(proposalNo, month48.label, month48.payments, month48.lexisCare)
        tvp3.rows.add(proposalNo, month49.label, month49.payments, month49.lexisCare)
        tvp3.rows.add(proposalNo, month50.label, month50.payments, month50.lexisCare)
        tvp3.rows.add(proposalNo, month51.label, month51.payments, month51.lexisCare)
        tvp3.rows.add(proposalNo, month52.label, month52.payments, month52.lexisCare)
        tvp3.rows.add(proposalNo, month53.label, month53.payments, month53.lexisCare)
        tvp3.rows.add(proposalNo, month54.label, month54.payments, month54.lexisCare)
        tvp3.rows.add(proposalNo, month55.label, month55.payments, month55.lexisCare)
        tvp3.rows.add(proposalNo, month56.label, month56.payments, month56.lexisCare)
        tvp3.rows.add(proposalNo, month57.label, month57.payments, month57.lexisCare)
        tvp3.rows.add(proposalNo, month58.label, month58.payments, month58.lexisCare)
        tvp3.rows.add(proposalNo, month59.label, month59.payments, month59.lexisCare)
        tvp3.rows.add(proposalNo, month60.label, month60.payments, month60.lexisCare)
        tvp3.rows.add(proposalNo, repaymentTotal.label, repaymentTotal.payments, repaymentTotal.lexisCare)


        const request3 = new sql.Request()
        request3.input('tvp', tvp3)
        // let resultData;
        // request3.execute('repay_calculator_insert_procedure', (err, result) => {
        //     // console.log(result, 'resultData of repay calc') 
        //     resultData = result;
        // })
        // return resultData;

        const result3 = await request3.execute('repay_calculator_insert_procedure');
        // pool.close();
        return result3;
    } catch (error) {
        return error.message;
    }
}

const saveAffinityMobilePopup = async (values) => {
    try {
        // console.log('events called')
        const { proposalNo, affinityMobilePopUpValue } = values;
        const query = `INSERT INTO [dbo].[affinity_mobile_popup_value] VALUES ('${proposalNo}', '${affinityMobilePopUpValue}')`

        let pool = await sql.connect(config.sql);
        const data = await pool.request()
            .query(query);

        // pool.close();
        return data.rowsAffected;
    } catch (error) {
        return error.message;
    }
}
const saveMitimesPopup = async (values) => {
    // console.log('mitimes called', values)
    try {
        // console.log('events called')
        const { proposalNo, mitimesPopupValue } = values;
        const query = `INSERT INTO [dbo].[mitimes_popup_value] VALUES ('${proposalNo}', '${mitimesPopupValue}')`

        let pool = await sql.connect(config.sql);
        const data = await pool.request()
            .query(query);

        // pool.close();
        return data.rowsAffected;
    } catch (error) {
        return error.message;
    }
}

const saveSettlementPopup = async (values) => {
    try {
        // console.log('events called')
        const { proposalNo, settlementPopUpValue } = values;
        const query = `INSERT INTO [dbo].[settlement_popup_value] VALUES ('${proposalNo}', '${settlementPopUpValue}')`

        let pool = await sql.connect(config.sql);
        const data = await pool.request()
            .query(query);

        // pool.close();
        return data.rowsAffected;
    } catch (error) {
        return error.message;
    }
}

const saveEmpowerPopup = async (values) => {
    try {
        // console.log('events called')
        const { proposalNo, empowerModules } = values;

        const query = `INSERT INTO [dbo].[empower_popup_users_value] VALUES ('${proposalNo}', '${empowerModules.numOfUsers}')`
        let pool = await sql.connect(config.sql);
        const data = await pool.request()
            .query(query);

        const tvp = new sql.Table() // You can optionally specify table type name in the first argument.
        // Columns must correspond with type we have created in database.
        tvp.columns.add('proposal_no', sql.VarChar(50))
        tvp.columns.add('module_name', sql.VarChar(500))
        tvp.columns.add('selected', sql.VarChar(10))

        for (const i of Object.values(empowerModules.empowerModules)) {
            tvp.rows.add(proposalNo, i.empower_name, Number(i.checked))
        }

        const request = new sql.Request()
        request.input('tvp', tvp)
        // let resultData;
        // request.execute('empower_modules_insert_procedure', (err, result) => {
        //     // console.log(err, 'empower_modules_insert_procedure error')
        //     // console.log(result, 'empower_modules_insert_procedure result')
        //     resultData = result;
        // //     pool.close();
        // })

        // return data.rowsAffected;

        const result = await request.execute('empower_modules_insert_procedure');
        // pool.close();
        return result;
    } catch (error) {
        return error.message;
    }
}

const saveScopingStudyPopup = async (values) => {
    try {
        // console.log('events called')
        const { proposalNo, scopingStudyPopUpValue } = values;
        const query = `INSERT INTO [dbo].[scoping_study_popup_value] VALUES ('${proposalNo}', '${scopingStudyPopUpValue}')`

        let pool = await sql.connect(config.sql);
        const data = await pool.request()
            .query(query);

        // pool.close();
        return data.rowsAffected;
    } catch (error) {
        return error.message;
    }
}

const saveAffinityServerPopup = async (values) => {
    try {
        // console.log('affintty server cpu popup query called')
        const { proposalNo, typeOfLicense, numOfUsers, edition, serverLicense, oracleLicense, maintenance, total } = values;
        const query = `INSERT INTO [dbo].[affinity_server_popup_values] VALUES ('${proposalNo}', '${typeOfLicense}', '${numOfUsers}', '${edition}', '${serverLicense}', '${oracleLicense}', '${maintenance}', '${total}')`
        // console.log('Affinity query', query);
        let pool = await sql.connect(config.sql);
        const data = await pool.request()
            .query(query);
        // console.log(data,'affintty server cpu popup result')
        // pool.close();
        return data.rowsAffected;
    } catch (error) {
        console.log(error.message, 'affintty server cpu popup query error');
        return error.message;
    }
}

const savePracticeAreaKitPopup = async (values) => {
    // console.log("values",values);
    try {
        // console.log('affintty server cpu popup query called')
        const { proposalNo, practiceAreaKitPopupValues } = values;
        // console.log('number of user', practiceAreaKitPopupValues);

        const query = `INSERT INTO [dbo].[practiceAreaKit_popup_users_value] VALUES ('${proposalNo}', '${practiceAreaKitPopupValues.numOfUsers}')`
        let pool = await sql.connect(config.sql);
        const data = await pool.request()
            .query(query);

        const tvp = new sql.Table() // You can optionally specify table type name in the first argument.
        // Columns must correspond with type we have created in database.
        tvp.columns.add('proposal_no', sql.VarChar(50))
        tvp.columns.add('module_name', sql.VarChar(500))
        tvp.columns.add('selected', sql.VarChar(10))

        for (const i of Object.values(practiceAreaKitPopupValues.practiceAreaKitModules)) {
            // console.log(proposalNo,i.kitName, i.checked);
            tvp.rows.add(proposalNo, i.kitName, Number(i.checked))
        }

        const request = new sql.Request()
        request.input('tvp', tvp)
        const result = await request.execute('practiceAreaKit_modules_insert_procedure');
        // pool.close();
        return result;

        // return data.rowsAffected;
    } catch (error) {
        console.log(error.message, 'practiceAreaKit search popup query error');
        return error.message;
    }
}

const saveLnSearchPopup = async (values) => {
    // console.log("values",values);
    try {
        // console.log('affintty server cpu popup query called')
        const { proposalNo, lnSearchModules } = values;

        // const query = `INSERT INTO [dbo].[lexisnexis_search_popup_values] VALUES ('${proposalNo}', '${provider}', '${selected}')`
        // let pool = await sql.connect(config.sql);
        // const data = await pool.request()
        //     .query(query);
        // pool.close();

        const tvp = new sql.Table() // You can optionally specify table type name in the first argument.
        // Columns must correspond with type we have created in database.
        tvp.columns.add('proposal_no', sql.VarChar(50))
        tvp.columns.add('provider', sql.VarChar(500))
        tvp.columns.add('selected', sql.VarChar(10))

        for (const i of Object.values(lnSearchModules)) {
            // console.log(proposalNo,i.kitName, i.checked);
            tvp.rows.add(proposalNo, i.kitName, Number(i.checked))
        }

        const request = new sql.Request()
        request.input('tvp', tvp)
        const result = await request.execute('lnsearch_modules_insert_procedure');
        // pool.close();
        return result;

        // return data.rowsAffected;
    } catch (error) {
        console.log(error.message, 'lexisnexis search popup query error');
        return error.message;
    }
}


const editExample = async () => {
    // this can be called in getAllCountriesController it is commented there
    try {
        // console.log('events called')
        let pool = await sql.connect(config.sql);
        // const data = await pool.request()
        //     .query(`DELETE FROM [dbo].[example] WHERE [id] = '5'`);
        // console.log(data, 'expale delete data');
        const tvp = new sql.Table() // You can optionally specify table type name in the first argument.
        // Columns must correspond with type we have created in database.

        tvp.columns.add('name', sql.VarChar(50))
        tvp.columns.add('amount', sql.Int)
        tvp.columns.add('description', sql.VarChar(100))

        // Add rows
        tvp.rows.add("name14", 10, 'desc11')
        tvp.rows.add("name14", 22, 'desc12')
        tvp.rows.add("name14", 133, 'desc13')
        tvp.rows.add("name14", 44, 'desc14')
        tvp.rows.add("name14", 155, 'desc15')

        const request = new sql.Request()
        request.input('tvp', tvp)
        // console.log(tvp,'tvp of example table')
        let resultData;
        request.execute('example_insert_procedure', (err, result) => {
            // ... error checks
            console.log(err, result, 'example insert procedure')
            resultData = result;
            // pool.close();
        })
        return resultData;
    } catch (error) {
        return error.message;
    }
}

const editProposalDetails = async (proposal_no, edited_by, edited_reason) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');
        const editDetails = await pool.request()
            .input('proposal_no', sql.VarChar(50), proposal_no)
            .input('edited_by', sql.Int, edited_by)
            .input('edited_date', sql.SmallDateTime, new Date())
            .input('edited_reason', sql.VarChar(555), edited_reason)
            .query(sqlQueries.editProposalDetails);
        // console.log( new Date(), 'in edit proposal function')
        // pool.close();
        return editDetails.rowsAffected;
    } catch (error) {
        return error.message;
    }
}

const editClientProfile = async (values) => {
    try {
        // console.log('events called')
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('client');

        const data = await pool.request()
            // .input('c_client_id', sql.Int, 1234)
            .input('proposal_no', sql.VarChar(15), values.proposalNo)
            .input('c_name', sql.VarChar(200), values.clientName)
            .input('c_number', sql.VarChar(50), values.clientNumber)
            .input('c_opp_no', sql.VarChar(50), values.opportunityNumber)
            .input('c_opp_name', sql.VarChar(555), values.opportunityName)
            .input('c_nou', sql.VarChar(10), values.numOfUsers)
            .input('c_nofe', sql.VarChar(10), values.numOfFreeEarners)
            .input('c_country', sql.VarChar(20), values.country)
            .input('objective', sql.VarChar(20), values.objective)
            .input('commercial_objective', sql.VarChar(555), values.commercialObjective)
            .input('c_upsell', sql.VarChar(20), values.upsell)
            .input('c_solspeclist', sql.Int, Number(values.solutionSpecialistId))
            .input('c_qstart', sql.VarChar(10), values.quickStart)
            .input('c_address', sql.VarChar(555), values.address)
            .input('c_soft_curr', sql.Int, values.currentSoftwareId === '' ? null : Number(values.currentSoftwareId))
            .input('duration', sql.VarChar(20), values.duration)
            .input('c_pvaliddate', sql.DateTime, new Date(values.endValidDate))
            .input('c_closet_time', sql.VarChar(10), Number(values.hoursRequired))
            .input('c_pro_deltime', sql.VarChar(10), values.timeIncluded)
            .input('c_tr_method', sql.VarChar(50), values.traningMethod)
            .input('c_bpa_setup', sql.VarChar(50), values.bpaSetup)
            .input('special_condition', sql.VarChar(555), values.specialConditions)
            .input('currency', sql.VarChar(10), values.currency)
            .query(sqlQueries.editClientProfile);
        // pool.close();
        return data.rowsAffected;
    } catch (error) {
        return error.message;
    }
}

const editAttendingCourses = async (values) => {
    try {
        // console.log('events called')
        let pool = await sql.connect(config.sql);

        const tvp = new sql.Table() // You can optionally specify table type name in the first argument.
        // Columns must correspond with type we have created in database.
        tvp.columns.add('proposal_no', sql.VarChar(50))
        tvp.columns.add('course_name', sql.VarChar(550))
        tvp.columns.add('nof_people', sql.VarChar(10))

        // Add rows
        tvp.rows.add(values.proposalNo, values.operationsAdminLabel, values.operationsAdmin) // Values are in same order as columns.
        tvp.rows.add(values.proposalNo, values.dataformsLabel, values.dataforms) // Values are in same order as columns.
        tvp.rows.add(values.proposalNo, values.endUserAccountLabel, values.endUserAccount) // Values are in same order as columns.
        tvp.rows.add(values.proposalNo, values.endUserBPALabel, values.endUserBPA) // Values are in same order as columns.

        const request = new sql.Request()
        request.input('tvp', tvp)
        // let resultData;
        // request.execute('attending_edit_procedure', (err, result) => {
        //     // ... error checks
        //     // console.log(err, 'attending error')
        //     // console.log(result, 'attending result')
        //     resultData = result;
        // //     pool.close();
        // })
        // return resultData;

        const result = await request.execute('attending_edit_procedure');
        // pool.close();
        return result;
    } catch (error) {
        return error.message;
    }
}

const editDefaultServices = async (values) => {
    try {
        const { proposalNo, projectMgmt, installationOracle, essentialsCourse, operationsCourse,
            administrationCourse, systemSetup, backprocessing, reconcileTakeUp,
            anticipatedDisbs, trainInBillTemp, endUserTraining, endOfMonth,
            documentMgmt, totalHrsBaseInstall, totalDays } = values;
        // console.log('events called')
        let pool = await sql.connect(config.sql);

        const tvp = new sql.Table() // You can optionally specify table type name in the first argument.
        // Columns must correspond with type we have created in database.
        tvp.columns.add('proposal_no', sql.VarChar(50))
        tvp.columns.add('task', sql.VarChar(550))
        tvp.columns.add('training_method', sql.VarChar(150))
        tvp.columns.add('team', sql.VarChar(150))
        tvp.columns.add('include', sql.VarChar(150))
        tvp.columns.add('pm', sql.VarChar(10))
        tvp.columns.add('tsg', sql.VarChar(10))
        tvp.columns.add('accounts_training', sql.VarChar(10))
        tvp.columns.add('accounts_consulting', sql.VarChar(10))
        tvp.columns.add('bpa_consulting', sql.VarChar(10))
        tvp.columns.add('travel', sql.VarChar(10))
        tvp.columns.add('total_hrs', sql.VarChar(10))

        tvp.rows.add(proposalNo, projectMgmt.task, projectMgmt.traningMethod, projectMgmt.team, projectMgmt.include, projectMgmt.PM, projectMgmt.TSG, projectMgmt.accountsTraining, projectMgmt.accountsConsulting, projectMgmt.BPAConsulting, projectMgmt.travel, projectMgmt.totalHrs)

        tvp.rows.add(proposalNo, installationOracle.task, installationOracle.traningMethod, installationOracle.team, installationOracle.include, installationOracle.PM, installationOracle.TSG, installationOracle.accountsTraining, installationOracle.accountsConsulting, installationOracle.BPAConsulting, installationOracle.travel, installationOracle.totalHrs)

        tvp.rows.add(proposalNo, essentialsCourse.task, essentialsCourse.traningMethod, essentialsCourse.team, essentialsCourse.include, essentialsCourse.PM, essentialsCourse.TSG, essentialsCourse.accountsTraining, essentialsCourse.accountsConsulting, essentialsCourse.BPAConsulting, essentialsCourse.travel, essentialsCourse.totalHrs)

        tvp.rows.add(proposalNo, operationsCourse.task, operationsCourse.traningMethod, operationsCourse.team, operationsCourse.include, operationsCourse.PM, operationsCourse.TSG, operationsCourse.accountsTraining, operationsCourse.accountsConsulting, operationsCourse.BPAConsulting, operationsCourse.travel, operationsCourse.totalHrs)

        tvp.rows.add(proposalNo, administrationCourse.task, administrationCourse.traningMethod, administrationCourse.team, administrationCourse.include, administrationCourse.PM, administrationCourse.TSG, administrationCourse.accountsTraining, administrationCourse.accountsConsulting, administrationCourse.BPAConsulting, administrationCourse.travel, administrationCourse.totalHrs)

        tvp.rows.add(proposalNo, systemSetup.task, systemSetup.traningMethod, systemSetup.team, systemSetup.include, systemSetup.PM, systemSetup.TSG, systemSetup.accountsTraining, systemSetup.accountsConsulting, systemSetup.BPAConsulting, systemSetup.travel, systemSetup.totalHrs)

        tvp.rows.add(proposalNo, backprocessing.task, backprocessing.traningMethod, backprocessing.team, backprocessing.include, backprocessing.PM, backprocessing.TSG, backprocessing.accountsTraining, backprocessing.accountsConsulting, backprocessing.BPAConsulting, backprocessing.travel, backprocessing.totalHrs)

        tvp.rows.add(proposalNo, reconcileTakeUp.task, reconcileTakeUp.traningMethod, reconcileTakeUp.team, reconcileTakeUp.include, reconcileTakeUp.PM, reconcileTakeUp.TSG, reconcileTakeUp.accountsTraining, reconcileTakeUp.accountsConsulting, reconcileTakeUp.BPAConsulting, reconcileTakeUp.travel, reconcileTakeUp.totalHrs)

        tvp.rows.add(proposalNo, anticipatedDisbs.task, anticipatedDisbs.traningMethod, anticipatedDisbs.team, anticipatedDisbs.include, anticipatedDisbs.PM, anticipatedDisbs.TSG, anticipatedDisbs.accountsTraining, anticipatedDisbs.accountsConsulting, anticipatedDisbs.BPAConsulting, anticipatedDisbs.travel, anticipatedDisbs.totalHrs)

        tvp.rows.add(proposalNo, trainInBillTemp.task, trainInBillTemp.traningMethod, trainInBillTemp.team, trainInBillTemp.include, trainInBillTemp.PM, trainInBillTemp.TSG, trainInBillTemp.accountsTraining, trainInBillTemp.accountsConsulting, trainInBillTemp.BPAConsulting, trainInBillTemp.travel, trainInBillTemp.totalHrs)

        tvp.rows.add(proposalNo, endUserTraining.task, endUserTraining.traningMethod, endUserTraining.team, endUserTraining.include, endUserTraining.PM, endUserTraining.TSG, endUserTraining.accountsTraining, endUserTraining.accountsConsulting, endUserTraining.BPAConsulting, endUserTraining.travel, endUserTraining.totalHrs)

        tvp.rows.add(proposalNo, endOfMonth.task, endOfMonth.traningMethod, endOfMonth.team, endOfMonth.include, endOfMonth.PM, endOfMonth.TSG, endOfMonth.accountsTraining, endOfMonth.accountsConsulting, endOfMonth.BPAConsulting, endOfMonth.travel, endOfMonth.totalHrs)

        tvp.rows.add(proposalNo, documentMgmt.task, documentMgmt.traningMethod, documentMgmt.team, documentMgmt.include, documentMgmt.PM, documentMgmt.TSG, documentMgmt.accountsTraining, documentMgmt.accountsConsulting, documentMgmt.BPAConsulting, documentMgmt.travel, documentMgmt.totalHrs)

        tvp.rows.add(proposalNo, totalHrsBaseInstall.task, totalHrsBaseInstall.traningMethod, totalHrsBaseInstall.team, totalHrsBaseInstall.include, totalHrsBaseInstall.PM, totalHrsBaseInstall.TSG, totalHrsBaseInstall.accountsTraining, totalHrsBaseInstall.accountsConsulting, totalHrsBaseInstall.BPAConsulting, totalHrsBaseInstall.travel, totalHrsBaseInstall.totalHrs)

        tvp.rows.add(proposalNo, totalDays.task, totalDays.traningMethod, totalDays.team, totalDays.include, totalDays.PM, totalDays.TSG, totalDays.accountsTraining, totalDays.accountsConsulting, totalDays.BPAConsulting, totalDays.travel, totalDays.totalHrs)

        const request = new sql.Request()
        request.input('tvp', tvp)
        // let resultData;
        // request.execute('default_edit_procedure', (err, result) => {
        //     // ... error checks
        //     // console.log(err, 'attending insert') // {a: 'hello tvp', b: 777}
        //     // console.log(result, 'attending insert') // {a: 'hello tvp', b: 777}
        //     resultData = result;
        // //     pool.close();
        // })
        // return resultData;

        const result = await request.execute('default_edit_procedure');
        // pool.close();
        return result;
    } catch (error) {
        return error.message;
    }
}

const editOptionalServices = async (values) => {
    try {
        const { proposalNo, totalHours, totalDays, grandTotalHours, grandTotalDays,
            dataMigrationRow, selfCustody, multyPartyBilling, reportWriting,
            dataformsMax, scripting, workflow, BPAEndUser, BPAEssentials,
            dataformsPhoneBook, addPrecedent, BPAGoLive, exchangeIntegration,
            softdocsIntegration, clientPortal, worksiteIntegration,
            affinityMobile, empower, settlementAdjuster, thirdPartyIT, mitimes } = values;
        // console.log('events called')
        let pool = await sql.connect(config.sql);


        const tvp = new sql.Table() // You can optionally specify table type name in the first argument.
        // Columns must correspond with type we have created in database.
        tvp.columns.add('proposal_no', sql.VarChar(50))
        tvp.columns.add('task', sql.VarChar(1000))
        tvp.columns.add('include', sql.VarChar(150))
        tvp.columns.add('training_method', sql.VarChar(150))
        tvp.columns.add('team', sql.VarChar(150))
        tvp.columns.add('pm', sql.VarChar(10))
        tvp.columns.add('tsg', sql.VarChar(10))
        tvp.columns.add('data_migration', sql.VarChar(10))
        tvp.columns.add('accounts_training', sql.VarChar(10))
        tvp.columns.add('accounts_consulting', sql.VarChar(10))
        tvp.columns.add('bpa_training', sql.VarChar(10))
        tvp.columns.add('bpa_consulting', sql.VarChar(10))
        tvp.columns.add('travel', sql.VarChar(10))
        tvp.columns.add('total_hrs', sql.VarChar(10))



        tvp.rows.add(proposalNo, dataMigrationRow.task, dataMigrationRow.include, dataMigrationRow.traningMethod, dataMigrationRow.team, dataMigrationRow.PM, dataMigrationRow.TSG, dataMigrationRow.dataMigration, dataMigrationRow.accountsTraining, dataMigrationRow.accountsConsulting, dataMigrationRow.BPATraining, dataMigrationRow.BPAConsulting, dataMigrationRow.travel, dataMigrationRow.totalHrs)

        tvp.rows.add(proposalNo, selfCustody.task, selfCustody.include, selfCustody.traningMethod, selfCustody.team, selfCustody.PM, selfCustody.TSG, selfCustody.dataMigration, selfCustody.accountsTraining, selfCustody.accountsConsulting, selfCustody.BPATraining, selfCustody.BPAConsulting, selfCustody.travel, selfCustody.totalHrs)

        tvp.rows.add(proposalNo, multyPartyBilling.task, multyPartyBilling.include, multyPartyBilling.traningMethod, multyPartyBilling.team, multyPartyBilling.PM, multyPartyBilling.TSG, multyPartyBilling.dataMigration, multyPartyBilling.accountsTraining, multyPartyBilling.accountsConsulting, multyPartyBilling.BPATraining, multyPartyBilling.BPAConsulting, multyPartyBilling.travel, multyPartyBilling.totalHrs)

        tvp.rows.add(proposalNo, reportWriting.task, reportWriting.include, reportWriting.traningMethod, reportWriting.team, reportWriting.PM, reportWriting.TSG, reportWriting.dataMigration, reportWriting.accountsTraining, reportWriting.accountsConsulting, reportWriting.BPATraining, reportWriting.BPAConsulting, reportWriting.travel, reportWriting.totalHrs)

        tvp.rows.add(proposalNo, dataformsMax.task, dataformsMax.include, dataformsMax.traningMethod, dataformsMax.team, dataformsMax.PM, dataformsMax.TSG, dataformsMax.dataMigration, dataformsMax.accountsTraining, dataformsMax.accountsConsulting, dataformsMax.BPATraining, dataformsMax.BPAConsulting, dataformsMax.travel, dataformsMax.totalHrs)

        tvp.rows.add(proposalNo, scripting.task, scripting.include, scripting.traningMethod, scripting.team, scripting.PM, scripting.TSG, scripting.dataMigration, scripting.accountsTraining, scripting.accountsConsulting, scripting.BPATraining, scripting.BPAConsulting, scripting.travel, scripting.totalHrs)

        tvp.rows.add(proposalNo, workflow.task, workflow.include, workflow.traningMethod, workflow.team, workflow.PM, workflow.TSG, workflow.dataMigration, workflow.accountsTraining, workflow.accountsConsulting, workflow.BPATraining, workflow.BPAConsulting, workflow.travel, workflow.totalHrs)

        tvp.rows.add(proposalNo, BPAEndUser.task, BPAEndUser.include, BPAEndUser.traningMethod, BPAEndUser.team, BPAEndUser.PM, BPAEndUser.TSG, BPAEndUser.dataMigration, BPAEndUser.accountsTraining, BPAEndUser.accountsConsulting, BPAEndUser.BPATraining, BPAEndUser.BPAConsulting, BPAEndUser.travel, BPAEndUser.totalHrs)

        tvp.rows.add(proposalNo, BPAEssentials.task, BPAEssentials.include, BPAEssentials.traningMethod, BPAEssentials.team, BPAEssentials.PM, BPAEssentials.TSG, BPAEssentials.dataMigration, BPAEssentials.accountsTraining, BPAEssentials.accountsConsulting, BPAEssentials.BPATraining, BPAEssentials.BPAConsulting, BPAEssentials.travel, BPAEssentials.totalHrs)

        tvp.rows.add(proposalNo, dataformsPhoneBook.task, dataformsPhoneBook.include, dataformsPhoneBook.traningMethod, dataformsPhoneBook.team, dataformsPhoneBook.PM, dataformsPhoneBook.TSG, dataformsPhoneBook.dataMigration, dataformsPhoneBook.accountsTraining, dataformsPhoneBook.accountsConsulting, dataformsPhoneBook.BPATraining, dataformsPhoneBook.BPAConsulting, dataformsPhoneBook.travel, dataformsPhoneBook.totalHrs)

        tvp.rows.add(proposalNo, addPrecedent.task, addPrecedent.include, addPrecedent.traningMethod, addPrecedent.team, addPrecedent.PM, addPrecedent.TSG, addPrecedent.dataMigration, addPrecedent.accountsTraining, addPrecedent.accountsConsulting, addPrecedent.BPATraining, addPrecedent.BPAConsulting, addPrecedent.travel, addPrecedent.totalHrs)

        tvp.rows.add(proposalNo, BPAGoLive.task, BPAGoLive.include, BPAGoLive.traningMethod, BPAGoLive.team, BPAGoLive.PM, BPAGoLive.TSG, BPAGoLive.dataMigration, BPAGoLive.accountsTraining, BPAGoLive.accountsConsulting, BPAGoLive.BPATraining, BPAGoLive.BPAConsulting, BPAGoLive.travel, BPAGoLive.totalHrs)

        tvp.rows.add(proposalNo, exchangeIntegration.task, exchangeIntegration.include, exchangeIntegration.traningMethod, exchangeIntegration.team, exchangeIntegration.PM, exchangeIntegration.TSG, exchangeIntegration.dataMigration, exchangeIntegration.accountsTraining, exchangeIntegration.accountsConsulting, exchangeIntegration.BPATraining, exchangeIntegration.BPAConsulting, exchangeIntegration.travel, exchangeIntegration.totalHrs)

        tvp.rows.add(proposalNo, softdocsIntegration.task, softdocsIntegration.include, softdocsIntegration.traningMethod, softdocsIntegration.team, softdocsIntegration.PM, softdocsIntegration.TSG, softdocsIntegration.dataMigration, softdocsIntegration.accountsTraining, softdocsIntegration.accountsConsulting, softdocsIntegration.BPATraining, softdocsIntegration.BPAConsulting, softdocsIntegration.travel, softdocsIntegration.totalHrs)

        tvp.rows.add(proposalNo, clientPortal.task, clientPortal.include, clientPortal.traningMethod, clientPortal.team, clientPortal.PM, clientPortal.TSG, clientPortal.dataMigration, clientPortal.accountsTraining, clientPortal.accountsConsulting, clientPortal.BPATraining, clientPortal.BPAConsulting, clientPortal.travel, clientPortal.totalHrs)

        tvp.rows.add(proposalNo, worksiteIntegration.task, worksiteIntegration.include, worksiteIntegration.traningMethod, worksiteIntegration.team, worksiteIntegration.PM, worksiteIntegration.TSG, worksiteIntegration.dataMigration, worksiteIntegration.accountsTraining, worksiteIntegration.accountsConsulting, worksiteIntegration.BPATraining, worksiteIntegration.BPAConsulting, worksiteIntegration.travel, worksiteIntegration.totalHrs)

        tvp.rows.add(proposalNo, affinityMobile.task, affinityMobile.include, affinityMobile.traningMethod, affinityMobile.team, affinityMobile.PM, affinityMobile.TSG, affinityMobile.dataMigration, affinityMobile.accountsTraining, affinityMobile.accountsConsulting, affinityMobile.BPATraining, affinityMobile.BPAConsulting, affinityMobile.travel, affinityMobile.totalHrs)

        tvp.rows.add(proposalNo, empower.task, empower.include, empower.traningMethod, empower.team, empower.PM, empower.TSG, empower.dataMigration, empower.accountsTraining, empower.accountsConsulting, empower.BPATraining, empower.BPAConsulting, empower.travel, empower.totalHrs)

        tvp.rows.add(proposalNo, settlementAdjuster.task, settlementAdjuster.include, settlementAdjuster.traningMethod, settlementAdjuster.team, settlementAdjuster.PM, settlementAdjuster.TSG, settlementAdjuster.dataMigration, settlementAdjuster.accountsTraining, settlementAdjuster.accountsConsulting, settlementAdjuster.BPATraining, settlementAdjuster.BPAConsulting, settlementAdjuster.travel, settlementAdjuster.totalHrs)

        tvp.rows.add(proposalNo, thirdPartyIT.task, thirdPartyIT.include, thirdPartyIT.traningMethod, thirdPartyIT.team, thirdPartyIT.PM, thirdPartyIT.TSG, thirdPartyIT.dataMigration, thirdPartyIT.accountsTraining, thirdPartyIT.accountsConsulting, thirdPartyIT.BPATraining, thirdPartyIT.BPAConsulting, thirdPartyIT.travel, thirdPartyIT.totalHrs)

        tvp.rows.add(proposalNo, totalHours.task, totalHours.include, totalHours.traningMethod, totalHours.team, totalHours.PM, totalHours.TSG, totalHours.dataMigration, totalHours.accountsTraining, totalHours.accountsConsulting, totalHours.BPATraining, totalHours.BPAConsulting, totalHours.travel, totalHours.totalHrs)

        tvp.rows.add(proposalNo, totalDays.task, totalDays.include, totalDays.traningMethod, totalDays.team, totalDays.PM, totalDays.TSG, totalDays.dataMigration, totalDays.accountsTraining, totalDays.accountsConsulting, totalDays.BPATraining, totalDays.BPAConsulting, totalDays.travel, totalDays.totalHrs)

        tvp.rows.add(proposalNo, grandTotalHours.task, grandTotalHours.include, grandTotalHours.traningMethod, grandTotalHours.team, grandTotalHours.PM, grandTotalHours.TSG, grandTotalHours.dataMigration, grandTotalHours.accountsTraining, grandTotalHours.accountsConsulting, grandTotalHours.BPATraining, grandTotalHours.BPAConsulting, grandTotalHours.travel, grandTotalHours.totalHrs)

        tvp.rows.add(proposalNo, grandTotalDays.task, grandTotalDays.include, grandTotalDays.traningMethod, grandTotalDays.team, grandTotalDays.PM, grandTotalDays.TSG, grandTotalDays.dataMigration, grandTotalDays.accountsTraining, grandTotalDays.accountsConsulting, grandTotalDays.BPATraining, grandTotalDays.BPAConsulting, grandTotalDays.travel, grandTotalDays.totalHrs)

        tvp.rows.add(proposalNo, mitimes.task, mitimes.include, mitimes.traningMethod, mitimes.team, mitimes.PM, mitimes.TSG, mitimes.dataMigration, mitimes.accountsTraining, mitimes.accountsConsulting, mitimes.BPATraining, mitimes.BPAConsulting, mitimes.travel, mitimes.totalHrs)

        const request = new sql.Request()
        request.input('tvp', tvp)
        // let resultData;
        // request.execute('optional_edit_procedure', (err, result) => {
        //     // ... error checks
        //     // console.log(err, 'attending insert') // {a: 'hello tvp', b: 777}
        //     // console.log(result, 'attending insert') // {a: 'hello tvp', b: 777}
        //     resultData = result;
        // //     pool.close();
        // })
        // return resultData;

        const result = await request.execute('optional_edit_procedure');
        // pool.close();
        return result;
    } catch (error) {
        return error.message;
    }
}

const editMiscellaneous = async (values) => {
    try {
        // console.log('events called')
        const { proposalNo, affinityServer, lexisResearch, scopingStudy,
            additionalReturn, propertyPresidency, practiceAreaKit, lnSearch, macrequineBank, pexaIntegration, feeSynergy, fileman } = values;
        let pool = await sql.connect(config.sql);

        const tvp = new sql.Table() // You can optionally specify table type name in the first argument.
        // Columns must correspond with type we have created in database.
        tvp.columns.add('proposal_no', sql.VarChar(50))
        tvp.columns.add('miscellaneous', sql.VarChar(550))
        tvp.columns.add('included', sql.VarChar(20))
        tvp.columns.add('hours', sql.VarChar(20))
        tvp.columns.add('price', sql.VarChar(20))

        // Add rows
        tvp.rows.add(proposalNo, affinityServer.miscellaneous, affinityServer.included, affinityServer.hours, affinityServer.price)
        tvp.rows.add(proposalNo, lexisResearch.miscellaneous, lexisResearch.included, lexisResearch.hours, lexisResearch.price)
        tvp.rows.add(proposalNo, scopingStudy.miscellaneous, scopingStudy.included, scopingStudy.hours, scopingStudy.price)
        tvp.rows.add(proposalNo, additionalReturn.miscellaneous, additionalReturn.included, additionalReturn.hours, additionalReturn.price)
        tvp.rows.add(proposalNo, propertyPresidency.miscellaneous, propertyPresidency.included, propertyPresidency.hours, propertyPresidency.price)
        tvp.rows.add(proposalNo, practiceAreaKit.miscellaneous, practiceAreaKit.included, practiceAreaKit.hours, practiceAreaKit.price)
        tvp.rows.add(proposalNo, lnSearch.miscellaneous, lnSearch.included, lnSearch.hours, lnSearch.price)
        tvp.rows.add(proposalNo, macrequineBank.miscellaneous, macrequineBank.included, macrequineBank.hours, macrequineBank.price)
        tvp.rows.add(proposalNo, pexaIntegration.miscellaneous, pexaIntegration.included, pexaIntegration.hours, pexaIntegration.price)
        tvp.rows.add(proposalNo, feeSynergy.miscellaneous, feeSynergy.included, feeSynergy.hours, feeSynergy.price)
        tvp.rows.add(proposalNo, fileman.miscellaneous, fileman.included, fileman.hours, fileman.price)
        // for (const i of Object.values(other)) {
        //     tvp.rows.add(proposalNo, i.miscellaneous, i.included, i.hours, i.price)
        // }

        const request = new sql.Request()
        request.input('tvp', tvp)
        // let resultData;
        // request.execute('miscellenous_edit_procedure', (err, result) => {
        //     // console.log(err, 'attending error') // {a: 'hello tvp', b: 777}
        //     // console.log(result, 'attending result') // {a: 'hello tvp', b: 777}
        //     resultData = result;
        // //     pool.close();
        // })
        // return resultData;

        const result = await request.execute('miscellenous_edit_procedure');
        // pool.close();
        return result;
    } catch (error) {
        return error.message;
    }
}

const editSalesNotes = async (values) => {
    try {

        const { proposalNo, notes } = values;
        // console.log('events called')
        let pool = await sql.connect(config.sql);

        const tvp = new sql.Table() // You can optionally specify table type name in the first argument.
        // Columns must correspond with type we have created in database.
        tvp.columns.add('proposal_no', sql.VarChar(50))
        tvp.columns.add('date', sql.VarChar(50))
        tvp.columns.add('note', sql.VarChar(1500))
        tvp.columns.add('time', sql.VarChar(50))
        tvp.columns.add('user_name', sql.VarChar(50))
        tvp.columns.add('user_id', sql.Int)
        tvp.columns.add('note_no', sql.Int)

        // console.log(typeof notes, 'sales notes')
        notes.forEach(note => {
            tvp.rows.add(proposalNo, note.date, note.note, note.time, note.user, note.user_id, note.note_no)
        });

        const request = new sql.Request()
        request.input('tvp', tvp)
        // let resultData;
        // request.execute('sales_notes_edit_procedure', (err, result) => {
        //     // ... error checks
        //     // console.log(err, 'saveSalesNotes error') // {a: 'hello tvp', b: 777}
        //     // console.log(result, 'saveSalesNotes result') // {a: 'hello tvp', b: 777}
        //     resultData = result;
        // //     pool.close();
        // })
        // return resultData;

        const result = await request.execute('sales_notes_edit_procedure');
        // pool.close();
        return result;
    } catch (error) {
        return error.message;
    }
}

const editUpfrontCost = async (values) => {
    try {
        // console.log('events called')

        const { proposalNo, softwareDiscount, serviceDiscount, lexisServerLicense, lexisUserLicense,
            oracleLicenses, clientPortal, affinityMobile, lexisSettleAdjuster, twoWayMicrosoft,
            empower, softDocs, ImplementServices, ImplementTraning, postImplementation,
            dataMigration, travelAllowance, scopingStudy, propertyPrecedent,
            subTotal, lessConfidential, totalInvesteExcl, GSTPayable, totalInvestePay,
            totalPerUser, } = values

        const query = `UPDATE [dbo].[upfront_discounts]  SET [software_discount] = '${softwareDiscount}', [service_discount] = '${serviceDiscount}'  WHERE [proposal_no] = '${proposalNo}'`

        let pool = await sql.connect(config.sql);
        const data = await pool.request()
            .query(query);

        const tvp = new sql.Table() // You can optionally specify table type name in the first argument.
        // Columns must correspond with type we have created in database.

        tvp.columns.add('proposal_no', sql.VarChar(50))
        tvp.columns.add('label', sql.VarChar(550))
        tvp.columns.add('cost', sql.VarChar(50))
        tvp.columns.add('percentDiscount', sql.VarChar(50))
        tvp.columns.add('discountItemcost', sql.VarChar(50))
        tvp.columns.add('discountAmount', sql.VarChar(50))

        // Add rows
        tvp.rows.add(proposalNo, lexisServerLicense.label, lexisServerLicense.cost, lexisServerLicense.percentDiscount, lexisServerLicense.discountItemcost, lexisServerLicense.discountAmount)

        tvp.rows.add(proposalNo, lexisUserLicense.label, lexisUserLicense.cost, lexisUserLicense.percentDiscount, lexisUserLicense.discountItemcost, lexisUserLicense.discountAmount)

        tvp.rows.add(proposalNo, oracleLicenses.label, oracleLicenses.cost, oracleLicenses.percentDiscount, oracleLicenses.discountItemcost, oracleLicenses.discountAmount)

        tvp.rows.add(proposalNo, clientPortal.label, clientPortal.cost, clientPortal.percentDiscount, clientPortal.discountItemcost, clientPortal.discountAmount)

        tvp.rows.add(proposalNo, affinityMobile.label, affinityMobile.cost, affinityMobile.percentDiscount, affinityMobile.discountItemcost, affinityMobile.discountAmount)

        tvp.rows.add(proposalNo, lexisSettleAdjuster.label, lexisSettleAdjuster.cost, lexisSettleAdjuster.percentDiscount, lexisSettleAdjuster.discountItemcost, lexisSettleAdjuster.discountAmount)

        tvp.rows.add(proposalNo, twoWayMicrosoft.label, twoWayMicrosoft.cost, twoWayMicrosoft.percentDiscount, twoWayMicrosoft.discountItemcost, twoWayMicrosoft.discountAmount)

        tvp.rows.add(proposalNo, empower.label, empower.cost, empower.percentDiscount, empower.discountItemcost, empower.discountAmount)

        tvp.rows.add(proposalNo, softDocs.label, softDocs.cost, softDocs.percentDiscount, softDocs.discountItemcost, softDocs.discountAmount)

        tvp.rows.add(proposalNo, ImplementServices.label, ImplementServices.cost, ImplementServices.percentDiscount, ImplementServices.discountItemcost, ImplementServices.discountAmount)

        tvp.rows.add(proposalNo, ImplementTraning.label, ImplementTraning.cost, ImplementTraning.percentDiscount, ImplementTraning.discountItemcost, ImplementTraning.discountAmount)

        tvp.rows.add(proposalNo, postImplementation.label, postImplementation.cost, postImplementation.percentDiscount, postImplementation.discountItemcost, postImplementation.discountAmount)

        tvp.rows.add(proposalNo, dataMigration.label, dataMigration.cost, dataMigration.percentDiscount, dataMigration.discountItemcost, dataMigration.discountAmount)

        tvp.rows.add(proposalNo, travelAllowance.label, travelAllowance.cost, travelAllowance.percentDiscount, travelAllowance.discountItemcost, travelAllowance.discountAmount)

        tvp.rows.add(proposalNo, scopingStudy.label, scopingStudy.cost, scopingStudy.percentDiscount, scopingStudy.discountItemcost, scopingStudy.discountAmount)

        tvp.rows.add(proposalNo, propertyPrecedent.label, propertyPrecedent.cost, propertyPrecedent.percentDiscount, propertyPrecedent.discountItemcost, propertyPrecedent.discountAmount)

        tvp.rows.add(proposalNo, subTotal.label, subTotal.cost, subTotal.percentDiscount, subTotal.discountItemcost, subTotal.discountAmount)

        tvp.rows.add(proposalNo, lessConfidential.label, lessConfidential.cost, lessConfidential.percentDiscount, lessConfidential.discountItemcost, lessConfidential.discountAmount)

        tvp.rows.add(proposalNo, totalInvesteExcl.label, totalInvesteExcl.cost, totalInvesteExcl.percentDiscount, totalInvesteExcl.discountItemcost, totalInvesteExcl.discountAmount)

        tvp.rows.add(proposalNo, GSTPayable.label, GSTPayable.cost, GSTPayable.percentDiscount, GSTPayable.discountItemcost, GSTPayable.discountAmount)

        tvp.rows.add(proposalNo, totalInvestePay.label, totalInvestePay.cost, totalInvestePay.percentDiscount, totalInvestePay.discountItemcost, totalInvestePay.discountAmount)

        tvp.rows.add(proposalNo, totalPerUser.label, totalPerUser.cost, totalPerUser.percentDiscount, totalPerUser.discountItemcost, totalPerUser.discountAmount)


        const request = new sql.Request()
        request.input('tvp', tvp)
        // let resultData;
        // request.execute('upfront_cost_edit_procedure', (err, result) => {
        //     // ... error checks
        //     console.log(err, 'upfront_cost error') 
        //     // console.log(result, 'upfront_cost result') 
        //     resultData = result;
        // //     pool.close();
        // })
        // return resultData;

        const result = await request.execute('upfront_cost_edit_procedure');
        // pool.close();
        return result;
    } catch (error) {
        return error.message;
    }
}

const editOngoingMaintenance = async (values) => {
    try {
        // console.log('events called')
        const { proposalNo, annualAffinity, annualOracleCare, annualAffinityMobile, annualClient,
            annualEmpower, annualSoftDocs, annualSettlement, subTotal, lessConfidential,
            totalMntExclGST, GSTPayable, totalMntAnnual, totalMntMonthly,
            totalAnnualCost, totalCostMonth, } = values;

        let pool = await sql.connect(config.sql);

        const tvp = new sql.Table() // You can optionally specify table type name in the first argument.
        // Columns must correspond with type we have created in database.
        tvp.columns.add('proposal_no', sql.VarChar(50))
        tvp.columns.add('lexis_care', sql.VarChar(550))
        tvp.columns.add('cost', sql.VarChar(50))
        tvp.columns.add('percentDiscount', sql.VarChar(50))
        tvp.columns.add('discountItemcost', sql.VarChar(50))
        tvp.columns.add('discountAmount', sql.VarChar(50))

        tvp.rows.add(proposalNo, annualAffinity.label, annualAffinity.cost, annualAffinity.percentDiscount, annualAffinity.discountItemcost, annualAffinity.discountAmount)

        tvp.rows.add(proposalNo, annualOracleCare.label, annualOracleCare.cost, annualOracleCare.percentDiscount, annualOracleCare.discountItemcost, annualOracleCare.discountAmount)

        tvp.rows.add(proposalNo, annualAffinityMobile.label, annualAffinityMobile.cost, annualAffinityMobile.percentDiscount, annualAffinityMobile.discountItemcost, annualAffinityMobile.discountAmount)

        tvp.rows.add(proposalNo, annualClient.label, annualClient.cost, annualClient.percentDiscount, annualClient.discountItemcost, annualClient.discountAmount)

        tvp.rows.add(proposalNo, annualEmpower.label, annualEmpower.cost, annualEmpower.percentDiscount, annualEmpower.discountItemcost, annualEmpower.discountAmount)

        tvp.rows.add(proposalNo, annualSoftDocs.label, annualSoftDocs.cost, annualSoftDocs.percentDiscount, annualSoftDocs.discountItemcost, annualSoftDocs.discountAmount)

        tvp.rows.add(proposalNo, annualSettlement.label, annualSettlement.cost, annualSettlement.percentDiscount, annualSettlement.discountItemcost, annualSettlement.discountAmount)

        tvp.rows.add(proposalNo, subTotal.label, subTotal.cost, subTotal.percentDiscount, subTotal.discountItemcost, subTotal.discountAmount)

        tvp.rows.add(proposalNo, lessConfidential.label, lessConfidential.cost, lessConfidential.percentDiscount, lessConfidential.discountItemcost, lessConfidential.discountAmount)

        tvp.rows.add(proposalNo, totalMntExclGST.label, totalMntExclGST.cost, totalMntExclGST.percentDiscount, totalMntExclGST.discountItemcost, totalMntExclGST.discountAmount)

        tvp.rows.add(proposalNo, GSTPayable.label, GSTPayable.cost, GSTPayable.percentDiscount, GSTPayable.discountItemcost, GSTPayable.discountAmount)

        tvp.rows.add(proposalNo, totalMntAnnual.label, totalMntAnnual.cost, totalMntAnnual.percentDiscount, totalMntAnnual.discountItemcost, totalMntAnnual.discountAmount)

        tvp.rows.add(proposalNo, totalMntMonthly.label, totalMntMonthly.cost, totalMntMonthly.percentDiscount, totalMntMonthly.discountItemcost, totalMntMonthly.discountAmount)

        tvp.rows.add(proposalNo, totalAnnualCost.label, totalAnnualCost.cost, totalAnnualCost.percentDiscount, totalAnnualCost.discountItemcost, totalAnnualCost.discountAmount)

        tvp.rows.add(proposalNo, totalCostMonth.label, totalCostMonth.cost, totalCostMonth.percentDiscount, totalCostMonth.discountItemcost, totalCostMonth.discountAmount)


        const request = new sql.Request()
        request.input('tvp', tvp)
        // let resultData;
        // request.execute('ongoing_maintenance_edit_procedure', (err, result) => {
        //     // ... error checks
        //     // console.log(err, 'ongoing_maintenance_insert_procedure error') 
        //     // console.log(result, 'ongoing_maintenance_insert_procedure result') 
        //     resultData = result;
        // //     pool.close();
        // })
        // return resultData;
        const result = await request.execute('ongoing_maintenance_edit_procedure');
        // pool.close();
        return result;
    } catch (error) {
        return error.message;
    }
}


const editRepaymentDiscount = async (values) => {
    try {
        // console.log('events called')
        const { proposalNo, softwareDis, serviceDis, lexisCareDis, totalDis } = values;

        let pool = await sql.connect(config.sql);

        const tvp = new sql.Table() // You can optionally specify table type name in the first argument.
        // Columns must correspond with type we have created in database.
        tvp.columns.add('proposal_no', sql.VarChar(50))
        tvp.columns.add('label', sql.VarChar(550))
        tvp.columns.add('amt_without_discount', sql.VarChar(20))
        tvp.columns.add('discount_amount', sql.VarChar(20))
        tvp.columns.add('amt_with_discount', sql.VarChar(20))
        tvp.columns.add('discount_percent', sql.VarChar(20))

        tvp.rows.add(proposalNo, softwareDis.label, softwareDis.totalAmount, softwareDis.discountAmount, softwareDis.amountAfterDiscount, softwareDis.discountPercent)

        tvp.rows.add(proposalNo, serviceDis.label, serviceDis.totalAmount, serviceDis.discountAmount, serviceDis.amountAfterDiscount, serviceDis.discountPercent)

        tvp.rows.add(proposalNo, lexisCareDis.label, lexisCareDis.totalAmount, lexisCareDis.discountAmount, lexisCareDis.amountAfterDiscount, lexisCareDis.discountPercent)

        tvp.rows.add(proposalNo, totalDis.label, totalDis.totalAmount, totalDis.discountAmount, totalDis.amountAfterDiscount, totalDis.discountPercent)


        const request = new sql.Request()
        request.input('tvp', tvp)
        // let resultData;
        // request.execute('repay_discount_edit_procedure', (err, result) => {
        //     // ... error checks 
        //     resultData = result;
        // //     pool.close();
        // })
        // return resultData;
        const result = await request.execute('repay_discount_edit_procedure');
        // pool.close();
        return result;
    } catch (error) {
        return error.message;
    }
}

const editRepaymentCalc = async (values) => {
    try {
        // console.log('events called')

        const { proposalNo, totalsTable, mntTable, repayments } = values;

        const { software, services, sTotal, pricePerTool, priceTotal } = totalsTable;

        const { year1, year2, year3, year4, year5, mntTotal } = mntTable;

        const { initPayment, month1, month2, month3, month4, month5, month6, month7, month8,
            month9, month10, month11, month12, month13, month14, month15, month16, month17,
            month18, month19, month20, month21, month22, month23, month24, month25, month26,
            month27, month28, month29, month30, month31, month32, month33, month34, month35,
            month36, month37, month38, month39, month40, month41, month42, month43, month44,
            month45, month46, month47, month48, month49, month50, month51, month52, month53,
            month54, month55, month56, month57, month58, month59, month60, repaymentTotal } = repayments;

        let pool = await sql.connect(config.sql);

        const tvp = new sql.Table() // You can optionally specify table type name in the first argument.
        // Columns must correspond with type we have created in database.
        tvp.columns.add('proposal_no', sql.VarChar(50))
        tvp.columns.add('label', sql.VarChar(550))
        tvp.columns.add('cost', sql.VarChar(50))
        tvp.columns.add('gcrm_entries', sql.VarChar(50))

        tvp.rows.add(proposalNo, software.label, software.cost, software.gcrmEntries)
        tvp.rows.add(proposalNo, services.label, services.cost, services.gcrmEntries)
        tvp.rows.add(proposalNo, sTotal.label, sTotal.cost, sTotal.gcrmEntries)
        tvp.rows.add(proposalNo, pricePerTool.label, pricePerTool.cost, pricePerTool.gcrmEntries)
        tvp.rows.add(proposalNo, priceTotal.label, priceTotal.cost, priceTotal.gcrmEntries)

        const request = new sql.Request()
        request.input('tvp', tvp)
        // let resultData;
        // request.execute('repay_soft_services_edit_procedure', (err, result) => {
        //     // console.log(err, 'attending error') // {a: 'hello tvp', b: 777}
        //     // console.log(result, 'attending result') // {a: 'hello tvp', b: 777}
        //     resultData = result;
        // })
        const result = await request.execute('repay_soft_services_edit_procedure');

        const tvp2 = new sql.Table()
        tvp2.columns.add('proposal_no', sql.VarChar(50))
        tvp2.columns.add('label', sql.VarChar(550))
        tvp2.columns.add('cost', sql.VarChar(50))
        tvp2.columns.add('gcrm_entries', sql.VarChar(50))

        tvp2.rows.add(proposalNo, year1.label, year1.RRP, year1.discounted)
        tvp2.rows.add(proposalNo, year2.label, year2.RRP, year2.discounted)
        tvp2.rows.add(proposalNo, year3.label, year3.RRP, year3.discounted)
        tvp2.rows.add(proposalNo, year4.label, year4.RRP, year4.discounted)
        tvp2.rows.add(proposalNo, year5.label, year5.RRP, year5.discounted)
        tvp2.rows.add(proposalNo, mntTotal.label, mntTotal.RRP, mntTotal.discounted)

        const request2 = new sql.Request()
        request2.input('tvp', tvp2)
        // let resultData;
        // request2.execute('repay_maintenance_edit_procedure', (err, result) => {
        //     // console.log(err, 'attending error') // {a: 'hello tvp', b: 777}
        //     // console.log(result, 'attending result') // {a: 'hello tvp', b: 777}
        //     resultData = result;
        // })
        const result2 = await request2.execute('repay_maintenance_edit_procedure');


        const tvp3 = new sql.Table()

        tvp3.columns.add('proposal_no', sql.VarChar(50))
        tvp3.columns.add('label', sql.VarChar(550))
        tvp3.columns.add('payment', sql.VarChar(50))
        tvp3.columns.add('lexis_care', sql.VarChar(50))

        tvp3.rows.add(proposalNo, initPayment.label, initPayment.payments, initPayment.lexisCare)
        tvp3.rows.add(proposalNo, month1.label, month1.payments, month1.lexisCare)
        tvp3.rows.add(proposalNo, month2.label, month2.payments, month2.lexisCare)
        tvp3.rows.add(proposalNo, month3.label, month3.payments, month3.lexisCare)
        tvp3.rows.add(proposalNo, month4.label, month4.payments, month4.lexisCare)
        tvp3.rows.add(proposalNo, month5.label, month5.payments, month5.lexisCare)
        tvp3.rows.add(proposalNo, month6.label, month6.payments, month6.lexisCare)
        tvp3.rows.add(proposalNo, month7.label, month7.payments, month7.lexisCare)
        tvp3.rows.add(proposalNo, month8.label, month8.payments, month8.lexisCare)
        tvp3.rows.add(proposalNo, month9.label, month9.payments, month9.lexisCare)
        tvp3.rows.add(proposalNo, month10.label, month10.payments, month10.lexisCare)
        tvp3.rows.add(proposalNo, month11.label, month11.payments, month11.lexisCare)
        tvp3.rows.add(proposalNo, month12.label, month12.payments, month12.lexisCare)
        tvp3.rows.add(proposalNo, month13.label, month13.payments, month13.lexisCare)
        tvp3.rows.add(proposalNo, month14.label, month14.payments, month14.lexisCare)
        tvp3.rows.add(proposalNo, month15.label, month15.payments, month15.lexisCare)
        tvp3.rows.add(proposalNo, month16.label, month16.payments, month16.lexisCare)
        tvp3.rows.add(proposalNo, month17.label, month17.payments, month17.lexisCare)
        tvp3.rows.add(proposalNo, month18.label, month18.payments, month18.lexisCare)
        tvp3.rows.add(proposalNo, month19.label, month19.payments, month19.lexisCare)
        tvp3.rows.add(proposalNo, month20.label, month20.payments, month20.lexisCare)
        tvp3.rows.add(proposalNo, month21.label, month21.payments, month21.lexisCare)
        tvp3.rows.add(proposalNo, month22.label, month22.payments, month22.lexisCare)
        tvp3.rows.add(proposalNo, month23.label, month23.payments, month23.lexisCare)
        tvp3.rows.add(proposalNo, month24.label, month24.payments, month24.lexisCare)
        tvp3.rows.add(proposalNo, month25.label, month25.payments, month25.lexisCare)
        tvp3.rows.add(proposalNo, month26.label, month26.payments, month26.lexisCare)
        tvp3.rows.add(proposalNo, month27.label, month27.payments, month27.lexisCare)
        tvp3.rows.add(proposalNo, month28.label, month28.payments, month28.lexisCare)
        tvp3.rows.add(proposalNo, month29.label, month29.payments, month29.lexisCare)
        tvp3.rows.add(proposalNo, month30.label, month30.payments, month30.lexisCare)
        tvp3.rows.add(proposalNo, month31.label, month31.payments, month31.lexisCare)
        tvp3.rows.add(proposalNo, month32.label, month32.payments, month32.lexisCare)
        tvp3.rows.add(proposalNo, month33.label, month33.payments, month33.lexisCare)
        tvp3.rows.add(proposalNo, month34.label, month34.payments, month34.lexisCare)
        tvp3.rows.add(proposalNo, month35.label, month35.payments, month35.lexisCare)
        tvp3.rows.add(proposalNo, month36.label, month36.payments, month36.lexisCare)
        tvp3.rows.add(proposalNo, month37.label, month37.payments, month37.lexisCare)
        tvp3.rows.add(proposalNo, month38.label, month38.payments, month38.lexisCare)
        tvp3.rows.add(proposalNo, month39.label, month39.payments, month39.lexisCare)
        tvp3.rows.add(proposalNo, month40.label, month40.payments, month40.lexisCare)
        tvp3.rows.add(proposalNo, month41.label, month41.payments, month41.lexisCare)
        tvp3.rows.add(proposalNo, month42.label, month42.payments, month42.lexisCare)
        tvp3.rows.add(proposalNo, month43.label, month43.payments, month43.lexisCare)
        tvp3.rows.add(proposalNo, month44.label, month44.payments, month44.lexisCare)
        tvp3.rows.add(proposalNo, month45.label, month45.payments, month45.lexisCare)
        tvp3.rows.add(proposalNo, month46.label, month46.payments, month46.lexisCare)
        tvp3.rows.add(proposalNo, month47.label, month47.payments, month47.lexisCare)
        tvp3.rows.add(proposalNo, month48.label, month48.payments, month48.lexisCare)
        tvp3.rows.add(proposalNo, month49.label, month49.payments, month49.lexisCare)
        tvp3.rows.add(proposalNo, month50.label, month50.payments, month50.lexisCare)
        tvp3.rows.add(proposalNo, month51.label, month51.payments, month51.lexisCare)
        tvp3.rows.add(proposalNo, month52.label, month52.payments, month52.lexisCare)
        tvp3.rows.add(proposalNo, month53.label, month53.payments, month53.lexisCare)
        tvp3.rows.add(proposalNo, month54.label, month54.payments, month54.lexisCare)
        tvp3.rows.add(proposalNo, month55.label, month55.payments, month55.lexisCare)
        tvp3.rows.add(proposalNo, month56.label, month56.payments, month56.lexisCare)
        tvp3.rows.add(proposalNo, month57.label, month57.payments, month57.lexisCare)
        tvp3.rows.add(proposalNo, month58.label, month58.payments, month58.lexisCare)
        tvp3.rows.add(proposalNo, month59.label, month59.payments, month59.lexisCare)
        tvp3.rows.add(proposalNo, month60.label, month60.payments, month60.lexisCare)
        tvp3.rows.add(proposalNo, repaymentTotal.label, repaymentTotal.payments, repaymentTotal.lexisCare)


        const request3 = new sql.Request()
        request3.input('tvp', tvp3)
        // let resultData;
        // request3.execute('repay_calculator_edit_procedure', (err, result) => {
        //     // console.log(result, 'resultData of repay calc') 
        //     resultData = result;
        // })
        // return resultData;
        const result3 = await request3.execute('repay_calculator_edit_procedure');
        // pool.close();
        return result3;
    } catch (error) {
        return error.message;
    }
}

const editAffinityMobilePopup = async (values) => {
    try {
        // console.log('events called')
        const { proposalNo, affinityMobilePopUpValue } = values;
        const query = `UPDATE [dbo].[affinity_mobile_popup_value] SET [num_of_users] = '${affinityMobilePopUpValue}'  WHERE [proposal_no] = '${proposalNo}'`;

        let pool = await sql.connect(config.sql);
        const data = await pool.request()
            .query(query);

        // pool.close();
        return data.rowsAffected;
    } catch (error) {
        return error.message;
    }
}

const editMitimesPopup = async (values) => {
    // console.log('editMitimesPopup called',values);
    try {
        // console.log('events called')
        const { proposalNo, mitimesPopUpValue } = values;
        const query = `UPDATE [dbo].[mitimes_popup_value] SET [num_of_users] = '${mitimesPopUpValue}'  WHERE [proposal_no] = '${proposalNo}'`;

        let pool = await sql.connect(config.sql);
        const data = await pool.request()
            .query(query);

        // pool.close();
        return data.rowsAffected;
    } catch (error) {
        return error.message;
    }
}

const editSettlementPopup = async (values) => {
    try {
        // console.log('events called')
        const { proposalNo, settlementPopUpValue } = values;
        const query = `UPDATE [dbo].[settlement_popup_value] SET [no_of_licenses] = '${settlementPopUpValue}'  WHERE [proposal_no] = '${proposalNo}'`

        let pool = await sql.connect(config.sql);
        const data = await pool.request()
            .query(query);

        // pool.close();
        return data.rowsAffected;
    } catch (error) {
        return error.message;
    }
}

const editEmpowerPopup = async (values) => {
    try {
        // console.log('events called')
        const { proposalNo, empowerModules } = values;
        const query = `UPDATE [dbo].[empower_popup_users_value] SET [num_of_users] = '${empowerModules.numOfUsers}'  WHERE [proposal_no] = '${proposalNo}'`
        let pool = await sql.connect(config.sql);
        const data = await pool.request()
            .query(query);

        const tvp = new sql.Table() // You can optionally specify table type name in the first argument.
        // Columns must correspond with type we have created in database.
        tvp.columns.add('proposal_no', sql.VarChar(50))
        tvp.columns.add('module_name', sql.VarChar(500))
        tvp.columns.add('selected', sql.VarChar(10))

        for (const i of Object.values(empowerModules.empowerModules)) {
            tvp.rows.add(proposalNo, i.empower_name, Number(i.checked))
        }
        // console.log(empowerModules, 'empowermodules')
        const request = new sql.Request()
        request.input('tvp', tvp)
        // let resultData;
        // request.execute('empower_modules_edit_procedure', (err, result) => {
        //     // console.log(err, 'empower_modules_insert_procedure error')
        //     // console.log(result, 'empower_modules_insert_procedure result')
        //     resultData = result;
        // //     pool.close();
        // })
        // return data.rowsAffected;
        const result = await request.execute('empower_modules_edit_procedure');
        // pool.close();
        return result;
    } catch (error) {
        return error.message;
    }
}

const editPracticeAreaKitPopup = async (values) => {
    // console.log("editPracticeAreaKitPopup",values);
    try {
        // console.log('affintty server cpu popup query called')
        const { proposalNo, practiceAreaKitModules } = values;
        // console.log('modules', practiceAreaKitModules);

        const query = `UPDATE [dbo].[practiceAreaKit_popup_users_value] SET [num_of_users] = '${practiceAreaKitModules.numOfUsers}' WHERE [proposal_no] = '${proposalNo}'`
        let pool = await sql.connect(config.sql);
        const data = await pool.request()
            .query(query);

        const tvp = new sql.Table() // You can optionally specify table type name in the first argument.
        // Columns must correspond with type we have created in database.
        tvp.columns.add('proposal_no', sql.VarChar(50))
        tvp.columns.add('module_name', sql.VarChar(500))
        tvp.columns.add('selected', sql.VarChar(10))

        for (const i of Object.values(practiceAreaKitModules.practiceAreaKitModules)) {
            // console.log('editPracticeAreaKitPopup',proposalNo,i.kitName, i.checked);
            tvp.rows.add(proposalNo, i.kitName, Number(i.checked))
        }

        const request = new sql.Request()
        request.input('tvp', tvp)
        const result = await request.execute('practiceAreaKit_modules_edit_procedure');
        // pool.close();
        return result;

        // return data.rowsAffected;
    } catch (error) {
        console.log(error.message, 'edit practiceAreaKit search popup query error');
        return error.message;
    }
}

const editLnSearchPopup = async (values) => {
    // console.log("edit LnSearch Popup ",values);
    try {
        // console.log('affintty server cpu popup query called')
        const { proposalNo, lnSearchPopUpValue } = values;
        // console.log('modules', lnSearchPopUpValue);
        
        const tvp = new sql.Table() // You can optionally specify table type name in the first argument.
        // Columns must correspond with type we have created in database.
        tvp.columns.add('proposal_no', sql.VarChar(50))
        tvp.columns.add('provider', sql.VarChar(500))
        tvp.columns.add('selected', sql.VarChar(10))

        for (const i of Object.values(lnSearchPopUpValue.lnSearchModules)) {
            // console.log('editLnSearchPopup',proposalNo,i.kitName, i.checked);
            tvp.rows.add(proposalNo, i.kitName, Number(i.checked))
        }

        const request = new sql.Request()
        request.input('tvp', tvp)
        const result = await request.execute('lnsearch_modules_edit_procedure');
        // pool.close();
        return result;

        // return data.rowsAffected;
    } catch (error) {
        console.log(error.message, 'edit lexisnexis search popup query error');
        return error.message;
    }
}

const editScopingStudyPopup = async (values) => {
    try {
        // console.log('events called')
        const { proposalNo, scopingStudyPopUpValue } = values;
        const query = ` UPDATE [dbo].[scoping_study_popup_value] SET [hrs_required] = '${scopingStudyPopUpValue}'  WHERE [proposal_no] = '${proposalNo}'`

        let pool = await sql.connect(config.sql);
        const data = await pool.request()
            .query(query);

        // pool.close();
        return data.rowsAffected;
    } catch (error) {
        return error.message;
    }
}

const editAffinityServerPopup = async (values) => {
    try {
        // console.log('affintty server cpu popup query called')
        const { proposalNo, typeOfLicense, numOfUsers, edition, serverLicense, oracleLicense, maintenance, total } = values;
        const query = `UPDATE [dbo].[affinity_server_popup_values]
        SET [type_of_oracle_license] = '${typeOfLicense}'
            ,[num_of_users] = '${numOfUsers}'
            ,[edition] = '${edition}'
            ,[server_license] = '${serverLicense}'
            ,[oracle_license] = '${oracleLicense}'
            ,[maintenance] = '${maintenance}'
            ,[total] = '${total}'
        WHERE [proposal_no] = '${proposalNo}'`;

        let pool = await sql.connect(config.sql);
        const data = await pool.request()
            .query(query);
        // console.log(data,'affintty server cpu popup result')
        // pool.close();
        return data.rowsAffected;
    } catch (error) {
        console.log(error.message, 'affintty server cpu popup query error');
        return error.message;
    }
}



module.exports = {
    editExample,

    getClientDiscount,
    getProposalStatus,
    getApproverMailID,
    getUserNameByID,
    getProposalDetails,
    getApproversList,
    saveProposal,
    rejectProposal,
    setApprovalStatus,
    updateApprovalStatus,
    lockProposal,

    getProposalDetailsForDoc,
    getUserDetailsWithID,
    getEmpowerModuleDetails,
    getOptionalServices,
    getUpfrontCostDetails,
    getRepaymentCalcDetails,
    getRepaymentDiscount,
    getRepaymentMaintenanceDetails,
    getRepaymentSoftwareServices,
    getMiscellaneous,
    getAffinityServerPopupValues,
    getPracticeAreaKitPopupValues,
    getLnSearchPopupValue,
    getClientProfile,
    getAttendingCourses,
    getSalesNotes,
    getAffinityMobPopupValue,
    getMitimesPopupValue,
    getSettlementPopupValue,
    getScopingStudyPopupValue,
    getUpfrontDiscounts,
    getDefaultServices,
    getOngoingMainDetails,

    getDashboardSlnSpecialist,
    getDashboardData,
    archiveProposal,
    activateProposal,
    getClientNamesBySearch,
    getClientNameByNumber,
    getOpportunities,
    getQuickStartInfo,
    getDayConversionInfo,
    getAllSolutionSpecialist,
    getAllSoftwares,
    getCountryAddress,
    getAllCountries,
    getOracleWording,
    getHrsPerDayByCountry,
    getAllDataMigrationOptions,
    getGSTPercentages,
    getProductInfoById,
    getAllEmpowerModules,
    getYearUpliftPercent,
    getProposalCounter,

    saveProposalDetails,
    saveClientProfile,
    saveAttendingCourses,
    saveDefaultServices,
    saveOptionalServices,
    saveMiscellaneous,
    saveSalesNotes,
    saveUpfrontCost,
    saveOngoingMaintenance,
    saveRepaymentCalc,
    saveRepaymentDiscount,
    saveAffinityMobilePopup,
    saveMitimesPopup,
    saveSettlementPopup,
    saveEmpowerPopup,
    saveScopingStudyPopup,
    saveAffinityServerPopup,
    savePracticeAreaKitPopup,
    saveLnSearchPopup,

    editProposalDetails,
    editClientProfile,
    editAttendingCourses,
    editDefaultServices,
    editOptionalServices,
    editMiscellaneous,
    editSalesNotes,
    editUpfrontCost,
    editOngoingMaintenance,
    editRepaymentDiscount,
    editRepaymentCalc,
    editAffinityMobilePopup,
    editMitimesPopup,
    editSettlementPopup,
    editEmpowerPopup,
    editPracticeAreaKitPopup,
    editLnSearchPopup,
    editScopingStudyPopup,
    editAffinityServerPopup,
}