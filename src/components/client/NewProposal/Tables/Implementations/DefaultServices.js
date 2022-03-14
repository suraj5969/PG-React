import React from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button, Box } from '@material-ui/core';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';

export default function DefaultServices(props) {

    const StyledHeadCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#4db6ac',
            color: 'white',
            textAlign: 'center',
        },
    }));

    const { clientProfile, Info, defaultServicesValues,
        setDefaultServicesValues, setImplementationTabValue, viewMode } = props;

    const { projectMgmt, installationOracle, essentialsCourse, operationsCourse,
        administrationCourse, systemSetup, backprocessing, reconcileTakeUp,
        anticipatedDisbs, trainInBillTemp, endUserTraining, endOfMonth,
        documentMgmt, totalHrsBaseInstall, totalDays } = defaultServicesValues;


    function isStringInteger(value) {
        return /^[0-9]*$/.test(value);
    }

    const handleSelect = (e) => {
        // console.log(eval(e.target.name));
        setDefaultServicesValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: {
                ...prevValues[e.target.name],
                traningMethod: e.target.value
            }
        }));
    };

    const handelTraningChange = (e) => {
        if (isStringInteger(e.target.value)) {
            setDefaultServicesValues((prevValues) => ({
                ...prevValues,
                [e.target.name]: {
                    ...prevValues[e.target.name],
                    accountsTraining: e.target.value
                }
            }));
        }
    }

    const handelConsultingChange = (e) => {
        if (isStringInteger(e.target.value)) {
            setDefaultServicesValues((prevValues) => ({
                ...prevValues,
                [e.target.name]: {
                    ...prevValues[e.target.name],
                    accountsConsulting: e.target.value
                }
            }));
        }
    }


    return (
        <Box >

            <TableContainer style={{ marginBottom: '3rem' }}>
                <Table className='subtable'>
                    <TableHead>
                        <TableRow >
                            <StyledHeadCell style={{ width: '40%', maxWidth: '575px', minWidth: '300px' }}>Task</StyledHeadCell>
                            <StyledHeadCell>Team</StyledHeadCell>
                            <StyledHeadCell>Include</StyledHeadCell>
                            <StyledHeadCell>PM</StyledHeadCell>
                            <StyledHeadCell>TSG</StyledHeadCell>
                            <StyledHeadCell>Accounts Training</StyledHeadCell>
                            <StyledHeadCell>Accounts Consulting</StyledHeadCell>
                            <StyledHeadCell>BPA Consulting</StyledHeadCell>
                            <StyledHeadCell>Travel</StyledHeadCell>
                            <StyledHeadCell>Total Hrs</StyledHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        <TableRow >
                            <TableCell component="th" scope="row">
                                <b> {totalHrsBaseInstall.task} </b>
                            </TableCell>
                            <TableCell align="center"> {totalHrsBaseInstall.team} </TableCell>
                            <TableCell align="center"> {totalHrsBaseInstall.include} </TableCell>
                            <TableCell align="center"> {totalHrsBaseInstall.PM} </TableCell>
                            <TableCell align="center"> {totalHrsBaseInstall.TSG} </TableCell>
                            <TableCell align="center"> {totalHrsBaseInstall.accountsTraining} </TableCell>
                            <TableCell align="center"> {totalHrsBaseInstall.accountsConsulting} </TableCell>
                            <TableCell align="center"> {totalHrsBaseInstall.BPAConsulting} </TableCell>
                            <TableCell align="center"> {totalHrsBaseInstall.travel} </TableCell>
                            <TableCell align="center"> {totalHrsBaseInstall.totalHrs} </TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                <b>{totalDays.task}</b>
                            </TableCell>
                            <TableCell align="center"> {totalDays.team} </TableCell>
                            <TableCell align="center"> {totalDays.include} </TableCell>
                            <TableCell align="center"> {totalDays.PM} </TableCell>
                            <TableCell align="center"> {totalDays.TSG} </TableCell>
                            <TableCell align="center"> {totalDays.accountsTraining} </TableCell>
                            <TableCell align="center"> {totalDays.accountsConsulting} </TableCell>
                            <TableCell align="center"> {totalDays.BPAConsulting} </TableCell>
                            <TableCell align="center"> {totalDays.travel} </TableCell>
                            <TableCell align="center"> {totalDays.totalHrs} </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>


            <TableContainer>
                <Table className='subtable'>
                    <TableHead>
                        <TableRow >
                            <StyledHeadCell >Task</StyledHeadCell>
                            <StyledHeadCell >Traning Method</StyledHeadCell>
                            <StyledHeadCell>Team</StyledHeadCell>
                            <StyledHeadCell>Include</StyledHeadCell>
                            <StyledHeadCell>PM</StyledHeadCell>
                            <StyledHeadCell>TSG</StyledHeadCell>
                            <StyledHeadCell>Accounts Training</StyledHeadCell>
                            <StyledHeadCell>Accounts Consulting</StyledHeadCell>
                            <StyledHeadCell>BPA Consulting</StyledHeadCell>
                            <StyledHeadCell>Travel</StyledHeadCell>
                            <StyledHeadCell>Total Hrs</StyledHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {projectMgmt.task}
                            </TableCell>
                            <TableCell align="center"> {projectMgmt.traningMethod} </TableCell>
                            <TableCell align="center"> {projectMgmt.team}</TableCell>
                            <TableCell align="center"> {projectMgmt.include}</TableCell>
                            <TableCell align="center"> {projectMgmt.PM} </TableCell>
                            <TableCell align="center"> {projectMgmt.TSG}</TableCell>
                            <TableCell align="center"> {projectMgmt.accountsTraining} </TableCell>
                            <TableCell align="center">{projectMgmt.accountsConsulting} </TableCell>
                            <TableCell align="center"> {projectMgmt.BPAConsulting}</TableCell>
                            <TableCell align="center"> {projectMgmt.travel}</TableCell>
                            <TableCell align="center">{projectMgmt.totalHrs}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {installationOracle.task}
                            </TableCell>
                            <TableCell align="center"> {installationOracle.traningMethod} </TableCell>
                            <TableCell align="center"> {installationOracle.team}</TableCell>
                            <TableCell align="center"> {installationOracle.include}</TableCell>
                            <TableCell align="center"> {installationOracle.PM} </TableCell>
                            <TableCell align="center"> {installationOracle.TSG}</TableCell>
                            <TableCell align="center"> {installationOracle.accountsTraining} </TableCell>
                            <TableCell align="center">{installationOracle.accountsConsulting} </TableCell>
                            <TableCell align="center"> {installationOracle.BPAConsulting}</TableCell>
                            <TableCell align="center"> {installationOracle.travel}</TableCell>
                            <TableCell align="center">{installationOracle.totalHrs}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {essentialsCourse.task}
                            </TableCell>
                            <TableCell>
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="essentialsCourse"
                                        value={essentialsCourse.traningMethod}
                                        onChange={handleSelect}
                                        displayEmpty
                                        autoWidth={false}
                                        disabled={clientProfile.objective === 'Upsell' || viewMode}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Online Learning">Online Learning</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite Learning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center"> {essentialsCourse.team}</TableCell>
                            <TableCell align="center"> {essentialsCourse.include}</TableCell>
                            <TableCell align="center"> {essentialsCourse.PM} </TableCell>
                            <TableCell align="center"> {essentialsCourse.TSG}</TableCell>
                            <TableCell align="center">
                                <FormControl variant="outlined">
                                    <OutlinedInput
                                        name="essentialsCourse"
                                        inputProps={{ style: { textAlign: 'center' }, maxLength: 3 }}
                                        sx={{ height: '25px', width: '8ch' }}
                                        value={essentialsCourse.accountsTraining}
                                        onChange={handelTraningChange}
                                        disabled={Info.traningMethod !== 'Blended Learning' || clientProfile.objective === 'Upsell' || viewMode}
                                    />
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">
                                <FormControl variant="outlined">
                                    <OutlinedInput
                                        name="essentialsCourse"
                                        inputProps={{ style: { textAlign: 'center' }, maxLength: 3 }}
                                        sx={{ height: '25px', width: '8ch' }}
                                        value={essentialsCourse.accountsConsulting}
                                        onChange={handelConsultingChange}
                                        disabled={Info.traningMethod !== 'Blended Learning' || clientProfile.objective === 'Upsell' || viewMode}
                                    />
                                </FormControl>
                            </TableCell>
                            <TableCell align="center"> {essentialsCourse.BPAConsulting}</TableCell>
                            <TableCell align="center"> {essentialsCourse.travel}</TableCell>
                            <TableCell align="center"> {essentialsCourse.totalHrs}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {operationsCourse.task}
                            </TableCell>
                            <TableCell>
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="operationsCourse"
                                        value={operationsCourse.traningMethod}
                                        onChange={handleSelect}
                                        displayEmpty
                                        autoWidth={false}
                                        disabled={clientProfile.objective === 'Upsell' || viewMode}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Online Learning">Online Learning</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite Learning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center"> {operationsCourse.team} </TableCell>
                            <TableCell align="center"> {operationsCourse.include} </TableCell>
                            <TableCell align="center"> {operationsCourse.PM}  </TableCell>
                            <TableCell align="center"> {operationsCourse.TSG} </TableCell>
                            <TableCell align="center">
                                <FormControl variant="outlined">
                                    <OutlinedInput
                                        name="operationsCourse"
                                        inputProps={{ style: { textAlign: 'center' }, maxLength: 3 }}
                                        sx={{ height: '25px', width: '8ch' }}
                                        value={operationsCourse.accountsTraining}
                                        onChange={handelTraningChange}
                                        disabled={Info.traningMethod !== 'Blended Learning' || clientProfile.objective === 'Upsell' || viewMode}
                                    />
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">
                                <FormControl variant="outlined">
                                    <OutlinedInput
                                        name="operationsCourse"
                                        inputProps={{ style: { textAlign: 'center' }, maxLength: 3 }}
                                        sx={{ height: '25px', width: '8ch' }}
                                        value={operationsCourse.accountsConsulting}
                                        onChange={handelConsultingChange}
                                        disabled={Info.traningMethod !== 'Blended Learning' || clientProfile.objective === 'Upsell' || viewMode}
                                    />
                                </FormControl>
                            </TableCell>
                            <TableCell align="center"> {operationsCourse.BPAConsulting}</TableCell>
                            <TableCell align="center"> {operationsCourse.travel}</TableCell>
                            <TableCell align="center"> {operationsCourse.totalHrs}</TableCell>
                        </TableRow>


                        <TableRow >
                            <TableCell component="th" scope="row">
                                {administrationCourse.task}
                            </TableCell>
                            <TableCell>
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="administrationCourse"
                                        value={administrationCourse.traningMethod}
                                        onChange={handleSelect}
                                        displayEmpty
                                        autoWidth={false}
                                        disabled={clientProfile.objective === 'Upsell' || viewMode}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Online Learning">Online Learning</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite Learning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center"> {administrationCourse.team} </TableCell>
                            <TableCell align="center"> {administrationCourse.include} </TableCell>
                            <TableCell align="center"> {administrationCourse.PM}  </TableCell>
                            <TableCell align="center"> {administrationCourse.TSG} </TableCell>
                            <TableCell align="center">
                                <FormControl variant="outlined">
                                    <OutlinedInput
                                        name="administrationCourse"
                                        inputProps={{ style: { textAlign: 'center' }, maxLength: 3 }}
                                        sx={{ height: '25px', width: '8ch' }}
                                        value={administrationCourse.accountsTraining}
                                        onChange={handelTraningChange}
                                        disabled={Info.traningMethod !== 'Blended Learning' || clientProfile.objective === 'Upsell' || viewMode}
                                    />
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">
                                <FormControl variant="outlined">
                                    <OutlinedInput
                                        name="administrationCourse"
                                        inputProps={{ style: { textAlign: 'center' }, maxLength: 3 }}
                                        sx={{ height: '25px', width: '8ch' }}
                                        value={administrationCourse.accountsConsulting}
                                        onChange={handelConsultingChange}
                                        disabled={Info.traningMethod !== 'Blended Learning' || clientProfile.objective === 'Upsell' || viewMode}
                                    />
                                </FormControl>
                            </TableCell>
                            <TableCell align="center"> {administrationCourse.BPAConsulting}</TableCell>
                            <TableCell align="center"> {administrationCourse.travel}</TableCell>
                            <TableCell align="center"> {administrationCourse.totalHrs}</TableCell>
                        </TableRow>


                        <TableRow >
                            <TableCell component="th" scope="row">
                                {systemSetup.task}
                            </TableCell>
                            <TableCell>
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="systemSetup"
                                        value={systemSetup.traningMethod}
                                        onChange={handleSelect}
                                        displayEmpty
                                        autoWidth={false}
                                        disabled={clientProfile.objective === 'Upsell' || viewMode}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite Learning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center"> {systemSetup.team} </TableCell>
                            <TableCell align="center"> {systemSetup.include} </TableCell>
                            <TableCell align="center"> {systemSetup.PM}  </TableCell>
                            <TableCell align="center"> {systemSetup.TSG} </TableCell>
                            <TableCell align="center"> {systemSetup.accountsTraining} </TableCell>
                            <TableCell align="center"> {systemSetup.accountsConsulting} </TableCell>
                            <TableCell align="center"> {systemSetup.BPAConsulting} </TableCell>
                            <TableCell align="center"> {systemSetup.travel} </TableCell>
                            <TableCell align="center"> {systemSetup.totalHrs} </TableCell>
                        </TableRow>


                        <TableRow >
                            <TableCell component="th" scope="row">
                                {backprocessing.task}
                            </TableCell>
                            <TableCell>
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="backprocessing"
                                        value={backprocessing.traningMethod}
                                        onChange={handleSelect}
                                        displayEmpty
                                        autoWidth={false}
                                        disabled={clientProfile.objective === 'Upsell' || viewMode}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite Learning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center"> {backprocessing.team} </TableCell>
                            <TableCell align="center"> {backprocessing.include} </TableCell>
                            <TableCell align="center"> {backprocessing.PM}  </TableCell>
                            <TableCell align="center"> {backprocessing.TSG} </TableCell>
                            <TableCell align="center"> {backprocessing.accountsTraining} </TableCell>
                            <TableCell align="center"> {backprocessing.accountsConsulting} </TableCell>
                            <TableCell align="center"> {backprocessing.BPAConsulting} </TableCell>
                            <TableCell align="center"> {backprocessing.travel} </TableCell>
                            <TableCell align="center"> {backprocessing.totalHrs} </TableCell>
                        </TableRow>


                        <TableRow >
                            <TableCell component="th" scope="row">
                                {reconcileTakeUp.task}
                            </TableCell>
                            <TableCell>
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="reconcileTakeUp"
                                        value={reconcileTakeUp.traningMethod}
                                        onChange={handleSelect}
                                        displayEmpty
                                        autoWidth={false}
                                        disabled={clientProfile.objective === 'Upsell' || viewMode}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite Learning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center"> {reconcileTakeUp.team} </TableCell>
                            <TableCell align="center"> {reconcileTakeUp.include} </TableCell>
                            <TableCell align="center"> {reconcileTakeUp.PM}  </TableCell>
                            <TableCell align="center"> {reconcileTakeUp.TSG} </TableCell>
                            <TableCell align="center"> {reconcileTakeUp.accountsTraining} </TableCell>
                            <TableCell align="center"> {reconcileTakeUp.accountsConsulting} </TableCell>
                            <TableCell align="center"> {reconcileTakeUp.BPAConsulting} </TableCell>
                            <TableCell align="center"> {reconcileTakeUp.travel} </TableCell>
                            <TableCell align="center"> {reconcileTakeUp.totalHrs} </TableCell>
                        </TableRow>


                        <TableRow >
                            <TableCell component="th" scope="row">
                                {anticipatedDisbs.task}
                            </TableCell>
                            <TableCell>
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="anticipatedDisbs"
                                        value={anticipatedDisbs.traningMethod}
                                        onChange={handleSelect}
                                        displayEmpty
                                        autoWidth={false}
                                        disabled={clientProfile.objective === 'Upsell' || viewMode}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Online Learning">Online Learning</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite Learning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center"> {anticipatedDisbs.team} </TableCell>
                            <TableCell align="center"> {anticipatedDisbs.include} </TableCell>
                            <TableCell align="center"> {anticipatedDisbs.PM}  </TableCell>
                            <TableCell align="center"> {anticipatedDisbs.TSG} </TableCell>
                            <TableCell align="center"> {anticipatedDisbs.accountsTraining} </TableCell>
                            <TableCell align="center"> {anticipatedDisbs.accountsConsulting} </TableCell>
                            <TableCell align="center"> {anticipatedDisbs.BPAConsulting} </TableCell>
                            <TableCell align="center"> {anticipatedDisbs.travel} </TableCell>
                            <TableCell align="center"> {anticipatedDisbs.totalHrs} </TableCell>
                        </TableRow>


                        <TableRow >
                            <TableCell component="th" scope="row">
                                {trainInBillTemp.task}
                            </TableCell>
                            <TableCell>
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="trainInBillTemp"
                                        value={trainInBillTemp.traningMethod}
                                        onChange={handleSelect}
                                        displayEmpty
                                        autoWidth={false}
                                        disabled={clientProfile.objective === 'Upsell' || viewMode}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Online Learning">Online Learning</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite Learning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center"> {trainInBillTemp.team} </TableCell>
                            <TableCell align="center"> {trainInBillTemp.include} </TableCell>
                            <TableCell align="center"> {trainInBillTemp.PM}  </TableCell>
                            <TableCell align="center"> {trainInBillTemp.TSG} </TableCell>
                            <TableCell align="center"> {trainInBillTemp.accountsTraining} </TableCell>
                            <TableCell align="center"> {trainInBillTemp.accountsConsulting} </TableCell>
                            <TableCell align="center"> {trainInBillTemp.BPAConsulting} </TableCell>
                            <TableCell align="center"> {trainInBillTemp.travel} </TableCell>
                            <TableCell align="center"> {trainInBillTemp.totalHrs} </TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {endUserTraining.task}
                            </TableCell>
                            <TableCell>
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="endUserTraining"
                                        value={endUserTraining.traningMethod}
                                        onChange={handleSelect}
                                        displayEmpty
                                        autoWidth={false}
                                        disabled={clientProfile.objective === 'Upsell' || viewMode}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Online Learning">Online Learning</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite Learning</MenuItem>
                                        <MenuItem value="Train the Trainer">Train the Trainer</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center"> {endUserTraining.team} </TableCell>
                            <TableCell align="center"> {endUserTraining.include} </TableCell>
                            <TableCell align="center"> {endUserTraining.PM}  </TableCell>
                            <TableCell align="center"> {endUserTraining.TSG} </TableCell>
                            <TableCell align="center">
                                <FormControl variant="outlined">
                                    <OutlinedInput
                                        name="endUserTraining"
                                        inputProps={{ style: { textAlign: 'center' }, maxLength: 3 }}
                                        sx={{ height: '25px', width: '8ch' }}
                                        value={endUserTraining.accountsTraining}
                                        onChange={handelTraningChange}
                                        disabled={Info.traningMethod !== 'Blended Learning' || clientProfile.objective === 'Upsell' || viewMode}
                                    />
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">
                                <FormControl variant="outlined">
                                    <OutlinedInput
                                        name="endUserTraining"
                                        inputProps={{ style: { textAlign: 'center' }, maxLength: 3 }}
                                        sx={{ height: '25px', width: '8ch' }}
                                        value={endUserTraining.accountsConsulting}
                                        onChange={handelConsultingChange}
                                        disabled={Info.traningMethod !== 'Blended Learning' || clientProfile.objective === 'Upsell' || viewMode}
                                    />
                                </FormControl>
                            </TableCell>
                            <TableCell align="center"> {endUserTraining.BPAConsulting} </TableCell>
                            <TableCell align="center"> {endUserTraining.travel} </TableCell>
                            <TableCell align="center"> {endUserTraining.totalHrs} </TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {endOfMonth.task}
                            </TableCell>
                            <TableCell>
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="endOfMonth"
                                        value={endOfMonth.traningMethod}
                                        onChange={handleSelect}
                                        displayEmpty
                                        autoWidth={false}
                                        disabled={clientProfile.objective === 'Upsell' || viewMode}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Online Learning">Online Learning</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite Learning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center"> {endOfMonth.team} </TableCell>
                            <TableCell align="center"> {endOfMonth.include} </TableCell>
                            <TableCell align="center"> {endOfMonth.PM}  </TableCell>
                            <TableCell align="center"> {endOfMonth.TSG} </TableCell>
                            <TableCell align="center"> {endOfMonth.accountsTraining} </TableCell>
                            <TableCell align="center"> {endOfMonth.accountsConsulting} </TableCell>
                            <TableCell align="center"> {endOfMonth.BPAConsulting} </TableCell>
                            <TableCell align="center"> {endOfMonth.travel} </TableCell>
                            <TableCell align="center"> {endOfMonth.totalHrs} </TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {documentMgmt.task}
                            </TableCell>
                            <TableCell>
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="documentMgmt"
                                        value={documentMgmt.traningMethod}
                                        onChange={handleSelect}
                                        displayEmpty
                                        autoWidth={false}
                                        disabled={clientProfile.objective === 'Upsell' || viewMode}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Online Learning">Online Learning</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite Learning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center"> {documentMgmt.team} </TableCell>
                            <TableCell align="center"> {documentMgmt.include} </TableCell>
                            <TableCell align="center"> {documentMgmt.PM}  </TableCell>
                            <TableCell align="center"> {documentMgmt.TSG} </TableCell>
                            <TableCell align="center"> {documentMgmt.accountsTraining} </TableCell>
                            <TableCell align="center"> {documentMgmt.accountsConsulting} </TableCell>
                            <TableCell align="center"> {documentMgmt.BPAConsulting} </TableCell>
                            <TableCell align="center"> {documentMgmt.travel} </TableCell>
                            <TableCell align="center"> {documentMgmt.totalHrs} </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ marginTop: 20, marginLeft: 10 }}>
                <Button onClick={() => setImplementationTabValue(2)}
                    variant="contained" color="primary">Next</Button>
            </Box>
        </Box>
    );
}