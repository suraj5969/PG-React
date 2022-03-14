import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { Box, FormControl, TextField, InputLabel, Select, MenuItem, RadioGroup, Radio, FormControlLabel, FormLabel, FormGroup, Checkbox, ButtonGroup, Button, InputAdornment, IconButton, OutlinedInput, Typography, } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useStyles } from './styles';
import createUserAPI from '../../../apis/admin/createUserAPI';
import Loader from '../Loader.js';

toast.configure();

function NewUser() {

    const styles = useStyles();
    const history = useHistory();

    const [values, setValues] = React.useState({
        email: '',
        password: '',
        fname: '',
        lname: '',
        phone: '',
        city: '',
        postal_code: '',
        country: '',
        gender: '',
        solution_specialist: '',
        address: '',
        can_view: true,
        can_create: false,
        can_approve: false,
        edit_other: false,
        gets_notified: false,
        date_added: new Date(),
        date_updated: new Date(),
        is_active: 1,
        role_id: 2,
    });

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

    const [isLoading, setLoading] = React.useState(false);

    const checkSubmit = () => {
        if (values.email.length > 4 && values.email.length < 81
            && values.password.length > 4 && values.password.length < 21
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
                && conditionals.isPasswordCorrect
                && conditionals.isPhoneCorrect
                && conditionals.isFirstnameCorrect
                && conditionals.isLastnameCorrect
                && conditionals.isCityCorrect
                && conditionals.isZIPCorrect
                && values.phone.length > 9
                && values.postal_code.length > 2
            ) {
                if (values.can_view === false && values.can_create === false && values.can_approve === false &&
                    values.edit_other === false && values.gets_notified === false) {
                    return "Please select rights of User";
                }
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
            if (!(values.password.length >= 4)) { setErrors({ ...errors, isPasswordError: true }) }
            if (!values.fname.length) { setErrors({ ...errors, isFnameError: true }) }
            if (!values.lname.length) { setErrors({ ...errors, isLnameError: true }) }
            if (!values.city.length) { setErrors({ ...errors, isCityError: true }) }
            if (!values.phone.length) { setErrors({ ...errors, isPhoneError: true }) }
            if (!values.postal_code.length) { setErrors({ ...errors, isZIPError: true }) }
            if (!values.address.length) { setErrors({ ...errors, isAddressError: true }) }
            if (!(values.country.length > 3)) { setErrors({ ...errors, isCountryError: true }) }
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

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setConditions({ ...conditionals, showPassword: !conditionals.showPassword });
    };

    const validatePassword = (key) => {
        if ((/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(key) && key.length > 5) || key.length <= 0) {
            setValues({ ...values, password: key });
            setConditions({ ...conditionals, isPasswordCorrect: true });
            setErrors({ ...errors, isPasswordError: false });
        }
        else {
            setValues({ ...values, password: key });
            setConditions({ ...conditionals, isPasswordCorrect: false });
            setErrors({ ...errors, isPasswordError: true });
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

    const createUser = async () => {
        const checkResponse = checkSubmit();
        if (checkResponse === 'Ok') {
            setLoading(true);
            let apiResponse = await createUserAPI(values);
            // console.log(apiResponse);
            if (apiResponse.status === 200) {
                if (apiResponse.data?.status === 205) {
                    toast.error(apiResponse.data?.data, {
                        autoClose: 2000,
                    })
                    setErrors({ ...errors, isMailError: true });
                    setLoading(false);
                } else {
                    toast.success("Successfully Added!", {
                        autoClose: 1500,
                    })
                    history.push("/admin/user-management");
                    setLoading(false);
                }
            } else {
                toast.error("Cannot connect to server. Please contact the Administrator", {
                    autoClose: 2000,
                });
                setLoading(false);
            }
        }
        else {
            toast.error(checkResponse, {
                autoClose: 2000,
            })
        }
    }

    const resetValues = (event) => {
        event.preventDefault()
        setValues({
            email: '',
            password: '',
            fname: '',
            lname: '',
            phone: '',
            city: '',
            postal_code: '',
            country: '',
            gender: '',
            solution_specialist: '',
            address: '',
            can_view: true,
            can_create: false,
            edit_other: false,
            gets_notified: false,
            can_approve: false,
            date_added: new Date(),
            date_updated: new Date(),
            is_active: 1,
            role_id: 2,
        })
    }

    const redirectBack = () => {
        history.push("/admin/user-management");
    }

    return (
        <>
            {
                isLoading
                    ? <Loader />
                    : <Box className={styles.inner} component="form" autoComplete="off" noValidate>
                        <Typography variant="h4" className={styles.headerText}>Create User</Typography>
                        <FormControl
                            className={
                                conditionals.isMailCorrect
                                    ? styles.formControl
                                    : styles.formControlErr
                            }
                        >
                            <TextField
                                required
                                id="input-mailID"
                                name="mail"
                                onChange={(e) => validateMail(e.target.value)}
                                value={values.email}
                                label="Email Address"
                                variant="outlined"
                                className={
                                    conditionals.isMailCorrect
                                        ? styles.input
                                        : styles.inputErr
                                }
                                inputProps={{ maxLength: 80, 'aria-label': 'naked', tabIndex: 1 }}
                                error={errors.isMailError}
                            />
                            {
                                conditionals.isMailCorrect
                                    ? ''
                                    : <p className={styles.helpText}>Please enter a valid email Id</p>
                            }
                        </FormControl>
                        <FormControl
                            className={
                                conditionals.isPasswordCorrect
                                    ? styles.formControl
                                    : styles.formControlErr
                            }
                            variant="outlined"
                        >
                            <InputLabel htmlFor="outlined-adornment-password" required>Password</InputLabel>
                            <OutlinedInput
                                required
                                id="Password"
                                name="password"
                                type={conditionals.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={
                                    (e) => {
                                        validatePassword(e.target.value);
                                    }
                                }
                                label="password"
                                variant="outlined"
                                className={
                                    conditionals.isPasswordCorrect
                                        ? styles.input
                                        : styles.inputErr
                                }
                                inputProps={{ maxLength: 20, 'aria-label': 'naked', tabIndex: 2 }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {
                                                conditionals.showPassword ?
                                                    <Visibility className={styles.icons} /> :
                                                    <VisibilityOff className={styles.icons} />
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={150}
                                error={errors.isPasswordError}
                            />
                            {
                                conditionals.isPasswordCorrect
                                    ? ''
                                    : <p className={styles.helpText}>
                                        1. Password Cannot be less than 8 Characters.
                                        <br />
                                        2. Password Should have at least one Capital/Uppercase letter.
                                        <br />
                                        3. Password Should have at least one Small/Lower-case letter.
                                        <br />
                                        4. Password Should have a Numerical in it.
                                        <br />
                                        5. Password Should have a Symbol in it.
                                    </p>
                            }
                        </FormControl>
                        <FormControl className={styles.formControl}>
                            <TextField
                                required
                                id="input-firstname"
                                name="fname"
                                onChange={handleValues}
                                value={values.fname}
                                label="Firstname"
                                variant="outlined"
                                className={styles.input}
                                inputProps={{ maxLength: 20, 'aria-label': 'naked', tabIndex: 3 }}
                                error={errors.isFnameError}
                            />
                            {
                                conditionals.isFirstnameCorrect
                                    ? ''
                                    : <p className={styles.helpText}>First Name sholud be at least 3 characters long and can not have Integer value, Special characters and decimal values in it</p>
                            }
                        </FormControl>
                        <FormControl className={styles.formControl}>
                            <TextField
                                required
                                id="input-lastname"
                                name="lname"
                                onChange={handleValues}
                                value={values.lname}
                                label="Lastname"
                                variant="outlined"
                                className={styles.input}
                                inputProps={{ maxLength: 20, 'aria-label': 'naked', tabIndex: 4 }}
                                error={errors.isLnameError}
                            />
                            {
                                conditionals.isLastnameCorrect
                                    ? ''
                                    : <p className={styles.helpText}>Last Name sholud be at least 3 characters long and can not have Integer value, Special characters and decimal values in it</p>
                            }
                        </FormControl>
                        <FormControl className={styles.formControl}>
                            <TextField
                                required
                                id="input-phone"
                                name="phone"
                                onChange={handleValues}
                                value={values.phone}
                                label="Phone No"
                                variant="outlined"
                                className={styles.inputMOB}
                                inputProps={{
                                    maxLength: 15,
                                    'aria-label': 'naked',
                                    inputMode: 'numeric',
                                    tabIndex: 5
                                }}
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
                                inputProps={{ maxLength: 20, tabIndex: 7 }}
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
                                required
                                id="input-zip"
                                name="postal_code"
                                onChange={handleValues}
                                value={values.postal_code}
                                label="ZIP code"
                                variant="outlined"
                                className={styles.input}
                                inputProps={{ maxLength: 8, tabIndex: 8 }}
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
                                required
                                labelId="select-country-label"
                                id="select-country"
                                name="country"
                                onChange={handleValues}
                                value={values.country}
                                className={styles.selectList}
                                error={errors.isCountryError}
                            >
                                <MenuItem value=''>None</MenuItem>
                                <MenuItem value='Australia' tabIndex={9}>Australia</MenuItem>
                                <MenuItem value='New Zealand' tabIndex={10}>New Zealand</MenuItem>
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
                                <FormControlLabel value="female" control={<Radio tabIndex={11} />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" tabIndex={12} />
                                <FormControlLabel value="other" control={<Radio />} label="Other" tabIndex={13} />
                            </RadioGroup>
                        </FormControl>
                        <FormControl component="fieldset" className={styles.formControl}>
                            <FormLabel component="legend" id="select-specialist-label">Solution specialist</FormLabel>
                            <RadioGroup
                                aria-label="selections"
                                name="solution_specialist"
                                onChange={handleValues}
                                value={values.solution_specialist}
                                className={styles.radioGroup}
                            >
                                <FormControlLabel value="Yes" control={<Radio tabIndex={14} />} label="Yes" />
                                <FormControlLabel value="No" control={<Radio tabIndex={15} />} label="No" />
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
                                inputProps={{ maxLength: 50, tabIndex: 16 }}
                                error={errors.isAddressError}
                            />
                        </FormControl>
                        <FormControl className={styles.formControlXL} required>
                            <FormLabel component="legend">Rights</FormLabel>
                            <FormGroup className={styles.chkGroup} required>
                                <FormControlLabel
                                    control={<Checkbox checked={values.can_view} onChange={handleChange} name="can_view" tabIndex={17} className={styles.checkbox} />}
                                    label="View"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={values.can_create} onChange={handleChange} name="can_create" tabIndex={18} className={styles.checkbox} />}
                                    label="Create"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={values.edit_other} onChange={handleChange} name="edit_other" tabIndex={19} className={styles.checkbox} />}
                                    label="Edit others"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={values.gets_notified} onChange={handleChange} name="gets_notified" tabIndex={20} className={styles.checkbox} />}
                                    label="Get Notified"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={values.can_approve} onChange={handleChange} name="can_approve" tabIndex={21} className={styles.checkbox} />}
                                    label="Can Approve"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={values.role_id === 1 ? true : false} onChange={handleChange} name="role_id" tabIndex={22} className={styles.checkbox} />}
                                    label="Admin"
                                />
                            </FormGroup>
                        </FormControl>
                        <ButtonGroup variant="contained" className={styles.btnGroup} aria-label="form-actions">
                            <Button onClick={createUser} className={styles.button} color="primary" tabIndex={22}>CREATE</Button>
                            <Button onClick={resetValues} className={styles.button} color="primary" tabIndex={23}>RESET</Button>
                            <Button onClick={redirectBack} className={styles.button} color="primary" tabIndex={24}>BACK</Button>
                        </ButtonGroup>
                    </Box>
            }
        </>
    )
}

export default NewUser
