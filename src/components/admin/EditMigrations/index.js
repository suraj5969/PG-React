import React from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Typography, FormControl, TextField, InputAdornment, ButtonGroup, Button } from '@material-ui/core';
import { useStyles } from '../NewUser/styles';
import getSingleMigrationAPI from '../../../apis/admin/getSingleMigrationAPI';
import editMigrationsAPI from '../../../apis/admin/editMigrationsAPI';
import Loader from '../Loader';

toast.configure();
function EditMigrations() {

    const { id } = useParams();

    const history = useHistory();
    const styles = useStyles();
    const [values, setValues] = React.useState([]);
    const [isData, setData] = React.useState(false);

    const [conditions, setConditionals] = React.useState({
        isCostCorrect: true,
        isDMhoursCorrect: true,
        isAccConHoursCorrect: true,
    })

    React.useEffect(() => {
        async function fetchData() {
            setData(false);
            const singleMigrations = await getSingleMigrationAPI(id);
            if (singleMigrations.status !== 200) {
                toast.info('Something went wrong!', {
                    autoClose: 2000,
                });
                toast.error('Server down! Try again later', {
                    autoClose: 2000,
                });
                history.push(`/admin/migration-options/`);
            } else {
                setValues(singleMigrations.data[0]);
                setData(true);
            }
        }
        fetchData();
    }, [id, history]);

    const handleValues = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        if (event.target.name === "more_than_ten_cost") {
            if (/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/.test(event.target.value) || event.target.value.length === 0) {
                setConditionals({ ...conditions, isCostCorrect: true });
            } else {
                setConditionals({ ...conditions, isCostCorrect: false });
            }
        }
        if (event.target.name === "dm_hours") {
            if (/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/.test(event.target.value) || event.target.value.length === 0) {
                setConditionals({ ...conditions, isDMhoursCorrect: true });
            } else {
                setConditionals({ ...conditions, isDMhoursCorrect: false });
            }
        }
        if (event.target.name === "account_consult_hrs") {
            if (/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/.test(event.target.value) || event.target.value.length === 0) {
                setConditionals({ ...conditions, isAccConHoursCorrect: true });
            } else {
                setConditionals({ ...conditions, isAccConHoursCorrect: false });
            }
        }
    }

    const updateMigration = async (e) => {
        e.preventDefault();
        setValues({ ...values, 'date_updated': moment().format() })
        let apiResponse = await editMigrationsAPI(id, values);
        // console.log('response : '+apiResponse);
        if (conditions.isCostCorrect
            && conditions.isDMhoursCorrect
            && conditions.isAccConHoursCorrect) {

            if (apiResponse.status !== 200) {
                toast.info('Something went wrong!', {
                    autoClose: 2000,
                });
                toast.error('Cannot connect to server. Please Contact the Administrator', {
                    autoClose: 2000,
                });
            } else {
                toast.success('Sucessfully Updated!', {
                    autoClose: 2000,
                })
                history.push("/admin/migration-options");
            }
        } else {
            toast.error('Validation Failed!', {
                autoClose: 2000,
            })
        }
    }

    const redirectBack = () => {
        history.push("/admin/migration-options");
    }

    return (
        <>
            {
                isData
                    ? <Box className={styles.inner}>
                        <Typography variant="h4" className={styles.headerText}>Edit Migration Details</Typography>
                        <FormControl className={styles.formControlMTL}>
                            <TextField
                                id="edit-migration-name"
                                name="migration_name"
                                onChange={handleValues}
                                value={values.migration_name}
                                label="Migration Name"
                                variant="outlined"
                                className={styles.input}
                                fullWidth
                                multiline
                                disabled
                            />
                        </FormControl>
                        <FormControl fullWidth className={styles.formControl}>
                            <TextField
                                id="edit-migartion-cost"
                                name="more_than_ten_cost"
                                label="Cost"
                                value={values.more_than_ten_cost}
                                onChange={handleValues}
                                sx={{ m: 1 }}
                                inputProps={{
                                    'aria-label': 'naked',
                                    tabIndex: 1,
                                    maxLength: 12,
                                }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                variant="outlined"
                            />
                            {
                                conditions.isCostCorrect
                                    ? ''
                                    : <p className={styles.helpText}>Decimal number field can not have Alphabet characters and Special characters in it</p>
                            }
                        </FormControl>
                        <FormControl fullWidth className={styles.formControl}>
                            <TextField
                                id="edit-migration-hours"
                                name="dm_hours"
                                label="DM Hours"
                                value={values.dm_hours}
                                onChange={handleValues}
                                sx={{ m: 1 }}
                                inputProps={{
                                    'aria-label': 'naked',
                                    tabIndex: 2,
                                    maxLength: 4,
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">Hr</InputAdornment>,
                                }}
                                variant="outlined"
                            />
                            {
                                conditions.isDMhoursCorrect
                                    ? ''
                                    : <p className={styles.helpText}>Decimal number field can not have Alphabet characters and Special characters in it</p>
                            }
                        </FormControl>
                        <FormControl fullWidth className={styles.formControl}>
                            <TextField
                                id="edit-migration-cHours"
                                name="account_consult_hrs"
                                label="Account Consultation Hours"
                                value={values.account_consult_hrs}
                                onChange={handleValues}
                                sx={{ m: 1 }}
                                inputProps={{
                                    'aria-label': 'naked',
                                    tabIndex: 3,
                                    maxLength: 4,
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">Hr</InputAdornment>,
                                }}
                                variant="outlined"
                            />
                            {
                                conditions.isAccConHoursCorrect
                                    ? ''
                                    : <p className={styles.helpText}>Decimal number field can not have Alphabet characters and Special characters in it</p>
                            }
                        </FormControl>
                        {/* <FormControl variant="filled" className={styles.formControl}>
                <InputLabel id="select-country-label">Country</InputLabel>
                <Select
                    labelId="select-country-label"
                    id="select-country"
                    name="country_name"
                    onChange={handleValues}
                    value={values.country_name}
                    className={styles.selectList}
                    variant='filled'
                >
                    <MenuItem value={'Australia'} tabIndex={4}>Australia</MenuItem>
                    <MenuItem value={'New Zealand'} tabIndex={5}>New Zealand</MenuItem>
                </Select>
            </FormControl> */}
                        <FormControl className={styles.formControlMTL}>
                            <TextField
                                id="edit-migration-comments"
                                name="comments"
                                onChange={handleValues}
                                value={values.comments}
                                label="Comments"
                                variant="outlined"
                                className={styles.input}
                                inputProps={{ tabIndex: 6, maxLength: 50, }}
                            />
                        </FormControl>
                        <ButtonGroup variant="contained" className={styles.btnGroup} aria-label="form-actions">
                            <Button onClick={updateMigration} className={styles.button} color="primary" tabIndex={7}>UPDATE</Button>
                            <Button onClick={redirectBack} className={styles.button} color="secondary" tabIndex={8}>CANCEL</Button>
                        </ButtonGroup>
                    </Box>
                    : <Loader />
            }
        </>
    )
}

export default EditMigrations
