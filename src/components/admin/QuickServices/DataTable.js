import React from 'react';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableContainer, TableHead, TableRow, TableCell, Box, Button, TableBody, TextField } from '@material-ui/core';
import { useStyles } from '../Globals/styles';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import Loader from '../Loader';
import getQuickServicesAPI from '../../../apis/admin/getQuickServicesAPI';
import editQuickServicesAPI from '../../../apis/admin/editQuickServicesAPI';

toast.configure();
function DataTable(props) {

    const [Values, setValues] = React.useState([]);
    const [copiedRows, setCopiedRows] = React.useState([]);
    const [isData, setData] = React.useState(false);
    const [id, setId] = React.useState(0);

    const [isPopOpen, setPopOpen] = React.useState(false);
    const [iskey, setkey] = React.useState(-1);
    const [popValue, setPopValue] = React.useState('');
    const [popHours, setPopHours] = React.useState('');
    const [isPopsEntered, setPopsEntered] = React.useState(true);

    const [conditions, setConditions] = React.useState({
        isServiceNameCorrect: true,
        isHoursCorrect: true,
    });

    const styles = useStyles();
    const { searchName } = props;

    React.useEffect(() => {
        async function fetchData() {
            const apiResponse = await getQuickServicesAPI();
            setData(false);
            if (apiResponse.status !== 200) {
                toast.info('Something went wrong!', {
                    autoClose: 2000,
                });
                toast.error('Server down! Try again later', {
                    autoClose: 2000,
                });
            } else {
                setValues(apiResponse.data);
                setCopiedRows(apiResponse.data);
                setData(true);
            }
        }
        fetchData();
    }, []);

    React.useEffect(() => {
        if (iskey !== -1) {
            let pos = 0;
            for (let i = 0; i < Values.length; i++) {
                if (Values[i].service_id === iskey) {
                    pos = i;
                }
            }
            setPopValue(Values[pos].service_name);
            setPopHours(String(Values[pos].nofhrs));
        }
    }, [iskey, Values])

    React.useEffect(() => {
        if (iskey >= 0) {
            if (popValue?.length > 0 && popHours?.length > 0) {
                setPopsEntered(true);
            }
            else {
                setPopsEntered(false);
            }
        }
    }, [popValue, popHours, iskey])


    React.useEffect(() => {
        if (searchName.length > 0 && isData) {
            setData(false);
            let arr = [];
            Values.forEach((row) => {
                if (row.service_name.toLowerCase().includes(searchName)
                    || String(row.nofhrs).includes(searchName)) {
                    arr.push(row);
                }
            })
            setCopiedRows(arr);
            setData(true);
        } else {
            setCopiedRows(Values);
        }
    }, [Values, isData, searchName]);

    async function updateQuickServices(id, entries) {
        if (conditions.isServiceNameCorrect && conditions.isHoursCorrect && popValue.length > 0 && popHours.length > 0) {
            const apiResponse = await editQuickServicesAPI(id, entries);

            if (apiResponse.status !== 200) {
                toast.info('Something went wrong!', {
                    autoClose: 2000,
                });
                toast.error('Server down! Try again later', {
                    autoClose: 2000,
                });
                setPopOpen(false);
                setPopValue('');
                setPopHours('');
                setId(0);
                setkey(-1);
                setConditions({
                    isServiceNameCorrect: true,
                    isHoursCorrect: true,
                });
            } else {
                let pos = 0;
                for (let i = 0; i < Values.length; i++) {
                    if (Values[i].service_id === iskey) {
                        pos = i;
                    }
                }
                let prevArr = Values.slice(0, pos);
                let endArr = Values.slice(pos + 1, Values.length);
                let resultArr = [...prevArr, { 'service_name': popValue, 'service_id': iskey, 'nofhrs': popHours }, ...endArr];
                setValues(resultArr);
                setPopOpen(false);
                setPopValue('');
                setPopHours('');
                setId(0);
                setkey(-1);
                setConditions({
                    isServiceNameCorrect: true,
                    isHoursCorrect: true,
                });

                toast.success('Updated Successfully!', {
                    autoClose: 2000,
                })
            }
        }
        else {
            toast.error('Validation Failed!', {
                autoClose: 2000,
            })
        }
    }

    return (
        <>
            {
                isData
                    ?
                    <>
                        <TableContainer className={styles.tableOutlay} style={{ maxWidth: '700px' }}>
                            <Table className={styles.table}>
                                <TableHead className={styles.tableHead}>
                                    <TableRow>
                                        <TableCell align="center">Operations</TableCell>
                                        <TableCell align="center">Service</TableCell>
                                        <TableCell align="center">Hours</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody className={styles.tableBody}>
                                    {
                                        copiedRows.map((item) => (
                                            <TableRow key={uuid()} className={styles.tableRow}>
                                                <TableCell align="center" className={styles.ButtonRow}>
                                                    <Box className={styles.ButtonBox}>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            className={styles.Button1}
                                                            onClick={() => {
                                                                let key = item.service_id;
                                                                setPopOpen(true);
                                                                setkey(key);
                                                                setId(item.service_id)
                                                            }}>Edit</Button>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center">
                                                    {item.service_name}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {item.nofhrs}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <>
                            {
                                isPopOpen
                                    ? <Box className={styles.popup}>
                                        <Box className={styles.innerpop}>
                                            <Box
                                                className={styles.popUPClose}
                                                onClick={() => {
                                                    setPopOpen(false);
                                                    setPopValue('');
                                                    setPopHours('');
                                                    setId(0);
                                                    setkey(-1);
                                                    setConditions({
                                                        isServiceNameCorrect: true,
                                                        isHoursCorrect: true,
                                                    });
                                                }}
                                            >
                                                <ClearRoundedIcon className={styles.icons} />
                                            </Box>
                                            <TextField
                                                className={styles.inputPOP}
                                                id="input-service-name-update"
                                                value={popValue}
                                                onChange={(e) => {
                                                    setPopValue(e.target.value.trim());
                                                    if (/^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/.test(e.target.value.toLowerCase().trim())) {
                                                        setConditions({ ...conditions, isServiceNameCorrect: true });
                                                    } else {
                                                        setConditions({ ...conditions, isServiceNameCorrect: false });
                                                    }
                                                }}
                                                variant="outlined"
                                                label="Enter new service here"
                                                inputProps={{ maxLength: 40, tabIndex: 1 }}
                                                error={!conditions.isServiceNameCorrect}
                                            />
                                            {
                                                conditions.isServiceNameCorrect
                                                    ? ''
                                                    : <p className={styles.helpText}>User Cannot not have Integer value, Special characters and decimal values in it.</p>
                                            }
                                            <TextField
                                                className={styles.inputPOP}
                                                id="input-hours-update"
                                                value={popHours}
                                                onChange={(e) => {
                                                    setPopHours(e.target.value.trim());
                                                    if (/^[0-9]+$/.test(e.target.value.toLowerCase().trim())) {
                                                        setConditions({ ...conditions, isHoursCorrect: true });
                                                    } else {
                                                        setConditions({ ...conditions, isHoursCorrect: false });
                                                    }
                                                }}
                                                variant="outlined"
                                                label="Enter no of hours"
                                                inputProps={{ maxLength: 4, tabIndex: 2 }}
                                                error={!conditions.isHoursCorrect}
                                            />
                                            {
                                                conditions.isHoursCorrect
                                                    ? ''
                                                    : <p className={styles.helpText}>Alphabets,Special characters and Empty values are not allowed.</p>
                                            }
                                            {
                                                isPopsEntered
                                                    ? <Button
                                                        className={styles.ButtonPOP}
                                                        onClick={() => {
                                                            updateQuickServices(id, { 'service_name': popValue, 'nofhrs': popHours })
                                                        }}
                                                        tabIndex={3}
                                                    >save</Button>
                                                    : <Button
                                                        className={styles.ButtonPOPD}
                                                        tabIndex={4}
                                                        onClick={() => {
                                                            toast.error('Fill the required fields before saving the changes!', {
                                                                autoClose: 2000,
                                                            })
                                                        }}
                                                    >save</Button>
                                            }
                                        </Box>
                                    </Box>
                                    : ''
                            }
                        </>
                    </>
                    : <Loader />
            }
        </>
    )
}

export default DataTable
