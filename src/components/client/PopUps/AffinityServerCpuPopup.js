import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import getProductInfoByIdAPI from '../../../apis/client/getProductInfoByIdAPI.js';


export default function AffinityServerCpuPopup(props) {

    const { onClose, open, numOfUsers, country, selectedValue, ...other } = props;

    const [licenseName, setLicenseName] = React.useState('Select License');
    const [PopupValues, setPopupValues] = React.useState({
        typeOfLicense: '',
        numOfUsers: '',
        edition: 'Standard Edition',
        serverLicense: '',
        oracleLicense: '',
        maintenance: '',
        total: ''
    });

    React.useEffect(() => {
        if (!open) {
            setValueRequired(false);
            setPopupValues({
                typeOfLicense: '',
                numOfUsers: '',
                edition: 'Standard Edition',
                serverLicense: '',
                oracleLicense: '',
                maintenance: '',
                total: ''
            });
        }
    }, [open]);

    const [productInfos, setProductInfos] = React.useState({})
    React.useEffect(() => {
        (async () => {
            const product = await getProductInfoByIdAPI('1532488');
            if (product.status !== 200) {
                console.log('getProductInfoByIdAPI api not working')
            }
            else {
                if (typeof product.data === 'object' && product.data.length > 0) {
                    const values = {};
                    product.data.forEach((product) => {
                        values[product.BU_NAME] = product.STD_UNIT_PRICE_AMT
                    })
                    setProductInfos((prevValues) => ({
                        ...prevValues,
                        "1532488": values
                    }))
                }
            }
        })();

        (async () => {
            const product = await getProductInfoByIdAPI('1532489');
            if (product.status !== 200) {
                console.log('getProductInfoByIdAPI api not working')
            }
            else {
                if (typeof product.data === 'object' && product.data.length > 0) {
                    const values = {};
                    product.data.forEach((product) => {
                        values[product.BU_NAME] = product.STD_UNIT_PRICE_AMT
                    })
                    setProductInfos((prevValues) => ({
                        ...prevValues,
                        "1532489": values
                    }))
                }
            }
        })();

    }, [])

    const [licenseType, setLicenseType] = React.useState('Select License Type');
    const [valueRequired, setValueRequired] = React.useState(false);

    const handleCancel = () => {
        onClose(false);
    };

    const handleOk = () => {
        if (PopupValues.typeOfLicense === '') {
            setValueRequired(true);
            return;
        }
        onClose(PopupValues);
    };


    const handleLicenseChange = (event) => {
        setPopupValues((prevValues) => ({
            ...prevValues,
            typeOfLicense: event.target.value
        }));
        if (event.target.value === 'Named User') {
            setLicenseName('Option 1: Named User license(SE2)');
            setLicenseType('Named User');
            const users = Number(numOfUsers) < 10 ? 10
                : Number(numOfUsers) % 5 === 0 ? Number(numOfUsers)
                    : Number(numOfUsers) + (5 - (Number(numOfUsers) % 5));

            setPopupValues((prevValues) => ({
                ...prevValues,
                numOfUsers: users,
                serverLicense: '',
            }));

            if (country !== '' && productInfos['1532488']) {
                const price = users * Number(productInfos['1532488'][country]);
                setPopupValues((prevValues) => ({
                    ...prevValues,
                    oracleLicense: (price).toFixed(2),
                    maintenance: (price * 0.25).toFixed(2),
                    total: (price + price * 0.25).toFixed(2)
                }));
            }
        }
        else {
            if (event.target.value === 'Per CPU') {
                setLicenseName('Option 2: Per CPU license(SE2)');
                setLicenseType('CPU');
                setPopupValues((prevValues) => ({
                    ...prevValues,
                    numOfUsers: '',
                    serverLicense: Number(selectedValue),
                }));

                if (country !== '' && productInfos['1532489']) {
                    const price = Number(selectedValue) * Number(productInfos['1532489'][country]);
                    setPopupValues((prevValues) => ({
                        ...prevValues,
                        oracleLicense: (price).toFixed(2),
                        maintenance: (price * 0.25).toFixed(2),
                        total: (price + price * 0.25).toFixed(2)
                    }));
                }
            }
            else {
                setLicenseName('Select License');
                setLicenseType('Select License Type');
                setPopupValues((prevValues) => ({
                    ...prevValues,
                    numOfUsers: '',
                    serverLicense: '',
                    oracleLicense: '',
                    maintenance: '',
                    total: ''
                }));
            }
        }
        setValueRequired(false);
    };

    const handleEditionChange = (event) => {
        setPopupValues((prevValues) => ({
            ...prevValues,
            edition: event.target.value
        }));
    };

    return (
        <Dialog sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: { xs: 550, sm: 650 } } }}
            maxWidth="md"
            open={props.open}
            {...other}
        >
            <DialogTitle>
                Oracle Licensing for Affinity
            </DialogTitle>
            <DialogContent dividers>
                <Box className="affinity-server-popup">
                    <Box sx={{ m: { xs: 2, sm: 1 }, display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                        <Typography sx={{ mx: { sm: 1 }, width: { xs: '95%', sm: '50%', md: '40%' } }}>
                            Type of Oracle License to be installed
                        </Typography>
                        <Box className="affinity-popup-select">
                            <FormControl sx={{ minWidth: 150, p: 0, maxWidth: 250 }}>
                                <Select
                                    value={PopupValues.typeOfLicense}
                                    onChange={handleLicenseChange}
                                    displayEmpty
                                >
                                    <MenuItem value=''>Select</MenuItem>
                                    <MenuItem value='Named User'>Named User</MenuItem>
                                    <MenuItem value='Per CPU'>Per CPU</MenuItem>
                                </Select>
                            </FormControl>
                            {valueRequired ? <Typography variant="subtitle2" style={{ color: 'red' }}> This field is required! </Typography> : ''}
                        </Box>
                    </Box>

                    <Box sx={{ m: { xs: 2, sm: 1 }, display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                        <Typography sx={{ mx: { sm: 1 }, width: { xs: '95%', sm: '50%', md: '40%' } }}>
                            Number of Users
                        </Typography>
                        <Box>
                            <FormControl variant="outlined">
                                <OutlinedInput
                                    inputProps={{ style: { textAlign: 'center' } }}
                                    sx={{ height: '35px', width: '90%', maxWidth: '250px' }}
                                    value={PopupValues.numOfUsers}
                                    // onChange={handelNumOfUsersChange}
                                    disabled
                                />
                            </FormControl>
                        </Box>
                    </Box>

                    <Box sx={{ m: { xs: 2, sm: 1 }, display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                        <Typography sx={{ mx: { sm: 1 }, width: { xs: '95%', sm: '50%', md: '40%' } }}>
                            Edition
                        </Typography>
                        <Box className="affinity-popup-select">
                            <FormControl sx={{ minWidth: 150, p: 0, maxWidth: 250 }}>
                                <Select
                                    value={PopupValues.edition}
                                    onChange={handleEditionChange}
                                    displayEmpty
                                >
                                    <MenuItem value='Standard Edition'>Standard Edition</MenuItem>
                                    <MenuItem value='Enterprise Edition'>Enterprise Edition</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>

                    <Box sx={{ m: { xs: 2, sm: 1 }, display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                        <Typography sx={{ mx: { sm: 1 }, width: { xs: '95%', sm: '50%', md: '40%' } }}>
                            Server license
                        </Typography>
                        <Box>
                            <FormControl variant="outlined">
                                <OutlinedInput
                                    inputProps={{ style: { textAlign: 'center' } }}
                                    sx={{ height: '35px', width: '90%', maxWidth: '250px' }}
                                    value={PopupValues.serverLicense}
                                    // onChange={handelAddReturnIncluded}
                                    disabled
                                />
                            </FormControl>
                        </Box>
                    </Box>

                    <Typography variant="h5" sx={{ ml: 2, py: 1, marginTop: 4 }}>
                        Licensing options for this firm
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Typography sx={{ mx: { sm: 1 }, width: { xs: '95%', sm: '50%', md: '40%' } }}>
                            {licenseName}
                        </Typography>

                        <Box sx={{
                            m: { xs: 2, sm: 1 }, display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' }
                        }}>

                            <Box sx={{ mr: 2 }}>
                                <Typography variant="subtitle2">Oracle License</Typography>
                                <FormControl variant="outlined">
                                    <OutlinedInput
                                        inputProps={{ style: { textAlign: 'center' } }}
                                        sx={{ height: '35px', width: '8rem', maxWidth: '250px' }}
                                        value={PopupValues.oracleLicense}
                                        // onChange={handelAddReturnIncluded}
                                        disabled
                                    />
                                </FormControl>
                            </Box>
                            <Box sx={{ mx: 2 }}>
                                <Typography variant="subtitle2">Maintenance(1Yr)</Typography>
                                <FormControl variant="outlined">
                                    <OutlinedInput
                                        inputProps={{ style: { textAlign: 'center' } }}
                                        sx={{ height: '35px', width: '8rem', maxWidth: '250px' }}
                                        value={PopupValues.maintenance}
                                        // onChange={handelAddReturnIncluded}
                                        disabled
                                    />
                                </FormControl>
                            </Box>
                            <Box sx={{ mx: 2 }}>
                                <Typography variant="subtitle2">Total(1Yr)</Typography>
                                <FormControl variant="outlined">
                                    <OutlinedInput
                                        inputProps={{ style: { textAlign: 'center' } }}
                                        sx={{ height: '35px', width: '8rem', maxWidth: '250px' }}
                                        value={PopupValues.total}
                                        // onChange={handelAddReturnIncluded}
                                        disabled
                                    />
                                </FormControl>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{
                        m: { xs: 2, sm: 1 }, display: 'flex', alignItems: 'center',
                        flexDirection: { xs: 'column', sm: 'row' }
                    }}>
                        <Typography sx={{ mr: { sm: 1 }, width: { xs: '95%', sm: '50%', md: '40%' } }}>
                            Which license do you want for this firm ?
                        </Typography>
                        <Box>
                            <Typography variant="h5">
                                {licenseType}
                            </Typography>
                        </Box>
                    </Box>

                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
        </Dialog>
    )
}

AffinityServerCpuPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};
