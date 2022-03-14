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
import getAllEmpowerModulesAPI from '../../../apis/client/getAllEmpowerModulesAPI'


export default function EmpowerPopup(props) {
    const { onClose, open, ...other } = props;

    const NumUsersRef = React.useRef(null);
    const handleEntering = () => {
        if (NumUsersRef.current != null) {
            NumUsersRef.current.focus();
        }
    };


    const handleCancel = () => {
        onClose(false);
    };

    const handleOk = () => {
        if (empowerUsers === '') {
            setValueRequired(true);
            if (NumUsersRef.current != null) {
                NumUsersRef.current.focus();
            }
            return;
        }
        const checkedModules = EmpowerModules.filter((empower) => empower.checked);
        onClose({
            empowerModules: EmpowerModules,
            numOfUsers: Number(empowerUsers),
            modulesSelected: checkedModules.length,
        });
    };


    function isStringInteger(value) {
        return /^[0-9]*$/.test(value);
    }

    const [empowerUsers, setEmpowerUsers] = React.useState('');
    const [valueRequired, setValueRequired] = React.useState(false);
    const handelEmpowerUsers = (e) => {
        if (isStringInteger(e.target.value)) {
            setEmpowerUsers(e.target.value);
            setValueRequired(false);
        }
    }

    const [EmpowerModules, setEmpowerModules] = React.useState([]);
    // const [totalEmpower, setTotalEmpower] = React.useState(0);

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await getAllEmpowerModulesAPI();
            if (result.status !== 200) {
                console.log('data migration api no working');
            }
            else {
                if (typeof result.data === 'object' && result.data.length > 0 ) {
                    // console.log(result.data);
                    const states = result.data.map((empower) => ({ empower_name: empower.empower_name, id: empower.id, checked: false }));
                    // console.log(states, 'states');
                    setEmpowerModules(states);
                    // setTotalEmpower(result.data.length);
                }
            }
        }
        fetchData();
    }, [setEmpowerModules])

    const handleChkBoxChange = (event, i) => {
        let states = [...EmpowerModules];
        states[i].checked = event.target.checked;
        setEmpowerModules(states);
    };

    // const { familyCourt, insolvency, NSWConveyancing, NSWDistrict, NSWEstate,
    //     NSWPersonal, QLDConveyancing, QLDUniform, QLDProbate, SAustConveyancing,
    //     SAustCourts, VictorianConveyancing, VictorianCourts, VictorianProbate } = EmpowerModules;


    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxWidth: '800px' } }}
            maxWidth="sm"
            TransitionProps={{ onEntering: handleEntering }}
            open={open}
            {...other}
        >
            <DialogTitle>Empower</DialogTitle>
            <DialogContent dividers>
                <Box>
                    <Box sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexDirection: { xs: 'column', sm: 'row' },
                    }}>
                        <Typography variant="body" sx={{ m: 1 }} > Number of Empower Users
                            <span style={{ color: 'red' }}> * </span> : </Typography>
                        <Box>
                            <OutlinedInput
                                inputRef={NumUsersRef}
                                inputProps={{ maxLength: 3 }}
                                sx={{ height: '35px', width: '20ch', m: 1 }}
                                value={empowerUsers}
                                onChange={handelEmpowerUsers}
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
                                {
                                    EmpowerModules.slice(0, Math.round(EmpowerModules.length / 2)).map((empower, i) => (
                                        <FormControlLabel key={empower.id}
                                            control={
                                                <Checkbox checked={empower.checked} onChange={(e) => handleChkBoxChange(e, i)} name={empower.empower_name} />
                                            }
                                            label={empower.empower_name}
                                        />
                                    ))
                                }
                                {/* <FormControlLabel
                                    control={
                                        <Checkbox checked={familyCourt} onChange={handleChkBoxChange} name="familyCourt" />
                                    }
                                    label="Family Court (Federal)"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={insolvency} onChange={handleChkBoxChange} name="insolvency" />
                                    }
                                    label="Insolvency (Federal)"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={NSWConveyancing} onChange={handleChkBoxChange} name="NSWConveyancing" />
                                    }
                                    label="NSW Conveyancing"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={NSWDistrict} onChange={handleChkBoxChange} name="NSWDistrict" />
                                    }
                                    label="NSW District Court"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={NSWEstate} onChange={handleChkBoxChange} name="NSWEstate" />
                                    }
                                    label="NSW Estate Planning and Administration"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={NSWPersonal} onChange={handleChkBoxChange} name="NSWPersonal" />
                                    }
                                    label="NSW Personal Injury"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={QLDConveyancing} onChange={handleChkBoxChange} name="QLDConveyancing" />
                                    }
                                    label="QLD Conveyancing (Lexon option available)"
                                /> */}
                            </FormGroup>
                        </FormControl>
                        <FormControl
                            component="fieldset"
                            sx={{ m: { xs: 1, sm: 3 } }}
                            variant="standard"
                        >
                            <FormGroup>
                                {
                                    EmpowerModules.slice(Math.round(EmpowerModules.length / 2), EmpowerModules.length).map((empower, i) => (
                                        <FormControlLabel key={empower.id}
                                            control={
                                                <Checkbox checked={empower.checked} onChange={(e) => handleChkBoxChange(e, Math.round(EmpowerModules.length / 2) + i)} name={empower.empower_name} />
                                            }
                                            label={empower.empower_name}
                                        />
                                    ))
                                }
                                {/* <FormControlLabel
                                    control={
                                        <Checkbox checked={QLDUniform} onChange={handleChkBoxChange} name="QLDUniform" />
                                    }
                                    label="QLD Uniform Civil Procedure Rules"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={QLDProbate} onChange={handleChkBoxChange} name="QLDProbate" />
                                    }
                                    label="QLD Probate"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={SAustConveyancing} onChange={handleChkBoxChange} name="SAustConveyancing" />
                                    }
                                    label="South Australian Conveyancing"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={SAustCourts} onChange={handleChkBoxChange} name="SAustCourts" />
                                    }
                                    label="South Australian Courts"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={VictorianConveyancing} onChange={handleChkBoxChange} name="VictorianConveyancing" />
                                    }
                                    label="Victorian Conveyancing"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={VictorianCourts} onChange={handleChkBoxChange} name="VictorianCourts" />
                                    }
                                    label="Victorian Courts"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={VictorianProbate} onChange={handleChkBoxChange} name="VictorianProbate" />
                                    }
                                    label="Victorian Probate"
                                /> */}
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

EmpowerPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};
