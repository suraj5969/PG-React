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


export default function PracticeAreaKitPopup(props) {

    const { onClose, open, ...other } = props;
    const NumUsersRef = React.useRef(null);
    const handleEntering = () => {
        if (NumUsersRef.current != null) {
            NumUsersRef.current.focus();
        }
    }

    React.useEffect(() => {
        if (!open) {
            setValueRequired(false);
        }
    }, [open]);

    const handleCancel = () => {
        onClose(false);
    };

    // const handleOk = () => {
    //     if (practiceAreaKitUsers === '') {
    //         setValueRequired(true);
    //         if (NumUsersRef.current != null) {
    //             NumUsersRef.current.focus();
    //         }
    //         return;
    //     }
    //     const checkedModules = PracticeAreaKitModules.filter((practiceAreaKit) => practiceAreaKit.checked);
    //     onClose({
    //         PracticeAreaKitModules: PracticeAreaKitModules,
    //         numOfUsers: Number(practiceAreaKitUsers),
    //         modulesSelected: checkedModules.length,
    //     });
    // };

    const handleOk = () => {
        if (practiceAreaKitUsers === '') {
            setValueRequired(true);
            if (NumUsersRef.current != null) {
                NumUsersRef.current.focus();
            }
            return;
        }
        const checkedModules = PracticeAreaKitModules.filter((practiceAreaKit) => practiceAreaKit.checked);
        onClose({
            practiceAreaKitModules: PracticeAreaKitModules,
            numOfUsers: Number(practiceAreaKitUsers),
            modulesSelected: checkedModules.length,
        });
    };

    function isStringInteger(value) {
        return /^[0-9]*$/.test(value);
    }

    const [practiceAreaKitUsers, setPracticeAreaKitUsers] = React.useState('');
    const [valueRequired, setValueRequired] = React.useState(false);
    const handelPracticeAreaKitUsers = (e) => {
        if (isStringInteger(e.target.value)) {
            setPracticeAreaKitUsers(e.target.value);
            setValueRequired(false);
        }
    }


    const [PracticeAreaKitModules, setPracticeAreaKitModules] = React.useState([
        {
            kitName: 'value1',
            checked: false,
        },
        {
            kitName: 'value2',
            checked: false,
        },
        {
            kitName: 'value3',
            checked: false,
        },

    ]);

    // const { familyCourt, insolvency, NSWConveyancing, NSWDistrict, NSWEstate,
    //     NSWPersonal, QLDConveyancing, QLDUniform, QLDProbate, SAustConveyancing,
    //     SAustCourts, VictorianConveyancing, VictorianCourts, VictorianProbate } = PracticeAreaKitModules;

    const handleChkBoxChange = (event, i) => {
        let states = [...PracticeAreaKitModules];
        // console.log("check status", states);
        states[i].checked = event.target.checked;
        setPracticeAreaKitModules(states);
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxWidth: '800px' } }}
            maxWidth="sm"
            TransitionProps={{ onEntering: handleEntering }}
            open={open}
            {...other}
        >
            <DialogTitle>Practice Area Kit</DialogTitle>
            <DialogContent dividers>
                <Box>
                    <Box sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexDirection: { xs: 'column', sm: 'row' },
                    }}>
                        <Typography variant="body" sx={{ m: 1 }} > Number of Practice area kit Users
                            <span style={{ color: 'red' }}> * </span> : </Typography>
                        <Box>
                            <OutlinedInput
                                inputRef={NumUsersRef}
                                inputProps={{ maxLength: 3 }}
                                sx={{ height: '35px', width: '20ch', m: 1 }}
                                value={practiceAreaKitUsers}
                                onChange={handelPracticeAreaKitUsers}
                            />
                            {valueRequired ? <Typography variant="subtitle2" style={{ color: 'red' }}> This field is required! </Typography> : ''}
                        </Box>
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
                                        <Checkbox checked={PracticeAreaKitModules[0].checked} onChange={(e) => handleChkBoxChange(e, 0)} name="familyCourt" />
                                    }
                                    label={PracticeAreaKitModules[0].kitName}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={PracticeAreaKitModules[1].checked} onChange={(e) => handleChkBoxChange(e, 1)} name="insolvency" />
                                    }
                                    label={PracticeAreaKitModules[1].kitName}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={PracticeAreaKitModules[2].checked} onChange={(e) => handleChkBoxChange(e, 2)} name="NSWConveyancing" />
                                    }
                                    label={PracticeAreaKitModules[2].kitName}
                                />
                            </FormGroup>
                        </FormControl>
                        <FormControl
                            component="fieldset"
                            sx={{ m: { xs: 1, sm: 3 } }}
                            variant="standard"
                        >
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={PracticeAreaKitModules[0].checked} onChange={(e) => handleChkBoxChange(e, 0)} name="familyCourt" />
                                    }
                                    label={PracticeAreaKitModules[0].kitName}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={PracticeAreaKitModules[1].checked} onChange={(e) => handleChkBoxChange(e, 1)} name="insolvency" />
                                    }
                                    label={PracticeAreaKitModules[1].kitName}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={PracticeAreaKitModules[2].checked} onChange={(e) => handleChkBoxChange(e, 2)} name="NSWConveyancing" />
                                    }
                                    label={PracticeAreaKitModules[2].kitName}
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

PracticeAreaKitPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};