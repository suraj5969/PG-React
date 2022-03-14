import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useStyles } from '../NewProposal/styles.js';

function ApprovalDetails(props) {

    const {proposalDetails} = props;
    const styles = useStyles();

    return (
        <>
            <Box sx={{ boxShadow: '0 0 6px #dadada', borderRadius: '5px', width: '100%', marginTop: '2.5rem' }} >
                <Paper elevation={3} sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '50px', background: 'linear-gradient(40deg,#4db6ac,#26a69a)' }}>
                    <Typography variant="h5" style={{ color: 'white', marginLeft: '25px' }}>
                        Approval
                    </Typography>
                </Paper>
                <Box className={styles.row} >
                    <Stack spacing={1} className={styles.col4}>
                        <Typography variant="subtitle1">Next Approver</Typography>
                        <TextField
                            value={proposalDetails.nextApprover}
                            disabled
                            variant="outlined"
                            fullWidth />
                    </Stack>
                    <Stack spacing={1} className={styles.col4}>
                        <Typography variant="subtitle1">Sales Manager Approver</Typography>
                        <TextField
                            value={proposalDetails.sManagerApprover}
                            disabled
                            variant="outlined"
                            fullWidth />
                    </Stack>
                    <Stack spacing={1} className={styles.col4}>
                        <Typography variant="subtitle1">Commercial Approver</Typography>
                        <TextField
                            value={proposalDetails.commApprover}
                            disabled
                            variant="outlined"
                            fullWidth />
                    </Stack>
                    <Stack spacing={1} className={styles.col4}>
                        <Typography variant="subtitle1">CFO Approver</Typography>
                        <TextField
                            value={proposalDetails.cfoApprover}
                            disabled
                            variant="outlined"
                            fullWidth />
                    </Stack>
                </Box>
                <Box className={styles.row}>
                    <Stack spacing={1} className={styles.col4}>
                        <Typography variant="subtitle1">OPS Team Approver</Typography>
                        <TextField
                            value={proposalDetails.opsApprover}
                            disabled
                            variant="outlined"
                            fullWidth />
                    </Stack>
                    <Stack spacing={1} className={styles.col4}>
                        <Typography variant="subtitle1">Sales Manager Approved Date</Typography>
                        <TextField
                            disabled
                            value={proposalDetails.sManagerAppDate}
                            variant="outlined"
                            fullWidth
                            />
                    </Stack>
                    <Stack spacing={1} className={styles.col4}>
                        <Typography variant="subtitle1" >Commercial Approved Date </Typography>
                        <TextField
                            value={proposalDetails.commAppDate}
                            disabled
                            variant="outlined"
                            fullWidth />
                    </Stack>
                    <Stack spacing={1} className={styles.col4}>
                        <Typography variant="subtitle1">CFO Approved Date</Typography>
                        <TextField
                            value={proposalDetails.cfoAppDate}
                            disabled
                            variant="outlined"
                            fullWidth />
                    </Stack>
                </Box>
                <Box className={styles.row}>
                    <Stack spacing={1} className={styles.col4}>
                        <Typography variant="subtitle1">OPS Team Approved Date</Typography>
                        <TextField
                            value={proposalDetails.opsAppDate}
                            disabled
                            variant="outlined"
                            fullWidth />
                    </Stack>
                    <Stack spacing={1} className={styles.col4}>
                        <Typography variant="subtitle1">Created By</Typography>
                        <TextField
                            value={proposalDetails.createdBy}
                            disabled
                            variant="outlined"
                            fullWidth />
                    </Stack>
                    <Stack spacing={1} className={styles.col4}>
                        <Typography variant="subtitle1">Rejected By</Typography>
                        <TextField
                            value={proposalDetails.rejectedBy}
                            disabled
                            variant="outlined"
                            fullWidth />
                    </Stack>
                    <Stack spacing={1} className={styles.col4}>
                        <Typography variant="subtitle1">Rejected Reason</Typography>
                        <TextField
                            value={proposalDetails.rejectedReason}
                            disabled
                            variant="outlined"
                            fullWidth />
                    </Stack>
                </Box>
                <Box className={styles.row} sx={{ paddingBottom: '2rem' }}>
                    <Stack className={styles.col4} spacing={1}>
                        <Typography variant="subtitle1">Rejected Date </Typography>
                        <TextField
                            value={proposalDetails.RejectedDate}
                            disabled
                            variant="outlined"
                            fullWidth />
                    </Stack>
                    <Stack className={styles.col4} spacing={1}>
                        <Typography variant="subtitle1">Edited By</Typography>
                        <TextField
                            value={proposalDetails.editedBy}
                            disabled
                            variant="outlined"
                            fullWidth />
                    </Stack>
                    <Stack className={styles.col4} spacing={1}>
                        <Typography variant="subtitle1">Edited Reason</Typography>
                        <TextField
                            value={proposalDetails.editedReason}
                            disabled
                            variant="outlined"
                            fullWidth />
                    </Stack>
                    <Stack className={styles.col4} spacing={1}>
                        <Typography variant="subtitle1">Edited Date</Typography>
                        <TextField
                            value={proposalDetails.editedDate}
                            disabled
                            variant="outlined"
                            fullWidth />
                    </Stack>
                </Box>
                <Box className={styles.row} sx={{ paddingBottom: '2rem', justifyContent: 'start' }}>
                    <Stack className={styles.col4} spacing={1}>
                        <Typography variant="subtitle1">Lifecycle</Typography>
                        <TextField
                            value={proposalDetails.lifecycle}
                            disabled
                            variant="outlined"
                            fullWidth />
                    </Stack>
                </Box>
            </Box>
        </>
    )
}

export default ApprovalDetails;
