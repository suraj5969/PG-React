const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const logger = require('./middleware/logger');
const cron = require('node-cron');
const sql = require('mssql');

//admin routes
const eventRoute = require('./routes/admin/eventRoute');
const oneUserRoute = require('./routes/admin/oneUserRoute');
const verifyRoute = require('./routes/admin/verifyRoute');
const forgotPasswordRoute = require('./routes/admin/forgotPasswordRoute');
const getAllUsersRoute = require('./routes/admin/getAllUsersRoute');
const updateUserRoute = require('./routes/admin/updateUserRoute');
const addUserRoute = require('./routes/admin/addUserRoute');
const deleteUserRoute = require('./routes/admin/deleteUserRoute');
const getMigrationsRoute = require('./routes/admin/getMigrationsRoute');
const getSingleMigrationRoute = require('./routes/admin/getSingleMigrationRoute');
const editMigrationsRoute = require('./routes/admin/editMigrationsRoute');
const getTrainingsRoute = require('./routes/admin/getTrainingsRoute');
const editTrainingsRoute = require('./routes/admin/editTrainingsRoute');
const getProductListRoute = require('./routes/admin/getProductListRoute');
const getSoftwaresRoute = require('./routes/admin/getSoftwaresRoute');
const deleteSoftwareRoute = require('./routes/admin/deleteSoftwareRoute');
const addSoftwareRoute = require('./routes/admin/addSoftwareRoute');
const editSoftwareRoute = require('./routes/admin/editSoftwareRoute');
const getWorkflowRoute = require('./routes/admin/getWorkflowRoute');
const updateWorkflow = require('./routes/admin/updateWorkflowRoute');
const getQuickServicesRoute = require('./routes/admin/getQuickServicesRoute');
const editQuickServicesRoute = require('./routes/admin/editQuickServicesRoute');
const getContactDetailsRoute = require('./routes/admin/getContactDetailsRoute');
const getGSTpercentageRoute = require('./routes/admin/getGSTpercentageRoute');
const getDayConversionsRoute = require('./routes/admin/getDayConversionsRoute');
const getHoursPerDayRoute = require('./routes/admin/getHoursPerDayRoute');
const editHoursPerDayRoute = require('./routes/admin/editHoursPerDayRoute');
const editGSTpercentageRoute = require('./routes/admin/editGSTpercentageRoute');
const editDayConversionsRoute = require('./routes/admin/editDayConversionsRoute');
const editContactDetailsRoute = require('./routes/admin/editContactDetailsRoute');
const getOracleWordingsRoute = require('./routes/admin/getOracleWordingsRoute');
const editOracleWordingsRoute = require('./routes/admin/editOracleWordingsRoute');
const getMiscellanousRoute = require('./routes/admin/getMiscellanousRoute');
const editMiscellanousRoute = require('./routes/admin/editMiscellanousRoute');
const passwordResetRoute = require('./routes/admin/passwordResetRoute');
const resetPasswordRoute = require('./routes/admin/resetPasswordRoute');
const resetPasswordTokenRoute = require('./routes/admin/resetPasswordTokenRoute');
const toggleActiveRoute = require('./routes/admin/toggleActiveRoute');
const deleteServiceRoute = require('./routes/admin/deleteServiceRoute');
const getDocfileRoute = require('./routes/client/getDocfileRoute');
const getUpsellDocRoute = require('./routes/client/getUpsellDocRoute');
const approveProposal = require('./routes/client/approveProposalRoute');
const rejectProposalRoute = require('./routes/client/rejectProposalRoute');
const getApproverDetailsRoute = require('./routes/client/getApproverDetailsRoute');


//client routes

