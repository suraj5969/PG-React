import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ConfirmationPopup from './ConfirmationPopup';

export default function EditProposalPopup(props) {
    const { onClose, open, statusType, ...other } = props;
    const [reason, setReason] = React.useState('');

    const [confirmEdit, setConfirmEdit] = React.useState(open);
    const [reasonPopup, setReasonPopup] = React.useState(false);

    const [valueRequired, setValueRequired] = React.useState(false);

    const reasonRef = React.useRef(null);
    const handleEntering = () => {
        if (reasonRef.current != null) {
            reasonRef.current.focus();
        }
    };

    React.useEffect(() => {
        setConfirmEdit(open);
        if (!open) {
            setReason('');
        }
    }, [open]);

    const handelEditConfirmation = (confirmed) => {
        if (confirmed) {
            setConfirmEdit(false);
            setReasonPopup(true);
        }
        else {
            onClose(false);
        }
    }

    const handleCancel = () => {
        setReasonPopup(false);
        setValueRequired(false);
        onClose(false);
    };

    const handleOk = () => {
        if (reason === '') {
            setValueRequired(true);
            if (reasonRef.current != null) {
                reasonRef.current.focus();
            }
            return;
        }
        setReasonPopup(false);
        onClose(reason);
    };

    const handleChange = (event) => {
        setReason(event.target.value);
        setValueRequired(false);
    };

    return (
        <>
            <ConfirmationPopup open={confirmEdit} onClose={handelEditConfirmation}
                title='Edit Proposal'
                bodyText={`This proposal is already ${statusType}. Do you still want to edit this proposal?`}
            />

            <Dialog
                sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: '300px', maxWidth: '500px' } }}
                maxWidth="sm"
                open={reasonPopup}
                TransitionProps={{ onEntering: handleEntering }}
                {...other}
            >
                <DialogTitle> What is the reason for editing this proposal? </DialogTitle>
                <DialogContent dividers>
                    <Box sx={{
                        display: 'flex', flexWrap: 'wrap',
                        alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Stack spacing={1} sx={{ width: '100%' }}>
                            <TextField
                                inputRef={reasonRef}
                                placeholder="Please Enter Edit Reason"
                                value={reason}
                                onChange={handleChange}
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
                    <Button onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button onClick={handleOk}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

EditProposalPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};
