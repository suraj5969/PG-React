import React from 'react';
import Header from './Globals/Header';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import SubTabs from './SubTabs';
import { useHistory } from 'react-router-dom';
import ClientInfo from './ClientInfo';
import getAllEmpowerModulesAPI from '../../../apis/client/getAllEmpowerModulesAPI';
import saveProposalDataAPI from '../../../apis/client/saveProposalDataAPI';
import InfoPopup from '../PopUps/InfoPopup';
// import ConfirmationPopup from '../PopUps/ConfirmationPopup';
import SubmitProposalPopup from '../PopUps/SubmitProposalPopup';
import DefaultValues from './DefaultValues';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './NewProposal.css';

toast.configure();

export default function NewProposal() {

    const history = useHistory();
    const { defaultClientProfile, defaultInfo, defaultAttendingCourses, defaultServices,
        defaultOptionalServices, defaultMiscellaneous, defaultNotes, defaultUpfrontCost,
        defaultOngoingMnt, defaultRepayment, defaultDiscountTable } = DefaultValues;

    React.useEffect(() => {
        document.title = 'New Proposal';

        const rights = JSON.parse(sessionStorage.getItem('rights')) || {};
        if (Number(rights.can_create) !== 1) {
            toast.error("You cannot create proposals", {
                autoClose: '2000'
            });
            history.push('/client/dashboard')
        }
    }, [history]);

    const [clientFromGCRM, setClientFromGCRM] = React.useState(false);

    const [clientProfile, setClientProfile] = React.useState(defaultClientProfile);
    const [Info, setInfo] = React.useState(defaultInfo);
    const [attendingCourses, setAttendingCourses] = React.useState(defaultAttendingCourses);
    const [defaultServicesValues, setDefaultServicesValues] = React.useState(defaultServices);
    const [optionalServices, setOptionalServices] = React.useState(defaultOptionalServices);
    const [affinityMobilePopUpValue, setAffinityMobilePopUpValue] = React.useState('');
    const [settlementPopUpValue, setSettlementPopUpValue] = React.useState('');
    const [mitimesPopUpValue, setMitimesPopupValue] = React.useState('');
    
    const [empowerModules, setEmpowerModules] = React.useState({
        empowerModules: [],
        numOfUsers: '',
        modulesSelected: 0,
    });
    React.useEffect(() => {
        const fetchData = async () => {
            const result = await getAllEmpowerModulesAPI();
            if (result.status !== 200) {
                console.log('getAllEmpowerModulesAPI no working');
            }
            else {
                if (typeof result.data === 'object' && result.data.length > 0) {
                    const modules = result.data.map((empower) => ({ empower_name: empower.empower_name, id: empower.id, checked: false }));
                    setEmpowerModules({
                        empowerModules: modules,
                        numOfUsers: '',
                        modulesSelected: 0,
                    });
                }
            }
        }
        fetchData();
    }, [setEmpowerModules])


    const [scopingStudyPopUpValue, setScopingStudyPopUpValue] = React.useState('');
    const [practiceAreaKitPopupValues, setpracticeAreaKitPopupValues] = React.useState({
        practiceAreaKitModules: [],
        numOfUsers: '',
        modulesSelected: 0,
    });
    const [lnSearchPopUpValue, setlnSearchPopUpValue] = React.useState({
        lnSearchPopUpValue: [],
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

    const [miscellaneous, setMiscellaneous] = React.useState(defaultMiscellaneous);
    const [notes, setNotes] = React.useState(defaultNotes);
    const [upfrontCost, setUpfrontCost] = React.useState(defaultUpfrontCost);
    const [ongoingMnt, setOngoingMnt] = React.useState(defaultOngoingMnt);
    const [repaymentCalc, setRepaymentCalc] = React.useState(defaultRepayment);
    const [discountTable, setDiscountTable] = React.useState(defaultDiscountTable);

    const [mandatoryFields, setMandatoryFields] = React.useState({
        clientName: true,
        opportunityNumber: true,
        numOfUsers: true,
        country: true,
        objective: true,
        upsell: true,
        solutionSpecialist: true,
        currentSoftware: true,
        duration: true,
        specialConditions: true,
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

    const [affinityServerPopup, setAffinityServerPopup] = React.useState(false);
    const CloseAffinityServerPopup = () => {
        setAffinityServerPopup(false);
    }

    const checkRequiredValues = () => {
        setFillValueErrors((prevValue) => ({
            clientName: false,
            clientNumber: false,
            oppNum: false,
            numOfUsers: false,
            country: false,
            objective: false,
            upsell: false,
            solutionSpecialist: false,
            currentSoftware: false,
            duration: false,
            specialConditions: false,
            affinityServerCPU: false,
        }))

        if (clientProfile.clientName.length < 3) {
            const autocompleteInput = document.querySelector('.client-name-autocomplete input');
            setFillValueErrors((prevValue) => ({ ...prevValue, clientName: true }));
            autocompleteInput.focus();
            return false;
        }
        // check clientNUmber
        // console.log(clientFromGCRM, 'clientFromGCRM')
        if (clientFromGCRM) {
            if (clientProfile.clientNumber.length < 1) {
                const clientNum = document.querySelector('.client-number input');
                setFillValueErrors((prevValue) => ({ ...prevValue, clientNumber: true }));
                clientNum.focus();
                return false;
            }
            if (clientProfile.opportunityNumber.length < 1) {
                const opp = document.querySelector('.opportunity-no input');
                setFillValueErrors((prevValue) => ({ ...prevValue, oppNum: true }));
                opp.focus();
                return false;
            }
        }
        if (clientProfile.numOfUsers === '') {
            const users = document.querySelector('.num-of-users input');
            setFillValueErrors((prevValue) => ({ ...prevValue, numOfUsers: true }));
            users.focus();
            return false;
        }
        if (clientProfile.country === '') {
            const country = document.querySelector('.country input');
            setFillValueErrors((prevValue) => ({ ...prevValue, country: true }));
            country.focus();
            return false;
        }
        if (clientProfile.objective === '') {
            const objective = document.querySelector('.objective input');
            setFillValueErrors((prevValue) => ({ ...prevValue, objective: true }));
            objective.focus();
            return false;
        }
        if (clientProfile.objective === 'Upsell') {
            if (clientProfile.upsell === '') {
                const upsell = document.querySelector('.upsell input');
                setFillValueErrors((prevValue) => ({ ...prevValue, upsell: true }));
                upsell.focus();
                return false;
            }
        }

        if (clientProfile.solutionSpecialistId === '') {
            const specialist = document.querySelector('.sln-specialist input');
            setFillValueErrors((prevValue) => ({ ...prevValue, solutionSpecialist: true }));
            specialist.focus();
            return false;
        }
        if (clientProfile.objective === 'New Business') {
            if (clientProfile.currentSoftwareId === '') {
                const software = document.querySelector('.software input');
                setFillValueErrors((prevValue) => ({ ...prevValue, currentSoftware: true }));
                software.focus();
                return false;
            }
            if (clientProfile.duration === '') {
                const duration = document.querySelector('.duration input');
                setFillValueErrors((prevValue) => ({ ...prevValue, duration: true }));
                duration.focus();
                return false;
            }
        }

        if (Info.specialConditions === '') {
            const spl = document.querySelector('.spl-conditions textarea');
            setFillValueErrors((prevValue) => ({ ...prevValue, specialConditions: true }));
            spl.focus();
            // console.log(spl)
            return false;
        }
        if (clientProfile.objective === 'New Business') {
            if (miscellaneous.affinityServer.included === '') {
                setFillValueErrors((prevValue) => ({ ...prevValue, affinityServerCPU: true }));
                setAffinityServerPopup(true);
                return false;
            }
        }
        // console.log(Number(upfrontCost.subTotal.percentDiscount));
        if (Number(upfrontCost.subTotal.percentDiscount) > 50) {
            alert('Subtotal discount is greater that 50. Please make subtotal discount less than 50 to save proposal.');
            return false;
        }
        return true;

    }

    const [submitForApprovalPopup, setSubmitForApprovalPopup] = React.useState(false);
    const CloseSubmitForApprovalPopup = async (confirmValue) => {
        setSubmitForApprovalPopup(false);
        if (confirmValue === 'close')
            return
        let workflow = false;
        if (confirmValue) {
            workflow = true;
        }

        // console.log(practiceAreaKitPopupValues,"practiceAreaKitPopupValues")
        const result = await saveProposalDataAPI({
            clientFromGCRM: clientFromGCRM,
            createdBy: sessionStorage.getItem('user_id'),
            submittedForWorkflow: workflow,
            clientProfile: { ...clientProfile, ...Info },
            attendingCourses: attendingCourses,
            defaultServices: defaultServicesValues,
            optionalServices: optionalServices,
            miscellaneous: miscellaneous,
            notes: notes,
            upfrontCost: upfrontCost,
            ongoingMnt: ongoingMnt,
            repaymentCalc: repaymentCalc,
            discountTable: discountTable,
            affinityMobilePopUpValue: affinityMobilePopUpValue,
            empowerModules: empowerModules,
            settlementPopUpValue: settlementPopUpValue,
            mitimesPopUpValue: mitimesPopUpValue,
            scopingStudyPopUpValue: scopingStudyPopUpValue,
            practiceAreaKitPopupValues: practiceAreaKitPopupValues,
            lnSearchPopUpValue: lnSearchPopUpValue,
            affinityServerPopupValues: affinityServerPopupValues,
        });

        if (result.status !== 200) {
            console.log('saveProposalDataAPI not working');
        }
        else {
            history.push("/client/dashboard");
        }
    }

    const saveProposalFunc = async () => {
        const rights = JSON.parse(sessionStorage.getItem('rights')) || {};
        if (Number(rights.can_create) !== 1) {
            toast.error("You dont have rights to create proposal", {
                autoClose: '2000'
            });
            return;
        }
        if (checkRequiredValues()) {
            if (!clientFromGCRM) {
                const result = await saveProposalDataAPI({
                    clientFromGCRM: clientFromGCRM,
                    createdBy: sessionStorage.getItem('user_id'),
                    clientProfile: { ...clientProfile, ...Info },
                    attendingCourses: attendingCourses,
                    defaultServices: defaultServicesValues,
                    optionalServices: optionalServices,
                    miscellaneous: miscellaneous,
                    notes: notes,
                    upfrontCost: upfrontCost,
                    ongoingMnt: ongoingMnt,
                    repaymentCalc: repaymentCalc,
                    discountTable: discountTable,
                    affinityMobilePopUpValue: affinityMobilePopUpValue,
                    empowerModules: empowerModules,
                    settlementPopUpValue: settlementPopUpValue,
                    mitimesPopUpValue: mitimesPopUpValue,
                    scopingStudyPopUpValue: scopingStudyPopUpValue,
                    practiceAreaKitPopupValues: practiceAreaKitPopupValues,
                    lnSearchPopUpValue: lnSearchPopUpValue,
                    affinityServerPopupValues: affinityServerPopupValues,
                });
                if (result.status !== 200) {
                    console.log('saveProposalDataAPI not working');
                }
                else {
                    history.push("/client/dashboard");
                }
            }
            else {
                setSubmitForApprovalPopup(true);
            }
        }
    }

    const resetProposal = () => {
        setClientProfile(defaultClientProfile);
        setInfo(defaultInfo);
        setAttendingCourses(defaultAttendingCourses);
        setDefaultServicesValues(defaultServices);
        setOptionalServices(defaultOptionalServices);
        setMiscellaneous(defaultMiscellaneous);
        setNotes(defaultNotes);
        setUpfrontCost(defaultUpfrontCost);
        setOngoingMnt(defaultOngoingMnt);
        setRepaymentCalc(defaultRepayment);
        setAffinityMobilePopUpValue(0);
        setEmpowerModules({
            empowerModules: [],
            numOfUsers: 0,
            modulesSelected: 0,
        });
        setSettlementPopUpValue(0);
        setMitimesPopupValue(0);
        setScopingStudyPopUpValue('');
        setpracticeAreaKitPopupValues({
            practiceAreaKitModules: [],
            numOfUsers: '',
            modulesSelected: 0,
        });
        setlnSearchPopUpValue({
            lnSearchPopUpValue: [],
            modulesSelected: 0,
        });
        setAffinityServerPopupValues({
            typeOfLicense: '',
            numOfUsers: '',
            edition: '',
            serverLicense: '',
            oracleLicense: '',
            maintenance: '',
            total: ''
        });
        //set all popups state to default
    }
    // console.log('lnsearch values', lnSearchPopUpValue);
    console.log('practice area kit values', practiceAreaKitPopupValues);
    
    return (
        <>
            <CssBaseline />
            <Header />
            <Container maxWidth="xl">

                <InfoPopup open={affinityServerPopup} onClose={CloseAffinityServerPopup}
                    title="Affinity Server CPU Field Required"
                    bodyText="Please Fill the Include Field of Affinity Server CPU from Miscellaneous Table"
                />

                <SubmitProposalPopup open={submitForApprovalPopup} onClose={CloseSubmitForApprovalPopup}
                    title="Submit Proposal"
                    bodyText='Do you want to submit the proposal. If you click on Yes then it will be going for the approval cycle. If you select "No" the proposal will be saved and can be edited again but Wont go for the Approval Cycle for now.'
                />

                <ClientInfo
                    viewMode={false}
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

                <SubTabs
                    viewMode={false}
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
                    mitimesPopUpValue={mitimesPopUpValue}
                    setMitimesPopupValue={setMitimesPopupValue}
                    scopingStudyPopUpValue={scopingStudyPopUpValue}
                    setScopingStudyPopUpValue={setScopingStudyPopUpValue}
                    practiceAreaKitPopupValues={practiceAreaKitPopupValues}
                    setpracticeAreaKitPopupValues={setpracticeAreaKitPopupValues}
                    lnSearchPopUpValue={lnSearchPopUpValue}
                    setlnSearchPopUpValue={setlnSearchPopUpValue}
                    affinityServerPopupValues={affinityServerPopupValues}
                    setAffinityServerPopupValues={setAffinityServerPopupValues}
                    discountTable={discountTable}
                    setDiscountTable={setDiscountTable}
                />


                <Box sx={{
                    marginTop: '-20px',
                    marginLeft: { xs: '0', sm: '1.6rem' }
                }}>
                    <Button onClick={saveProposalFunc} variant="contained" color="primary" sx={{ m: 1 }}>
                        Save Proposal
                    </Button>
                    <Button onClick={resetProposal} variant="contained" color="primary" sx={{ m: 1 }}>
                        Reset Proposal
                    </Button>
                </Box>
            </Container>

        </>
    )
}
