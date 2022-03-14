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
import Typography from '@mui/material/Typography';

export default function ScopingStudyPopup(props) {
    const { onClose, open, ...other } = props;
    const [value, setValue] = React.useState('');

    React.useEffect(() => {
        if (!open) {
            setValueRequired(false);
        }
    }, [open]);

    function isStringInteger(value) {
        return /^[0-9]*$/.test(value);
    }
    
    const inputRef = React.useRef(null);
    const handleEntering = () => {
        if (inputRef.current != null) {
            inputRef.current.focus();
        }
    };


    const handleCancel = () => {
        onClose(false);
    };

    const handleOk = () => {
        if (value === '') {
            setValueRequired(true);
            return;
        }
        onClose(value);
    };

    const [valueRequired, setValueRequired] = React.useState(false);

    const handleChange = (event) => {
        if (isStringInteger(event.target.value)) {
            setValue(event.target.value);
            setValueRequired(false);
        }
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: '500px', maxWidth: '1000px' } }}
            maxWidth="sm"
            TransitionProps={{ onEntering: handleEntering }}
            open={open}
            {...other}
        >
            <DialogTitle>Scoping Study</DialogTitle>
            <DialogContent dividers>
                <Box sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexDirection: { xs: 'column', md: 'row' },
                }}>

                    <Typography variant="body">How many hours do Professional Services advice required for the Scoping Study? </Typography>
                    <Box sx={{ m: 2 }}>
                        <FormControl variant="outlined">
                            <OutlinedInput
                                inputRef={inputRef}
                                name="propertyPresidency"
                                inputProps={{ style: { textAlign: 'center' }, maxLength: 3 }}
                                sx={{ height: '35px', width: '200px' }}
                                value={value}
                                onChange={handleChange}
                            />
                        </FormControl>
                        {valueRequired ? <Typography variant="subtitle2" style={{ color: 'red' }}> This field is required! </Typography> : ''}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}

ScopingStudyPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};
