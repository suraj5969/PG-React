import React from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button, Box } from '@material-ui/core';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import InfoPopup from '../../../PopUps/InfoPopup';

export default function AttendingCourses(props) {

    const { attendingCourses, setAttendingCourses, clientProfile, setImplementationTabValue, viewMode } = props;

    const StyledHeadCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#4db6ac',
            color: 'white',
            textAlign: 'center',
            padding: '5px',
        },
    }));


    function isStringInteger(value) {
        return /^[0-9]*$/.test(value);
    }

    const [operationsPopup, setOperationsPopup] = React.useState(false);
    const [dataformsPopup, setDataformsPopup] = React.useState(false);

    const closeOperationsPopup = () => {
        setOperationsPopup(false);
    }

    const closeDataformsPopup = () => {
        setDataformsPopup(false);
    }

    const handelOperationsAdminChange = (event) => {
        if (isStringInteger(event.target.value)) {
            let users = Number(clientProfile.numOfUsers);
            let value = Number(event.target.value);
            // console.log(value, 'value', clientProfile.numOfUsers, 'users')
            if (value > users) {
                setOperationsPopup(true);
                setAttendingCourses((prevValue) => ({
                    ...prevValue,
                    operationsAdmin: 0
                }))
            }
            else {
                setAttendingCourses((prevValue) => ({
                    ...prevValue,
                    operationsAdmin: event.target.value
                }))
            }
        }

    }

    const handelDataformsChange = (event) => {
        if (isStringInteger(event.target.value)) {
            let users = Number(clientProfile.numOfUsers);
            let value = Number(event.target.value);

            if (value > users) {
                setDataformsPopup(true);
                setAttendingCourses((prevValue) => ({
                    ...prevValue,
                    dataforms: 0
                }))
            }
            else {
                setAttendingCourses((prevValue) => ({
                    ...prevValue,
                    dataforms: event.target.value
                }))
            }
        }
    }

    return (
        <>
            <InfoPopup open={operationsPopup} onClose={closeOperationsPopup}
                title="Operations/Admin Value Error"
                bodyText="Operations/Admin cannot be greater than Number of Users"
            />
            <InfoPopup open={dataformsPopup} onClose={closeDataformsPopup}
                title="DataForms and Precedents or Scripting or Workflow Value Error"
                bodyText="DataForms and Precedents or Scripting or Workflow cannot be greater than Number of Users"
            />
            <Box sx={{ maxWidth: '700px' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow >
                                <StyledHeadCell style={{ width: '500px', textAlign: 'left' }}>How many People will be attending the following courses?</StyledHeadCell>
                                <StyledHeadCell> </StyledHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {attendingCourses.operationsAdminLabel}
                                </TableCell>
                                <TableCell align="center">
                                    <FormControl variant="outlined">
                                        <OutlinedInput
                                            inputProps={{ style: { textAlign: 'center' }, maxLength: 4 }}
                                            sx={{ height: '25px', minWidth: '80px' }}
                                            value={attendingCourses.operationsAdmin}
                                            onChange={handelOperationsAdminChange}
                                            disabled={viewMode}
                                        />
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {attendingCourses.dataformsLabel}
                                </TableCell>
                                <TableCell align="center">
                                    <FormControl variant="outlined">
                                        <OutlinedInput
                                            inputProps={{ style: { textAlign: 'center' }, maxLength: 4 }}
                                            sx={{ height: '25px', minWidth: '80px' }}
                                            value={attendingCourses.dataforms}
                                            onChange={handelDataformsChange}
                                            disabled={viewMode}
                                        />
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {attendingCourses.endUserAccountLabel}
                                </TableCell>
                                <TableCell align="center"> {attendingCourses.endUserAccount}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {attendingCourses.endUserBPALabel}
                                </TableCell>
                                <TableCell align="center"> {attendingCourses.endUserBPA}</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ marginTop: 20, marginLeft: 10 }}>
                    <Button onClick={() => setImplementationTabValue(1)}
                        variant="contained" color="primary" >Next</Button>
                </Box>
            </Box>
        </>
    );
}