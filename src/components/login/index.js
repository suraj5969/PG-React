import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';
import useStyles from './styles.js';
import { EmailField } from './EmailField.js';
import { PasswordField } from './PasswordField.js';
import { CheckBox } from './CheckBox.js';
import verifyAPI from '../../apis/admin/verifyAPI.js';
import Loader from '../Loader.js';

toast.configure();

function Login() {

    const history = useHistory();
    const styles = useStyles();

    const [values, setValues] = React.useState({
        email: '',
        password: '',
        showPassword: false,
        rememberMe: false,
        isMailCorrect: true,
        isPasswordCorrect: true,
        isValidated: true,
        isValuesPresent: false,
        isLoading: false,
        errMessage: '',
    });

    const handleSubmit = async e => {
        e.preventDefault();

        if (values.email.length < 1 && values.password.length < 1) {
            toast.info('Please Enter valid Username and Password', {
                autoClose: 2500,
                position: 'bottom-center'
            })
            return;
        }
        else if (values.email.length < 1 || !values.isMailCorrect) {
            toast.info('Please Enter valid Username', {
                autoClose: 2500,
                position: 'bottom-center'
            })
            return;
        }
        else if (values.password.length < 1 || !values.isPasswordCorrect) {
            toast.info('Please Enter valid Password', {
                autoClose: 2500,
                position: 'bottom-center'
            })
            return;
        }

        setValues({ ...values, isLoading: true });
        const credentials = { email: values.email, password: values.password }
        const apiResult = await verifyAPI(credentials);
        // console.log('after verifyAPI', apiResult);
        if (apiResult.status === 200 && apiResult.data instanceof Array) {
            if (apiResult.data?.length > 0) {
                if (Number(apiResult.data[0]?.is_active) === 1) {
                    setValues({ ...values, isValidated: true, isLoading: false });
                    // const token = await loginAPI(values);
                    // setToken(token);
                    if (values.rememberMe) {
                        localStorage.setItem('credentials', JSON.stringify({ 'email': values.email, 'password': values.password }));
                    }
                    else {
                        sessionStorage.setItem('credentials', JSON.stringify({ 'email': values.email, 'password': values.password }));
                    }
                    // sessionStorage.setItem('token', token.token);
                    sessionStorage.setItem('role', apiResult.data[0].role_id);
                    sessionStorage.setItem('fname', apiResult.data[0].fname);
                    sessionStorage.setItem('lname', apiResult.data[0].lname);
                    sessionStorage.setItem('user_id', apiResult.data[0].user_id);
                    sessionStorage.setItem('solution_specialist', apiResult.data[0].solution_specialist.trim());
                    sessionStorage.setItem('country', apiResult.data[0].country);
                    sessionStorage.setItem('rights', JSON.stringify({
                        'can_view': apiResult.data[0].can_view,
                        'can_create': apiResult.data[0].can_create,
                        'can_approve': apiResult.data[0].can_approve,
                        'edit_other': apiResult.data[0].edit_other,
                        'gets_notified': apiResult.data[0].gets_notified,
                    }));
                    const role = Number(sessionStorage.getItem('role')) || 2;
                    // console.log(`Role: ${role}`);
                    if (role === 1) {
                        history.push('/admin');
                        toast.success('Successfully, Logged in!', {
                            autoClose: '1000',
                        });
                    }
                    else {
                        history.push('/client');
                    }
                }
                else {
                    setValues({ ...values, isValidated: false, isLoading: false });
                    toast.error("User is blocked! Please contact Administrator.", {
                        autoClose: '2000',
                        position: 'bottom-center'
                    });
                }
            }
            else {
                setValues({ ...values, isValidated: false, isLoading: false, errMessage: 'This user does not exist, Please contact Admin' });
                toast.error('The Email or Password is Wrong', {
                    autoClose: '2000',
                    position: 'bottom-center'
                });
            }
        }
        else {
            setValues({ ...values, isValidated: false, isLoading: false, errMessage: apiResult?.message });
            toast.error('Cannot connect to server. Please contact the Administrator ', {
                autoClose: '2000',
                position: 'bottom-center'
            });
        }
    }

    return (
        <Box className={styles.outer}>
            <div className={styles.inner}>
                <Box className={styles.logoHolder}>
                    {/*logo comes here*/}
                    <img src="/lexisnexis.png" alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover', maxWidth: '160px' }} />
                    {/* <Typography variant={'h6'}>Logo</Typography> */}
                </Box>
                <Box className={styles.innerinner}>
                    <Typography className={styles.text} variant={'h3'}>Welcome</Typography>
                    {
                        //values.isValidated
                        //? ''
                        //: <Typography variant={'subtitle2'} className={styles.errText}>{values.errMessage}</Typography>
                    }
                    <form className={styles.form} onSubmit={handleSubmit}>
                        {/* <form onSubmit={handleSubmit}> */}
                        <EmailField values={values} setValues={setValues} tabIndex={1} />
                        <PasswordField values={values} setValues={setValues} tabIndex={2} />
                        <CheckBox values={values} setValues={setValues} tabIndex={3} />
                        {
                            values.email.length > 1 && values.password.length > 1 && values.isMailCorrect && values.isPasswordCorrect
                                ? values.isLoading
                                    ? <Loader />
                                    : <Button
                                        variant="contained"
                                        type="submit"
                                        className={styles.Button}
                                        onClick={handleSubmit}
                                    >Login</Button>
                                : <Button
                                    variant="contained"
                                    type="submit"
                                    className={styles.ButtonDis}
                                    tabIndex={4}
                                    onClick={handleSubmit}
                                >Login</Button>
                        }
                        {/* </form> */}
                    </form>
                    <Typography className={styles.formLinks}>
                        <Link to="/forgot-password" className={styles.forgotPassword}>
                            forgot password?
                        </Link>
                    </Typography>
                </Box>
            </div>
        </Box>
    )
}

//Login.propTypes = {
//    setToken: PropTypes.func.isRequired
//}

export default Login
