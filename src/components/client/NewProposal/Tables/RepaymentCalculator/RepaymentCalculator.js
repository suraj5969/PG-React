import React from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Box } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

export default function RepaymentCalculator(props) {

    const { repaymentCalc, setRepaymentCalc, viewMode } = props;

    const { totalsTable, mntTable, repayments } = repaymentCalc;

    const { software, services, sTotal, pricePerTool, priceTotal } = totalsTable;

    const { year1, year2, year3, year4, year5, mntTotal } = mntTable;

    const { initPayment, month1, month2, month3, month4, month5,
        month6, month7, month8, month9, month10,
        month11, month12, month13, month14, month15, month16, month17,
        month18, month19, month20, month21, month22, month23, month24,
        month25, month26, month27, month28, month29, month30, month31,
        month32, month33, month34, month35, month36, month37, month38,
        month39, month40, month41, month42, month43, month44, month45,
        month46, month47, month48, month49, month50, month51, month52,
        month53, month54, month55, month56, month57, month58, month59,
        month60, repaymentTotal } = repayments;


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

    const BorderLessCell = styled(TableCell)(({ theme }) => ({
        '&': {
            borderBottom: 'none',
        },
    }));

    const LeftBorderCell = styled(TableCell)(({ theme }) => ({
        '&': {
            borderLeft: '1px solid rgba(200,200,200,0.8)',
        },
    }));

    function isStringDecimal(value) {
        return /^[0-9.]*$/.test(value) && value.split('.').length < 3;
    }

    const [initPaymentError, setInitPaymentError] = React.useState(false);
    const handelInitPaymentChange = (event) => {
        if (isStringDecimal(event.target.value)) {
            if (Number(event.target.value) > Number(sTotal.gcrmEntries)) {
                setInitPaymentError(true);
            }
            else {
                setInitPaymentError(false);
                setRepaymentCalc((prevValues) => ({
                    ...prevValues,
                    repayments: {
                        ...prevValues.repayments,
                        initPayment: {
                            ...prevValues.repayments.initPayment,
                            payments: event.target.value,
                        }
                    }
                }))
            }
        }

    }



    return (
        <Box sx={{ marginBottom: '1rem', }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
                <Box sx={{ width: '100%', maxWidth: '550px' }}>
                    <TableContainer>
                        <Table className='subtable'>
                            <TableHead>
                                <TableRow >
                                    <StyledHeadCell style={{ textAlign: 'left' }}></StyledHeadCell>
                                    <StyledHeadCell> Cost </StyledHeadCell>
                                    <StyledHeadCell> GCRM Entries </StyledHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        {software.label}
                                    </TableCell>
                                    <TableCell align="center">${Number(software.cost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                    <TableCell align="center">${Number(software.gcrmEntries).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                </TableRow>

                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        {services.label}
                                    </TableCell>
                                    <TableCell align="center">${Number(services.cost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                    <TableCell align="center">${Number(services.gcrmEntries).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                </TableRow>

                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        {sTotal.label}
                                    </TableCell>
                                    <TableCell align="center">${Number(sTotal.cost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                    <TableCell align="center">${Number(sTotal.gcrmEntries).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                </TableRow>


                                <GreyTableRow>
                                    <TableCell><b>Once-Off Costs</b></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </GreyTableRow>

                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        {pricePerTool.label}
                                    </TableCell>
                                    <TableCell align="center">{pricePerTool.cost}</TableCell>
                                    <TableCell align="center">${Number(pricePerTool.gcrmEntries).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                </TableRow>

                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        {priceTotal.label}
                                    </TableCell>
                                    <TableCell align="center">{priceTotal.cost}</TableCell>
                                    <TableCell align="center">${Number(priceTotal.gcrmEntries).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                <Box sx={{ width: '100%', maxWidth: '550px' }}>
                    <TableContainer>
                        <Table className='subtable'>
                            <TableHead>
                                <TableRow >
                                    <StyledHeadCell style={{ textAlign: 'left' }}>Maintenance</StyledHeadCell>
                                    <StyledHeadCell> RRP </StyledHeadCell>
                                    <StyledHeadCell> Discounted </StyledHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        {year1.label}
                                    </TableCell>
                                    <TableCell align="center">${Number(year1.RRP).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                    <TableCell align="center">${Number(year1.discounted).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                </TableRow>

                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        {year2.label}
                                    </TableCell>
                                    <TableCell align="center">${Number(year2.RRP).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                    <TableCell align="center">${Number(year2.discounted).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                </TableRow>

                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        {year3.label}
                                    </TableCell>
                                    <TableCell align="center">${Number(year3.RRP).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                    <TableCell align="center">${Number(year3.discounted).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                </TableRow>

                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        {year4.label}
                                    </TableCell>
                                    <TableCell align="center">${Number(year4.RRP).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                    <TableCell align="center">${Number(year4.discounted).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                </TableRow>

                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        {year5.label}
                                    </TableCell>
                                    <TableCell align="center">${Number(year5.RRP).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                    <TableCell align="center">${Number(year5.discounted).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                </TableRow>

                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        {mntTotal.label}
                                    </TableCell>
                                    <TableCell align="center">${Number(mntTotal.RRP).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                    <TableCell align="center">${Number(mntTotal.discounted).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Stack>

            <Box sx={{ marginTop: '3rem' }}>
                <Stack style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '1rem' }}>
                    {/* <Box sx={{flexGrow: 1}}/> */}
                    <Typography variant="button"> {initPayment.label} : &nbsp; </Typography>
                    <Box>
                        <FormControl variant="outlined">
                            <OutlinedInput
                                inputProps={{ style: { textAlign: 'center' }, maxLength: 13 }}
                                sx={{ height: '35px', minWidth: '130px', maxWidth: '150px' }}
                                value={initPayment.payments}
                                onChange={handelInitPaymentChange}
                                disabled={viewMode}
                            />
                        </FormControl>
                        {initPaymentError ? <Typography variant="subtitle2" style={{ color: 'red' }}> This field cannot be grater than {sTotal.gcrmEntries} </Typography> : ''}
                    </Box>
                </Stack>
                < TableContainer >
                    <Table className='subtable'>
                        <TableHead>
                            <TableRow >

                                <StyledHeadCell >Repayments</StyledHeadCell>
                                <StyledHeadCell> Payments </StyledHeadCell>
                                <StyledHeadCell> Lexis Care </StyledHeadCell>

                                <StyledHeadCell sx={{ borderLeft: '1px solid rgba(200,200,200,0.8)' }}>Repayments</StyledHeadCell>
                                <StyledHeadCell> Payments </StyledHeadCell>
                                <StyledHeadCell> Lexis Care </StyledHeadCell>

                                <StyledHeadCell sx={{ borderLeft: '1px solid rgba(200,200,200,0.8)' }}>Repayments</StyledHeadCell>
                                <StyledHeadCell> Payments </StyledHeadCell>
                                <StyledHeadCell> Lexis Care </StyledHeadCell>

                                <StyledHeadCell sx={{ borderLeft: '1px solid rgba(200,200,200,0.8)' }}>Repayments</StyledHeadCell>
                                <StyledHeadCell> Payments </StyledHeadCell>
                                <StyledHeadCell> Lexis Care </StyledHeadCell>

                                <StyledHeadCell sx={{ borderLeft: '1px solid rgba(200,200,200,0.8)' }}>Repayments</StyledHeadCell>
                                <StyledHeadCell> Payments </StyledHeadCell>
                                <StyledHeadCell> Lexis Care </StyledHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            <TableRow >
                                <TableCell align="center">{month1.label}</TableCell>
                                <TableCell align="center">${Number(month1.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month1.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month13.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month13.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month13.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month25.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month25.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month25.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month37.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month37.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month37.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month49.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month49.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month49.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center">{month2.label}</TableCell>
                                <TableCell align="center">${Number(month2.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month2.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month14.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month14.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month14.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month26.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month26.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month26.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month38.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month38.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month38.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month50.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month50.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month50.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center">{month3.label}</TableCell>
                                <TableCell align="center">${Number(month3.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month3.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month15.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month15.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month15.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month27.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month27.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month27.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month39.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month39.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month39.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month51.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month51.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month51.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center">{month4.label}</TableCell>
                                <TableCell align="center">${Number(month4.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month4.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month16.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month16.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month16.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month28.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month28.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month28.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month40.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month40.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month40.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month52.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month52.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month52.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center">{month5.label}</TableCell>
                                <TableCell align="center">${Number(month5.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month5.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month17.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month17.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month17.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month29.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month29.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month29.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month41.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month41.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month41.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month53.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month53.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month53.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center">{month6.label}</TableCell>
                                <TableCell align="center">${Number(month6.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month6.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month18.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month18.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month18.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month30.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month30.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month30.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month42.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month42.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month42.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month54.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month54.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month54.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center">{month7.label}</TableCell>
                                <TableCell align="center">${Number(month7.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month7.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month19.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month19.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month19.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month31.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month31.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month31.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month43.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month43.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month43.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month55.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month55.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month55.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center">{month8.label}</TableCell>
                                <TableCell align="center">${Number(month8.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month8.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month20.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month20.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month20.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month32.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month32.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month32.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month44.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month44.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month44.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month56.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month56.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month56.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center">{month9.label}</TableCell>
                                <TableCell align="center">${Number(month9.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month9.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month21.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month21.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month21.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month33.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month33.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month33.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month45.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month45.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month45.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month57.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month57.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month57.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center">{month10.label}</TableCell>
                                <TableCell align="center">${Number(month10.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month10.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month22.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month22.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month22.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month34.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month34.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month34.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month46.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month46.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month46.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month58.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month58.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month58.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center">{month11.label}</TableCell>
                                <TableCell align="center">${Number(month1.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month1.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month23.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month23.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month23.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month35.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month35.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month35.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month47.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month47.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month47.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month59.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month59.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month59.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="center">{month12.label}</TableCell>
                                <TableCell align="center">${Number(month12.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month12.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month24.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month24.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month24.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month36.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month36.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month36.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month48.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month48.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month48.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>

                                <LeftBorderCell align="center">{month60.label}</LeftBorderCell>
                                <TableCell align="center">${Number(month60.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="center">${Number(month60.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            </TableRow>
                            <TableRow >
                                <BorderLessCell align="center"></BorderLessCell>
                                <BorderLessCell align="center"></BorderLessCell>
                                <BorderLessCell align="center"></BorderLessCell>

                                <BorderLessCell align="center"></BorderLessCell>
                                <BorderLessCell align="center"></BorderLessCell>
                                <BorderLessCell align="center"></BorderLessCell>

                                <BorderLessCell align="center"></BorderLessCell>
                                <BorderLessCell align="center"></BorderLessCell>
                                <BorderLessCell align="center"></BorderLessCell>

                                <BorderLessCell align="center"></BorderLessCell>
                                <BorderLessCell align="center"></BorderLessCell>
                                <BorderLessCell align="center"></BorderLessCell>
                                
                                <BorderLessCell align="center" component="th" scope="row">
                                    <Typography variant="button">{repaymentTotal.label} </Typography>
                                </BorderLessCell>
                                <BorderLessCell align="center"><b>${Number(repaymentTotal.payments).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</b></BorderLessCell>
                                <BorderLessCell align="center"><b>${Number(repaymentTotal.lexisCare).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</b></BorderLessCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer >
                {/* <Stack gap={1} style={{ flexDirection: 'row', alignItems: 'center', marginTop: '1rem' }}>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography variant="h6"> Total :</Typography>
                    <Typography style={{ marginRight: '1rem' }} > $0.00</Typography>
                </Stack> */}
            </Box >
        </Box >
    );
}