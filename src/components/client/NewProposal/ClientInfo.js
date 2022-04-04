import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import Stack from '@mui/material/Stack';
import { useStyles } from './styles.js';
import clsx from 'clsx';
import ConfirmationPopup from '../PopUps/ConfirmationPopup';
import getClientNamesAPI from '../../../apis/client/getClientNamesAPI.js';
import getClientNameByNumberAPI from '../../../apis/client/getClientNameByNumberAPI.js';
import getOpportunitiesAPI from '../../../apis/client/getOpportunitiesAPI.js';
import getCountryAddressAPI from '../../../apis/client/getCountryAddressAPI.js';
import getAllSolutionSpecialistAPI from '../../../apis/client/getAllSolutionSpecialistAPI.js'
import getAllSoftwaresAPI from '../../../apis/client/getAllSoftwaresAPI.js'
import getAllCountriesAPI from '../../../apis/client/getAllCountriesAPI.js'


export default function ClientInfo(props) {

    const { viewMode, editMode, setClientFromGCRM, clientProfile, setClientProfile, Info, setInfo, mandatoryFields,
        setMandatoryFields, fillValueErrors, setFillValueErrors } = props;

    const styles = useStyles();

    function isStringInteger(value) {
        return /^[0-9]*$/.test(value);
    }

    const [clientNameOptions, setClientNameOptions] = React.useState([]);
    const [clientNotExistPopUp, setClientNotExistPopUp] = React.useState(false);
    const [clientNamesFetched, setClientNamesFetched] = React.useState(false);

    const [opportunities, setOpportunities] = React.useState([]);
    const [allCountries, setAllCountries] = React.useState([]);


    const handelClientPopupClose = (confirmValue) => {
        if (confirmValue === false) {
            setClientProfile({
                ...clientProfile,
                clientName: ''
            });
        }

        setClientNotExistPopUp(false);

        if (confirmValue === true) {
            setClientFromGCRM(false);
        }
    }

    const CheckClientName = (event, reason) => {
        // console.log('blur function', event.target.value, clientNameOptions)
        if (reason === 'blur') {
            if (event.target.value.length > 2) {
                const clients = clientNameOptions.filter((client) => client.label === event.target.value);
                // console.log(clients);
                if (clients.length > 0) {
                    FetchSelectedClient(null, clients[0], 'selectOption');
                }
                else {
                    setOpportunities([]);
                    setClientProfile((prevValue) => ({
                        ...prevValue,
                        clientName: event.target.value,
                        clientNumber: '',
                        opportunityNumber: '',
                        opportunityName: '',
                        country: '',
                        address: ''
                    }));
                    setClientNamesFetched(false);
                    setClientNotExistPopUp(true);
                }
            }
        }
    }

    const ClientNameChange = async (event, value, reason) => {
        // console.log(value, reason, 'change client name');
        if (reason !== 'reset') {
            const name = value.substring(0, 200);
            setClientProfile((prevValue) => ({ ...prevValue, clientName: name }));
            setFillValueErrors((prevValue) => ({ ...prevValue, clientName: false }));
            if (name.length >= 3) {
                if (!clientNamesFetched) {
                    setClientNamesFetched(true);
                    const result = await getClientNamesAPI(name);
                    if (result.status !== 200) {
                        console.log('get client names api not working')
                    }
                    else {
                        if (result.data instanceof Array && result.data.length > 0) {
                            setClientNameOptions(result.data);
                        }
                    }
                }
            }
            else {
                setClientNameOptions([]);
                setOpportunities([]);
                setClientProfile((prevValue) => ({
                    ...prevValue,
                    clientName: name,
                    clientNumber: '',
                    opportunityNumber: '',
                    opportunityName: '',
                    country: '',
                    address: ''
                }));
                setClientNamesFetched(false);
            }
        }
    }

    const fetchCountryAddress = async (value) => {
        const result = await getCountryAddressAPI(value);

        if (result.status !== 200) {
            console.log('get country address api not working')
        }
        else {
            if (result.data instanceof Array && result.data.length > 0) {
                setClientProfile((prevValue) => ({
                    ...prevValue,
                    country: result.data[0].country_name,
                    address: result.data[0].address
                }));
                // console.log(result.data)
            }
        }
    }

    const FetchSelectedClient = async (event, value, reason) => {
        if (reason === "selectOption") {
            // console.log(value, 'client value')
            setClientProfile((prevValue) => ({
                ...prevValue,
                clientName: value.label,
                clientNumber: value.id
            }));
            setClientFromGCRM(true);
            setFillValueErrors((prevValue) => ({ ...prevValue, clientNumber: false }));

            const result = await getOpportunitiesAPI(value.id);
            if (result.status !== 200) {
                console.log('getOpportunitiesAPI api not working')
            }
            else {
                if (result.data instanceof Array && result.data.length > 0) {
                    setClientProfile((prevValue) => ({
                        ...prevValue,
                        opportunityNumber: result.data[0].opty_id,
                        opportunityName: result.data[0].opty_name,
                    }));

                    setOpportunities(result.data);
                    fetchCountryAddress(value.id);
                    setFillValueErrors((prevValue) => ({ ...prevValue, oppNum: false }));
                }
            }
        }
    }

    React.useEffect(() => {
        if (editMode && clientProfile.clientNumber) {
            const fetchData = async () => {
                const names = await getClientNameByNumberAPI(clientProfile.clientNumber);
                // console.log(names, 'client names edit mode')
                if (names.status !== 200) {
                    console.log('getClientNameByNumberAPI api not working')
                }
                else {
                    if (names.data instanceof Array && names.data.length > 0) {
                        setClientNameOptions(names.data);
                        if (names.data.length > 1) {
                            for (let i = 0; i < names.data.length; i++) {
                                const result = await getOpportunitiesAPI(names.data[i].id);
                                if (result.status !== 200) {
                                    console.log('getOpportunitiesAPI api not working')
                                }
                                else {
                                    if (result.data instanceof Array && result.data.length > 0) {
                                        for (let j = 0; j < result.data.length; j++) {
                                            if (clientProfile.opportunityNumber === result.data[j].opty_id) {
                                                setOpportunities(result.data);
                                                return;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            const result = await getOpportunitiesAPI(names.data[0]?.id);
                            if (result.status !== 200) {
                                console.log('getOpportunitiesAPI api not working')
                            }
                            else {
                                if (result.data instanceof Array && result.data.length > 0) {
                                    setOpportunities(result.data);
                                }
                            }
                        }
                    }
                }
            }
            fetchData();
        }
    }, []) // dont add 'clientProfile.clientName', 'clientProfile.opportunityNumber', and 'editMode' here in dependency

    const handelOpportunityNoChange = (event) => {
        // console.log(event.target.value, 'opp no');

        opportunities.every(opp => {
            if (opp.opty_id === event.target.value) {
                setClientProfile((prevValue) => ({
                    ...prevValue,
                    opportunityNumber: event.target.value,
                    opportunityName: opp.opty_name
                }));
                setFillValueErrors((prevValue) => ({ ...prevValue, oppNum: false }));


                return false;
            }

            return true;
        });
    }

    const handelNoOfUsersChange = (event) => {
        if (isStringInteger(event.target.value)) {
            setClientProfile({ ...clientProfile, numOfUsers: event.target.value });
            setFillValueErrors((prevValue) => ({ ...prevValue, numOfUsers: false }));
        }
    }

    const handelNoOfFreeEarnersChange = (event) => {
        if (isStringInteger(event.target.value)) {
            setClientProfile((prevValue) => ({ ...prevValue, numOfFreeEarners: event.target.value }));
        }
    }

    const countryChange = React.useRef(false);
    const handelCountryChange = (event) => {
        setClientProfile((prevValue) => ({ ...prevValue, country: event.target.value }));
        setFillValueErrors((prevValue) => ({ ...prevValue, country: false }));
        countryChange.current = true;
    }

    const handelObjectiveChange = (event) => {
        setClientProfile((prevValue) => ({
            ...prevValue,
            objective: event.target.value,
            commercialObjective: '',
            upsell: '',
            currentSoftwareId: '',
            duration: ''
        }));

        if (event.target.value === 'Upsell') {
            setMandatoryFields((prevValue) => ({
                ...prevValue,
                currentSoftware: false,
                duration: false,
                upsell: true
            }));
        }
        else {
            if (event.target.value === 'New Business') {
                setMandatoryFields((prevValue) => ({
                    ...prevValue,
                    upsell: false,
                    currentSoftware: true,
                    duration: true,
                }));
            }
            else {
                setMandatoryFields((prevValue) => ({
                    ...prevValue,
                    upsell: true,
                    currentSoftware: true,
                    duration: true,
                }));
            }
        }
        setFillValueErrors((prevValue) => ({ ...prevValue, objective: false }));
    }

    const handelCommercialObjectiveChange = (event) => {
        setClientProfile((prevValue) => ({ ...prevValue, commercialObjective: event.target.value }));
    }

    const handleUpsellChange = (event) => {
        setClientProfile((prevValue) => ({ ...prevValue, upsell: event.target.value }));
        setFillValueErrors((prevValue) => ({ ...prevValue, upsell: false }));
    }

    const [allSolutionSpecialist, setAllSolutionSpecialist] = React.useState([]);
    const [countrySolutionSpeciaist, setCountrySolutionSpeciaist] = React.useState([]);
    const handleSolutionSpecialistChange = (event) => {
        setClientProfile((prevValue) => ({ ...prevValue, solutionSpecialistId: event.target.value }));
        setFillValueErrors((prevValue) => ({ ...prevValue, solutionSpecialist: false }));
    }

    React.useEffect(() => {
        async function fetchData() {
            const specialist = await getAllSolutionSpecialistAPI();
            // console.log(specialist, 'specialist.data')
            if (specialist.status !== 200) {
                console.log('getAllSolutionSpecialistAPI api not working')
            }
            else {
                if (specialist.data instanceof Array && specialist.data.length > 0) {
                    setAllSolutionSpecialist(specialist.data);
                }
            }

            const country = await getAllCountriesAPI();
            if (country.status !== 200) {
                console.log('All Countries api not working')
            }
            else {
                if (country.data instanceof Array && country.data.length > 0) {
                    const countries = [];
                    country.data.forEach((country) => {
                        countries.push(country.country_name)
                    })
                    setAllCountries(countries);
                }
            }

            const softwares = await getAllSoftwaresAPI();
            if (softwares.status !== 200) {
                console.log('getAllSoftwaresAPI api not working')
            }
            else {
                if (softwares.data instanceof Array && softwares.data.length > 0) {
                    setAllSoftwares(softwares.data);
                    // console.log(softwares.data);
                }
            }
        }
        fetchData();
    }, []);


    React.useEffect(() => {
        const countryspecialist = [];
        if (clientProfile.country !== '' && !viewMode) {
            allSolutionSpecialist.forEach((specialist) => {
                if (specialist.country === clientProfile.country) {
                    countryspecialist.push(specialist)
                }
            })
            setCountrySolutionSpeciaist(allSolutionSpecialist);

            if (sessionStorage.getItem('solution_specialist') && sessionStorage.getItem('user_id') &&
                sessionStorage.getItem('country')) {
                // if current user id exist in countrySolutionSpeciaist then only do it
                const specialist = sessionStorage.getItem('solution_specialist');
                const country = sessionStorage.getItem('country');
                const id = sessionStorage.getItem('user_id');
                if ((specialist.includes('Yes') || specialist.includes('yes')) && country === clientProfile.country) {
                    setClientProfile((prevValue) => ({
                        ...prevValue,
                        solutionSpecialistId: Number(id),
                    }))
                }
                else {
                    if (editMode) {
                        if (countryChange.current) {
                            setClientProfile((prevValue) => ({
                                ...prevValue,
                                solutionSpecialistId: '',
                            }))
                        }
                    }
                    else {
                        setClientProfile((prevValue) => ({
                            ...prevValue,
                            solutionSpecialistId: '',
                        }))
                    }
                    // editMode ? firstCall ? null : : setClientProfile((prevValue) => ({ ...prevValue, solutionSpecialistId: '',}));
                }
            }
            else {
                console.log('localstorage for sln specialoist not working');
                setClientProfile((prevValue) => ({
                    ...prevValue,
                    solutionSpecialistId: '',
                }))
            }
        }
        else {
            setCountrySolutionSpeciaist(allSolutionSpecialist);
        }
    }, [clientProfile.country, allSolutionSpecialist, setCountrySolutionSpeciaist, setClientProfile, viewMode])

    const [disableQuickStart, setDisableQuickStart] = React.useState(false);
    const handleQuickStartChange = (event) => {
        setClientProfile((prevValue) => ({ ...prevValue, quickStart: event.target.value }));
    }

    React.useEffect(() => {
        if (!viewMode) {
            if (clientProfile.objective === 'Upsell') {
                setDisableQuickStart(true);
                setClientProfile((prevValue) => ({ ...prevValue, quickStart: "No" }));
            }
            else {
                if (clientProfile.country === 'New Zealand') {
                    setDisableQuickStart(true);
                    setClientProfile((prevValue) => ({ ...prevValue, quickStart: "No" }));
                }
                else {
                    setDisableQuickStart(false);
                }
            }
        }

    }, [clientProfile.country, clientProfile.objective, setClientProfile, viewMode]);

    const handelAddressChange = (event) => {
        setClientProfile((prevValue) => ({ ...prevValue, address: event.target.value }));
    }


    const [allSoftwares, setAllSoftwares] = React.useState([]);
    const handleSoftwareChange = (event) => {
        setClientProfile((prevValue) => ({ ...prevValue, currentSoftwareId: event.target.value }));
        setFillValueErrors((prevValue) => ({ ...prevValue, currentSoftware: false }));
    }


    const handleDurationChange = (event) => {
        setClientProfile((prevValue) => ({ ...prevValue, duration: event.target.value }));
        setFillValueErrors((prevValue) => ({ ...prevValue, duration: false }));
    }


    const handleDateChangeRaw = (e) => {
        e.preventDefault();
    }

    const handleDateChange = (date) => {
        setClientProfile((prevValue) => ({ ...prevValue, endValidDate: date }));
    }



    const handelHrsRequiredChange = (event) => {
        if (isStringInteger(event.target.value)) {
            setInfo((prevValue) => ({ ...prevValue, hoursRequired: event.target.value }));
        }
    }

    const handleTimeInProjectChange = (event) => {
        setInfo((prevValue) => ({ ...prevValue, timeIncluded: event.target.value }));
    }


    const handleTrainingMethodologyChange = (event) => {
        setInfo((prevValue) => ({ ...prevValue, traningMethod: event.target.value }));
    }

    const [bpaSetupPopup, setBpaSetupPopup] = React.useState(false);
    const handelBPAPopupClose = (confirmValue) => {
        if (confirmValue === false) {
            setInfo((prevValue) => ({ ...prevValue, bpaSetup: 'Standard' }));
        }
        setBpaSetupPopup(false);
    }

    const handleBpaSetupChange = (event) => {
        setInfo((prevValue) => ({ ...prevValue, bpaSetup: event.target.value }));
        if (event.target.value === 'Advanced') {
            setBpaSetupPopup(true)
        }
    }


    const handleSpecialConditionsChange = (event) => {
        setInfo((prevValue) => ({ ...prevValue, specialConditions: event.target.value }));
        setFillValueErrors((prevValue) => ({ ...prevValue, specialConditions: false }));
    }


    const handleCurrencyChange = (event) => {
        setInfo((prevValue) => ({ ...prevValue, currency: event.target.value }));
    }


    React.useEffect(() => {
        if (clientProfile.objective === 'Upsell' && !viewMode) {
            setInfo((prevValue) => ({
                ...prevValue,
                hoursRequired: '',
                timeIncluded: 'No',
                bpaSetup: 'Standard',

            }))
        }
    }, [clientProfile.objective, setInfo, viewMode]);


    React.useEffect(() => {
        if (!viewMode) {
            if (clientProfile.country === 'New Zealand') {
                setInfo((prevValue) => ({ ...prevValue, currency: 'NZD' }))
            }
            else {
                setInfo((prevValue) => ({ ...prevValue, currency: 'AUD' }))
            }
        }

    }, [clientProfile.country, setInfo, viewMode]);


    return (
        <>
            <ConfirmationPopup open={clientNotExistPopUp} onClose={handelClientPopupClose}
                title="Client Dosen't Exist"
                bodyText="The Entered Client Name Dosen't Exist in GCRM. Do You Want To Continue With It."
            />

            <ConfirmationPopup open={bpaSetupPopup} onClose={handelBPAPopupClose}
                title="Advanced BPA setup"
                bodyText="Advanced BPA setup includes training for concepts such as Scripting. Does the firm have suitably skilled people available to be trained in these areas, and who will be involved in the implementation project?"
            />

            <Box>
                <Box sx={{ boxShadow: '0 0 6px #dadada', borderRadius: '5px', width: '100%' }} >
                    <Paper elevation={3} sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '50px', background: 'linear-gradient(40deg,#4db6ac,#26a69a)' }}>
                        <Typography variant="h5" style={{ color: 'white', marginLeft: '25px' }}>
                            Client Profile
                        </Typography>
                    </Paper>
                    <Box className={styles.row} >
                        <Stack spacing={1} className={clsx(styles.col1, "client-name-autocomplete")}>
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography variant="subtitle1">Client Name
                                    {mandatoryFields.clientName ? <span className='color-red'> *</span> : ''}
                                </Typography>

                                <Tooltip TransitionComponent={Fade} placement="top" color='primary' title="Client number gets auto populated from GCRM for the corresponding client we select. If the client is not present in GCRM then the Client number field will be blank. If the Client is present in GCRM this field becomes Mandatory else non Mandatory." arrow>
                                    <HelpOutlineRoundedIcon fontSize="small" sx={{ width: '.8em', mx: 0.5 }} />
                                </Tooltip>
                            </Box>
                            <Autocomplete
                                style={{ fontSize: '0.9rem' }}
                                fullWidth
                                disablePortal
                                freeSolo
                                inputValue={clientProfile.clientName}
                                onInputChange={ClientNameChange}
                                options={clientNameOptions}
                                onClose={CheckClientName}
                                onChange={FetchSelectedClient}
                                disabled={viewMode}
                                // sx={{ width: 400 }}
                                renderInput={(params) => <TextField {...params} placeholder="enter client name" />}
                            />
                            {fillValueErrors.clientName ? <Typography variant="subtitle2" className="color-red">This field is required!</Typography> : ''}
                            {clientProfile.clientName.length > 0 && clientProfile.clientName.length < 3 ? <Typography variant="subtitle2" className="color-red">Client Name should be greater than or equal to 3 characters</Typography> : ''}
                        </Stack>
                        <Stack spacing={1} className={clsx(styles.col2, 'client-number')}>
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography variant="subtitle1">Client Number <span className='color-green'>*</span> </Typography>

                                <Tooltip TransitionComponent={Fade} placement="top" color='primary' title="Client number gets auto populated from GCRM for the corresponding client we select. If the client is not present in GCRM then the Client number field will be blank. If the Client is present in GCRM this field becomes Mandatory else non Mandatory." arrow>
                                    <HelpOutlineRoundedIcon fontSize="small" sx={{ width: '.8em', mx: 0.5 }} />
                                </Tooltip>
                            </Box>

                            <TextField type="text"
                                value={clientProfile.clientNumber}
                                disabled
                                inputProps={{ maxLength: 20 }}
                                placeholder="client number" variant="outlined"
                                fullWidth />
                            {fillValueErrors.clientNumber ? <Typography variant="subtitle2" className="color-red">This field is required!</Typography> : ''}
                        </Stack>
                        <Stack spacing={1} className={clsx(styles.col2, 'opportunity-no')}>
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography variant="subtitle1">Opportunity No
                                    {mandatoryFields.opportunityNumber ? <span className='color-green'> *</span> : ''}
                                </Typography>

                                <Tooltip TransitionComponent={Fade} placement="top" color='primary' title="Opportunity number gets auto populated from the GCRM for the corresponding client we select. Client may have single or many Opportunities. This is a dropdown field and the user can select as per the requirement. If client is not present in GCRM then the Opportunity number field appears to be blank. If the Client is present in GCRM this field becomes Mandatory else non Mandatory and will be disabled." arrow>
                                    <HelpOutlineRoundedIcon fontSize="small" sx={{ width: '.8em', mx: 0.5 }} />
                                </Tooltip>
                            </Box>
                            {
                                viewMode ?
                                    <TextField type="text"
                                        value={clientProfile.opportunityNumber}
                                        disabled
                                        inputProps={{ maxLength: 20 }}
                                        placeholder="Opportunity No" variant="outlined"
                                        fullWidth />
                                    : <FormControl fullWidth>
                                        <Select
                                            value={clientProfile.opportunityNumber}
                                            displayEmpty
                                            onChange={handelOpportunityNoChange}
                                            disabled={clientProfile.clientNumber.length < 1 || viewMode}
                                        >
                                            {
                                                opportunities.map((opp) => (
                                                    <MenuItem key={opp.opty_id} value={opp.opty_id}>{opp.opty_id}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                            }
                            {fillValueErrors.oppNum ? <Typography variant="subtitle2" className="color-red">This field is required!</Typography> : ''}
                        </Stack>
                        <Stack spacing={1} className={clsx(styles.col2, 'num-of-users')}>
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography variant="subtitle1" className="lh-760-to-900-16px">Number of Users
                                    {mandatoryFields.numOfUsers ? <span className='color-red'>*</span> : ''}
                                </Typography>

                                <Tooltip TransitionComponent={Fade} placement="top" color='primary' title="This is an integer field which accepts only integer values." arrow>
                                    <HelpOutlineRoundedIcon fontSize="small" sx={{ width: '.8em', mx: 0.5 }} />
                                </Tooltip>
                            </Box>

                            <TextField type="text"
                                value={clientProfile.numOfUsers}
                                onChange={handelNoOfUsersChange}
                                disabled={viewMode}
                                inputProps={{ maxLength: 4 }}
                                placeholder="enter number of users" variant="outlined"
                                fullWidth />
                            {fillValueErrors.numOfUsers ? <Typography variant="subtitle2" className="color-red">This field is required!</Typography> : ''}
                        </Stack>
                    </Box>
                    <Box className={styles.row}>
                        <Stack spacing={1} className={styles.col1}>
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography variant="subtitle1">Opportunity Name <span className='color-green'>*</span> </Typography>

                                <Tooltip TransitionComponent={Fade} placement="top" color='primary' title="Opportunity number will have an Opportunity Name coming from GCRM and this field gets auto populated for the corresponding opportunity we select. If the client is not present in GCRM then the Opportunity Name field appears to be blank. If the Client is present in GCRM this field becomes Mandatory else non Mandatory and will be disabled." arrow>
                                    <HelpOutlineRoundedIcon fontSize="small" sx={{ width: '.8em', mx: 0.5 }} />
                                </Tooltip>
                            </Box>
                            <TextField
                                multiline
                                maxRows={3}
                                disabled
                                value={clientProfile.opportunityName}
                                placeholder="oppurtunity name"
                                variant="outlined"
                                fullWidth
                            />
                        </Stack>
                        <Stack spacing={1} className={styles.col2}>
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography variant="subtitle1" className="lh-760-to-900-16px">Number of Fee Earners  </Typography>

                                <Tooltip TransitionComponent={Fade} placement="top" color='primary' title='This is an integer field which accepts only integer values.' arrow>
                                    <HelpOutlineRoundedIcon fontSize="small" sx={{ width: '.8em', mx: 0.5 }} />
                                </Tooltip>
                            </Box>
                            <TextField
                                type="text"
                                value={clientProfile.numOfFreeEarners}
                                onChange={handelNoOfFreeEarnersChange}
                                disabled={viewMode}
                                inputProps={{ maxLength: 4 }}
                                placeholder="enter number of free earners"
                                variant="outlined"
                                fullWidth />
                        </Stack>
                        <Stack spacing={1} className={clsx(styles.col2, 'country')}>
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography variant="subtitle1">Country
                                    {mandatoryFields.country ? <span className='color-red'> *</span> : ''}
                                </Typography>

                                <Tooltip TransitionComponent={Fade} placement="top" color='primary' title="If the client is present in GCRM, then country will be defaulted as per the client country, but can be changed if required. If client is not present in GCRM the user has to select this field value." arrow>
                                    <HelpOutlineRoundedIcon fontSize="small" sx={{ width: '.8em', mx: 0.5 }} />
                                </Tooltip>
                            </Box>
                            {
                                viewMode ?
                                    <TextField type="text"
                                        value={clientProfile.country}
                                        disabled
                                        variant="outlined"
                                        fullWidth />
                                    : <FormControl fullWidth>
                                        <Select
                                            value={clientProfile.country}
                                            displayEmpty
                                            onChange={handelCountryChange}
                                            disabled={viewMode}
                                        >
                                            <MenuItem value=''>Select</MenuItem>
                                            {
                                                allCountries.map(country => (
                                                    <MenuItem value={country} key={country}>{country}</MenuItem>
                                                ))
                                            }
                                            {/* <MenuItem value='Australia'>Australia</MenuItem>
                                    <MenuItem value='New Zealand'>New Zealand</MenuItem> */}
                                        </Select>
                                    </FormControl>
                            }
                            {fillValueErrors.country ? <Typography variant="subtitle2" className="color-red">This field is required!</Typography> : ''}
                        </Stack>
                        <Stack spacing={1} className={clsx(styles.col2, 'objective')}>

                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography variant="subtitle1">Objective
                                    {mandatoryFields.objective ? <span className='color-red'> *</span> : ''}
                                </Typography>

                                <Tooltip TransitionComponent={Fade} placement="top" color='primary' title='Select one of the objectives from the dropdown as either Upsell or New Business.' arrow>
                                    <HelpOutlineRoundedIcon fontSize="small" sx={{ width: '.8em', mx: 0.5 }} />
                                </Tooltip>
                            </Box>
                            <FormControl fullWidth>
                                <Select
                                    value={clientProfile.objective}
                                    displayEmpty
                                    onChange={handelObjectiveChange}
                                    disabled={viewMode}
                                >
                                    <MenuItem value=''>Select</MenuItem>
                                    <MenuItem value='Upsell'>Upsell</MenuItem>
                                    <MenuItem value='New Business'>New Business</MenuItem>
                                </Select>
                            </FormControl>
                            {fillValueErrors.objective ? <Typography variant="subtitle2" className="color-red">This field is required!</Typography> : ''}
                        </Stack>
                    </Box>
                    <Box className={styles.row}>
                        <Stack className={styles.col1} spacing={1}>
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography variant="subtitle1">Commercial Objective </Typography>
                                <Tooltip TransitionComponent={Fade} placement="top" color='primary' title="Commercial Objective field is enabled when User select New Business in Objective field and is disabled if User select Upsell in Objective field. Here Users need to enter the Commercial Objective." arrow>
                                    <HelpOutlineRoundedIcon fontSize="small" sx={{ width: '.8em', mx: 0.5 }} />
                                </Tooltip>
                            </Box>
                            <TextField
                                placeholder="enter commercial objective"
                                value={clientProfile.commercialObjective}
                                onChange={handelCommercialObjectiveChange}
                                disabled={clientProfile.objective === 'Upsell' || viewMode}
                                multiline
                                maxRows={3}
                                inputProps={{ maxLength: 555 }}
                                variant="outlined"
                                fullWidth />
                        </Stack>
                        <Stack className={clsx(styles.col2, 'upsell')} spacing={1}>
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography variant="subtitle1">Upsell
                                    {mandatoryFields.upsell ? <span className='color-green'> *</span> : ''}
                                </Typography>

                                <Tooltip TransitionComponent={Fade} placement="top" color='primary' title="If User select New Business as value for the Objective field then this field remains disabled. This field becomes mandatory and gets enabled if user selects 'Upsell' value in the field labelled Objective. If this field isenable then user can select one of the value from the dropdown i.e. Upgrade or Not Upgrade." arrow>
                                    <HelpOutlineRoundedIcon fontSize="small" sx={{ width: '.8em', mx: 0.5 }} />
                                </Tooltip>
                            </Box>
                            <FormControl fullWidth>
                                {/* <InputLabel id="upsell-select">select upsell</InputLabel> */}
                                <Select
                                    value={clientProfile.upsell}
                                    onChange={handleUpsellChange}
                                    displayEmpty
                                    disabled={clientProfile.objective !== 'Upsell' || viewMode}
                                >
                                    <MenuItem value=''>Select</MenuItem>
                                    <MenuItem value='Upgrade'>Upgrade</MenuItem>
                                    <MenuItem value='Non Upgrade'>Non Upgrade</MenuItem>
                                </Select>
                            </FormControl>
                            {fillValueErrors.upsell ? <Typography variant="subtitle2" className="color-red">This field is required!</Typography> : ''}
                        </Stack>
                        <Stack className={clsx(styles.col2, 'sln-specialist')} spacing={1}>
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography variant="subtitle1" className="lh-760-to-900-16px">Solution Specialist
                                    {mandatoryFields.solutionSpecialist ? <span className='color-red'>*</span> : ''}
                                </Typography>

                                <Tooltip TransitionComponent={Fade} placement="top" color='primary' title="Default value of this field is the current user who is logged in if he/she is solution specialist. But user can change to some other solution specialist mentioned in the dropdown." arrow>
                                    <HelpOutlineRoundedIcon fontSize="small" sx={{ width: '.8em', mx: 0.5 }} />
                                </Tooltip>
                            </Box>

                            <FormControl fullWidth>
                                {/* <InputLabel id="solution-specialist-select"> select solution specialist</InputLabel> */}
                                <Select
                                    className="select-height"
                                    value={clientProfile.solutionSpecialistId}
                                    onChange={handleSolutionSpecialistChange}
                                    disabled={viewMode}
                                    MenuProps={{ classes: { list: styles.menuList } }}
                                    displayEmpty
                                >
                                    <MenuItem value=''> Select</MenuItem>
                                    {
                                        countrySolutionSpeciaist.map((element) => (
                                            <MenuItem value={element.user_id} key={element.user_id}> {element.fname + ' ' + element.lname} </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            {fillValueErrors.solutionSpecialist ? <Typography variant="subtitle2" className="color-red">This field is required!</Typography> : ''}
                        </Stack>
                        <Stack className={styles.col2} spacing={1}>
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography variant="subtitle1" className="lh-760-16px">Quick Start <small style={{ fontSize: '0.9rem' }}>[Recommended for small firms]</small> </Typography>

                                <Tooltip TransitionComponent={Fade} placement="top" color='primary' title='Quick start will have default value as No. If the country selected is Australia then User can select one of the values either ‘Yes’ or ‘No’. But if the Objective selected is Upsell then this field becomes disabled with value "No".If the Country selected is New Zealand then this field will be disabled with value "No"' arrow>
                                    <HelpOutlineRoundedIcon fontSize="small" sx={{ width: '.8em', mx: 0.5 }} />
                                </Tooltip>
                            </Box>
                            <FormControl fullWidth>
                                {/* <InputLabel id="quick-start-select">select quick start</InputLabel> */}
                                <Select
                                    value={clientProfile.quickStart}
                                    onChange={handleQuickStartChange}
                                    disabled={disableQuickStart || viewMode}
                                    displayEmpty
                                >
                                    <MenuItem value='Yes'>Yes</MenuItem>
                                    <MenuItem value='No'>No</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Box>
                    <Box className={styles.row} sx={{ paddingBottom: '2rem' }}>
                        <Stack className={styles.col1} spacing={1}>

                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography variant="subtitle1">Address </Typography>

                                <Tooltip TransitionComponent={Fade} placement="top" color='primary' title='The address  gets auto populated from GCRM for the corresponding client we select. If the client is not present in GCRM then the address field appears to be blank.' arrow>
                                    <HelpOutlineRoundedIcon fontSize="small" sx={{ width: '.8em', mx: 0.5 }} />
                                </Tooltip>
                            </Box>
                            <TextField
                                value={clientProfile.address}
                                onChange={handelAddressChange}
                                multiline
                                disabled={viewMode}
                                maxRows={3}
                                inputProps={{ maxLength: 555 }}
                                id="adderss"
                                placeholder="enter address"
                                variant="outlined"
                                fullWidth />
                        </Stack>
                        <Stack className={clsx(styles.col2, 'software')} spacing={1}>

                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography variant="subtitle1" className="lh-768-to-1260-16px">Software Client is Currently on
                                    {mandatoryFields.currentSoftware ? <span className='color-green'>*</span> : ''}
                                </Typography>

                                <Tooltip TransitionComponent={Fade} placement="top" color='primary' title='This field is enabled and is mandatory if "New Business" is selected as a value for the Objective field and User can select any value from the dropdown. If Upsell is selected as a value for the Objective field then this field is disabled.' arrow>
                                    <HelpOutlineRoundedIcon fontSize="small" sx={{ width: '.8em', mx: 0.5 }} />
                                </Tooltip>
                            </Box>
                            <FormControl fullWidth>
                                <Select
                                    className="select-height"
                                    value={clientProfile.currentSoftwareId}
                                    onChange={handleSoftwareChange}
                                    MenuProps={{ classes: { list: styles.menuListSmall } }}
                                    displayEmpty
                                    disabled={clientProfile.objective === 'Upsell' || viewMode}
                                >
                                    <MenuItem value=''>Select</MenuItem>
                                    {
                                        allSoftwares.map((value) => (
                                            <MenuItem value={value.id} key={value.id}>{value.soft_name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            {fillValueErrors.currentSoftware ? <Typography variant="subtitle2" className="color-red">This field is required!</Typography> : ''}
                        </Stack>
                        <Stack className={clsx(styles.col2, 'duration')} spacing={1}>

                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography variant="subtitle1">Duration
                                    {mandatoryFields.duration ? <span className='color-green'> *</span> : ''}
                                </Typography>

                                <Tooltip TransitionComponent={Fade} placement="top" color='primary' title='Duration field is enabled if "New Business" is selected as a value for the Objective field and User can select any value from the dropdown. If Upsell is selected as a value for the Objective field then this field is disabled and is non Mandatory.' arrow>
                                    <HelpOutlineRoundedIcon fontSize="small" sx={{ width: '.8em', mx: 0.5 }} />
                                </Tooltip>
                            </Box>
                            <FormControl fullWidth>
                                {/* <InputLabel id="duration-select">select duration</InputLabel> */}
                                <Select
                                    value={clientProfile.duration}
                                    onChange={handleDurationChange}
                                    displayEmpty
                                    disabled={clientProfile.objective === 'Upsell' || viewMode}
                                >
                                    <MenuItem value=''>Select</MenuItem>
                                    <MenuItem value='36 Months'>36 Months</MenuItem>
                                    <MenuItem value='48 Months'>48 Months</MenuItem>
                                    <MenuItem value='60 Months'>60 Months</MenuItem>
                                    <MenuItem value='Upfront'>Upfront</MenuItem>
                                </Select>
                            </FormControl>
                            {fillValueErrors.duration ? <Typography variant="subtitle2" className="color-red">This field is required!</Typography> : ''}
                        </Stack>
                        <Stack className={styles.col2} spacing={1}>

                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography variant="subtitle1" className="lh-768-to-1375-16px">Until when this proposal be valid? </Typography>

                                <Tooltip TransitionComponent={Fade} placement="top" color='primary' title='The default value for this field is 30 days from the date when the proposal was created. If its a new proposal then its 30 days from today. This date can be between today and the next 30 days. System wont accept date before today and greater then 30 days from today.' arrow>
                                    <HelpOutlineRoundedIcon fontSize="small" sx={{ width: '.8em', mx: 0.5 }} />
                                </Tooltip>
                            </Box>
                            <Box >
                                <DatePicker
                                    style={{ width: '100%' }}
                                    dateFormat="dd-MMM-yyyy"
                                    onChangeRaw={handleDateChangeRaw}
                                    selected={clientProfile.endValidDate}
                                    onChange={handleDateChange}
                                    minDate={new Date()}
                                    maxDate={new Date(moment().add(30, 'days'))}
                                    placeholderText="select date"
                                    disabled={viewMode} />
                            </Box>
                        </Stack>
                    </Box>
                </Box>

                <Box sx={{ boxShadow: '0 0 6px #dadada', borderRadius: '5px', width: '100%', marginTop: '2.5rem' }}>
                    <Paper elevation={3} sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '50px', background: 'linear-gradient(40deg,#4db6ac,#26a69a)' }}>
                        <Typography variant="h5" style={{ color: 'white', marginLeft: '25px' }}>
                            Additional Information
                        </Typography>
                    </Paper>
                    <Box className={styles.row} sx={{ margintop: '0.8rem' }}>
                        <Stack className={styles.col3} spacing={1}>
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography variant="subtitle1">Hours required to travel from closest capital</Typography>

                                <Tooltip TransitionComponent={Fade} placement="top" color='primary' title='Enter the number of hours here.' arrow>
                                    <HelpOutlineRoundedIcon fontSize="small" sx={{ width: '.8em', mx: 0.5 }} />
                                </Tooltip>
                            </Box>
                            <TextField
                                type="text"
                                value={Info.hoursRequired}
                                onChange={handelHrsRequiredChange}
                                disabled={clientProfile.objective === 'Upsell' || viewMode}
                                inputProps={{ maxLength: 4 }}
                                fullWidth
                                placeholder="enter hours"
                                variant="outlined" />
                        </Stack>
                        <Stack className={styles.col3} spacing={1}>
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography variant="subtitle1">Travel time included in project delivery time?  </Typography>

                                <Tooltip TransitionComponent={Fade} placement="top" color='primary' title='If YES then the hours mentioned in the field "Hours required to travel from the closest capital?" will get added in the final cost calculation. If "No" the hours will not get added in the calculation of hours for various services and products.' arrow>
                                    <HelpOutlineRoundedIcon fontSize="small" sx={{ width: '.8em', mx: 0.5 }} />
                                </Tooltip>
                            </Box>
                            <FormControl fullWidth>
                                {/* <InputLabel id="time-included" >select</InputLabel> */}
                                <Select
                                    value={Info.timeIncluded}
                                    onChange={handleTimeInProjectChange}
                                    disabled={clientProfile.objective === 'Upsell' || viewMode}
                                    displayEmpty
                                >
                                    <MenuItem value='Yes'>Yes</MenuItem>
                                    <MenuItem value='No'>No</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>

                        <Stack className={styles.col3} spacing={1}>
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography variant="subtitle1">Which Training Methodology is to be Used </Typography>

                                <Tooltip TransitionComponent={Fade} placement="top" color='primary' title='Default value for training methodology is always going to be Online learning. But User can change it by selecting from the dropdown.' arrow>
                                    <HelpOutlineRoundedIcon fontSize="small" sx={{ width: '.8em', mx: 0.5 }} />
                                </Tooltip>
                            </Box>
                            {
                                viewMode ?
                                    <TextField type="text"
                                        value={Info.traningMethod}
                                        disabled
                                        variant="outlined"
                                        fullWidth />
                                    : <FormControl fullWidth>
                                        <Select
                                            value={Info.traningMethod}
                                            onChange={handleTrainingMethodologyChange}
                                            displayEmpty
                                            disabled={viewMode}
                                        >
                                            <MenuItem value='End User Training'>End User Training</MenuItem>
                                            <MenuItem value='Train the Trainer'>Train the Trainer</MenuItem>
                                            <MenuItem value='Remote Training'>Remote Training</MenuItem>
                                            <MenuItem value='Online Learning'>Online Learning</MenuItem>
                                            <MenuItem value='Blended Learning'>Blended Learning</MenuItem>
                                        </Select>
                                    </FormControl>
                            }
                        </Stack>
                    </Box>
                    <Box className={styles.row} sx={{ paddingBottom: '2rem' }}>
                        <Stack className={styles.col3} spacing={1}>
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography variant="subtitle1">BPA setup: Standard or Advanced </Typography>

                                <Tooltip TransitionComponent={Fade} placement="top" color='primary' title='Default value for BPA setup is always going to be Standard. But User can change it.' arrow>
                                    <HelpOutlineRoundedIcon fontSize="small" sx={{ width: '.8em', mx: 0.5 }} />
                                </Tooltip>
                            </Box>
                            <FormControl fullWidth>
                                <Select
                                    value={Info.bpaSetup}
                                    onChange={handleBpaSetupChange}
                                    disabled={clientProfile.objective === 'Upsell' || viewMode}
                                    displayEmpty
                                >
                                    <MenuItem value='Standard'>Standard</MenuItem>
                                    <MenuItem value='Advanced'>Advanced</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                        <Stack className={clsx(styles.col3, 'spl-conditions')} spacing={1}>
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography variant="subtitle1">Special Conditions
                                    {mandatoryFields.specialConditions ? <span className='color-red'>*</span> : ''}
                                </Typography>

                                <Tooltip TransitionComponent={Fade} placement="top" color='primary' title='User can enter special condition here if any.' arrow>
                                    <HelpOutlineRoundedIcon fontSize="small" sx={{ width: '.8em', mx: 0.5 }} />
                                </Tooltip>
                            </Box>
                            <TextField
                                value={Info.specialConditions}
                                onChange={handleSpecialConditionsChange}
                                multiline
                                disabled={viewMode}
                                maxRows={3}
                                inputProps={{ maxLength: 555 }}
                                placeholder="enter special conditions"
                                variant="outlined"
                                fullWidth
                            />
                            {fillValueErrors.specialConditions ? <Typography variant="subtitle2" className="color-red">This field is required!</Typography> : ''}
                        </Stack>
                        <Stack className={styles.col3} spacing={1}>
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography variant="subtitle1">Currency <span className='color-red'>*</span></Typography>

                                <Tooltip TransitionComponent={Fade} placement="top" color='primary' title='"Currency field will show default value as per country selected but User can change it. If the Country is Australia Currency will be AUD and if its new Zealand it will be NZD"' arrow>
                                    <HelpOutlineRoundedIcon fontSize="small" sx={{ width: '.8em', mx: 0.5 }} />
                                </Tooltip>
                            </Box>
                            <FormControl fullWidth>
                                {/* <InputLabel id="currency-select"> select currency</InputLabel> */}
                                <Select
                                    value={Info.currency}
                                    onChange={handleCurrencyChange}
                                    displayEmpty
                                    disabled={viewMode}
                                >
                                    <MenuItem value='AUD'>AUD</MenuItem>
                                    <MenuItem value='NZD'>NZD</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </>
    )
}