import React from 'react';
import moment from 'moment';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, FormControl, TextField, InputLabel, Select, MenuItem, RadioGroup, Radio, FormControlLabel, FormLabel, FormGroup, Checkbox, ButtonGroup, Button, Typography, } from '@material-ui/core';
import { useStyles } from '../NewUser/styles';
import updateUserAPI from '../../../apis/admin/updateUserAPI';
import getSingleUserDetailsAPI from '../../../apis/admin/getSingleUserDetailsAPI';
import Loader from '../Loader';

toast.configure();
function EditUserDetails() {

    const { id } = useParams();
    const styles = useStyles();
    const history = useHistory();
    const [values, setValues] = React.useState([]);
    const [isData, setData] = React.useState(false);
    const [initValues, changeInitValues] = React.useState([]);

    const [conditionals, setConditions] = React.useState({
        showPassword: false,
        isPasswordCorrect: true,
        isMailCorrect: true,
        isFirstnameCorrect: true,
        isLastnameCorrect: true,
        isPhoneCorrect: true,
        isCityCorrect: true,
        isZIPCorrect: true,
        isFormFilledUp: false,
    })

    const [errors, setErrors] = React.useState({
        isMailError: false,
        isPasswordError: false,
        isFnameError: false,
        isLnameError: false,
        isPhoneError: false,
        isCityError: false,
        isZIPError: false,
        isAddressError: false,
        isCountryError: false,
        isGenderError: false,
    })

    React.useEffect(() => {
        async function fetchData() {
            const userDetails = await getSingleUserDetailsAPI(id);
            // console.log(userDetails);

            if (userDetails.status !== 200) {
                toast.info('Something went wrong!', {
                    autoClose: 2000,
                })
                toast.error('Server down! Try again later', {
                    autoClose: 2000,
                })
                history.push(`/admin/user-details/${id}`);
            } else {
                setValues(userDetails.data[0]);
                changeInitValues([]);
                setData(true);
            }
        }
        fetchData();
    }, [history, id]);

    const checkSubmit = () => {
        console.dir(values);
        if (values.email.length > 4 && values.email.length < 81
            && values.fname.length > 2 && values.fname.length < 21
            && values.lname.length > 2 && values.lname.length < 21
            && values.phone.length > 1
            && values.city.length > 1
            && values.postal_code.length > 1
            && values.country.length > 0
            && values.gender.length > 3
            && values.solution_specialist.length > 1
            && values.address.length > 0 
        ) {
            if (conditionals.isMailCorrect
                && conditionals.isPhoneCorrect
                && conditionals.isFirstnameCorrect
                && conditionals.isLastnameCorrect
                && conditionals.isCityCorrect
                && conditionals.isZIPCorrect
                && values.phone.length > 9
                && values.postal_code.length > 2
            ) {
                setConditions({ ...conditionals, isFormFilledUp: true });
                return 'Ok';
            }
            else {
                setConditions({ ...conditionals, isFormFilledUp: false });
                if (values.phone.length < 10) {
                    toast.info("Phone Number field should have 10 digits", {
                        autoClose: 2000,
                    })
                }
                if (values.postal_code.length < 3) {
                    toast.info("ZIP code should have 3 digits", {
                        autoClose: 2000,
                    })
                }
                return "Validation Failed!"
            }
        }
        else {
            setConditions({ ...conditionals, isFormFilledUp: false });
            if (!values.email.length) { setErrors({ ...errors, isMailError: true }) }
            if (!values.fname.length) { setErrors({ ...errors, isFnameError: true }) }
            if (!values.lname.length) { setErrors({ ...errors, isLnameError: true }) }
            if (!values.city.length) { setErrors({ ...errors, isCityError: true }) }
            if (!values.phone.length) { setErrors({ ...errors, isPhoneError: true }) }
            if (values.postal_code.length < 3) { setErrors({ ...errors, isZIPError: true }) }
            if (!values.address.length) { setErrors({ ...errors, isAddressError: true }) }
            if (!(values.country.length > 2)) { setErrors({ ...errors, isCountryError: true }) }
            if (!(values.gender.length > 3)) { setErrors({ ...errors, isGenderError: true }) }
            return "Please Enter required fields";
        }
    }

    const handleChange = (event) => {
        if (event.target.name === 'role_id') {
            if (event.target.checked) {
                setValues({ ...values, [event.target.name]: 1 });
            }
            else {
                setValues({ ...values, [event.target.name]: 2 });
            }
        }
        else {
            setValues({ ...values, [event.target.name]: event.target.checked });
        }
    };

    const handleValues = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        if (event.target.name === 'fname') {
            if ((/^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/.test(event.target.value.toLowerCase()) && event.target.value.length > 2) || event.target.value.length === 0) {
                setConditions({ ...conditionals, isFirstnameCorrect: true });
                setErrors({ ...errors, isFnameError: false });
            } else {
                setConditions({ ...conditionals, isFirstnameCorrect: false });
                setErrors({ ...errors, isFnameError: true });
            }
        }
        else if (event.target.name === 'lname') {
            if ((/^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/.test(event.target.value.toLowerCase()) && event.target.value.length > 2) || event.target.value.length === 0) {
                setConditions({ ...conditionals, isLastnameCorrect: true });
                setErrors({ ...errors, isLnameError: false });
            } else {
                setConditions({ ...conditionals, isLastnameCorrect: false });
                setErrors({ ...errors, isLnameError: true });
            }
        }
        else if (event.target.name === 'phone') {
            if ((/^[+]{0,1}\d*$/.test(event.target.value)) || event.target.value.length === 0) {
                setConditions({ ...conditionals, isPhoneCorrect: true });
                setErrors({ ...errors, isPhoneError: false });
            } else {
                setConditions({ ...conditionals, isPhoneCorrect: false });
                setErrors({ ...errors, isPhoneError: true });
            }
        }
        else if (event.target.name === 'city') {
            if (/^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/.test(event.target.value) || event.target.value.length === 0) {
                setConditions({ ...conditionals, isCityCorrect: true });
                setErrors({ ...errors, isCityError: false });
            } else {
                setConditions({ ...conditionals, isCityCorrect: false });
                setErrors({ ...errors, isCityError: true });
            }
        }
        else if (event.target.name === 'postal_code') {
            if (/^\d+$/.test(event.target.value) || event.target.value.length === 0) {
                setConditions({ ...conditionals, isZIPCorrect: true });
                setErrors({ ...errors, isZIPError: false });
            } else {
                setConditions({ ...conditionals, isZIPCorrect: false });
                setErrors({ ...errors, isZIPError: true });
            }
        }
    }

    const validateMail = (mail) => {
        if ((/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(mail) && mail.length >= 4) || mail.length <= 0) {
            setValues({ ...values, email: mail });
            setConditions({ ...conditionals, isMailCorrect: true });
            setErrors({ ...errors, isMailError: false });
        }
        else {
            setValues({ ...values, email: mail });
            setConditions({ ...conditionals, isMailCorrect: false });
            setErrors({ ...errors, isMailError: true });
        }
    }

    const updateUser = async () => {
        setValues({ ...values, date_updated: moment().format() });

        const checkResponse = checkSubmit();
        if (checkResponse === 'Ok') {
            setData(false);
            const apiResponse = await updateUserAPI(id, values);
            // console.log(apiResponse);
            if (apiResponse.status === 200) {
                toast.success("Successfully Updated!", {
                    autoClose: 1500,
                })
                history.push("/admin/user-management");
                setData(true);
            } else {
                toast.error("Cannot connect to server. Please contact the Administrator", {
                    autoClose: 2000,
                });
                setData(true);
            }
        }
        else {
            toast.error(checkResponse, {
                autoClose: 2500,
            })
        }
        // (async () => {
        // })();
    }

    const redirectBack = () => {
        history.push(`/admin/user-details/${id}`);
        setValues(initValues);
        changeInitValues('');
    }

    return (
        <>
            {
                isData
                    ? <Box className={styles.inner}>
                        <Typography variant="h4" className={styles.headerText}>Edit User Details</Typography>
                        <FormControl
                            className={
                                conditionals.isMailCorrect
                                    ? styles.formControl
                                    : styles.formControlErr}
                        >
                            <TextField
                                id="input-mailID"
                                name="email"
                                onChange={(e) => validateMail(e.target.value)}
                                value={values.email}
                                label="Email Address"
                                variant="outlined"
                                className={styles.input}
                                inputProps={{ maxLength: 80, 'aria-label': 'naked', tabIndex: 1 }}
                                error={errors.isMailError}
                            />
                            {
                                conditionals.isMailCorrect
                                    ? ''
                                    : <p className={styles.helpText}>Please enter a valid email Id</p>
                            }
                        </FormControl>
                        <FormControl className={styles.formControl}>
                            <TextField
                                id="input-firstname"
                                name="fname"
                                onChange={handleValues}
                                value={values.fname}
                                label="Firstname"
                                variant="outlined"
                                className={styles.input}
                                inputProps={{ maxLength: 20, 'aria-label': 'naked', tabIndex: 2 }}
                                error={errors.isFnameError}
                            />
                            {
                                conditionals.isFirstnameCorrect
                                    ? ''
                                    : <p className={styles.helpText}>First Name field can not have Integer value, Special characters and decimal values in it</p>
                            }
                        </FormControl>
                        <FormControl className={styles.formControl}>
                            <TextField
                                id="input-lastname"
                                name="lname"
                                onChange={handleValues}
                                value={values.lname}
                                label="Lastname"
                                variant="outlined"
                                className={styles.input}
                                inputProps={{ maxLength: 20, 'aria-label': 'naked', tabIndex: 3 }}
                                error={errors.isLnameError}
                            />
                            {
                                conditionals.isLastnameCorrect
                                    ? ''
                                    : <p className={styles.helpText}>Last Name field can not have Integer value, Special characters and decimal values in it</p>
                            }
                        </FormControl>
                        <FormControl className={styles.formControl}>
                            <TextField
                                id="input-phone"
                                name="phone"
                                onChange={handleValues}
                                value={values.phone}
                                label="Phone No (with country code)"
                                variant="outlined"
                                className={styles.input}
                                inputProps={{ maxLength: 15, 'aria-label': 'naked', inputMode: 'numeric', pattern: '[0-9]*', tabIndex: 4 }}
                                error={errors.isPhoneError}
                            />
                            {
                                conditionals.isPhoneCorrect
                                    ? ''
                                    : <p className={styles.helpText}>Phone Number field can not have Alphabets, Special characters and decimal values in it</p>
                            }
                        </FormControl>
                        <FormControl className={styles.formControl}>
                            <TextField
                                id="input-city"
                                name="city"
                                onChange={handleValues}
                                value={values.city}
                                label="city"
                                variant="outlined"
                                className={styles.input}
                                inputProps={{ maxLength: 20, 'aria-label': 'naked', tabIndex: 5 }}
                                error={errors.isCityError}
                            />
                            {
                                conditionals.isCityCorrect
                                    ? ''
                                    : <p className={styles.helpText}>City field can not have Integer value, Special characters and decimal values in it</p>
                            }
                        </FormControl>
                        <FormControl className={styles.formControl}>
                            <TextField
                                id="input-zip"
                                name="postal_code"
                                onChange={handleValues}
                                value={values.postal_code}
                                label="ZIP code"
                                variant="outlined"
                                className={styles.input}
                                inputProps={{ maxLength: 8, 'aria-label': 'naked', tabIndex: 6 }}
                                error={errors.isZIPError}
                            />
                            {
                                conditionals.isZIPCorrect
                                    ? ''
                                    : <p className={styles.helpText}>Integer field can not have Alphabets, Special characters and Decimal values in it</p>
                            }
                        </FormControl>
                        <FormControl variant="filled" className={styles.formControl}>
                            <InputLabel id="select-country-label">Country</InputLabel>
                            <Select
                                labelId="select-country-label"
                                id="select-country"
                                name="country"
                                onChange={handleValues}
                                value={values.country}
                                className={styles.selectList}
                                error={errors.isCountryError}
                            >
                                <MenuItem value={'Australia'} tabIndex={7}>Australia</MenuItem>
                                <MenuItem value={'New Zealand'} tabIndex={8}>New Zealand</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl component="fieldset" className={styles.formControl}>
                            <FormLabel component="legend" id="select-gender-label">Gender</FormLabel>
                            <RadioGroup
                                aria-label="gender"
                                name="gender"
                                onChange={handleValues}
                                value={values.gender}
                                className={styles.radioGroup}
                            >
                                <FormControlLabel value="female" control={<Radio tabIndex={9} />} label="Female" />
                                <FormControlLabel value="male" control={<Radio tabIndex={10} />} label="Male" />
                                <FormControlLabel value="other" control={<Radio tabIndex={11} />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl component="fieldset" className={styles.formControl}>
                            <FormLabel component="legend" id="select-specialist-label">Solution specialist</FormLabel>
                            <RadioGroup
                                aria-label="selections"
                                name="solution_specialist"
                                onChange={handleValues}
                                value={values.solution_specialist.trim()}
                                className={styles.radioGroup}
                            >
                                <FormControlLabel value="Yes" control={<Radio tabIndex={12} />} label="Yes" />
                                <FormControlLabel value="No" control={<Radio tabIndex={13} />} label="No" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl className={styles.formControlXL}>
                            <TextField
                                id="input-addr"
                                name="address"
                                onChange={handleValues}
                                value={values.address}
                                label="Address"
                                variant="outlined"
                                className={styles.input}
                                inputProps={{ maxLength: 50, 'aria-label': 'naked', tabIndex: 14 }}
                            />
                        </FormControl>
                        <FormControl className={styles.formControlXL} required>
                            <FormLabel component="legend">Rights</FormLabel>
                            <FormGroup className={styles.chkGroup} >
                                <FormControlLabel
                                    control={<Checkbox checked={values.can_view && true} name="can_view" tabIndex={15}
                                        className={styles.checkbox} onClick={handleChange}
                                    />}
                                    label="View"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={values.can_create && true} name="can_create" tabIndex={16}
                                        className={styles.checkbox} />}
                                    onChange={handleChange}
                                    label="Create"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={values.edit_other && true} name="edit_other" tabIndex={17}
                                        className={styles.checkbox} />}
                                    onChange={handleChange}
                                    label="Edit others"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={values.gets_notified && true} name="gets_notified" tabIndex={18}
                                        className={styles.checkbox} />}
                                    onChange={handleChange}
                                    label="Get Notified"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={values.can_approve && true} name="can_approve" tabIndex={19}
                                        className={styles.checkbox} />}
                                    onChange={handleChange}
                                    label="Can Approve"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={Number(values.role_id) === 1 ? true : false} name="role_id" tabIndex={20}
                                        className={styles.checkbox} />}
                                    onChange={handleChange}
                                    label="Admin"
                                />
                            </FormGroup>
                        </FormControl>
                        <ButtonGroup variant="contained" className={styles.btnGroup} aria-label="form-actions">
                            <Button onClick={updateUser} className={styles.button} color="primary" tabIndex={20}>UPDATE</Button>
                            <Button onClick={redirectBack} className={styles.button} color="secondary" tabIndex={21}>CANCEL</Button>
                        </ButtonGroup>
                        <Box className={styles.detailsSection}>
                            <Typography variant="subtitle2">User Added : {moment(values.date_added).format('DD-MM-YYYY')}</Typography>
                            <Typography variant="subtitle2">User Updated : {moment(values.date_updated).format('DD-MM-YYYY')}</Typography>
                            {/* <Typography variant='subtitle2'>Created By : {'--'}</Typography>
                            <Typography variant='subtitle2'>Last Edited By : {'--'}</Typography> */}
                        </Box>
                    </Box>
                    : <Loader />
            }
        </>
    )
}

export default EditUserDetails
