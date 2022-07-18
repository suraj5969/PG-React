import React from 'react'; import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export default function SubmitProposalPopup(props) {

    const handleOk = (event, reason) => {
        if (reason !== 'backdropClick') {
            props.onClose(true);
        }
    };

    const handleCancel = (event, reason) => {
        if (reason !== 'backdropClick') {
            props.onClose(false);
        }
    };

    const closePopUp = (event, reason) => {
            props.onClose('close');
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 500 } }}
            maxWidth="sm"
            open={props.open}
            onClose={closePopUp}
        >
            <DialogTitle >
                {props.title}
                <IconButton aria-label="close" sx={{ ml: 45 }} >
                    <CloseIcon onClick={closePopUp} sx={{ fontSize: 25}} />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <DialogContentText>
                    {props.bodyText}
                </DialogContentText>
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

SubmitProposalPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
};