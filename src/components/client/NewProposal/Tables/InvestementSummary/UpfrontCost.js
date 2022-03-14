import React from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button, Box } from '@material-ui/core';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@material-ui/core/Typography';
import FormControl from '@mui/material/FormControl';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

export default function UpfrontCosts(props) {

    const { upfrontCost, setUpfrontCost, setInvestmentTabValue, viewMode } = props;

    const { softwareDiscount, serviceDiscount, lexisServerLicense, lexisUserLicense,
        oracleLicenses, clientPortal, affinityMobile, lexisSettleAdjuster, twoWayMicrosoft,
        empower, softDocs, ImplementServices, ImplementTraning, postImplementation,
        dataMigration, travelAllowance, scopingStudy, propertyPrecedent,
        subTotal, lessConfidential, totalInvesteExcl, GSTPayable, totalInvestePay,
        totalPerUser, } = upfrontCost;

    const StyledHeadCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#4db6ac',
            color: 'white',
            textAlign: 'center',
            padding: '8px',
        },
    }));

    const GreyTableRow = styled(TableRow)(({ theme }) => ({
        '&': {
            backgroundColor: '#bbb',
        },
    }));

    function isStringInteger(value) {
        return /^[0-9]*$/.test(value);
    }

    const handelSoftwareDiscount = (e) => {
        if (isStringInteger(e.target.value) && Number(e.target.value) <= 100) {
            setUpfrontCost((prevValues) => ({
                ...prevValues,
                softwareDiscount: e.target.value,
                lexisServerLicense: {
                    ...prevValues.lexisServerLicense,
                    percentDiscount: Number(e.target.value),
                },
                lexisUserLicense: {
                    ...prevValues.lexisUserLicense,
                    percentDiscount: Number(e.target.value),
                },
                oracleLicenses: {
                    ...prevValues.oracleLicenses,
                    percentDiscount: Number(e.target.value),
                },
                clientPortal: {
                    ...prevValues.clientPortal,
                    percentDiscount: Number(e.target.value),
                },
                affinityMobile: {
                    ...prevValues.affinityMobile,
                    percentDiscount: Number(e.target.value),
                },
                lexisSettleAdjuster: {
                    ...prevValues.lexisSettleAdjuster,
                    percentDiscount: Number(e.target.value),
                },
                twoWayMicrosoft: {
                    ...prevValues.twoWayMicrosoft,
                    percentDiscount: Number(e.target.value),
                },
                empower: {
                    ...prevValues.empower,
                    percentDiscount: Number(e.target.value),
                },
                softDocs: {
                    ...prevValues.softDocs,
                    percentDiscount: Number(e.target.value),
                },
            }))
        }
    }

    const handelServiceDiscount = (e) => {
        if (isStringInteger(e.target.value) && Number(e.target.value) <= 100) {
            setUpfrontCost((prevValues) => ({
                ...prevValues,
                serviceDiscount: e.target.value,
                ImplementServices: {
                    ...prevValues.ImplementServices,
                    percentDiscount: Number(e.target.value),
                },
                ImplementTraning: {
                    ...prevValues.ImplementTraning,
                    percentDiscount: Number(e.target.value),
                },
                postImplementation: {
                    ...prevValues.postImplementation,
                    percentDiscount: Number(e.target.value),
                },
                dataMigration: {
                    ...prevValues.dataMigration,
                    percentDiscount: Number(e.target.value),
                },
                scopingStudy: {
                    ...prevValues.scopingStudy,
                    percentDiscount: Number(e.target.value),
                },
                propertyPrecedent: {
                    ...prevValues.propertyPrecedent,
                    percentDiscount: Number(e.target.value),
                },
            }))
        }
    }

    const handelPercentDiscount = (e) => {
        if (isStringInteger(e.target.value) && Number(e.target.value) <= 100) {
            setUpfrontCost((prevValues) => ({
                ...prevValues,
                [e.target.name]: {
                    ...prevValues[e.target.name],
                    percentDiscount: e.target.value
                },
            }))
        }
    }


    return (
        <Box sx={{ maxWidth: '1000px' }}>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', marginBottom: '1.3rem' }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Typography variant="subtitle1">Discount for software </Typography>
                    <FormControl variant="outlined">
                        <OutlinedInput
                            inputProps={{ style: { textAlign: 'center', maxLength: 3 } }}
                            sx={{ height: '35px' }}
                            value={softwareDiscount}
                            onChange={handelSoftwareDiscount}
                            disabled={viewMode}
                        />
                    </FormControl>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Typography variant="subtitle1">Discount for services </Typography>
                    <FormControl variant="outlined">
                        <OutlinedInput
                            inputProps={{ style: { textAlign: 'center', maxLength: 3 } }}
                            sx={{ height: '35px' }}
                            value={serviceDiscount}
                            onChange={handelServiceDiscount}
                            disabled={viewMode}
                        />
                    </FormControl>
                </Stack>
            </Stack>

            <Box>
                <TableContainer>
                    <Table className='subtable'>
                        <TableHead>
                            <TableRow >
                                <StyledHeadCell style={{ textAlign: 'left' }}>Initial Investment Costs(Upfront Costs)</StyledHeadCell>
                                <StyledHeadCell> Cost </StyledHeadCell>
                                <StyledHeadCell> Percent Discount </StyledHeadCell>
                                <StyledHeadCell> Discount Item Cost</StyledHeadCell>
                                <StyledHeadCell> Discount Amount </StyledHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >

                            <GreyTableRow>
                                <TableCell><b>Software Licenses</b></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </GreyTableRow>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {lexisServerLicense.label}
                                </TableCell>
                                <TableCell align="center">${Number(lexisServerLicense.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">
                                    <FormControl variant="outlined">
                                        <OutlinedInput
                                            name="lexisServerLicense"
                                            inputProps={{ style: { textAlign: 'center', maxLength: 3 } }}
                                            sx={{ height: '25px', maxWidth: '120px' }}
                                            value={lexisServerLicense.percentDiscount}
                                            onChange={handelPercentDiscount}
                                            disabled={viewMode}
                                        />
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">${Number(lexisServerLicense.discountItemcost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">${Number(lexisServerLicense.discountAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {lexisUserLicense.label}
                                </TableCell>
                                <TableCell align="center">${Number(lexisUserLicense.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">
                                    <FormControl variant="outlined">
                                        <OutlinedInput
                                            name="lexisUserLicense"
                                            inputProps={{ style: { textAlign: 'center', maxLength: 3 } }}
                                            sx={{ height: '25px', maxWidth: '120px' }}
                                            value={lexisUserLicense.percentDiscount}
                                            onChange={handelPercentDiscount}
                                            disabled={viewMode}
                                        />
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">${Number(lexisUserLicense.discountItemcost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">${Number(lexisUserLicense.discountAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {oracleLicenses.label}
                                </TableCell>
                                <TableCell align="center">${Number(oracleLicenses.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">
                                    <FormControl variant="outlined">
                                        <OutlinedInput
                                            name="oracleLicenses"
                                            inputProps={{ style: { textAlign: 'center', maxLength: 3 } }}
                                            sx={{ height: '25px', maxWidth: '120px' }}
                                            value={oracleLicenses.percentDiscount}
                                            onChange={handelPercentDiscount}
                                            disabled={viewMode}
                                        />
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">${Number(oracleLicenses.discountItemcost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">${Number(oracleLicenses.discountAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {clientPortal.label}
                                </TableCell>
                                <TableCell align="center">${Number(clientPortal.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">
                                    <FormControl variant="outlined">
                                        <OutlinedInput
                                            name="clientPortal"
                                            inputProps={{ style: { textAlign: 'center', maxLength: 3 } }}
                                            sx={{ height: '25px', maxWidth: '120px' }}
                                            value={clientPortal.percentDiscount}
                                            onChange={handelPercentDiscount}
                                            disabled={viewMode}
                                        />
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">${Number(clientPortal.discountItemcost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">${Number(clientPortal.discountAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {affinityMobile.label}
                                </TableCell>
                                <TableCell align="center">${Number(affinityMobile.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">
                                    <FormControl variant="outlined">
                                        <OutlinedInput
                                            name="affinityMobile"
                                            inputProps={{ style: { textAlign: 'center', maxLength: 3 } }}
                                            sx={{ height: '25px', maxWidth: '120px' }}
                                            value={affinityMobile.percentDiscount}
                                            onChange={handelPercentDiscount}
                                            disabled={viewMode}
                                        />
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">${Number(affinityMobile.discountItemcost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">${Number(affinityMobile.discountAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {lexisSettleAdjuster.label}
                                </TableCell>
                                <TableCell align="center">${Number(lexisSettleAdjuster.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">
                                    <FormControl variant="outlined">
                                        <OutlinedInput
                                            name="lexisSettleAdjuster"
                                            inputProps={{ style: { textAlign: 'center', maxLength: 3 } }}
                                            sx={{ height: '25px', maxWidth: '120px' }}
                                            value={lexisSettleAdjuster.percentDiscount}
                                            onChange={handelPercentDiscount}
                                            disabled={viewMode}
                                        />
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">${Number(lexisSettleAdjuster.discountItemcost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">${Number(lexisSettleAdjuster.discountAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {twoWayMicrosoft.label}
                                </TableCell>
                                <TableCell align="center">${Number(twoWayMicrosoft.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">
                                    <FormControl variant="outlined">
                                        <OutlinedInput
                                            name="twoWayMicrosoft"
                                            inputProps={{ style: { textAlign: 'center', maxLength: 3 } }}
                                            sx={{ height: '25px', maxWidth: '120px' }}
                                            value={twoWayMicrosoft.percentDiscount}
                                            onChange={handelPercentDiscount}
                                            disabled={viewMode}
                                        />
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">${Number(twoWayMicrosoft.discountItemcost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">${Number(twoWayMicrosoft.discountAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {empower.label}
                                </TableCell>
                                <TableCell align="center">${Number(empower.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">
                                    <FormControl variant="outlined">
                                        <OutlinedInput
                                            name="empower"
                                            inputProps={{ style: { textAlign: 'center', maxLength: 3 } }}
                                            sx={{ height: '25px', maxWidth: '120px' }}
                                            value={empower.percentDiscount}
                                            onChange={handelPercentDiscount}
                                            disabled={viewMode}
                                        />
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">${Number(empower.discountItemcost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">${Number(empower.discountAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {softDocs.label}
                                </TableCell>
                                <TableCell align="center">${Number(softDocs.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">
                                    <FormControl variant="outlined">
                                        <OutlinedInput
                                            name="softDocs"
                                            inputProps={{ style: { textAlign: 'center', maxLength: 3 } }}
                                            sx={{ height: '25px', maxWidth: '120px' }}
                                            value={softDocs.percentDiscount}
                                            onChange={handelPercentDiscount}
                                            disabled={viewMode}
                                        />
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">${Number(softDocs.discountItemcost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">${Number(softDocs.discountAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                            </TableRow>


                            <GreyTableRow>
                                <TableCell><b>Professional Services</b></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </GreyTableRow>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {ImplementServices.label}
                                </TableCell>
                                <TableCell align="center">${Number(ImplementServices.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">
                                    <FormControl variant="outlined">
                                        <OutlinedInput
                                            name="ImplementServices"
                                            inputProps={{ style: { textAlign: 'center', maxLength: 3 } }}
                                            sx={{ height: '25px', maxWidth: '120px' }}
                                            value={ImplementServices.percentDiscount}
                                            onChange={handelPercentDiscount}
                                            disabled={viewMode}
                                        />
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">${Number(ImplementServices.discountItemcost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">${Number(ImplementServices.discountAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {ImplementTraning.label}
                                </TableCell>
                                <TableCell align="center">${Number(ImplementTraning.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">
                                    <FormControl variant="outlined">
                                        <OutlinedInput
                                            name="ImplementTraning"
                                            inputProps={{ style: { textAlign: 'center', maxLength: 3 } }}
                                            sx={{ height: '25px', maxWidth: '120px' }}
                                            value={ImplementTraning.percentDiscount}
                                            onChange={handelPercentDiscount}
                                            disabled={viewMode}
                                        />
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">${Number(ImplementTraning.discountItemcost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">${Number(ImplementTraning.discountAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {postImplementation.label}
                                </TableCell>
                                <TableCell align="center">${Number(postImplementation.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">
                                    <FormControl variant="outlined">
                                        <OutlinedInput
                                            name="postImplementation"
                                            inputProps={{ style: { textAlign: 'center', maxLength: 3 } }}
                                            sx={{ height: '25px', maxWidth: '120px' }}
                                            value={postImplementation.percentDiscount}
                                            onChange={handelPercentDiscount}
                                            disabled={viewMode}
                                        />
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">${Number(postImplementation.discountItemcost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">${Number(postImplementation.discountAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {dataMigration.label}
                                </TableCell>
                                <TableCell align="center">${Number(dataMigration.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">
                                    <FormControl variant="outlined">
                                        <OutlinedInput
                                            name="dataMigration"
                                            inputProps={{ style: { textAlign: 'center', maxLength: 3 } }}
                                            sx={{ height: '25px', maxWidth: '120px' }}
                                            value={dataMigration.percentDiscount}
                                            onChange={handelPercentDiscount}
                                            disabled={viewMode}
                                        />
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">${Number(dataMigration.discountItemcost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">${Number(dataMigration.discountAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {travelAllowance.label}
                                </TableCell>
                                <TableCell align="center">${Number(travelAllowance.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">
                                    <FormControl variant="outlined">
                                        <OutlinedInput
                                            name="travelAllowance"
                                            inputProps={{ style: { textAlign: 'center', maxLength: 3 } }}
                                            sx={{ height: '25px', maxWidth: '120px' }}
                                            value={travelAllowance.percentDiscount}
                                            onChange={handelPercentDiscount}
                                            disabled={viewMode}
                                        />
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">${Number(travelAllowance.discountItemcost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">${Number(travelAllowance.discountAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {scopingStudy.label}
                                </TableCell>
                                <TableCell align="center">${Number(scopingStudy.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">
                                    <FormControl variant="outlined">
                                        <OutlinedInput
                                            name="scopingStudy"
                                            inputProps={{ style: { textAlign: 'center', maxLength: 3 } }}
                                            sx={{ height: '25px', maxWidth: '120px' }}
                                            value={scopingStudy.percentDiscount}
                                            onChange={handelPercentDiscount}
                                            disabled={viewMode}
                                        />
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">${Number(scopingStudy.discountItemcost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">${Number(scopingStudy.discountAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {propertyPrecedent.label}
                                </TableCell>
                                <TableCell align="center">${Number(propertyPrecedent.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">
                                    <FormControl variant="outlined">
                                        <OutlinedInput
                                            name="propertyPrecedent"
                                            inputProps={{ style: { textAlign: 'center', maxLength: 3 } }}
                                            sx={{ height: '25px', maxWidth: '120px' }}
                                            value={propertyPrecedent.percentDiscount}
                                            onChange={handelPercentDiscount}
                                            disabled={viewMode}
                                        />
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">${Number(propertyPrecedent.discountItemcost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">${Number(propertyPrecedent.discountAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {subTotal.label}
                                </TableCell>
                                <TableCell align="center">${Number(subTotal.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center" style={{ maxWidth: '100px' }}>
                                    <div>
                                        {subTotal.percentDiscount}
                                        {Number(subTotal.percentDiscount) > 50 ? <Typography variant="subtitle2" style={{ color: 'red', }}> Subtotal Discount cannot be greater than 50% </Typography> : ''}
                                    </div>
                                </TableCell>
                                <TableCell align="center">${Number(subTotal.discountItemcost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">${Number(subTotal.discountAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {lessConfidential.label}
                                </TableCell>
                                <TableCell align="center">${Number(lessConfidential.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">${lessConfidential.percentDiscount}</TableCell>
                                <TableCell align="center">${lessConfidential.discountItemcost}</TableCell>
                                <TableCell align="center">${lessConfidential.discountAmount}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {totalInvesteExcl.label}
                                </TableCell>
                                <TableCell align="center">${Number(totalInvesteExcl.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">${totalInvesteExcl.percentDiscount}</TableCell>
                                <TableCell align="center">${totalInvesteExcl.discountItemcost}</TableCell>
                                <TableCell align="center">${totalInvesteExcl.discountAmount}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {GSTPayable.label}
                                </TableCell>
                                <TableCell align="center">${Number(GSTPayable.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">${GSTPayable.percentDiscount}</TableCell>
                                <TableCell align="center">${GSTPayable.discountItemcost}</TableCell>
                                <TableCell align="center">${GSTPayable.discountAmount}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {totalInvestePay.label}
                                </TableCell>
                                <TableCell align="center">${Number(totalInvestePay.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">${totalInvestePay.percentDiscount}</TableCell>
                                <TableCell align="center">${totalInvestePay.discountItemcost}</TableCell>
                                <TableCell align="center">${totalInvestePay.discountAmount}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {totalPerUser.label}
                                </TableCell>
                                <TableCell align="center">${Number(totalPerUser.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell align="center">${totalPerUser.percentDiscount}</TableCell>
                                <TableCell align="center">${totalPerUser.discountItemcost}</TableCell>
                                <TableCell align="center">${totalPerUser.discountAmount}</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ marginTop: 20, marginLeft: 10 }}>
                    <Button onClick={() => setInvestmentTabValue(1)}
                        variant="contained" color="primary" >Next</Button>
                </Box>
            </Box>
        </Box>
    );
}