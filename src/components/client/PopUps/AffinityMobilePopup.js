import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function AffinityMobilePopup(props) {
    const { onClose, open, ...other } = props;
    const [value, setValue] = React.useState(5);

    const [valueRequired, setValueRequired] = React.useState(false);

    React.useEffect(() => {
        // console.log(value, 'affinity mobile popup')
        if (!open) {
            setValue(5);
        }
    }, [open]);

    const handleCancel = () => {
        onClose(false);
    };

    const handleOk = () => {
        if(value === '') {
            setValueRequired(true);
            return;
        }
        onClose(value);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
        setValueRequired(false);
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: '300px', maxWidth: '500px'} }}
            maxWidth="sm"
            open={open}
            {...other}
        >
            <DialogTitle>Affinity Mobile</DialogTitle>
            <DialogContent dividers>
                <Box sx={{ display: 'flex', flexWrap: 'wrap',
                 alignItems: 'center', justifyContent: 'center'}}>

                    <Stack spacing={1}>
                        <Typography variant="body">How Many Users Require Mobility License</Typography>
                        <FormControl sx={{ m: 1, maxWidth: 250 }}>
                            <Select
                                value={value}
                                onChange={handleChange}
                                displayEmpty
                            >
                                <MenuItem value=''>Select</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={15}>15</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={25}>25</MenuItem>
                                <MenuItem value={30}>30</MenuItem>
                                <MenuItem value={35}>35</MenuItem>
                                <MenuItem value={40}>40</MenuItem>
                                <MenuItem value={45}>45</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={55}>55</MenuItem>
                                <MenuItem value={60}>60</MenuItem>
                                <MenuItem value={65}>65</MenuItem>
                                <MenuItem value={70}>70</MenuItem>
                                <MenuItem value={75}>75</MenuItem>
                                <MenuItem value={80}>80</MenuItem>
                                <MenuItem value={85}>85</MenuItem>
                                <MenuItem value={90}>90</MenuItem>
                                <MenuItem value={95}>95</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                            </Select>
                        </FormControl>
                        {valueRequired ? <Typography variant="subtitle2" style={{ color: 'red' }}> This field is required! </Typography> : ''}
                    </Stack>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}

AffinityMobilePopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};