const getDashboardData = require('./routes/client/getDashboardDataRoute');
const archiveProposal = require('./routes/client/archiveProposalRoute');
const activateProposal = require('./routes/client/activateProposalRoute');
const getDashboardSlnSpecialist = require('./routes/client/getDashboardSlnSpecialistRoute');
const getClientNamesBySearch = require('./routes/client/getClientNamesRoute');
const getClientNameByNumber = require('./routes/client/getClientNameByNumberRoute');
const getOpportunities = require('./routes/client/getOpportunitiesRoute');
const getCountryAddress = require('./routes/client/getCountryAddressRoute');
const getQuickStartInfo = require('./routes/client/getQuickStartInfoRoute')
const getDayConversionInfo = require('./routes/client/getDayConversionInfoRoute')
const getAllSolutionSpecialist = require('./routes/client/getAllSolutionSpecialistRoute')
const getAllSoftwares = require('./routes/client/getAllSoftwaresRoute')
const getAllCountries = require('./routes/client/getAllCountriesRoute')
const getHrsPerDayByCountry = require('./routes/client/getHrsPerDayByCountryRoute')
const getAllDataMigrationOptions = require('./routes/client/getAllDataMigrationOptionsRoute')
const getGSTPercentages = require('./routes/client/getGSTPercentagesRoute')
const getProductInfoById = require('./routes/client/getProductInfoByIdRoute')
const getAllEmpowerModules = require('./routes/client/getAllEmpowerModulesRoute')
const getYearUpliftPercent = require('./routes/client/getYearUpliftPercentRoute')
const getProposalCounter = require('./routes/client/getProposalCounterRoute')
const getProposalData = require('./routes/client/getProposalDataRoute')
const getProposalDetails = require('./routes/client/getProposalDetailsRoute')
const saveProposalData = require('./routes/client/saveProposalDataRoute')
const editProposalData = require('./routes/client/editProposalDataRoute')
const editProposalDetails = require('./routes/client/editProposalDetailsRoute')
const lockProposal = require('./routes/client/lockProposalRoute')

const saveClientProfile = require('./routes/client/saveClientProfileRoute');
const saveAttendingCourses = require('./routes/client/saveAttendingCoursesRoute')
const saveDefaultServices = require('./routes/client/saveDefaultServicesRoute')
const saveOptionalServices = require('./routes/client/saveOptionalServicesRoute')
const saveSalesNotes = require('./routes/client/saveSalesNotesRoute')
const saveUpfrontCost = require('./routes/client/saveUpfrontCostRoute')
const saveOngoingMaintenance = require('./routes/client/saveOngoingMaintenanceRoute')
const saveRepaymentCalc = require('./routes/client/saveRepaymentCalcRoute')
const saveMiscellaneous = require('./routes/client/saveMiscellaneousRoute')
const saveAffinityMobilePopup = require('./routes/client/saveAffinityMobilePopupRoute')
const saveSettlementPopup = require('./routes/client/saveSettlementPopupRoute')
const saveEmpowerPopup = require('./routes/client/saveEmpowerPopupRoute')
const saveScopingStudyPopup = require('./routes/client/saveScopingStudyPopupRoute')


const app = express();

//Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(cors());
app.use(logger);

app.use('/login', (req, res) => {
    res.send({ token: 'xyz123' });
});

app.use('/api', eventRoute.routes);
app.use('/api', oneUserRoute.routes);
app.use('/api', verifyRoute.routes);
app.use('/api', forgotPasswordRoute.routes);
app.use('/api', passwordResetRoute.routes);
app.use('/api', resetPasswordRoute.routes);
app.use('/api', resetPasswordTokenRoute.routes);
app.use('/api', getAllUsersRoute.routes);
app.use('/api', toggleActiveRoute.routes)
app.use('/api', updateUserRoute.routes);
app.use('/api', addUserRoute.routes);
app.use('/api', deleteUserRoute.routes);
app.use('/api', getMigrationsRoute.routes);
app.use('/api', getSingleMigrationRoute.routes);
app.use('/api', editMigrationsRoute.routes);
app.use('/api', getTrainingsRoute.routes);
app.use('/api', editTrainingsRoute.routes);
app.use('/api', getProductListRoute.routes);
app.use('/api', getSoftwaresRoute.routes);
app.use('/api', deleteSoftwareRoute.routes);
app.use('/api', addSoftwareRoute.routes);
app.use('/api', editSoftwareRoute.routes);
app.use('/api', getWorkflowRoute.routes);
app.use('/api', updateWorkflow.routes);
app.use('/api', getQuickServicesRoute.routes);
app.use('/api', editQuickServicesRoute.routes);
app.use('/api', deleteServiceRoute.routes);
app.use('/api', getContactDetailsRoute.routes);
app.use('/api', editContactDetailsRoute.routes);
app.use('/api', getGSTpercentageRoute.routes);
app.use('/api', editGSTpercentageRoute.routes);
app.use('/api', getDayConversionsRoute.routes);
app.use('/api', editDayConversionsRoute.routes);
app.use('/api', getHoursPerDayRoute.routes);
app.use('/api', editHoursPerDayRoute.routes);
app.use('/api', getOracleWordingsRoute.routes);
app.use('/api', editOracleWordingsRoute.routes);
app.use('/api', getMiscellanousRoute.routes);
app.use('/api', editMiscellanousRoute.routes);

