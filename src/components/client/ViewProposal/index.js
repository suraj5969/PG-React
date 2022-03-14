import React from 'react';
import Header from './Header';
import ClientInfo from '../NewProposal/ClientInfo';
import ApprovalDetails from './ApprovalDetails'
import SubTabs from '../NewProposal/SubTabs';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import getProposalDataAPI from '../../../apis/client/getProposalDataAPI';
import getProposalDetailsAPI from '../../../apis/client/getProposalDetailsAPI';
import getUserDetailsAPI from '../../../apis/admin/getUserDetailsAPI';
import approveProposalAPI from '../../../apis/client/approveProposalAPI';
import activateProposalAPI from '../../../apis/client/activateProposalAPI';
import rejectProposalAPI from '../../../apis/client/rejectProposalAPI';
import lockProposalAPI from '../../../apis/client/lockProposalAPI';
import RejectProposalPopup from '../PopUps/RejectProposalPopup';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../admin/Loader';
import { decrypt } from '../encryptURL';
import DefaultValues from '../NewProposal/DefaultValues';

toast.configure();

function ViewProposal() {

    const { defaultClientProfile, defaultInfo, defaultAttendingCourses, defaultServices,
        defaultOptionalServices, defaultMiscellaneous, defaultNotes, defaultUpfrontCost,
        defaultOngoingMnt, defaultRepayment } = DefaultValues;

    React.useEffect(() => {
        document.title = 'View Proposal'
    }, []);

    const history = useHistory();
    const { proposal_no } = useParams();
    const proposalNo = decrypt(proposal_no);

    const [clientFromGCRM, setClientFromGCRM] = React.useState(false);
    const [clientProfile, setClientProfile] = React.useState(defaultClientProfile);
    const [Info, setInfo] = React.useState(defaultInfo);
    const [attendingCourses, setAttendingCourses] = React.useState(defaultAttendingCourses);
    const [defaultServicesValues, setDefaultServicesValues] = React.useState(defaultServices);
    const [optionalServices, setOptionalServices] = React.useState(defaultOptionalServices);
    const [miscellaneous, setMiscellaneous] = React.useState(defaultMiscellaneous);
    const [notes, setNotes] = React.useState(defaultNotes);
    const [upfrontCost, setUpfrontCost] = React.useState(defaultUpfrontCost);
    const [ongoingMnt, setOngoingMnt] = React.useState(defaultOngoingMnt);
    const [repaymentCalc, setRepaymentCalc] = React.useState(defaultRepayment);

    const [affinityMobilePopUpValue, setAffinityMobilePopUpValue] = React.useState('');
    const [settlementPopUpValue, setSettlementPopUpValue] = React.useState('');
    const [scopingStudyPopUpValue, setScopingStudyPopUpValue] = React.useState('');
    const [empowerModules, setEmpowerModules] = React.useState({
        empowerModules: [],
        numOfUsers: '',
        modulesSelected: 0,
    });
    const [affinityServerPopupValues, setAffinityServerPopupValues] = React.useState({
        typeOfLicense: '',
        numOfUsers: '',
        edition: '',
        serverLicense: '',
        oracleLicense: '',
        maintenance: '',
        total: ''
    });
    const [mandatoryFields, setMandatoryFields] = React.useState({
        clientName: false,
        opportunityNumber: false,
        numOfUsers: false,
        country: false,
        objective: false,
        upsell: false,
        solutionSpecialist: false,
        currentSoftware: false,
        duration: false,
        specialConditions: false,
    })
    const [fillValueErrors, setFillValueErrors] = React.useState({
        clientName: false,
        // opportunityNumber: false,
        numOfUsers: false,
        country: false,
        objective: false,
        upsell: false,
        solutionSpecialist: false,
        currentSoftware: false,
        duration: false,
        specialConditions: false,
        affinityServerCPU: false,
    })

    // const [allUsers, setAllUsers] = React.useState([]);
    const [proposalDetails, setProposalDetails] = React.useState({
        nextApprover: '',
        sManagerApprover: '',
        commApprover: '',
        cfoApprover: '',
        opsApprover: "",
        sManagerAppDate: '',
        commAppDate: '',
        cfoAppDate: '',
        opsAppDate: '',
        createdBy: '',
        rejectedBy: '',
        rejectedReason: '',
        RejectedDate: '',
        editedBy: '',
        editedReason: '',
        editedDate: '',
        lifecycle: '',
    })

    const [isData, setIsData] = React.useState(false);
    const [showButtons, setShowButtons] = React.useState(false);
    const [disableButtons, setDisableButtons] = React.useState(false);
    const [generateDoc, setGenerateDoc] = React.useState(false);
    const [showLockProposal, setShowLockProposal] = React.useState(false);
    const [proposalLifecyce, setProposalLifecycle] = React.useState(1);

    const [headerInfo, setHeaderInfo] = React.useState({
        value: '',
        updatedDate: '',
        updatedBy: '',
        status: '',
        proposalNo: ''
    });

    React.useEffect(() => {
        const fetchData = async () => {
            const user_id = Number(sessionStorage.getItem('user_id'));
            const ProposalDetails = await getProposalDataAPI(proposalNo, user_id);
            if (ProposalDetails.status !== 200) {
                console.log('getProposalDetailsAPI no working');
            }
            else {
                if (ProposalDetails.data instanceof Array && ProposalDetails.data.length > 0) {
                    const data = ProposalDetails.data[0];
console.log(data)
                    const rights = JSON.parse(sessionStorage.getItem('rights')) || {};
                    if (Number(rights.can_view) !== 1 && Number(data.createdBy) !== user_id) {
                        toast.error("You cannot view this proposal", {
                            autoClose: '2000'
                        });
                        history.push('/client/dashboard');
                        return;
                    }

                    setClientProfile({
                        clientName: data.clientProfile[0].client_name,
                        clientNumber: data.clientProfile[0].client_number,
                        opportunityNumber: data.clientProfile[0].opp_number,
                        opportunityName: data.clientProfile[0].opp_name,
                        numOfUsers: data.clientProfile[0].num_of_users,
                        numOfFreeEarners: data.clientProfile[0].num_of_earners,
                        country: data.clientProfile[0].country,
                        objective: data.clientProfile[0].objective,
                        commercialObjective: data.clientProfile[0].commercial_objective,
                        upsell: data.clientProfile[0].upsell,
                        solutionSpecialistId: data.clientProfile[0].solution_specialist_id,
                        quickStart: data.clientProfile[0].quick_start,
                        currentSoftwareId: data.clientProfile[0].current_software_id,
                        endValidDate: new Date(data.clientProfile[0].end_valid_date),
                        duration: data.clientProfile[0].duration,
                        address: data.clientProfile[0].address,
                    });
                    setInfo({
                        hoursRequired: data.clientProfile[0].hours_from_capital,
                        timeIncluded: data.clientProfile[0].time_inc_in_project,
                        traningMethod: data.clientProfile[0].traning_method,
                        bpaSetup: data.clientProfile[0].bpa_setup,
                        specialConditions: data.clientProfile[0].special_conditions,
                        currency: data.clientProfile[0].currency,
                    });

                    setAttendingCourses({
                        operationsAdminLabel: data.attendingCourses[0].course_name,
                        operationsAdmin: data.attendingCourses[0].nof_people,
                        dataformsLabel: data.attendingCourses[1].course_name,
                        dataforms: data.attendingCourses[1].nof_people,
                        endUserAccountLabel: data.attendingCourses[2].course_name,
                        endUserAccount: data.attendingCourses[2].nof_people,
                        endUserBPALabel: data.attendingCourses[3].course_name,
                        endUserBPA: data.attendingCourses[3].nof_people,
                    });

                    let defaultValues = {};
                    const defaultServicesRows = ["projectMgmt", "installationOracle", "essentialsCourse", "operationsCourse", "administrationCourse", "systemSetup", "backprocessing", "reconcileTakeUp", "anticipatedDisbs", "trainInBillTemp", "endUserTraining", "endOfMonth", "documentMgmt", "totalHrsBaseInstall", "totalDays"];
                    for (let i = 0; i < data.defaultServicesValues?.length && i < defaultServicesRows.length; i++) {
                        defaultValues[defaultServicesRows[i]] = {};
                        defaultValues[defaultServicesRows[i]].task = data.defaultServicesValues[i].task;
                        defaultValues[defaultServicesRows[i]].traningMethod = data.defaultServicesValues[i].traning_method;
                        defaultValues[defaultServicesRows[i]].team = data.defaultServicesValues[i].team;
                        defaultValues[defaultServicesRows[i]].include = data.defaultServicesValues[i].include;
                        defaultValues[defaultServicesRows[i]].PM = data.defaultServicesValues[i].pm;
                        defaultValues[defaultServicesRows[i]].TSG = data.defaultServicesValues[i].tsg;
                        defaultValues[defaultServicesRows[i]].accountsTraining = data.defaultServicesValues[i].accounts_training;
                        defaultValues[defaultServicesRows[i]].accountsConsulting = data.defaultServicesValues[i].accounts_consulting;
                        defaultValues[defaultServicesRows[i]].BPAConsulting = data.defaultServicesValues[i].bpa_consulting;
                        defaultValues[defaultServicesRows[i]].travel = data.defaultServicesValues[i].travel;
                        defaultValues[defaultServicesRows[i]].totalHrs = data.defaultServicesValues[i].total_hrs;
                    }
                    setDefaultServicesValues(defaultValues);

                    let optionalValues = {};
                    const optionalServicesRows = ["dataMigrationRow", "selfCustody", "multyPartyBilling", "reportWriting", "dataformsMax", "scripting", "workflow", "BPAEndUser", "BPAEssentials", "dataformsPhoneBook", "addPrecedent", "BPAGoLive", "exchangeIntegration", "softdocsIntegration", "clientPortal", "worksiteIntegration", "affinityMobile", "empower", "settlementAdjuster", "thirdPartyIT", "totalHours", "totalDays", "grandTotalHours", "grandTotalDays"];
                    for (let i = 0; i < data.optionalServices?.length && i < optionalServicesRows.length; i++) {
                        optionalValues[optionalServicesRows[i]] = {};
                        optionalValues[optionalServicesRows[i]].task = data.optionalServices[i].task;
                        optionalValues[optionalServicesRows[i]].traningMethod = data.optionalServices[i].traning_method;
                        optionalValues[optionalServicesRows[i]].team = data.optionalServices[i].team;
                        optionalValues[optionalServicesRows[i]].include = data.optionalServices[i].include;
                        optionalValues[optionalServicesRows[i]].PM = data.optionalServices[i].pm;
                        optionalValues[optionalServicesRows[i]].TSG = data.optionalServices[i].tsg;
                        optionalValues[optionalServicesRows[i]].dataMigration = data.optionalServices[i].data_migration;
                        optionalValues[optionalServicesRows[i]].accountsTraining = data.optionalServices[i].accounts_training;
                        optionalValues[optionalServicesRows[i]].accountsConsulting = data.optionalServices[i].accounts_consulting;
                        optionalValues[optionalServicesRows[i]].BPATraining = data.optionalServices[i].bpa_training;
                        optionalValues[optionalServicesRows[i]].BPAConsulting = data.optionalServices[i].bpa_consulting;
                        optionalValues[optionalServicesRows[i]].travel = data.optionalServices[i].travel;
                        optionalValues[optionalServicesRows[i]].totalHrs = data.optionalServices[i].total_hrs;
                    }
                    setOptionalServices(optionalValues);

                    let miscValues = {};
                    const miscellaneousRows = ["affinityServer", "lexisResearch", "scopingStudy", "additionalReturn", "propertyPresidency"];
                    for (let i = 0; i < data.miscellaneous?.length && i < miscellaneousRows.length; i++) {
                        miscValues[miscellaneousRows[i]] = {};
                        miscValues[miscellaneousRows[i]].miscellaneous = data.miscellaneous[i].miscellaneous;
                        miscValues[miscellaneousRows[i]].included = data.miscellaneous[i].included;
                        miscValues[miscellaneousRows[i]].hours = data.miscellaneous[i].hours;
                        miscValues[miscellaneousRows[i]].price = data.miscellaneous[i].price;
                    }
                    setMiscellaneous(miscValues);

                    let notesValues = [];
                    for (let i = 0; i < data.notes?.length; i++) {
                        let note = {};
                        note.note_no = data.notes[i].note_no;
                        note.user_id = data.notes[i].user_id;
                        note.date = data.notes[i].date;
                        note.note = data.notes[i].note;
                        note.time = data.notes[i].time;
                        note.user = data.notes[i].user_name;
                        notesValues.push(note);
                    }
                    setNotes(notesValues);

                    let upfrontValues = {};
                    const upfrontCostRows = ["lexisServerLicense", "lexisUserLicense", "oracleLicenses", "clientPortal", "affinityMobile", "lexisSettleAdjuster", "twoWayMicrosoft", "empower", "softDocs", "ImplementServices", "ImplementTraning", "postImplementation", "dataMigration", "travelAllowance", "scopingStudy", "propertyPrecedent", "subTotal", "lessConfidential", "totalInvesteExcl", "GSTPayable", "totalInvestePay", "totalPerUser"];
                    for (let i = 0; i < data.upfrontCost?.length && i < upfrontCostRows.length; i++) {
                        upfrontValues[upfrontCostRows[i]] = {};
                        upfrontValues[upfrontCostRows[i]].label = data.upfrontCost[i].upcost_name;
                        upfrontValues[upfrontCostRows[i]].cost = data.upfrontCost[i].cost;
                        upfrontValues[upfrontCostRows[i]].percentDiscount = data.upfrontCost[i].percent_discount;
                        upfrontValues[upfrontCostRows[i]].discountItemcost = data.upfrontCost[i].discount_item_cost;
                        upfrontValues[upfrontCostRows[i]].discountAmount = data.upfrontCost[i].discount_amount;
                    }
                    upfrontValues["softwareDiscount"] = data.upfrontDiscounts.softwareDiscount;
                    upfrontValues["serviceDiscount"] = data.upfrontDiscounts.serviceDiscount;
                    setUpfrontCost(upfrontValues);

                    let ongoingValues = {};
                    const ongoingMntRows = ["annualAffinity", "annualOracleCare", "annualAffinityMobile", "annualClient", "annualEmpower", "annualSoftDocs", "annualSettlement", "subTotal", "lessConfidential", "totalMntExclGST", "GSTPayable", "totalMntAnnual", "totalMntMonthly", "totalAnnualCost", "totalCostMonth"];
                    for (let i = 0; i < data.ongoingMnt?.length && i < ongoingMntRows.length; i++) {
                        ongoingValues[ongoingMntRows[i]] = {};
                        ongoingValues[ongoingMntRows[i]].label = data.ongoingMnt[i].lexis_care;
                        ongoingValues[ongoingMntRows[i]].cost = data.ongoingMnt[i].cost;
                        ongoingValues[ongoingMntRows[i]].percentDiscount = data.ongoingMnt[i].percent_discount;
                        ongoingValues[ongoingMntRows[i]].discountItemcost = data.ongoingMnt[i].discount_item_cost;
                        ongoingValues[ongoingMntRows[i]].discountAmount = data.ongoingMnt[i].discount_amount;
                    }
                    setOngoingMnt(ongoingValues);

                    let repaymentValues = {
                        totalsTable: {},
                        mntTable: {},
                        repayments: {}
                    }
                    const totalsTableRows = ["software", "services", "sTotal", "pricePerTool", "priceTotal"];
                    const mntTableRows = ["year1", "year2", "year3", "year4", "year5", "mntTotal"];
                    const repaymentsRows = ["initPayment", "month1", "month2", "month3", "month4", "month5", "month6", "month7", "month8", "month9", "month10", "month11", "month12", "month13", "month14", "month15", "month16", "month17", "month18", "month19", "month20", "month21", "month22", "month23", "month24", "month25", "month26", "month27", "month28", "month29", "month30", "month31", "month32", "month33", "month34", "month35", "month36", "month37", "month38", "month39", "month40", "month41", "month42", "month43", "month44", "month45", "month46", "month47", "month48", "month49", "month50", "month51", "month52", "month53", "month54", "month55", "month56", "month57", "month58", "month59", "month60", "repaymentTotal"];

                    for (let i = 0; i < data.repaymentCalc.totalsTable?.length && i < totalsTableRows.length; i++) {
                        repaymentValues.totalsTable[totalsTableRows[i]] = {};
                        repaymentValues.totalsTable[totalsTableRows[i]].label = data.repaymentCalc.totalsTable[i].label;
                        repaymentValues.totalsTable[totalsTableRows[i]].cost = data.repaymentCalc.totalsTable[i].cost;
                        repaymentValues.totalsTable[totalsTableRows[i]].gcrmEntries = data.repaymentCalc.totalsTable[i].gcrm_entries;
                    }
                    for (let i = 0; i < data.repaymentCalc.mntTable?.length && i < mntTableRows.length; i++) {
                        repaymentValues.mntTable[mntTableRows[i]] = {};
                        repaymentValues.mntTable[mntTableRows[i]].label = data.repaymentCalc.mntTable[i].maintenance;
                        repaymentValues.mntTable[mntTableRows[i]].RRP = data.repaymentCalc.mntTable[i].rrp;
                        repaymentValues.mntTable[mntTableRows[i]].discounted = data.repaymentCalc.mntTable[i].discounted;
                    }
                    for (let i = 0; i < data.repaymentCalc.repayments?.length && i < repaymentsRows.length; i++) {
                        repaymentValues.repayments[repaymentsRows[i]] = {};
                        repaymentValues.repayments[repaymentsRows[i]].label = data.repaymentCalc.repayments[i].repayments;
                        repaymentValues.repayments[repaymentsRows[i]].payments = data.repaymentCalc.repayments[i].payment;
                        repaymentValues.repayments[repaymentsRows[i]].lexisCare = data.repaymentCalc.repayments[i].lexis_care;
                    }
                    setRepaymentCalc(repaymentValues);

                    setAffinityMobilePopUpValue(Number(data.affinityMobilePopUpValue[0]?.num_of_users));
                    setSettlementPopUpValue(Number(data.settlementPopUpValue[0]?.no_of_licenses));
                    setScopingStudyPopUpValue(Number(data.scopingStudyPopUpValue[0]?.hrs_required));

                    let modules = [], modulesSelected = 0;
                    for (let i = 0; i < data.empowerModules.empowerModules?.length; i++) {
                        let module = {};
                        module.id = data.empowerModules.empowerModules[i].id;
                        module.empower_name = data.empowerModules.empowerModules[i].module_name;
                        module.checked = Boolean(Number(data.empowerModules.empowerModules[i].selected));
                        if (module.checked) {
                            modulesSelected++;
                        }
                        modules.push(module);
                    }
                    setEmpowerModules({
                        empowerModules: modules,
                        numOfUsers: data.empowerModules?.numOfUsers,
                        modulesSelected: modulesSelected
                    })
                    setGenerateDoc(data.generateDoc);

                    if (data.nextApproverId === Number(user_id)) {
                        setShowButtons(true);
                    }
                    if (data.showLockProposal === true) {
                        setShowLockProposal(true);
                    }

                    setIsData(true);

                    const getUserName = (allUsers, user_id) => {
                        const user = allUsers.filter(user => user.user_id === user_id);
                        if (user.length > 0) return user[0].fname + ' ' + user[0].lname;
                        return '';
                    }

                    const allUsers = await getUserDetailsAPI();
                    const details = await getProposalDetailsAPI(proposalNo);
                    const proposalStatus = {
                        '1': 'Rejected',
                        '2': 'Not Submitted for Approval',
                        '3': 'Proposal without GCRM client',
                        '4': 'Pending for Sales Approval',
                        '5': 'Pending for Commercial Lead Approval',
                        '6': 'Pending for CFO Approval',
                        '7': 'Pending for Ops Team Approval',
                        '8': 'Approved',
                    }
                    // const details = await getWorkflowDetailsAPI();
                    if (allUsers.status !== 200 && details.status !== 200) {
                        console.log('getUserDetailsAPI or getProposalDetailsAPI not working');
                    }
                    else {
                        if (typeof allUsers.data === 'object' && allUsers.data.length > 0 &&
                            typeof details.data === 'object' && details.data.length > 0) {
                            const users = allUsers.data;
                            const propDetails = details.data[0];
                            const createdBy = getUserName(users, propDetails.created_by);
                            const editedBy = getUserName(users, propDetails.edited_by);
                            setProposalDetails({
                                nextApprover: getUserName(users, data.nextApproverId),
                                sManagerApprover: getUserName(users, propDetails.s_manager_id),
                                commApprover: getUserName(users, propDetails.comm_approver_id),
                                cfoApprover: getUserName(users, propDetails.cfo_approver_id),
                                opsApprover: getUserName(users, propDetails.ops_approver_id),
                                sManagerAppDate: propDetails.s_manager_approved_date ? moment(propDetails.s_manager_approved_date).format('DD-MM-YYYY') : '',
                                commAppDate: propDetails.comm_approved_date ? moment(propDetails.comm_approved_date).format('DD-MM-YYYY') : '',
                                cfoAppDate: propDetails.cfo_approved_date ? moment(propDetails.cfo_approved_date).format('DD-MM-YYYY') : '',
                                opsAppDate: propDetails.ops_approved_date ? moment(propDetails.ops_approved_date).format('DD-MM-YYYY') : '',
                                createdBy: createdBy,
                                rejectedBy: getUserName(users, propDetails.rejected_by),
                                rejectedReason: propDetails.rejected_reason,
                                RejectedDate: propDetails.rejected_date ? moment(propDetails.rejected_date).format('DD-MM-YYYY') : '',
                                editedBy: editedBy,
                                editedReason: propDetails.edited_reason,
                                editedDate: propDetails.edited_date ? moment(propDetails.edited_date).format('DD-MM-YYYY') : '',
                                lifecycle: Number(propDetails.lifecycle_id) === 1 ? 'Active' : 'Archived',
                            });

                            setProposalLifecycle(propDetails.lifecycle_id);

                            setHeaderInfo({
                                value: `$${Number(data.repaymentCalc.totalsTable[2].gcrm_entries).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                                updatedDate: propDetails.edited_date ? moment(propDetails.edited_date).format('DD-MM-YYYY') : moment(propDetails.date_of_submission).format('DD-MM-YYYY'),
                                updatedBy: propDetails.edited_date ? editedBy : createdBy,
                                status: proposalStatus[data.proposalStatus],
                                proposalNo: data.proposalNo,
                            });
                        }

                    }
                }
            }
        }
        fetchData();
    }, [proposalNo, history])


    const rights = JSON.parse(sessionStorage.getItem('rights')) || {};
    const [approveClicked, setApproveClicked] = React.useState(0);
    const approveProp = async () => {
        if (approveClicked === 0) {
            setDisableButtons(true);
            setApproveClicked(approveClicked + 1);
            const user_id = sessionStorage.getItem('user_id');
            const apiResult = await approveProposalAPI(proposalNo, Number(user_id));
            if (apiResult.status !== 200) {
                console.log('approveProposalAPI not working');
                // toast.error("Some Error occured. Please try again later.", {
                //     autoClose: '3000'
                // });
            }
            else {
                toast.success(`You Approved the Proposal ${proposalNo}`, {
                    autoClose: '4000'
                });
            }
            history.push('/client/dashboard');
        }
    }

    const [activateClicked, setActivateClicked] = React.useState(false)
    const activateProposal = async () => {
        setActivateClicked(true);
        // const user_id = sessionStorage.getItem('user_id');
        const apiResult = await activateProposalAPI(proposalNo);
        // console.log(apiResult)
        if (apiResult.status !== 200 || !(apiResult.data instanceof Array)) {
            console.log('activateProposalAPI not working');
        }
        else {
            toast.success(`You made Proposal ${proposalNo} Active`, {
                autoClose: '4000'
            });
        }
        // history.push('/client/dashboard');

    }

    const [rejectPopup, setRejectPopup] = React.useState(false);
    const handelRejectPopup = async (value) => {
        setRejectPopup(false);
        if (value.confirmation) {
            setDisableButtons(true);
            const apiResult = await rejectProposalAPI(proposalNo, value.rejectionReason);
            // console.log(apiResult, 'rehect apiResult');
            if (apiResult.status !== 200) {
                console.log('rejectProposalAPI not working');
                // toast.error("Some Error occured. Please try again later.", {
                //     autoClose: '3000'
                // });
            }
            else {
                toast.error(`Proposal ${proposalNo} was rejected by you`, {
                    autoClose: '3000'
                });
            }
            history.push('/client/dashboard');
        }
    }

    const rejectProp = async () => {
        setRejectPopup(true);
    }

    const [disableLockProp, setDisableLockProp] = React.useState(false);
    const lockProp = async () => {
        setDisableLockProp(true);
        const apiResult = await lockProposalAPI(proposalNo);
        if (apiResult.status !== 200) {
            console.log('lockProposalAPI not working');
            // toast.error("Some Error occured. Please try again later.", {
            //     autoClose: '3000'
            // });
        }
        else {
            toast.info("This proposal is now Locked", {
                autoClose: '3000'
            });
        }
        history.push('/client/dashboard');
    }



    return (
        <>
            <CssBaseline />
            {
                !isData
                    ? <Loader />
                    : <>
                        <Header headerInfo={headerInfo} />
                        <Container maxWidth="xl">
                            <RejectProposalPopup open={rejectPopup} onClose={handelRejectPopup} />
                            <ClientInfo
                                viewMode={true}
                                setClientFromGCRM={setClientFromGCRM}
                                clientProfile={clientProfile}
                                setClientProfile={setClientProfile}
                                Info={Info}
                                setInfo={setInfo}
                                mandatoryFields={mandatoryFields}
                                setMandatoryFields={setMandatoryFields}
                                fillValueErrors={fillValueErrors}
                                setFillValueErrors={setFillValueErrors}
                            />

                            <ApprovalDetails
                                proposalDetails={proposalDetails}
                            />

                            <SubTabs
                                viewMode={true}
                                clientProfile={clientProfile}
                                Info={Info}
                                attendingCourses={attendingCourses}
                                setAttendingCourses={setAttendingCourses}
                                defaultServicesValues={defaultServicesValues}
                                setDefaultServicesValues={setDefaultServicesValues}
                                optionalServices={optionalServices}
                                setOptionalServices={setOptionalServices}
                                miscellaneous={miscellaneous}
                                setMiscellaneous={setMiscellaneous}
                                notes={notes}
                                setNotes={setNotes}
                                upfrontCost={upfrontCost}
                                setUpfrontCost={setUpfrontCost}
                                ongoingMnt={ongoingMnt}
                                setOngoingMnt={setOngoingMnt}
                                repaymentCalc={repaymentCalc}
                                setRepaymentCalc={setRepaymentCalc}
                                affinityMobilePopUpValue={affinityMobilePopUpValue}
                                setAffinityMobilePopUpValue={setAffinityMobilePopUpValue}
                                empowerModules={empowerModules}
                                setEmpowerModules={setEmpowerModules}
                                settlementPopUpValue={settlementPopUpValue}
                                setSettlementPopUpValue={setSettlementPopUpValue}
                                scopingStudyPopUpValue={scopingStudyPopUpValue}
                                setScopingStudyPopUpValue={setScopingStudyPopUpValue}
                                affinityServerPopupValues={affinityServerPopupValues}
                                setAffinityServerPopupValues={setAffinityServerPopupValues}
                            />
                            {
                                Number(rights.can_approve) === 1
                                    ? <Box sx={{
                                        marginTop: '-20px',
                                        marginLeft: { xs: '0', sm: '1.6rem' }
                                    }}>
                                        {
                                            showButtons
                                                ? <>
                                                    <Button onClick={approveProp} disabled={disableButtons} variant="contained" color="primary" sx={{ m: 1 }}>
                                                        Approve
                                                    </Button>
                                                    <Button onClick={rejectProp} disabled={disableButtons} variant="contained" color="primary" sx={{ m: 1 }}>
                                                        Reject
                                                    </Button>
                                                </>
                                                : null
                                        }
                                        {
                                            showLockProposal
                                                ? <Button onClick={lockProp} disabled={disableLockProp} variant="contained" color="primary" sx={{ m: 1 }}>
                                                    Lock Proposal
                                                </Button>
                                                : null
                                        }
                                        {
                                            proposalLifecyce === 2 && // proposal lifecycle 2 means proposal is archived
                                                (Number(sessionStorage.getItem('role')) === 1 ||
                                                    String(sessionStorage.getItem('solution_specialist')).toLowerCase().includes('yes'))
                                                ? <Button onClick={activateProposal} disabled={activateClicked} variant="contained" color="primary" sx={{ m: 1 }}>
                                                    Activate Proposal
                                                </Button>
                                                : null
                                        }
                                    </Box>
                                    : null
                            }
                            {
                                generateDoc ?
                                    <Box sx={{
                                        marginTop: '7px',
                                        marginLeft: { xs: '0', sm: '1.6rem' }
                                    }}>
                                        {
                                            clientProfile.objective === 'New Business'
                                                ? <a href={`${process.env.REACT_APP_SERVER_URL}/api/getDocfile/${proposalNo}`}>
                                                    <Button variant="contained" color="primary" sx={{ m: 1 }}>
                                                        Generate Proposal
                                                    </Button>
                                                </a>
                                                : clientProfile.objective === 'Upsell'
                                                    ? <a href={`${process.env.REACT_APP_SERVER_URL}/api/getUpsellDoc/${proposalNo}`}>
                                                        <Button variant="contained" color="primary" sx={{ m: 1 }}>
                                                            Generate Proposal
                                                        </Button>
                                                    </a>
                                                    : null
                                        }
                                    </Box>
                                    : null
                            }
                        </Container>
                    </>
            }
        </>
    )
}

export default ViewProposal;
