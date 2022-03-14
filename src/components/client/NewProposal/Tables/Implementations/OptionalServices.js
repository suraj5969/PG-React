import React from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button, Box } from '@material-ui/core';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import DataMigrationPopup from '../../../PopUps/DataMigrationPopup';
import AffinityMobilePopup from '../../../PopUps/AffinityMobilePopup';
import EmpowerPopup from '../../../PopUps/EmpowerPopup';
import SettlementPopup from '../../../PopUps/SettlementPopup';

export default function OptionalServices(props) {


    const { clientProfile, optionalServices, setOptionalServices, optionalPopupsState,
        setOptionalPopupsState, setImplementationTabValue, setUpfrontCost,
        setAffinityMobilePopUpValue, setEmpowerModules, setSettlementPopUpValue, viewMode } = props;

    const { totalHours, totalDays, grandTotalHours, grandTotalDays,
        dataMigrationRow, selfCustody, multyPartyBilling, reportWriting,
        dataformsMax, scripting, workflow, BPAEndUser, BPAEssentials,
        dataformsPhoneBook, addPrecedent, BPAGoLive, exchangeIntegration,
        softdocsIntegration, clientPortal, worksiteIntegration,
        affinityMobile, empower, settlementAdjuster, thirdPartyIT } = optionalServices;


    function isStringInteger(value) {
        return /^[0-9]*$/.test(value);
    }

    const StyledHeadCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#4db6ac',
            color: 'white',
            textAlign: 'center',
            padding: '5px',
        },
    }));

    const GreyTableRow = styled(TableRow)(({ theme }) => ({
        '&': {
            backgroundColor: '#bbb',
        },
    }));

    const handleCloseDataMigrationPopup = (newValue) => {
        setOptionalPopupsState((prevValue) => ({
            ...prevValue,
            dataMigrationRow: false,
        }));

        if (newValue !== false) {
            let tsg = 0;
            if(newValue.tsg) {
                tsg = Number(newValue.tsg);
            }
            setOptionalServices((prevValue) => ({
                ...prevValue,
                dataMigrationRow: {
                    ...prevValue.dataMigrationRow,
                    task: newValue.migration_name,
                    TSG: tsg,
                    dataMigration: Number(newValue.dm_hours),
                    accountsConsulting: Number(newValue.account_consult_hrs),
                }
            }))

            setUpfrontCost((prevValues) => ({
                ...prevValues,
                dataMigration: {
                    ...prevValues.dataMigration,
                    cost: Number(newValue.more_than_ten_cost),
                },
            }))
        }
        else {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                dataMigrationRow: {
                    ...prevValue.dataMigrationRow,
                    include: 'No',
                }
            }))
        }
    };

    const handleCloseAffinityPopup = async (newValue) => {
        setOptionalPopupsState((prevValue) => ({
            ...prevValue,
            affinityMobile: false,
        }));
        if (newValue !== false) {
            setAffinityMobilePopUpValue(newValue);
        }
        else {
            setAffinityMobilePopUpValue('');
            setOptionalServices((prevValue) => ({
                ...prevValue,
                affinityMobile: {
                    ...prevValue.affinityMobile,
                    include: 'No',
                }
            }))
        }
    };

    const handleCloseSettlementPopup = (newValue) => {
        setOptionalPopupsState((prevValue) => ({
            ...prevValue,
            settlementAdjuster: false,
        }));

        if (newValue !== false) {
            setSettlementPopUpValue(newValue);
        }
        else {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                settlementAdjuster: {
                    ...prevValue.settlementAdjuster,
                    include: 'No',
                }
            }))
            setSettlementPopUpValue('');
        }
    };

    const handleCloseEmpowerPopup = (newEmpowerModules) => {
        setOptionalPopupsState((prevValue) => ({
            ...prevValue,
            empower: false,
        }));

        if (newEmpowerModules !== false) {
            setEmpowerModules(newEmpowerModules);
            // console.log(newEmpowerModules,'newEmpowerModules')
        }
        else {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                empower: {
                    ...prevValue.empower,
                    include: 'No',
                }
            }))
        }
    };

    const handleIncludeSelect = (e) => {
        setOptionalServices((prevValue) => ({
            ...prevValue,
            [e.target.name]: {
                ...prevValue[e.target.name],
                include: e.target.value,
            }
        }));

        if (e.target.value === 'No') {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                [e.target.name]: {
                    ...prevValue[e.target.name],
                    traningMethod: ''
                }
            }));
        }
        else {
            if (e.target.value === 'Yes') {
                setOptionalPopupsState((prevValues) => ({
                    ...prevValues,
                    [e.target.name]: true
                }));
            }
        }
    }

    const handleTraningMethodSelect = (e) => {
        setOptionalServices((prevValues) => ({
            ...prevValues,
            [e.target.name]: {
                ...prevValues[e.target.name],
                traningMethod: e.target.value
            }
        }));
    };

    const handelPercedentBPAConsulting = (event) => {
        if (isStringInteger(event.target.value)) {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                addPrecedent: {
                    ...prevValue.addPrecedent,
                    BPAConsulting: event.target.value
                }
            }))
        }
    }



    return (
        <Box >

            <Box sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
                <DataMigrationPopup
                    open={optionalPopupsState.dataMigrationRow}
                    onClose={handleCloseDataMigrationPopup}
                    clientProfile={clientProfile}
                />
            </Box>

            <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                <AffinityMobilePopup
                    open={optionalPopupsState.affinityMobile}
                    onClose={handleCloseAffinityPopup}
                />
            </Box>

            <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                <EmpowerPopup
                    open={optionalPopupsState.empower}
                    onClose={handleCloseEmpowerPopup}
                />
            </Box>

            <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                <SettlementPopup
                    open={optionalPopupsState.settlementAdjuster}
                    onClose={handleCloseSettlementPopup}
                />
            </Box>

            <TableContainer style={{ marginBottom: '3rem' }}>
                <Table className='subtable'>
                    <TableHead>
                        <TableRow >
                            {/* style={{width: '35%', maxWidth:'500px', minWidth:'300px'}} */}
                            <StyledHeadCell style={{ width: '25%', maxWidth: '400px', minWidth: '150px' }}>Task</StyledHeadCell>
                            <StyledHeadCell >Include</StyledHeadCell>
                            <StyledHeadCell>Team</StyledHeadCell>
                            <StyledHeadCell>PM</StyledHeadCell>
                            <StyledHeadCell>TSG</StyledHeadCell>
                            <StyledHeadCell>Data Migration</StyledHeadCell>
                            <StyledHeadCell>Accounts Training</StyledHeadCell>
                            <StyledHeadCell>Accounts Consulting</StyledHeadCell>
                            <StyledHeadCell>BPA Training</StyledHeadCell>
                            <StyledHeadCell>BPA Consulting</StyledHeadCell>
                            <StyledHeadCell>Travel</StyledHeadCell>
                            <StyledHeadCell>Total Hrs</StyledHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        <TableRow >
                            <TableCell component="th" scope="row">
                                <b>{totalHours.task}</b>
                            </TableCell>
                            <TableCell align="center">{totalHours.include}</TableCell>
                            <TableCell align="center">{totalHours.team}</TableCell>
                            <TableCell align="center">{totalHours.PM}</TableCell>
                            <TableCell align="center">{totalHours.TSG}</TableCell>
                            <TableCell align="center">{totalHours.dataMigration}</TableCell>
                            <TableCell align="center">{totalHours.accountsTraining}</TableCell>
                            <TableCell align="center">{totalHours.accountsConsulting}</TableCell>
                            <TableCell align="center">{totalHours.BPATraining}</TableCell>
                            <TableCell align="center">{totalHours.BPAConsulting}</TableCell>
                            <TableCell align="center">{totalHours.travel}</TableCell>
                            <TableCell align="center">{totalHours.totalHrs}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell component="th" scope="row">
                                <b>{totalDays.task}</b>
                            </TableCell>
                            <TableCell align="center">{totalDays.include}</TableCell>
                            <TableCell align="center">{totalDays.team}</TableCell>
                            <TableCell align="center">{totalDays.PM}</TableCell>
                            <TableCell align="center">{totalDays.TSG}</TableCell>
                            <TableCell align="center">{totalDays.dataMigration}</TableCell>
                            <TableCell align="center">{totalDays.accountsTraining}</TableCell>
                            <TableCell align="center">{totalDays.accountsConsulting}</TableCell>
                            <TableCell align="center">{totalDays.BPATraining}</TableCell>
                            <TableCell align="center">{totalDays.BPAConsulting}</TableCell>
                            <TableCell align="center">{totalDays.travel}</TableCell>
                            <TableCell align="center">{totalDays.totalHrs}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell component="th" scope="row">
                                <b>{grandTotalHours.task}</b>
                            </TableCell>
                            <TableCell align="center">{grandTotalHours.include}</TableCell>
                            <TableCell align="center">{grandTotalHours.team}</TableCell>
                            <TableCell align="center">{grandTotalHours.PM}</TableCell>
                            <TableCell align="center">{grandTotalHours.TSG}</TableCell>
                            <TableCell align="center">{grandTotalHours.dataMigration}</TableCell>
                            <TableCell align="center">{grandTotalHours.accountsTraining}</TableCell>
                            <TableCell align="center">{grandTotalHours.accountsConsulting}</TableCell>
                            <TableCell align="center">{grandTotalHours.BPATraining}</TableCell>
                            <TableCell align="center">{grandTotalHours.BPAConsulting}</TableCell>
                            <TableCell align="center">{grandTotalHours.travel}</TableCell>
                            <TableCell align="center">{grandTotalHours.totalHrs}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell component="th" scope="row">
                                <b>{grandTotalDays.task}</b>
                            </TableCell>
                            <TableCell align="center">{grandTotalDays.include}</TableCell>
                            <TableCell align="center">{grandTotalDays.team}</TableCell>
                            <TableCell align="center">{grandTotalDays.PM}</TableCell>
                            <TableCell align="center">{grandTotalDays.TSG}</TableCell>
                            <TableCell align="center">{grandTotalDays.dataMigration}</TableCell>
                            <TableCell align="center">{grandTotalDays.accountsTraining}</TableCell>
                            <TableCell align="center">{grandTotalDays.accountsConsulting}</TableCell>
                            <TableCell align="center">{grandTotalDays.BPATraining}</TableCell>
                            <TableCell align="center">{grandTotalDays.BPAConsulting}</TableCell>
                            <TableCell align="center">{grandTotalDays.travel}</TableCell>
                            <TableCell align="center">{grandTotalDays.totalHrs}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <TableContainer>
                <Table className='subtable'>
                    <TableHead>
                        <TableRow >
                            <StyledHeadCell >Task</StyledHeadCell>
                            <StyledHeadCell >Include</StyledHeadCell>
                            <StyledHeadCell >Traning Method</StyledHeadCell>
                            <StyledHeadCell>Team</StyledHeadCell>
                            <StyledHeadCell>PM</StyledHeadCell>
                            <StyledHeadCell>TSG</StyledHeadCell>
                            <StyledHeadCell>Data Migration</StyledHeadCell>
                            <StyledHeadCell>Accounts Training</StyledHeadCell>
                            <StyledHeadCell>Accounts Consulting</StyledHeadCell>
                            <StyledHeadCell>BPA Training</StyledHeadCell>
                            <StyledHeadCell>BPA Consulting</StyledHeadCell>
                            <StyledHeadCell>Travel</StyledHeadCell>
                            <StyledHeadCell>Total Hrs</StyledHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        <GreyTableRow >
                            <TableCell><b>Data Migration Options </b></TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                        </GreyTableRow>
                        <TableRow >
                            <TableCell component="th" scope="row">
                                {dataMigrationRow.task}
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 60, p: 0 }}>
                                    <Select sx={{ py: 0, width: '75px' }}
                                        name="dataMigrationRow"
                                        value={dataMigrationRow.include}
                                        onChange={handleIncludeSelect}
                                        disabled={clientProfile.objective !== 'New Business' || viewMode}
                                        autoWidth={false}
                                    >
                                        <MenuItem value="No">No</MenuItem>
                                        <MenuItem value="Yes">Yes</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">{dataMigrationRow.traningMethod}</TableCell>
                            <TableCell align="center">{dataMigrationRow.team}</TableCell>
                            <TableCell align="center">{dataMigrationRow.PM}</TableCell>
                            <TableCell align="center">{dataMigrationRow.TSG}</TableCell>
                            <TableCell align="center">{dataMigrationRow.dataMigration}</TableCell>
                            <TableCell align="center">{dataMigrationRow.accountsTraining}</TableCell>
                            <TableCell align="center">{dataMigrationRow.accountsConsulting}</TableCell>
                            <TableCell align="center">{dataMigrationRow.BPATraining}</TableCell>
                            <TableCell align="center">{dataMigrationRow.BPAConsulting}</TableCell>
                            <TableCell align="center">{dataMigrationRow.travel}</TableCell>
                            <TableCell align="center">{dataMigrationRow.totalHrs}</TableCell>
                        </TableRow>

                        <GreyTableRow >
                            <TableCell><b>Account Options </b></TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                        </GreyTableRow>
                        <TableRow >
                            <TableCell component="th" scope="row">
                                {selfCustody.task}
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 60, p: 0 }}>
                                    <Select sx={{ py: 0, width: '75px' }}
                                        name="selfCustody"
                                        value={selfCustody.include}
                                        onChange={handleIncludeSelect}
                                        disabled={viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value="No">No</MenuItem>
                                        <MenuItem value="Yes">Yes</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="selfCustody"
                                        value={selfCustody.traningMethod}
                                        onChange={handleTraningMethodSelect}
                                        disabled={selfCustody.include !== 'Yes' || viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Online Learning">Online learning</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite learning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">{selfCustody.team}</TableCell>
                            <TableCell align="center">{selfCustody.PM}</TableCell>
                            <TableCell align="center">{selfCustody.TSG}</TableCell>
                            <TableCell align="center">{selfCustody.dataMigration}</TableCell>
                            <TableCell align="center">{selfCustody.accountsTraining}</TableCell>
                            <TableCell align="center">{selfCustody.accountsConsulting}</TableCell>
                            <TableCell align="center">{selfCustody.BPATraining}</TableCell>
                            <TableCell align="center">{selfCustody.BPAConsulting}</TableCell>
                            <TableCell align="center">{selfCustody.travel}</TableCell>
                            <TableCell align="center">{selfCustody.totalHrs}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {multyPartyBilling.task}
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 60, p: 0 }}>
                                    <Select sx={{ py: 0, width: '75px' }}
                                        name="multyPartyBilling"
                                        value={multyPartyBilling.include}
                                        onChange={handleIncludeSelect}
                                        disabled={viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value="No">No</MenuItem>
                                        <MenuItem value="Yes">Yes</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="multyPartyBilling"
                                        value={multyPartyBilling.traningMethod}
                                        onChange={handleTraningMethodSelect}
                                        disabled={multyPartyBilling.include !== 'Yes' || viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Online Learning">Online learning</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite learning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">{multyPartyBilling.team}</TableCell>
                            <TableCell align="center">{multyPartyBilling.PM}</TableCell>
                            <TableCell align="center">{multyPartyBilling.TSG}</TableCell>
                            <TableCell align="center">{multyPartyBilling.dataMigration}</TableCell>
                            <TableCell align="center">{multyPartyBilling.accountsTraining}</TableCell>
                            <TableCell align="center">{multyPartyBilling.accountsConsulting}</TableCell>
                            <TableCell align="center">{multyPartyBilling.BPATraining}</TableCell>
                            <TableCell align="center">{multyPartyBilling.BPAConsulting}</TableCell>
                            <TableCell align="center">{multyPartyBilling.travel}</TableCell>
                            <TableCell align="center">{multyPartyBilling.totalHrs}</TableCell>
                        </TableRow>


                        <GreyTableRow >
                            <TableCell><b>Report Writing </b></TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                        </GreyTableRow>
                        <TableRow >
                            <TableCell component="th" scope="row">
                                {reportWriting.task}
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 60, p: 0 }}>
                                    <Select sx={{ py: 0, width: '75px' }}
                                        name="reportWriting"
                                        value={reportWriting.include}
                                        onChange={handleIncludeSelect}
                                        disabled={viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value="No">No</MenuItem>
                                        <MenuItem value="Yes">Yes</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="reportWriting"
                                        value={reportWriting.traningMethod}
                                        onChange={handleTraningMethodSelect}
                                        disabled={reportWriting.include !== 'Yes' || viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite learning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">{reportWriting.team}</TableCell>
                            <TableCell align="center">{reportWriting.PM}</TableCell>
                            <TableCell align="center">{reportWriting.TSG}</TableCell>
                            <TableCell align="center">{reportWriting.dataMigration}</TableCell>
                            <TableCell align="center">{reportWriting.accountsTraining}</TableCell>
                            <TableCell align="center">{reportWriting.accountsConsulting}</TableCell>
                            <TableCell align="center">{reportWriting.BPATraining}</TableCell>
                            <TableCell align="center">{reportWriting.BPAConsulting}</TableCell>
                            <TableCell align="center">{reportWriting.travel}</TableCell>
                            <TableCell align="center">{reportWriting.totalHrs}</TableCell>
                        </TableRow>


                        <GreyTableRow >
                            <TableCell><b>BPA Options </b></TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                        </GreyTableRow>
                        <TableRow >
                            <TableCell component="th" scope="row">
                                {dataformsMax.task}
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 60, p: 0 }}>
                                    <Select sx={{ py: 0, width: '75px' }}
                                        name="dataformsMax"
                                        value={dataformsMax.include}
                                        onChange={handleIncludeSelect}
                                        disabled={viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value="No">No</MenuItem>
                                        <MenuItem value="Yes">Yes</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="dataformsMax"
                                        value={dataformsMax.traningMethod}
                                        onChange={handleTraningMethodSelect}
                                        disabled={dataformsMax.include !== 'Yes' || viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite learning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">{dataformsMax.team}</TableCell>
                            <TableCell align="center">{dataformsMax.PM}</TableCell>
                            <TableCell align="center">{dataformsMax.TSG}</TableCell>
                            <TableCell align="center">{dataformsMax.dataMigration}</TableCell>
                            <TableCell align="center">{dataformsMax.accountsTraining}</TableCell>
                            <TableCell align="center">{dataformsMax.accountsConsulting}</TableCell>
                            <TableCell align="center">{dataformsMax.BPATraining}</TableCell>
                            <TableCell align="center">{dataformsMax.BPAConsulting}</TableCell>
                            <TableCell align="center">{dataformsMax.travel}</TableCell>
                            <TableCell align="center">{dataformsMax.totalHrs}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {scripting.task}
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 60, p: 0 }}>
                                    <Select sx={{ py: 0, width: '75px' }}
                                        name="scripting"
                                        value={scripting.include}
                                        onChange={handleIncludeSelect}
                                        disabled={viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value="No">No</MenuItem>
                                        <MenuItem value="Yes">Yes</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="scripting"
                                        value={scripting.traningMethod}
                                        onChange={handleTraningMethodSelect}
                                        disabled={scripting.include !== 'Yes' || viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite learning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">{scripting.team}</TableCell>
                            <TableCell align="center">{scripting.PM}</TableCell>
                            <TableCell align="center">{scripting.TSG}</TableCell>
                            <TableCell align="center">{scripting.dataMigration}</TableCell>
                            <TableCell align="center">{scripting.accountsTraining}</TableCell>
                            <TableCell align="center">{scripting.accountsConsulting}</TableCell>
                            <TableCell align="center">{scripting.BPATraining}</TableCell>
                            <TableCell align="center">{scripting.BPAConsulting}</TableCell>
                            <TableCell align="center">{scripting.travel}</TableCell>
                            <TableCell align="center">{scripting.totalHrs}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {workflow.task}
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 60, p: 0 }}>
                                    <Select sx={{ py: 0, width: '75px' }}
                                        name="workflow"
                                        value={workflow.include}
                                        onChange={handleIncludeSelect}
                                        disabled={viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value="No">No</MenuItem>
                                        <MenuItem value="Yes">Yes</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="workflow"
                                        value={workflow.traningMethod}
                                        onChange={handleTraningMethodSelect}
                                        disabled={workflow.include !== 'Yes' || viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite learning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">{workflow.team}</TableCell>
                            <TableCell align="center">{workflow.PM}</TableCell>
                            <TableCell align="center">{workflow.TSG}</TableCell>
                            <TableCell align="center">{workflow.dataMigration}</TableCell>
                            <TableCell align="center">{workflow.accountsTraining}</TableCell>
                            <TableCell align="center">{workflow.accountsConsulting}</TableCell>
                            <TableCell align="center">{workflow.BPATraining}</TableCell>
                            <TableCell align="center">{workflow.BPAConsulting}</TableCell>
                            <TableCell align="center">{workflow.travel}</TableCell>
                            <TableCell align="center">{workflow.totalHrs}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {BPAEndUser.task}
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 60, p: 0 }}>
                                    <Select sx={{ py: 0, width: '75px' }}
                                        name="BPAEndUser"
                                        value={BPAEndUser.include}
                                        onChange={handleIncludeSelect}
                                        disabled={viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value="No">No</MenuItem>
                                        <MenuItem value="Yes">Yes</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="BPAEndUser"
                                        value={BPAEndUser.traningMethod}
                                        onChange={handleTraningMethodSelect}
                                        disabled={BPAEndUser.include !== 'Yes' || viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Online Learning">Online learning</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite learning</MenuItem>
                                        <MenuItem value="Train the Trainer">Train the Trainer</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">{BPAEndUser.team}</TableCell>
                            <TableCell align="center">{BPAEndUser.PM}</TableCell>
                            <TableCell align="center">{BPAEndUser.TSG}</TableCell>
                            <TableCell align="center">{BPAEndUser.dataMigration}</TableCell>
                            <TableCell align="center">{BPAEndUser.accountsTraining}</TableCell>
                            <TableCell align="center">{BPAEndUser.accountsConsulting}</TableCell>
                            <TableCell align="center">{BPAEndUser.BPATraining}</TableCell>
                            <TableCell align="center">{BPAEndUser.BPAConsulting}</TableCell>
                            <TableCell align="center">{BPAEndUser.travel}</TableCell>
                            <TableCell align="center">{BPAEndUser.totalHrs}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {BPAEssentials.task}
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 60, p: 0 }}>
                                    <Select sx={{ py: 0, width: '75px' }}
                                        name="BPAEssentials"
                                        value={BPAEssentials.include}
                                        onChange={handleIncludeSelect}
                                        disabled={viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value="No">No</MenuItem>
                                        <MenuItem value="Yes">Yes</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="BPAEssentials"
                                        value={BPAEssentials.traningMethod}
                                        onChange={handleTraningMethodSelect}
                                        disabled={BPAEssentials.include !== 'Yes' || viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Online Learning">Online learning</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite learning</MenuItem>
                                        <MenuItem value="Train the Trainer">Train the Trainer</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">{BPAEssentials.team}</TableCell>
                            <TableCell align="center">{BPAEssentials.PM}</TableCell>
                            <TableCell align="center">{BPAEssentials.TSG}</TableCell>
                            <TableCell align="center">{BPAEssentials.dataMigration}</TableCell>
                            <TableCell align="center">{BPAEssentials.accountsTraining}</TableCell>
                            <TableCell align="center">{BPAEssentials.accountsConsulting}</TableCell>
                            <TableCell align="center">{BPAEssentials.BPATraining}</TableCell>
                            <TableCell align="center">{BPAEssentials.BPAConsulting}</TableCell>
                            <TableCell align="center">{BPAEssentials.travel}</TableCell>
                            <TableCell align="center">{BPAEssentials.totalHrs}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {dataformsPhoneBook.task}
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 60, p: 0 }}>
                                    <Select sx={{ py: 0, width: '75px' }}
                                        name="dataformsPhoneBook"
                                        value={dataformsPhoneBook.include}
                                        onChange={handleIncludeSelect}
                                        disabled={viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value="No">No</MenuItem>
                                        <MenuItem value="Yes">Yes</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="dataformsPhoneBook"
                                        value={dataformsPhoneBook.traningMethod}
                                        onChange={handleTraningMethodSelect}
                                        disabled={dataformsPhoneBook.include !== 'Yes' || viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite learning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">{dataformsPhoneBook.team}</TableCell>
                            <TableCell align="center">{dataformsPhoneBook.PM}</TableCell>
                            <TableCell align="center">{dataformsPhoneBook.TSG}</TableCell>
                            <TableCell align="center">{dataformsPhoneBook.dataMigration}</TableCell>
                            <TableCell align="center">{dataformsPhoneBook.accountsTraining}</TableCell>
                            <TableCell align="center">{dataformsPhoneBook.accountsConsulting}</TableCell>
                            <TableCell align="center">{dataformsPhoneBook.BPATraining}</TableCell>
                            <TableCell align="center">{dataformsPhoneBook.BPAConsulting}</TableCell>
                            <TableCell align="center">{dataformsPhoneBook.travel}</TableCell>
                            <TableCell align="center">{dataformsPhoneBook.totalHrs}</TableCell>
                        </TableRow>



                        <GreyTableRow >
                            <TableCell><b>BPA Consulting </b></TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                        </GreyTableRow>
                        <TableRow >
                            <TableCell component="th" scope="row">
                                {addPrecedent.task}
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 60, p: 0 }}>
                                    <Select sx={{ py: 0, width: '75px' }}
                                        name="addPrecedent"
                                        value={addPrecedent.include}
                                        onChange={handleIncludeSelect}
                                        disabled={viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value="No">No</MenuItem>
                                        <MenuItem value="Yes">Yes</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="addPrecedent"
                                        value={addPrecedent.traningMethod}
                                        onChange={handleTraningMethodSelect}
                                        disabled={addPrecedent.include !== 'Yes' || viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite learning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">{addPrecedent.team}</TableCell>
                            <TableCell align="center">{addPrecedent.PM}</TableCell>
                            <TableCell align="center">{addPrecedent.TSG}</TableCell>
                            <TableCell align="center">{addPrecedent.dataMigration}</TableCell>
                            <TableCell align="center">{addPrecedent.accountsTraining}</TableCell>
                            <TableCell align="center">{addPrecedent.accountsConsulting}</TableCell>
                            <TableCell align="center">{addPrecedent.BPATraining}</TableCell>
                            <TableCell align="center">
                                <FormControl variant="outlined">
                                    <OutlinedInput
                                        inputProps={{ style: { textAlign: 'center' }, maxLength: 3 }}
                                        sx={{ height: '25px', width: '8ch' }}
                                        value={addPrecedent.BPAConsulting}
                                        onChange={handelPercedentBPAConsulting}
                                        disabled={viewMode}
                                    />
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">{addPrecedent.travel}</TableCell>
                            <TableCell align="center">{addPrecedent.totalHrs}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {BPAGoLive.task}
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 60, p: 0 }}>
                                    <Select sx={{ py: 0, width: '75px' }}
                                        name="BPAGoLive"
                                        value={BPAGoLive.include}
                                        onChange={handleIncludeSelect}
                                        disabled={viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value="No">No</MenuItem>
                                        <MenuItem value="Yes">Yes</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="BPAGoLive"
                                        value={BPAGoLive.traningMethod}
                                        onChange={handleTraningMethodSelect}
                                        disabled={BPAGoLive.include !== 'Yes' || viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite learning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">{BPAGoLive.team}</TableCell>
                            <TableCell align="center">{BPAGoLive.PM}</TableCell>
                            <TableCell align="center">{BPAGoLive.TSG}</TableCell>
                            <TableCell align="center">{BPAGoLive.dataMigration}</TableCell>
                            <TableCell align="center">{BPAGoLive.accountsTraining}</TableCell>
                            <TableCell align="center">{BPAGoLive.accountsConsulting}</TableCell>
                            <TableCell align="center">{BPAGoLive.BPATraining}</TableCell>
                            <TableCell align="center">{BPAGoLive.BPAConsulting}</TableCell>
                            <TableCell align="center">{BPAGoLive.travel}</TableCell>
                            <TableCell align="center">{BPAGoLive.totalHrs}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {exchangeIntegration.task}
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 60, p: 0 }}>
                                    <Select sx={{ py: 0, width: '75px' }}
                                        name="exchangeIntegration"
                                        value={exchangeIntegration.include}
                                        onChange={handleIncludeSelect}
                                        disabled={viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value="No">No</MenuItem>
                                        <MenuItem value="Yes">Yes</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="exchangeIntegration"
                                        value={exchangeIntegration.traningMethod}
                                        onChange={handleTraningMethodSelect}
                                        disabled={exchangeIntegration.include !== 'Yes' || viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite learning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">{exchangeIntegration.team}</TableCell>
                            <TableCell align="center">{exchangeIntegration.PM}</TableCell>
                            <TableCell align="center">{exchangeIntegration.TSG}</TableCell>
                            <TableCell align="center">{exchangeIntegration.dataMigration}</TableCell>
                            <TableCell align="center">{exchangeIntegration.accountsTraining}</TableCell>
                            <TableCell align="center">{exchangeIntegration.accountsConsulting}</TableCell>
                            <TableCell align="center">{exchangeIntegration.BPATraining}</TableCell>
                            <TableCell align="center">{exchangeIntegration.BPAConsulting}</TableCell>
                            <TableCell align="center">{exchangeIntegration.travel}</TableCell>
                            <TableCell align="center">{exchangeIntegration.totalHrs}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {softdocsIntegration.task}
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 60, p: 0 }}>
                                    <Select sx={{ py: 0, width: '75px' }}
                                        name="softdocsIntegration"
                                        value={softdocsIntegration.include}
                                        onChange={handleIncludeSelect}
                                        disabled={viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value="No">No</MenuItem>
                                        <MenuItem value="Yes">Yes</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="softdocsIntegration"
                                        value={softdocsIntegration.traningMethod}
                                        onChange={handleTraningMethodSelect}
                                        disabled={softdocsIntegration.include !== 'Yes' || viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite learning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">{softdocsIntegration.team}</TableCell>
                            <TableCell align="center">{softdocsIntegration.PM}</TableCell>
                            <TableCell align="center">{softdocsIntegration.TSG}</TableCell>
                            <TableCell align="center">{softdocsIntegration.dataMigration}</TableCell>
                            <TableCell align="center">{softdocsIntegration.accountsTraining}</TableCell>
                            <TableCell align="center">{softdocsIntegration.accountsConsulting}</TableCell>
                            <TableCell align="center">{softdocsIntegration.BPATraining}</TableCell>
                            <TableCell align="center">{softdocsIntegration.BPAConsulting}</TableCell>
                            <TableCell align="center">{softdocsIntegration.travel}</TableCell>
                            <TableCell align="center">{softdocsIntegration.totalHrs}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {clientPortal.task}
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 60, p: 0 }}>
                                    <Select sx={{ py: 0, width: '75px' }}
                                        name="clientPortal"
                                        value={clientPortal.include}
                                        onChange={handleIncludeSelect}
                                        disabled={viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value="No">No</MenuItem>
                                        <MenuItem value="Yes">Yes</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="clientPortal"
                                        value={clientPortal.traningMethod}
                                        onChange={handleTraningMethodSelect}
                                        disabled={clientPortal.include !== 'Yes' || viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite learning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">{clientPortal.team}</TableCell>
                            <TableCell align="center">{clientPortal.PM}</TableCell>
                            <TableCell align="center">{clientPortal.TSG}</TableCell>
                            <TableCell align="center">{clientPortal.dataMigration}</TableCell>
                            <TableCell align="center">{clientPortal.accountsTraining}</TableCell>
                            <TableCell align="center">{clientPortal.accountsConsulting}</TableCell>
                            <TableCell align="center">{clientPortal.BPATraining}</TableCell>
                            <TableCell align="center">{clientPortal.BPAConsulting}</TableCell>
                            <TableCell align="center">{clientPortal.travel}</TableCell>
                            <TableCell align="center">{clientPortal.totalHrs}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {worksiteIntegration.task}
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 60, p: 0 }}>
                                    <Select sx={{ py: 0, width: '75px' }}
                                        name="worksiteIntegration"
                                        value={worksiteIntegration.include}
                                        onChange={handleIncludeSelect}
                                        disabled={viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value="No">No</MenuItem>
                                        <MenuItem value="Yes">Yes</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="worksiteIntegration"
                                        value={worksiteIntegration.traningMethod}
                                        onChange={handleTraningMethodSelect}
                                        disabled={worksiteIntegration.include !== 'Yes' || viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">{worksiteIntegration.team}</TableCell>
                            <TableCell align="center">{worksiteIntegration.PM}</TableCell>
                            <TableCell align="center">{worksiteIntegration.TSG}</TableCell>
                            <TableCell align="center">{worksiteIntegration.dataMigration}</TableCell>
                            <TableCell align="center">{worksiteIntegration.accountsTraining}</TableCell>
                            <TableCell align="center">{worksiteIntegration.accountsConsulting}</TableCell>
                            <TableCell align="center">{worksiteIntegration.BPATraining}</TableCell>
                            <TableCell align="center">{worksiteIntegration.BPAConsulting}</TableCell>
                            <TableCell align="center">{worksiteIntegration.travel}</TableCell>
                            <TableCell align="center">{worksiteIntegration.totalHrs}</TableCell>
                        </TableRow>


                        <GreyTableRow >
                            <TableCell><b>Affinity Mobile </b></TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                        </GreyTableRow>
                        <TableRow >
                            <TableCell component="th" scope="row">
                                {affinityMobile.task}
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 60, p: 0 }}>
                                    <Select sx={{ py: 0, width: '75px' }}
                                        name="affinityMobile"
                                        value={affinityMobile.include}
                                        onChange={handleIncludeSelect}
                                        disabled={viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value="No">No</MenuItem>
                                        <MenuItem value="Yes">Yes</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="affinityMobile"
                                        value={affinityMobile.traningMethod}
                                        onChange={handleTraningMethodSelect}
                                        disabled={affinityMobile.include !== 'Yes' || viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">{affinityMobile.team}</TableCell>
                            <TableCell align="center">{affinityMobile.PM}</TableCell>
                            <TableCell align="center">{affinityMobile.TSG}</TableCell>
                            <TableCell align="center">{affinityMobile.dataMigration}</TableCell>
                            <TableCell align="center">{affinityMobile.accountsTraining}</TableCell>
                            <TableCell align="center">{affinityMobile.accountsConsulting}</TableCell>
                            <TableCell align="center">{affinityMobile.BPATraining}</TableCell>
                            <TableCell align="center">{affinityMobile.BPAConsulting}</TableCell>
                            <TableCell align="center">{affinityMobile.travel}</TableCell>
                            <TableCell align="center">{affinityMobile.totalHrs}</TableCell>
                        </TableRow>

                        <GreyTableRow >
                            <TableCell><b>Empower </b></TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                        </GreyTableRow>
                        <TableRow >
                            <TableCell component="th" scope="row">
                                {empower.task}
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 60, p: 0 }}>
                                    <Select sx={{ py: 0, width: '75px' }}
                                        name="empower"
                                        value={empower.include}
                                        onChange={handleIncludeSelect}
                                        disabled={clientProfile.country !== 'Australia' || viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value="No">No</MenuItem>
                                        <MenuItem value="Yes">Yes</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="empower"
                                        value={empower.traningMethod}
                                        onChange={handleTraningMethodSelect}
                                        disabled={empower.include !== 'Yes' || viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite learning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">{empower.team}</TableCell>
                            <TableCell align="center">{empower.PM}</TableCell>
                            <TableCell align="center">{empower.TSG}</TableCell>
                            <TableCell align="center">{empower.dataMigration}</TableCell>
                            <TableCell align="center">{empower.accountsTraining}</TableCell>
                            <TableCell align="center">{empower.accountsConsulting}</TableCell>
                            <TableCell align="center">{empower.BPATraining}</TableCell>
                            <TableCell align="center">{empower.BPAConsulting}</TableCell>
                            <TableCell align="center">{empower.travel}</TableCell>
                            <TableCell align="center">{empower.totalHrs}</TableCell>
                        </TableRow>



                        <GreyTableRow >
                            <TableCell><b>Settlement Adjuster </b></TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                        </GreyTableRow>
                        <TableRow >
                            <TableCell component="th" scope="row">
                                {settlementAdjuster.task}
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 60, p: 0 }}>
                                    <Select sx={{ py: 0, width: '75px' }}
                                        name="settlementAdjuster"
                                        value={settlementAdjuster.include}
                                        onChange={handleIncludeSelect}
                                        disabled={viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value="No">No</MenuItem>
                                        <MenuItem value="Yes">Yes</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="settlementAdjuster"
                                        value={settlementAdjuster.traningMethod}
                                        onChange={handleTraningMethodSelect}
                                        disabled={settlementAdjuster.include !== 'Yes' || viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                        <MenuItem value="Onsite Learning">Onsite learning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">{settlementAdjuster.team}</TableCell>
                            <TableCell align="center">{settlementAdjuster.PM}</TableCell>
                            <TableCell align="center">{settlementAdjuster.TSG}</TableCell>
                            <TableCell align="center">{settlementAdjuster.dataMigration}</TableCell>
                            <TableCell align="center">{settlementAdjuster.accountsTraining}</TableCell>
                            <TableCell align="center">{settlementAdjuster.accountsConsulting}</TableCell>
                            <TableCell align="center">{settlementAdjuster.BPATraining}</TableCell>
                            <TableCell align="center">{settlementAdjuster.BPAConsulting}</TableCell>
                            <TableCell align="center">{settlementAdjuster.travel}</TableCell>
                            <TableCell align="center">{settlementAdjuster.totalHrs}</TableCell>
                        </TableRow>

                        <GreyTableRow >
                            <TableCell><b>Miscellaneous</b></TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                        </GreyTableRow>
                        <TableRow >
                            <TableCell component="th" scope="row">
                                {thirdPartyIT.task}
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 60, p: 0 }}>
                                    <Select sx={{ py: 0, width: '75px' }}
                                        name="thirdPartyIT"
                                        value={thirdPartyIT.include}
                                        onChange={handleIncludeSelect}
                                        disabled={viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value="No">No</MenuItem>
                                        <MenuItem value="Yes">Yes</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">
                                <FormControl sx={{ minWidth: 120, p: 0 }}>
                                    <Select sx={{ py: 0, width: '140px' }}
                                        name="thirdPartyIT"
                                        value={thirdPartyIT.traningMethod}
                                        onChange={handleTraningMethodSelect}
                                        disabled={thirdPartyIT.include !== 'Yes' || viewMode}
                                        displayEmpty
                                        autoWidth={false}
                                    >
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value="Remote Traning">Remote Traning</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">{thirdPartyIT.team}</TableCell>
                            <TableCell align="center">{thirdPartyIT.PM}</TableCell>
                            <TableCell align="center">{thirdPartyIT.TSG}</TableCell>
                            <TableCell align="center">{thirdPartyIT.dataMigration}</TableCell>
                            <TableCell align="center">{thirdPartyIT.accountsTraining}</TableCell>
                            <TableCell align="center">{thirdPartyIT.accountsConsulting}</TableCell>
                            <TableCell align="center">{thirdPartyIT.BPATraining}</TableCell>
                            <TableCell align="center">{thirdPartyIT.BPAConsulting}</TableCell>
                            <TableCell align="center">{thirdPartyIT.travel}</TableCell>
                            <TableCell align="center">{thirdPartyIT.totalHrs}</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ marginTop: 20, marginLeft: 10 }}>
                <Button onClick={() => setImplementationTabValue(3)}
                    variant="contained" color="primary">Next</Button>
            </Box>
        </Box>
    );
}