app.use('/api', getDocfileRoute.routes);
app.use('/api', getUpsellDocRoute.routes);
app.use('/api', approveProposal.routes);
app.use('/api', rejectProposalRoute.routes);
app.use('/api', getApproverDetailsRoute.routes);

app.use('/api', getDashboardSlnSpecialist.routes);
app.use('/api', archiveProposal.routes);
app.use('/api', activateProposal.routes);
app.use('/api', getDashboardData.routes);
app.use('/api', getClientNamesBySearch.routes);
app.use('/api', getClientNameByNumber.routes);
app.use('/api', getOpportunities.routes);
app.use('/api', getCountryAddress.routes);
app.use('/api', getQuickStartInfo.routes);
app.use('/api', getDayConversionInfo.routes);
app.use('/api', getAllSolutionSpecialist.routes);
app.use('/api', getAllSoftwares.routes);
app.use('/api', getAllCountries.routes);
app.use('/api', getHrsPerDayByCountry.routes);
app.use('/api', getAllDataMigrationOptions.routes);
app.use('/api', getGSTPercentages.routes);
app.use('/api', getProductInfoById.routes);
app.use('/api', getAllEmpowerModules.routes);
app.use('/api', getYearUpliftPercent.routes);
app.use('/api', getProposalCounter.routes);
app.use('/api', getProposalData.routes);
app.use('/api', getProposalDetails.routes);
app.use('/api', saveProposalData.routes);
app.use('/api', editProposalData.routes);
app.use('/api', editProposalDetails.routes);
app.use('/api', lockProposal.routes);


app.use('/api', saveClientProfile.routes);
app.use('/api', saveAttendingCourses.routes);
app.use('/api', saveDefaultServices.routes);
app.use('/api', saveOptionalServices.routes);
app.use('/api', saveSalesNotes.routes);
app.use('/api', saveUpfrontCost.routes);
app.use('/api', saveOngoingMaintenance.routes);
app.use('/api', saveRepaymentCalc.routes);
app.use('/api', saveMiscellaneous.routes);
app.use('/api', saveAffinityMobilePopup.routes);
app.use('/api', saveSettlementPopup.routes);
app.use('/api', saveEmpowerPopup.routes);
app.use('/api', saveScopingStudyPopup.routes);


const archiveProposalJob = async () => {
    try {
        let pool = await sql.connect(config.sql);
        // const sqlQueries = await utils.loadSqlQueries('client');
        const query = `	UPDATE [dbo].[proposal_details]
                        SET [lifecycle_id] = 2
                        WHERE [lifecycle_id] = 1 AND DATEDIFF(DAY, [date_of_submission], GETDATE()) > 90`
        const archive = await pool.request()
            .query(query);
        return archive.rowsAffected;
    } catch (error) {
        return error.message;
    }
}

cron.schedule('0 1 * * *', () => {
    //    console.log('Running a job at 01:00 at everyday');
    archiveProposalJob()
        .then(result => console.log(`today ${new Date()} archived ${result} proposals`))
        .catch(error => console.log('error occured while archvingproposals', error))
}, { scheduled: true, });

app.listen(config.port, () => {
    console.log(`Example app listening at http://10.61.201.126:${config.port}`);
});