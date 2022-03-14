import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, Typography, FormControl, Grid, InputBase } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import useStyles from '../login/styles';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import forgotPasswordAPI from '../../apis/admin/forgotPasswordAPI';
import Loader from '../Loader.js';

toast.configure();

function ForgotPassword() {

    const [values, setValues] = React.useState({
        email: '',
        isMailsent: false,
        isMailCorrect: true,
        isValidated: false,
        isError: false,
        apiMessage: '',
        isLoading : false,
    });
    const styles = useStyles();

    const history = useHistory();

    const ForgotPasswordAuth = async () => {
        setValues({ ...values, isLoading: true });
        const apiResponse = await forgotPasswordAPI(values.email);
        // console.log(apiResponse)
        if (apiResponse.status === 200) {
            toast.success(apiResponse.message, {
                autoClose: 4000,
                position: 'top-right'
            })
            setValues({ ...values, isMailsent: true, isLoading: false, apiMessage: apiResponse.message });
            history.push("/auth/login");

        } else {
            toast.error(apiResponse.message, {
                autoClose: 4000,
                position: 'top-right'
            })
            setValues({ ...values, isError: true, isLoading: false, apiMessage: apiResponse.message });
            setValues({ ...values, isError: false, email: '' });
        
        }
    }

    const validateMail = (mail) => {
        if (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(mail) || mail.length <= 0) {
            setValues({ ...values, isMailCorrect: true, isValidated: true, email: mail.trim() });
        }
        else {
            setValues({ ...values, isMailCorrect: false, isValidated: false, email: mail.trim() });
        }
    }

    return (
        <Box className={styles.outer}>
            <Box className={styles.innerSM}>
                <Box className={styles.logoHolder}>
                    {/*logo comes here*/}
                    <img src="/lexisnexis.png" alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover', maxWidth: '160px' }} />
                    {/* <Typography variant={'h6'}>Logo</Typography> */}
                </Box>
                <Box className={styles.innerinner}>
                    <Typography className={styles.text} variant={'h4'}>Enter your Mail ID</Typography>
                    <Typography className={styles.text} variant={'subtitle1'}>reset link will be sent to this</Typography>
                    <Stack spacing={2} className={styles.form}>
                        <FormControl
                            className={
                                values.isMailCorrect
                                    ? styles.inputBox
                                    : styles.inputBoxErr
                            }>
                            <Grid container spacing={3} alignItems="flex-end" className={styles.inputBox2}>
                                <Grid item xs={1}>
                                    <MailOutlineRoundedIcon className={styles.icons} />
                                </Grid>
                                <Grid item xs={11}>
                                    <InputBase
                                        id="input-mail"
                                        placeholder="Mail ID"
                                        inputProps={{ 'aria-label': 'naked' }}
                                        className={styles.input}
                                        onChange={(e) => validateMail(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </FormControl>
                        {
                            values.isMailCorrect
                                ? ''
                                : <p className={styles.helpText}>Please enter a valid email Id</p>
                        }
                        {
                            values.isValidated
                                ? values.isLoading
                                    ? <Loader />
                                    : <Button
                                        variant="contained"
                                        className={styles.Button}
                                        onClick={ForgotPasswordAuth}>Send Mail</Button>
                                : <Button
                                    variant="contained"
                                    color="secondary"
                                    className={styles.ButtonDis}
                                    onClick={() => {
                                        toast.info('Please Enter Valid Email id', {
                                            autoClose: 2500,
                                            position: 'bottom-center'
                                        })
                                    }}
                                >Send Mail</Button>
                        }
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default ForgotPassword
