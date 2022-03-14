import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, FormControl, TextField, InputLabel, Select, MenuItem, RadioGroup, Radio, FormControlLabel, FormLabel, FormGroup, Checkbox, ButtonGroup, Button, Typography, } from '@material-ui/core';
import { useStyles } from '../NewUser/styles';
import deleteUserAPI from '../../../apis/admin/deleteUserAPI';
import getSingleUserDetailsAPI from '../../../apis/admin/getSingleUserDetailsAPI';
import moment from 'moment';
import Loader from '../Loader';

toast.configure();
function UserDetails() {

    let { id } = useParams();

    const styles = useStyles();
    const history = useHistory();

    const [isData, setData] = React.useState(false);
    const [values, setValues] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
            const userDetails = await getSingleUserDetailsAPI(id);

            if (userDetails.status !== 200) {
                toast.info('Something went wrong!', {
                    autoClose: 2000,
                });
                toast.error('Cannot connect to server. Please contact the Administrator', {
                    autoClose: 2000,
                });
                history.push("/admin/user-management");
            } else {
                setValues(userDetails.data[0]);
                setData(true);
            }
        }
        fetchData();
    }, [history, id]);

    const editUser = (e) => {
        e.preventDefault();
        history.push(`/admin/edit-user/${id}`);
    }

    const deleteUser = async (e) => {
        e.preventDefault();
        setData(false)
        const apiResponse = await deleteUserAPI(id);
        if (apiResponse.status !== 200) {
            console.log('deleteUserAPI not working');
            toast.error("Some Error Occured", {
                autoClose: 2000,
            });
        }
        setData(true);
        history.push("/admin/user-management");
    }

    const redirectBack = () => {
        history.push("/admin/user-management");
    }

    return (
        <>
            {
                isData
                    ? <Box className={styles.inner}>
                        <Typography variant="h4" className={styles.headerText}>User Details</Typography>
                        <FormControl
                            className={
                                styles.formControl
                            }
                        >
                            <TextField
                                id="input-mailID"
                                name="mail"
                                value={values.email}
                                label="Email Address"
                                variant="outlined"
                                className={styles.input}
                                disabled
                            />
                        </FormControl>
                        <FormControl className={styles.formControl}>
                            <TextField
                                id="input-firstname"
                                name="firstname"
                                value={values.fname}
                                label="Firstname"
                                variant="outlined"
                                className={styles.input}
                                disabled
                            />
                        </FormControl>
                        <FormControl className={styles.formControl}>
                            <TextField
                                id="input-lastname"
                                name="lastname"
                                value={values.lname}
                                label="Lastname"
                                variant="outlined"
                                className={styles.input}
                                disabled
                            />
                        </FormControl>
                        <FormControl className={styles.formControl}>
                            <TextField
                                id="input-phone"
                                name="phone"
                                value={values.phone}
                                label="Phone No (with country code)"
                                variant="outlined"
                                className={styles.input}
                                disabled
                            />
                        </FormControl>
                        <FormControl className={styles.formControl}>
                            <TextField
                                id="input-city"
                                name="city"
                                value={values.city}
                                label="city"
                                variant="outlined"
                                className={styles.input}
                                disabled
                            />
                        </FormControl>
                        <FormControl className={styles.formControl}>
                            <TextField
                                id="input-zip"
                                name="zip"
                                value={values.postal_code}
                                label="ZIP code"
                                variant="outlined"
                                className={styles.input}
                                disabled
                            />
                        </FormControl>
                        <FormControl variant="filled" className={styles.formControl}>
                            <InputLabel id="select-country-label">Country</InputLabel>
                            <Select
                                labelId="select-country-label"
                                id="select-country"
                                name="country"
                                value={values.country}
                                className={styles.selectList}
                                disabled
                            >
                                <MenuItem value={'Australia'}>Australia</MenuItem>
                                <MenuItem value={'New Zealand'}>New Zealand</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl component="fieldset" className={styles.formControl}>
                            <FormLabel component="legend" id="select-gender-label">Gender</FormLabel>
                            <RadioGroup
                                aria-label="gender"
                                name="gender"
                                value={values.gender}
                                className={styles.radioGroup}
                                disabled
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" disabled />
                                <FormControlLabel value="male" control={<Radio />} label="Male" disabled />
                                <FormControlLabel value="other" control={<Radio />} label="Other" disabled />
                            </RadioGroup>
                        </FormControl>
                        <FormControl component="fieldset" className={styles.formControl}>
                            <FormLabel component="legend" id="select-specialist-label">Solution specialist</FormLabel>
                            <RadioGroup
                                aria-label="selections"
                                name="solution_specialist"
                                value={values.solution_specialist.trim()}
                                className={styles.radioGroup}
                                disabled
                            >
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" disabled />
                                <FormControlLabel value="No" control={<Radio />} label="No" disabled />
                            </RadioGroup>
                        </FormControl>
                        <FormControl className={styles.formControlXL}>
                            <TextField
                                id="input-addr"
                                name="address"
                                value={values.address}
                                label="Address"
                                variant="outlined"
                                className={styles.input}
                                disabled
                            />
                        </FormControl>
                        <FormControl className={styles.formControlXL} required disabled>
                            <FormLabel component="legend">Rights</FormLabel>
                            <FormGroup className={styles.chkGroup} >
                                <FormControlLabel
                                    control={<Checkbox checked={values.can_view && true} name="view" className={styles.checkbox} />}
                                    label="View"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={values.can_create && true} name="create" className={styles.checkbox} />}
                                    label="Create"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={values.edit_other && true} name="editothers" className={styles.checkbox} />}
                                    label="Edit others"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={values.gets_notified && true} name="getnotified" className={styles.checkbox} />}
                                    label="Get Notified"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={values.can_approve && true} name="canapprove" className={styles.checkbox} />}
                                    label="Can Approve"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={Number(values.role_id) === 1 ? true : false} name="role_id" className={styles.checkbox} />}
                                    label="Admin"
                                />
                            </FormGroup>
                        </FormControl>
                        <ButtonGroup variant="contained" className={styles.btnGroup} aria-label="form-actions">
                            <Button onClick={editUser} className={styles.button} color="primary">EDIT</Button>
                            <Button onClick={deleteUser} className={styles.button} color="secondary">DELETE</Button>
                            <Button onClick={redirectBack} className={styles.button} color="primary">BACK</Button>
                        </ButtonGroup>
                        <Box className={styles.detailsSection}>
                            <Typography variant="subtitle2">User Added : {moment(values.date_added).format('DD-MM-YYYY')}</Typography>
                            <Typography variant="subtitle2">User Updated : {moment(values.date_updated).format('DD-MM-YYYY')}</Typography>
                            {/* <Typography variant="subtitle2">Created By : {'--'}</Typography>
                    <Typography variant="subtitle2">Last Edited By : {'--'}</Typography> */}
                        </Box>
                    </Box>
                    : <Loader />
            }
        </>
    )
}

export default UserDetails
