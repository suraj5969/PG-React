import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ConfirmationPopup from './ConfirmationPopup';

export default function SettlementPopup(props) {
    const { onClose, open, ...other } = props;
    const [value, setValue] = React.useState('');

    const [confirmPopup, setConfirmPopup] = React.useState(open);
    const [licensePopup, setLicensePopup] = React.useState(false);

    const [valueRequired, setValueRequired] = React.useState(false);

    const NumLicenseRef = React.useRef(null);
    const handleEntering = () => {
        if (NumLicenseRef.current != null) {
            NumLicenseRef.current.focus();
        }
    };

    React.useEffect(() => {
        setConfirmPopup(open);
        if (!open) {
            setValue('');
        }
    }, [open]);

    const handelConfirmationPopupClose = (confirmed) => {
        if (confirmed) {
            setLicensePopup(true);
            // setConfirmPopup(false);
        }
        else {
            onClose(false);
        }
    }

    const handleCancel = () => {
        setLicensePopup(false);
        setValueRequired(false);
        // setConfirmPopup(true);
    };

    const handleOk = () => {
        if (value === '') {
            setValueRequired(true);
            if (NumLicenseRef.current != null) {
                NumLicenseRef.current.focus();
            }
            return;
        }
        setLicensePopup(false);
        onClose(value);
    };

    function isStringInteger(value) {
        return /^[0-9]*$/.test(value);
    }

    const handleChange = (event) => {
        if (isStringInteger(event.target.value)) {
            setValue(event.target.value);
            setValueRequired(false);
        }
    };

    return (
        <>
            <ConfirmationPopup open={confirmPopup} onClose={handelConfirmationPopupClose}
                title='Settlement Adjuster'
                bodyText='Please click "Yes" if the Settlement Adjuster is required.'
            />

            <Dialog
                sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: '300px', maxWidth: '500px' } }}
                maxWidth="sm"
                open={licensePopup}
                TransitionProps={{ onEntering: handleEntering }}
                {...other}
            >
                <DialogTitle>Settlement Adjuster </DialogTitle>
                <DialogContent dividers>
                    <Box sx={{
                        display: 'flex', flexWrap: 'wrap',
                        alignItems: 'center', justifyContent: 'center'
                    }}>

                        <Stack spacing={1}>
                            <Typography variant="body">You have already ordered one full-price license for Settlement Adjuster. Additional licenses cost less than the first one. How many additional licenses do you require?</Typography>
                            <FormControl variant="outlined" sx={{ m: 1, maxWidth: 200 }}>
                                <OutlinedInput
                                    inputRef={NumLicenseRef}
                                    inputProps={{ maxLength: 3 }}
                                    sx={{ height: '35px', minWidth: '150px' }}
                                    value={value}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            {valueRequired ? <Typography variant="subtitle2" style={{ color: 'red' }}> This field is required! </Typography> : ''}
                        </Stack>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button onClick={handleOk}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

SettlementPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};
