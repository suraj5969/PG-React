import React from 'react';import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function InfoPopup(props) {

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            props.onClose();
        }
      };

    return (
        <Dialog 
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 450 } }}
            maxWidth="sm"
            open={props.open}
            onClose={handleClose}
        >
            <DialogTitle>
                {props.title}
            </DialogTitle>
            <DialogContent dividers>
                <DialogContentText>
                    {props.bodyText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {/* <Button onClick={handleClose}>Cancel</Button> */}
                <Button onClick={handleClose}>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

InfoPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
};
