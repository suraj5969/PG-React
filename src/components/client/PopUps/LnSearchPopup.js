import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';

export default function LnSearchPopup(props) {
    const { onClose, open, ...other } = props;
    const NumUsersRef = React.useRef(null);
    const handleEntering = () => {
        if (NumUsersRef.current != null) {
            NumUsersRef.current.focus();
        }
    }
    

    const handleCancel = () => {
        onClose(false);
    };


    const handleOk = () => {
        const checkedModules = lnSearchModules.filter((lnSearch) => lnSearch.checked);
        if(checkedModules.length === 0) {
            setValueRequired(true);
            return;
        }
        
        onClose({
            lnSearchModules: lnSearchModules,
            modulesSelected: checkedModules.length,
        });
    };

    const [valueRequired, setValueRequired] = React.useState(false);


    const [lnSearchModules, setLnSearchModules] = React.useState([
        {
            kitName: 'Dye & Durham',
            checked: false,
        },
        {
            kitName: 'InfoTrack',
            checked: false,
        },
    ]);

    const handleChkBoxChange = (event, i) => {
        let states = [...lnSearchModules];
        // console.log("check status", states);
        states[i].checked = event.target.checked;
        setLnSearchModules(states);
    };

    // const handleChange = (event) => {
    //     setValue(event.target.value);
    //     setValueRequired(false);
    // };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxWidth: '800px' } }}
            maxWidth="sm"
            TransitionProps={{ onEntering: handleEntering }}
            open={open}
            {...other}
        >
            <DialogTitle>LexisNexis Searches</DialogTitle>
            <DialogContent dividers>
                <Box>
                    <Box sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexDirection: { xs: 'column', sm: 'row' },
                    }}>
                        <Typography variant="body" sx={{ m: 1 }} > <span style={{ fontSize: '23px' }}> Select Providers </span>
                            <span style={{ color: 'red' }}> * </span> : 
                            {valueRequired ? <Typography variant="subtitle2" style={{ color: 'red' }}> This field is required! </Typography> : ''}
                        </Typography>
                        {/* <Box>
                            <OutlinedInput
                                inputRef={NumUsersRef}
                                inputProps={{ maxLength: 3 }}
                                sx={{ height: '35px', width: '20ch', m: 1 }}
                                value={lnSearchUsers}
                                onChange={handelLnSearchUsers}
                            />
                            {valueRequired ? <Typography variant="subtitle2" style={{ color: 'red' }}> This field is required! </Typography> : ''}
                        </Box> */}
                    </Box>

                    <Box sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexDirection: { xs: 'column', sm: 'row' },
                    }}>
                        <FormControl sx={{ m: { xs: 1, sm: 3 } }} component="fieldset" variant="standard">
                            <FormGroup>
                                {/* {
                                    PracticeAreaKitModules.slice(0, Math.round(PracticeAreaKitModules.length / 2)).map((practiceAreaKit, i) => (
                                        <FormControlLabel key={practiceAreaKit.id}
                                            control={
                                                <Checkbox checked={practiceAreaKit.checked} onChange={(e) => handleChkBoxChange(e, i)} name={practiceAreaKit.empower_name} />
                                            }
                                            label={practiceAreaKit.empower_name}
                                        />
                                    ))
                                } */}
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={lnSearchModules[0].checked} onChange={(e) => handleChkBoxChange(e, 0)} name="familyCourt" />
                                    }
                                    label={lnSearchModules[0].kitName}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={lnSearchModules[1].checked} onChange={(e) => handleChkBoxChange(e, 1)} name="insolvency" />
                                    }
                                    label={lnSearchModules[1].kitName}
                                />
                            </FormGroup>
                        </FormControl>
                    </Box>
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

LnSearchPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};
