import React from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button, Box } from '@material-ui/core';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { tableCellClasses } from '@mui/material/TableCell';
import ScopingStudyPopup from '../../../PopUps/ScopingStudyPopup';
import AffinityServerCpuPopup from '../../../PopUps/AffinityServerCpuPopup';
import PracticeAreaKitPopup from '../../../PopUps/PracticeAreaKitPopup';
import LnSearchPopup from '../../../PopUps/LnSearchPopup';
import { styled } from '@mui/material/styles';

export default function Miscellaneous(props) {

    const { clientProfile, miscellaneous, setMiscellaneous,
        miscellaneousPopupsState, setMiscellenousPopupsState,
        setScopingStudyPopUpValue, setValue, viewMode,
        setAffinityServerPopupValues, setpracticeAreaKitPopupValues, setlnSearchPopUpValue } = props;

    const { affinityServer, lexisResearch, scopingStudy,
        additionalReturn, propertyPresidency, practiceAreaKit, lnSearch, macrequineBank, pexaIntegration, feeSynergy, fileman } = miscellaneous;

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

    const handelIncludedSelect = (e) => {
        setMiscellaneous((prevValue) => ({
            ...prevValue,
            [e.target.name]: {
                ...prevValue[e.target.name],
                included: e.target.value,
            }
        }))
    }


    const handelScopingStudyIncluded = (e) => {
        setMiscellaneous((prevValue) => ({
            ...prevValue,
            scopingStudy: {
                ...prevValue.scopingStudy,
                included: e.target.value,
            }
        }))

        if (e.target.value === 'Yes') {
            setMiscellenousPopupsState((prevValue) => ({
                ...prevValue,
                scopingStudy: true
            }));
        }
    }

    const handelPracticeAreaKitIncluded = (e) => {
        setMiscellaneous((prevValue) => ({
            ...prevValue,
            practiceAreaKit: {
                ...prevValue.practiceAreaKit,
                included: e.target.value,
            }
        }))

        if (e.target.value === 'Yes') {
            setMiscellenousPopupsState((prevValue) => ({
                ...prevValue,
                practiceAreaKit: true
            }));
        }
    }

    const handelLnSearchIncluded = (e) => {
        setMiscellaneous((prevValue) => ({
            ...prevValue,
            lnSearch: {
                ...prevValue.lnSearch,
                included: e.target.value,
            }
        }))

        if (e.target.value === 'Yes') {
            setMiscellenousPopupsState((prevValue) => ({
                ...prevValue,
                lnSearch: true
            }));
        }
    }

    const handelMacrequineBankIncluded = (e) => {
        setMiscellaneous((prevValue) => ({
            ...prevValue,
            macrequineBank: {
                ...prevValue.macrequineBank,
                macrequineBank: e.target.value,
            }
        }))

        if (e.target.value === 'Yes') {
            setMiscellenousPopupsState((prevValue) => ({
                ...prevValue,
                macrequineBank: true
            }));
        }
    }

    const handelAffinityServerIncluded = (e) => {
        setMiscellaneous((prevValue) => ({
            ...prevValue,
            affinityServer: {
                ...prevValue.affinityServer,
                included: e.target.value,
            }
        }))

        if (e.target.value !== '') {
            setMiscellenousPopupsState((prevValue) => ({
                ...prevValue,
                affinityServer: true
            }));
        }
    }

    const handelAddReturnIncluded = (e) => {
        if (isStringInteger(e.target.value)) {
            setMiscellaneous((prevValue) => ({
                ...prevValue,
                additionalReturn: {
                    ...prevValue.additionalReturn,
                    included: e.target.value
                }
            }))
        }
    }

    const handelPropPresPrice = (e) => {
        if (isStringInteger(e.target.value)) {
            setMiscellaneous((prevValue) => ({
                ...prevValue,
                propertyPresidency: {
                    ...prevValue.propertyPresidency,
                    price: e.target.value
                }
            }))
        }
    }


    const handelCloseScopingPopup = (value) => {
        setMiscellenousPopupsState((prevValue) => ({
            ...prevValue,
            scopingStudy: false
        }));

        if (value !== false) {
            setMiscellaneous((prevValue) => ({
                ...prevValue,
                scopingStudy: {
                    ...prevValue.scopingStudy,
                    hours: value,
                }
            }))

            setScopingStudyPopUpValue(value);
        }
        else {
            setMiscellaneous((prevValue) => ({
                ...prevValue,
                scopingStudy: {
                    ...prevValue.scopingStudy,
                    included: 'No'
                }
            }))

            setScopingStudyPopUpValue('');
        }
    }

    const handelCloseLnSearchPopup = (value) => {
        setMiscellenousPopupsState((prevValue) => ({
            ...prevValue,
            lnSearch: false
        }));

        if (value !== false) {
            setMiscellaneous((prevValue) => ({
                ...prevValue,
                lnSearch: {
                    ...prevValue.lnSearch,
                    // hours: value,
                }
            }))

            setlnSearchPopUpValue(value);
            // console.log(prevValue.lnSearch);
        }
        else {
            setMiscellaneous((prevValue) => ({
                ...prevValue,
                lnSearch: {
                    ...prevValue.lnSearch,
                    included: 'No'
                }
            }))

            setlnSearchPopUpValue({
                lnSearchPopUpValue: [],
                modulesSelected: 0,
            });
        }
    }

    const handleClosePracticeAreaKitPopup = (value) => {
        setMiscellenousPopupsState((prevValue) => ({
            ...prevValue,
            practiceAreaKit: false
        }));

        if (value !== false) {
            setMiscellaneous((prevValue) => ({
                ...prevValue,
                practiceAreaKit: {
                    ...prevValue.practiceAreaKit,
                    price: value,
                }
            }))

            setpracticeAreaKitPopupValues(value);
        }
        else {
            setMiscellaneous((prevValue) => ({
                ...prevValue,
                practiceAreaKit: {
                    ...prevValue.practiceAreaKit,
                    included: 'No'
                }
            }))

            setpracticeAreaKitPopupValues({
                practiceAreaKitModules: [],
                numOfUsers: '',
                modulesSelected: 0,
            });
        }
    }

    const handelCloseAffinityPopup = (value) => {
        setMiscellenousPopupsState((prevValue) => ({
            ...prevValue,
            affinityServer: false
        }));

        if (value !== false) {
            setAffinityServerPopupValues(value);
        }
        else {
            setMiscellaneous((prevValue) => ({
                ...prevValue,
                affinityServer: {
                    ...prevValue.affinityServer,
                    included: ''
                }
            }))

            setAffinityServerPopupValues({
                typeOfLicense: '',
                numOfUsers: '',
                edition: '',
                serverLicense: '',
                oracleLicense: '',
                maintenance: '',
                total: ''
            })
        }
    }


    return (
        <>
            <AffinityServerCpuPopup
                open={miscellaneousPopupsState.affinityServer}
                onClose={handelCloseAffinityPopup}
                numOfUsers={clientProfile.numOfUsers}
                country={clientProfile.country}
                selectedValue={affinityServer.included}
            />

            <ScopingStudyPopup
                open={miscellaneousPopupsState.scopingStudy}
                onClose={handelCloseScopingPopup}
            />

            <PracticeAreaKitPopup
                open={miscellaneousPopupsState.practiceAreaKit}
                onClose={handleClosePracticeAreaKitPopup}
            />

            <LnSearchPopup
                open={miscellaneousPopupsState.lnSearch}
                onClose={handelCloseLnSearchPopup}
            />


            <Box sx={{ maxWidth: '850px' }}>
                <TableContainer>
                    <Table className='subtable'>
                        <TableHead>
                            <TableRow >
                                <StyledHeadCell style={{ textAlign: 'left' }}>Miscellaneous</StyledHeadCell>
                                <StyledHeadCell >Include</StyledHeadCell>
                                <StyledHeadCell >Hours</StyledHeadCell>
                                <StyledHeadCell >Price</StyledHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {affinityServer.miscellaneous}
                                </TableCell>
                                <TableCell align="center">
                                    <FormControl sx={{ minWidth: 100, p: 0 }}>
                                        <Select sx={{ py: 0 }}
                                            name="affinityServer"
                                            value={affinityServer.included}
                                            onChange={handelAffinityServerIncluded}
                                            disabled={viewMode}
                                            displayEmpty
                                            autoWidth={false}
                                        >
                                            <MenuItem value=''>Select</MenuItem>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">{affinityServer.hours}</TableCell>
                                <TableCell align="center">{affinityServer.price}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {lexisResearch.miscellaneous}
                                </TableCell>
                                <TableCell align="center">
                                    <FormControl sx={{ minWidth: 100, p: 0 }}>
                                        <Select
                                            name="lexisResearch"
                                            value={lexisResearch.included}
                                            onChange={handelIncludedSelect}
                                            disabled={viewMode}
                                            displayEmpty
                                            autoWidth={false}
                                        >
                                            <MenuItem value="Yes">Yes</MenuItem>
                                            <MenuItem value="No">No</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">{lexisResearch.hours}</TableCell>
                                <TableCell align="center">{lexisResearch.price}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {scopingStudy.miscellaneous}
                                </TableCell>
                                <TableCell align="center">
                                    <FormControl sx={{ minWidth: 100, p: 0 }}>
                                        <Select
                                            name="scopingStudy"
                                            value={scopingStudy.included}
                                            onChange={handelScopingStudyIncluded}
                                            disabled={viewMode}
                                            displayEmpty
                                            autoWidth={false}
                                        >
                                            <MenuItem value="Yes">Yes</MenuItem>
                                            <MenuItem value="No">No</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">{scopingStudy.hours}</TableCell>
                                <TableCell align="center">{scopingStudy.price}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {additionalReturn.miscellaneous}
                                </TableCell>
                                <TableCell align="center">
                                    <FormControl variant="outlined">
                                        <OutlinedInput
                                            name="additionalReturn"
                                            inputProps={{ style: { textAlign: 'center' }, maxLength: 2 }}
                                            sx={{ height: '25px', width: '100px' }}
                                            value={additionalReturn.included}
                                            onChange={handelAddReturnIncluded}
                                            disabled={clientProfile.objective === 'Upsell' || viewMode}
                                        />
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">{additionalReturn.hours}</TableCell>
                                <TableCell align="center">{additionalReturn.price}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {propertyPresidency.miscellaneous}
                                </TableCell>
                                <TableCell align="center">
                                    <FormControl sx={{ minWidth: 100, p: 0 }}>
                                        <Select
                                            name="propertyPresidency"
                                            value={propertyPresidency.included}
                                            onChange={handelIncludedSelect}
                                            displayEmpty
                                            autoWidth={false}
                                            disabled={clientProfile.country !== 'New Zealand' || viewMode}
                                        >
                                            <MenuItem value="Yes">Yes</MenuItem>
                                            <MenuItem value="No">No</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">{propertyPresidency.hours}</TableCell>
                                <TableCell align="center">
                                    <FormControl variant="outlined">
                                        <OutlinedInput
                                            name="propertyPresidency"
                                            inputProps={{ style: { textAlign: 'center' }, maxLength: 5 }}
                                            sx={{ height: '25px', width: '100px' }}
                                            value={propertyPresidency.price}
                                            onChange={handelPropPresPrice}
                                            disabled={propertyPresidency.included !== 'Yes' || viewMode}
                                        />
                                    </FormControl>
                                </TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {practiceAreaKit.miscellaneous}
                                </TableCell>
                                <TableCell align="center">
                                    <FormControl sx={{ minWidth: 100, p: 0 }}>
                                        <Select
                                            name="practiceAreaKit"
                                            value={practiceAreaKit.included}
                                            onChange={handelPracticeAreaKitIncluded}
                                            disabled={viewMode}
                                            displayEmpty
                                            autoWidth={false}
                                        >
                                            <MenuItem value="Yes">Yes</MenuItem>
                                            <MenuItem value="No">No</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">{practiceAreaKit.hours}</TableCell>
                                <TableCell align="center">{practiceAreaKit.hours}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {lnSearch.miscellaneous}
                                </TableCell>
                                <TableCell align="center">
                                    <FormControl sx={{ minWidth: 100, p: 0 }}>
                                        <Select
                                            name="lnSearch"
                                            value={lnSearch.included}
                                            onChange={handelLnSearchIncluded}
                                            disabled={viewMode}
                                            displayEmpty
                                            autoWidth={false}
                                        >
                                            <MenuItem value="Yes">Yes</MenuItem>
                                            <MenuItem value="No">No</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">{lnSearch.hours}</TableCell>
                                <TableCell align="center">{lnSearch.price}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {macrequineBank.miscellaneous}
                                </TableCell>
                                <TableCell align="center">
                                    <FormControl sx={{ minWidth: 100, p: 0 }}>
                                        <Select
                                            name="macrequineBank"
                                            value={macrequineBank.included}
                                            onChange={handelIncludedSelect}
                                            disabled={viewMode}
                                            displayEmpty
                                            autoWidth={false}
                                        >
                                            <MenuItem value="Yes">Yes</MenuItem>
                                            <MenuItem value="No">No</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">{macrequineBank.hours}</TableCell>
                                <TableCell align="center">{macrequineBank.price}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {pexaIntegration.miscellaneous}
                                </TableCell>
                                <TableCell align="center">
                                    <FormControl sx={{ minWidth: 100, p: 0 }}>
                                        <Select
                                            name="pexaIntegration"
                                            value={pexaIntegration.included}
                                            onChange={handelIncludedSelect}
                                            disabled={viewMode}
                                            displayEmpty
                                            autoWidth={false}
                                        >
                                            <MenuItem value="Yes">Yes</MenuItem>
                                            <MenuItem value="No">No</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">{pexaIntegration.hours}</TableCell>
                                <TableCell align="center">{pexaIntegration.price}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {feeSynergy.miscellaneous}
                                </TableCell>
                                <TableCell align="center">
                                    <FormControl sx={{ minWidth: 100, p: 0 }}>
                                        <Select
                                            name="feeSynergy"
                                            value={feeSynergy.included}
                                            onChange={handelIncludedSelect}
                                            disabled={viewMode}
                                            displayEmpty
                                            autoWidth={false}
                                        >
                                            <MenuItem value="Yes">Yes</MenuItem>
                                            <MenuItem value="No">No</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">{feeSynergy.hours}</TableCell>
                                <TableCell align="center">{feeSynergy.price}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {fileman.miscellaneous}
                                </TableCell>
                                <TableCell align="center">
                                    <FormControl sx={{ minWidth: 100, p: 0 }}>
                                        <Select
                                            name="fileman"
                                            value={fileman.included}
                                            onChange={handelIncludedSelect}
                                            disabled={viewMode}
                                            displayEmpty
                                            autoWidth={false}
                                        >
                                            <MenuItem value="Yes">Yes</MenuItem>
                                            <MenuItem value="No">No</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">{fileman.hours}</TableCell>
                                <TableCell align="center">{fileman.price}</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ marginTop: 20, marginLeft: 10 }}>
                    <Button onClick={() => setValue(1)}
                        variant="contained" color="primary" >Next</Button>
                </Box>
            </Box>
        </>
    );
}