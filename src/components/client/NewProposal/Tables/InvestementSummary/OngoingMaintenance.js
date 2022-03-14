import React from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button, Box } from '@material-ui/core';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

export default function OngoingMaintenance(props) {

    const { ongoingMnt, setOngoingMnt, setValue, viewMode } = props;

    const { annualAffinity, annualOracleCare, annualAffinityMobile, annualClient,
        annualEmpower, annualSoftDocs, annualSettlement, subTotal, lessConfidential,
        totalMntExclGST, GSTPayable, totalMntAnnual, totalMntMonthly,
        totalAnnualCost, totalCostMonth, } = ongoingMnt;

    const StyledHeadCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#4db6ac',
            color: 'white',
            textAlign: 'center',
            padding: '8px',
        },
    }));

    function isStringInteger(value) {
        return /^[0-9]*$/.test(value);
    }

    const handelPercentDiscount = (e) => {
        if (isStringInteger(e.target.value) && Number(e.target.value) <= 100) {
            setOngoingMnt((prevValues) => ({
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
            <TableContainer>
                <Table className='subtable'>
                    <TableHead>
                        <TableRow >
                            <StyledHeadCell style={{ textAlign: 'left' }}>Ongoing Maintenance Fees (Lexis Care)</StyledHeadCell>
                            <StyledHeadCell> Cost </StyledHeadCell>
                            <StyledHeadCell> Percent Discount </StyledHeadCell>
                            <StyledHeadCell> Discount Item Cost</StyledHeadCell>
                            <StyledHeadCell> Discount Amount </StyledHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {annualAffinity.label}
                            </TableCell>
                            <TableCell align="center">${Number(annualAffinity.cost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            <TableCell align="center">
                                <FormControl variant="outlined">
                                    <OutlinedInput
                                        name="annualAffinity"
                                        inputProps={{ style: { textAlign: 'center' }, maxLength: 3 }}
                                        sx={{ height: '25px', maxWidth: '120px' }}
                                        value={annualAffinity.percentDiscount}
                                        onChange={handelPercentDiscount}
                                        disabled={viewMode}
                                    />
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">${Number(annualAffinity.discountItemcost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            <TableCell align="center">${Number(annualAffinity.discountAmount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {annualOracleCare.label}
                            </TableCell>
                            <TableCell align="center">${Number(annualOracleCare.cost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            <TableCell align="center">
                                <FormControl variant="outlined">
                                    <OutlinedInput
                                        name="annualOracleCare"
                                        inputProps={{ style: { textAlign: 'center' }, maxLength: 3 }}
                                        sx={{ height: '25px', maxWidth: '120px' }}
                                        value={annualOracleCare.percentDiscount}
                                        onChange={handelPercentDiscount}
                                        disabled={viewMode}
                                    />
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">${Number(annualOracleCare.discountItemcost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            <TableCell align="center">${Number(annualOracleCare.discountAmount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {annualAffinityMobile.label}
                            </TableCell>
                            <TableCell align="center">${Number(annualAffinityMobile.cost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            <TableCell align="center">
                                <FormControl variant="outlined">
                                    <OutlinedInput
                                        name="annualAffinityMobile"
                                        inputProps={{ style: { textAlign: 'center' }, maxLength: 3 }}
                                        sx={{ height: '25px', maxWidth: '120px' }}
                                        value={annualAffinityMobile.percentDiscount}
                                        onChange={handelPercentDiscount}
                                        disabled={viewMode}
                                    />
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">${Number(annualAffinityMobile.discountItemcost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            <TableCell align="center">${Number(annualAffinityMobile.discountAmount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {annualClient.label}
                            </TableCell>
                            <TableCell align="center">${Number(annualClient.cost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            <TableCell align="center">
                                <FormControl variant="outlined">
                                    <OutlinedInput
                                        name="annualClient"
                                        inputProps={{ style: { textAlign: 'center' }, maxLength: 3 }}
                                        sx={{ height: '25px', maxWidth: '120px' }}
                                        value={annualClient.percentDiscount}
                                        onChange={handelPercentDiscount}
                                        disabled={viewMode}
                                    />
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">${Number(annualClient.discountItemcost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            <TableCell align="center">${Number(annualClient.discountAmount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {annualEmpower.label}
                            </TableCell>
                            <TableCell align="center">${Number(annualEmpower.cost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            <TableCell align="center">
                                <FormControl variant="outlined">
                                    <OutlinedInput
                                        name="annualEmpower"
                                        inputProps={{ style: { textAlign: 'center' }, maxLength: 3 }}
                                        sx={{ height: '25px', maxWidth: '120px' }}
                                        value={annualEmpower.percentDiscount}
                                        onChange={handelPercentDiscount}
                                        disabled={viewMode}
                                    />
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">${Number(annualEmpower.discountItemcost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            <TableCell align="center">${Number(annualEmpower.discountAmount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                        </TableRow>


                        <TableRow >
                            <TableCell component="th" scope="row">
                                {annualSoftDocs.label}
                            </TableCell>
                            <TableCell align="center">${Number(annualSoftDocs.cost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            <TableCell align="center">
                                <FormControl variant="outlined">
                                    <OutlinedInput
                                        name="annualSoftDocs"
                                        inputProps={{ style: { textAlign: 'center' }, maxLength: 3 }}
                                        sx={{ height: '25px', maxWidth: '120px' }}
                                        value={annualSoftDocs.percentDiscount}
                                        onChange={handelPercentDiscount}
                                        disabled={viewMode}
                                    />
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">${Number(annualSoftDocs.discountItemcost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            <TableCell align="center">${Number(annualSoftDocs.discountAmount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {annualSettlement.label}
                            </TableCell>
                            <TableCell align="center">${Number(annualSettlement.cost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            <TableCell align="center">
                                <FormControl variant="outlined">
                                    <OutlinedInput
                                        name="annualSettlement"
                                        inputProps={{ style: { textAlign: 'center' }, maxLength: 3 }}
                                        sx={{ height: '25px', maxWidth: '120px' }}
                                        value={annualSettlement.percentDiscount}
                                        onChange={handelPercentDiscount}
                                        disabled={viewMode}
                                    />
                                </FormControl>
                            </TableCell>
                            <TableCell align="center">${Number(annualSettlement.discountItemcost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            <TableCell align="center">${Number(annualSettlement.discountAmount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                <b> {subTotal.label} </b>
                            </TableCell>
                            <TableCell align="center">${Number(subTotal.cost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            <TableCell align="center">{subTotal.percentDiscount}</TableCell>
                            <TableCell align="center">${Number(subTotal.discountItemcost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            <TableCell align="center">${Number(subTotal.discountAmount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {lessConfidential.label}
                            </TableCell>
                            <TableCell align="center">${Number(lessConfidential.cost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            <TableCell align="center">{lessConfidential.percentDiscount}</TableCell>
                            <TableCell align="center">{lessConfidential.discountItemcost}</TableCell>
                            <TableCell align="center">{lessConfidential.discountAmount}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {totalMntExclGST.label}
                            </TableCell>
                            <TableCell align="center">${Number(totalMntExclGST.cost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            <TableCell align="center">{totalMntExclGST.percentDiscount}</TableCell>
                            <TableCell align="center">{totalMntExclGST.discountItemcost}</TableCell>
                            <TableCell align="center">{totalMntExclGST.discountAmount}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {GSTPayable.label}
                            </TableCell>
                            <TableCell align="center">${Number(GSTPayable.cost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            <TableCell align="center">{GSTPayable.percentDiscount}</TableCell>
                            <TableCell align="center">{GSTPayable.discountItemcost}</TableCell>
                            <TableCell align="center">{GSTPayable.discountAmount}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {totalMntAnnual.label}
                            </TableCell>
                            <TableCell align="center">${Number(totalMntAnnual.cost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            <TableCell align="center">{totalMntAnnual.percentDiscount}</TableCell>
                            <TableCell align="center">{totalMntAnnual.discountItemcost}</TableCell>
                            <TableCell align="center">{totalMntAnnual.discountAmount}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {totalMntMonthly.label}
                            </TableCell>
                            <TableCell align="center">${Number(totalMntMonthly.cost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            <TableCell align="center">{totalMntMonthly.percentDiscount}</TableCell>
                            <TableCell align="center">{totalMntMonthly.discountItemcost}</TableCell>
                            <TableCell align="center">{totalMntMonthly.discountAmount}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {totalAnnualCost.label}
                            </TableCell>
                            <TableCell align="center">${Number(totalAnnualCost.cost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            <TableCell align="center">{totalAnnualCost.percentDiscount}</TableCell>
                            <TableCell align="center">{totalAnnualCost.discountItemcost}</TableCell>
                            <TableCell align="center">{totalAnnualCost.discountAmount}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                {totalCostMonth.label}
                            </TableCell>
                            <TableCell align="center">${Number(totalCostMonth.cost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            <TableCell align="center">{totalCostMonth.percentDiscount}</TableCell>
                            <TableCell align="center">{totalCostMonth.discountItemcost}</TableCell>
                            <TableCell align="center">{totalCostMonth.discountAmount}</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ marginTop: 20, marginLeft: 10 }}>
                <Button onClick={() => setValue(3)}
                    variant="contained" color="primary" >Next</Button>
            </Box>
        </Box>
    );
}