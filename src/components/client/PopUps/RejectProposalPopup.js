import React from 'react'; import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function RejectProposalPopup(props) {

    const [rejectionReason, setRejectionReason] = React.useState('');
    const [valueRequired, setValueRequired] = React.useState(false);

    const inputRef = React.useRef(null);
    const handleEntering = () => {
        if (inputRef.current != null) {
            inputRef.current.focus();
        }
    };

    const handleOk = (event, reason) => {
        if (reason !== 'backdropClick') {
            if (rejectionReason === '') {
                setValueRequired(true);
                return;
            }
            props.onClose({
                confirmation: true,
                rejectionReason: rejectionReason,
            });
        }
    };

    const handleCancel = (event, reason) => {
        if (reason !== 'backdropClick') {
            props.onClose({
                confirmation: false,
            });
        }
    };

    const handelReason = (event) => {
        setRejectionReason(event.target.value);
        setValueRequired(false);
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 500 } }}
            TransitionProps={{ onEntering: handleEntering }}
            maxWidth="sm"
            open={props.open}
        // onClose={handleClose}
        >
            <DialogTitle >
                Enter Reason to Reject Proposal
            </DialogTitle>
            <DialogContent dividers>
                <Box sx={{
                    display: 'flex', flexWrap: 'wrap',
                    alignItems: 'center', justifyContent: 'center'
                }}>
                    <Stack spacing={1} sx={{ width: '100%' }}>
                        <TextField
                            inputRef={inputRef}
                            placeholder="Please Enter Rejection Reason"
                            value={rejectionReason}
                            onChange={handelReason}
                            multiline
                            style={{ maxWidth: '500px' }}
                            maxRows={5}
                            inputProps={{ maxLength: 555 }}
                            variant="outlined"
                            fullWidth />
                        {valueRequired ? <Typography variant="subtitle2" style={{ color: 'red' }}> This field is required! </Typography> : ''}
                    </Stack>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>No</Button>
                <Button onClick={handleOk}>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

RejectProposalPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};