import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, Typography, FormControl, Grid, InputBase, InputAdornment, IconButton } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import useStyles from '../login/styles';
import resetPasswordAPI from '../../apis/admin/resetPasswordAPI';
import resetPasswordTokenAPI from '../../apis/admin/resetPasswordTokenAPI';
import Loader from '../Loader.js';

toast.configure();

function ResetPassword() {
    const { token } = useParams();
    // console.log(token);
    const [values, setValues] = React.useState({
        currentPassword: '',
        showCurrentPassword: false,
        isCurrentPasswordCorrect: true,
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
        isPasswordCorrect: true,
        isConfirmPasswordCorrect: true,
        isSuccessful: false,
        apiMessage: '',
        isLoading: false,
    });
    const [isValidated, setValidated] = React.useState(false);
    const [currNewSame, setCurrNewSame] = React.useState(false);
    const [tokenExpired, setTokenExpired] = React.useState(null);

    const styles = useStyles();
    const history = useHistory();

    React.useEffect(() => {
        const fetchData = async () => {
            const tokenExpiry = await resetPasswordTokenAPI(token);
            // console.log(tokenExpiry);
            if (tokenExpiry.status !== 200 || !(tokenExpiry.data instanceof Array)) {
                console.log('resetPasswordTokenAPI not working');
                toast.success('Some error occured. Plaese try again.', {
                    autoClose: 3000,
                    position: 'top-right'
                })
                setTokenExpired(true);
                return;
            }
            if (tokenExpiry.data.length < 1) {
                setTokenExpired(true);
            }
            else {
                setTokenExpired(false);
            }
        }
        fetchData();
    }, [token])

    const PasswordResetAuth = async () => {
        // const user_id = sessionStorage.getItem('user_id');
        setValues({ ...values, isLoading: true });
        const apiResponse = await resetPasswordAPI(token, values.password);
        // console.log(apiResponse);
        if (apiResponse.status === 200 && apiResponse.data instanceof Array &&
            apiResponse.data[0] > 0) {
            toast.success('Successfully updated password! Please login with new credentais', {
                autoClose: 3000,
                position: 'top-right'
            })
            setValues({ ...values, isSuccessful: true, isLoading: false, });
            sessionStorage.clear();
            localStorage.clear();
            history.push("/auth/login");
        } else {
            toast.success('Something went wrong. Try generating link again', {
                autoClose: 3000,
                position: 'top-right'
            })
            setValues({ ...values, isLoading: false, isSuccessful: false, password: '', confirmPassword: '' });
        }
    }


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validatePassword = (key) => {
        if (key === values.currentPassword) {
            setCurrNewSame(true);
        }
        else {
            setCurrNewSame(false);
        }

        if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(key) || key.length <= 0) {
            setValues({ ...values, isPasswordCorrect: true, password: key });
        }
        else {
            setValues({ ...values, isPasswordCorrect: false, password: key });
        }
    }

    const validateConfirmPassword = (key) => {
        if (key === values.password || key.length <= 0) {
            setValues({ ...values, confirmPassword: key, isConfirmPasswordCorrect: true });
        }
        else {
            setValues({ ...values, confirmPassword: key, isConfirmPasswordCorrect: false });
        }
    }

    React.useEffect(() => {
        if (values.isPasswordCorrect && values.isConfirmPasswordCorrect && values.password.length > 1 && values.confirmPassword.length > 1 && !currNewSame) {
            setValidated(true)
        }
        else {
            setValidated(false)
        }
    }, [values.isPasswordCorrect, values.isConfirmPasswordCorrect, values.password, values.confirmPassword, currNewSame])

    return (
        <Box className={styles.outer}>
            <Box className={styles.innerSM}>
                <Box className={styles.logoHolder}>
                    {/*logo comes here*/}
                    <img src="/lexisnexis.png" alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover', maxWidth: '160px' }} />
                    {/* <Typography variant={'h6'}>Logo</Typography> */}
                </Box>

                <Box className={styles.innerinner}>
                    {
                        tokenExpired === null
                            ? <Loader />
                            : tokenExpired
                                ? <Typography className={styles.text} variant={'h4'}>This Link is not Valid. <br />
                                    May be this link has been expired. Try generating link again.</Typography>
                                : <>
                                    <Typography className={styles.text} variant={'h4'}>Set New Password</Typography>
                                    <Stack className={styles.form} spacing={2}>
                                        <FormControl
                                            className={
                                                values.isPasswordCorrect
                                                    ? styles.inputBox
                                                    : styles.inputBoxErr
                                            }
                                        >
                                            <Grid container spacing={3} alignItems="center" className={styles.inputBox2}>
                                                <Grid item xs={12}>
                                                    <InputBase
                                                        id="input-password"
                                                        className={styles.input}
                                                        placeholder="New Password"
                                                        inputProps={{ maxLength: 20, 'aria-label': 'naked' }}
                                                        type={values.showPassword ? 'text' : 'password'}
                                                        value={values.password}
                                                        onChange={
                                                            (e) => {
                                                                validatePassword(e.target.value);
                                                            }
                                                        }
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={() => {
                                                                        setValues({ ...values, showPassword: !values.showPassword });
                                                                    }}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                >
                                                                    {
                                                                        values.showPassword ?
                                                                            <Visibility className={styles.icons} /> :
                                                                            <VisibilityOff className={styles.icons} />
                                                                    }
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </Grid>
                                            </Grid>
                                        </FormControl>
                                        {
                                            values.isPasswordCorrect
                                                ? ''
                                                : <p className={styles.helpText}>Your password length must be greater than 8, must contain atleast 1 capital alphabet, 1 small alphabet, 1 special character and 1 number.</p>
                                        }
                                        {
                                            currNewSame
                                                ? <p className={styles.helpText}>New password cannot be same as current password</p>
                                                : ''
                                        }
                                        <FormControl
                                            className={
                                                values.isConfirmPasswordCorrect
                                                    ? styles.inputBox
                                                    : styles.inputBoxErr
                                            }
                                        >
                                            <Grid container spacing={3} alignItems="flex-end" className={styles.inputBox2}>
                                                <Grid item xs={12}>
                                                    <InputBase
                                                        id="confirm-password"
                                                        className={styles.input}
                                                        placeholder="Confirm New Password"
                                                        inputProps={{ maxLength: 20, 'aria-label': 'naked' }}
                                                        type={values.showConfirmPassword ? 'text' : 'password'}
                                                        value={values.confirmPassword}
                                                        onChange={
                                                            (e) => {
                                                                validateConfirmPassword(e.target.value);
                                                            }
                                                        }
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={() => {
                                                                        setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
                                                                    }}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                >
                                                                    {
                                                                        values.showConfirmPassword ?
                                                                            <Visibility className={styles.icons} /> :
                                                                            <VisibilityOff className={styles.icons} />
                                                                    }
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </Grid>
                                            </Grid>
                                        </FormControl>
                                        {
                                            values.isConfirmPasswordCorrect
                                                ? ''
                                                : <p className={styles.helpText}>Confirm Password doesn't match to New Password</p>
                                        }
                                        {
                                            isValidated
                                                ? values.isLoading
                                                    ? <Loader />
                                                    : <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={PasswordResetAuth}
                                                        className={styles.Button}>Change Password</Button>
                                                : <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => {
                                                        toast.info("Please Enter passwords in required format", {
                                                            autoClose: 2000,
                                                            position: 'bottom-center'
                                                        })
                                                    }}
                                                    className={styles.ButtonDis}
                                                >Change Password</Button>
                                        }
                                    </Stack>
                                </>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default ResetPassword
