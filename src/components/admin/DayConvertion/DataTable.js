import React from 'react';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableContainer, TableHead, TableRow, TableCell, Box, Button, TableBody, TextField } from '@material-ui/core';
import { useStyles } from '../Globals/styles';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import Loader from '../Loader';
import getDayConversionsAPI from '../../../apis/admin/getDayConversionsAPI';
import editDayConversions from '../../../apis/admin/editDayConversionsAPI';

toast.configure();
function DataTable(props) {

    const [Values, setValues] = React.useState([]);
    const [copiedRows, setCopiedRows] = React.useState([]);
    const [isData, setData] = React.useState(false);
    const [id, setId] = React.useState(0);

    const [isPopOpen, setPopOpen] = React.useState(false);
    const [iskey, setkey] = React.useState(-1);
    const [popDay, setPopDay] = React.useState('');
    const [popValue, setPopValue] = React.useState('');
    const [isPopsEntered, setPopsEntered] = React.useState(true);

    const [conditions, setConditions] = React.useState({
        isDayCorrect: true,
        isValueCorrect: true,
    })

    const styles = useStyles();
    const { searchName } = props;

    React.useEffect(() => {
        async function fetchData() {
            setData(false);
            const apiResponse = await getDayConversionsAPI();

            if (apiResponse.status !== 200) {
                toast.info('Something went wrong!', {
                    autoClose: 2000,
                });
                toast.error('Cannot connect to server. Please Contact the Administrator', {
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
        if (searchName.length > 0 && isData) {
            setData(false);
            let arr = [];
            Values.forEach((row) => {
                if (row.DAY_NAME.toLowerCase().trim().includes(searchName)
                    || row.NO_OF_DAYS.toLowerCase().trim().includes(searchName)) {
                    arr.push(row);
                }
            })
            setCopiedRows(arr);
            setData(true);
        } else {
            setCopiedRows(Values);
        }
    }, [Values, isData, searchName]);

    React.useEffect(() => {
        if (popDay?.length > 0 && popValue?.length > 0) {
            setPopsEntered(true);
        }
        else {
            setPopsEntered(false);
        }
    }, [popValue, popDay])

    React.useEffect(() => {
        if (iskey !== -1) {
            let pos = 0;
            for (let i = 0; i < Values.length; i++) {
                if (Values[i].DAY_ID === iskey) {
                    pos = i;
                }
            }
            setPopDay(Values[pos].DAY_NAME);
            setPopValue(String(Values[pos].NO_OF_DAYS));
        }
    }, [iskey, Values])

    const updateTrainings = async (id, entries) => {
        if (conditions.isDayCorrect && conditions.isValueCorrect && popDay.length > 0 && popValue.length > 0) {
            const apiResponse = await editDayConversions(id, entries);
            if (apiResponse.status !== 200) {
                toast.error('Something went wrong! Please try again Later.', {
                    autoClose: 2000,
                });
                // toast.error('Cannot connect to server. Please Contact the Administrator', {
                //     autoClose: 2000,
                // });

                setPopOpen(false);
                setPopDay('');
                setPopValue('');
                setkey(-1);
                setId(0);
                setConditions({
                    isDayCorrect: true,
                    isValueCorrect: true,
                });
            } else {
                toast.success('Sucessfully Updated!', {
                    autoClose: 2000,
                })

                let pos = 0;
                for (let i = 0; i < Values.length; i++) {
                    if (Values[i].DAY_ID === iskey) {
                        pos = i;
                    }
                }
                let prevArr = Values.slice(0, pos);
                let endArr = Values.slice(pos + 1, Values.length);
                let resultArr = [...prevArr, { 'DAY_NAME': popDay, 'DAY_ID': iskey, 'NO_OF_DAYS': popValue }, ...endArr];
                setValues(resultArr);
                setPopOpen(false);
                setPopDay('');
                setPopValue();
                setId(0);
                setkey(-1);
                setConditions({
                    isDayCorrect: true,
                    isValueCorrect: true,
                });
            }
        } else {
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
                        <TableContainer className={styles.tableOutlay} style={{ maxWidth: '600px' }}>
                            <Table className={styles.table}>
                                <TableHead className={styles.tableHead}>
                                    <TableRow>
                                        <TableCell align="center">Operations</TableCell>
                                        <TableCell align="center">Day</TableCell>
                                        <TableCell align="center">Values</TableCell>
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
                                                                let key = item.DAY_ID;
                                                                setPopOpen(true);
                                                                setkey(key);
                                                                setId(item.DAY_ID);
                                                                //popRef.current.focus()
                                                            }}>Edit</Button>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center">
                                                    {item.DAY_NAME}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {item.NO_OF_DAYS}
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
                                                    setPopDay('');
                                                    setPopValue('');
                                                    setId(0);
                                                    setkey(-1);
                                                    setConditions({
                                                        isDayCorrect: true,
                                                        isValueCorrect: true,
                                                    });
                                                }}
                                            >
                                                <ClearRoundedIcon className={styles.icons} />
                                            </Box>
                                            <TextField
                                                required
                                                className={styles.inputPOP}
                                                id="input-day-update"
                                                value={popDay}
                                                disabled
                                                onChange={(e) => {
                                                    setPopDay(e.target.value);
                                                    if (/^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/.test(e.target.value.toLowerCase()) && e.target.value.length > 3) {
                                                        setConditions({ ...conditions, isDayCorrect: true });
                                                    } else {
                                                        setConditions({ ...conditions, isDayCorrect: false });
                                                    }
                                                }}
                                                variant="outlined"
                                                label="Day Name"
                                                inputProps={{ maxLength: 20, tabIndex: 1 }}
                                                error={!conditions.isDayCorrect}
                                            />
                                            {
                                                conditions.isDayCorrect
                                                    ? ''
                                                    : <p className={styles.helpText}>User Cannot not have Integer value, Special characters and decimal values in it.</p>
                                            }
                                            <TextField
                                                required
                                                className={styles.inputPOP}
                                                id="input-value-update"
                                                value={popValue}
                                                onChange={(e) => {
                                                    setPopValue(e.target.value);
                                                    if (/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/.test(e.target.value)) {
                                                        setConditions({ ...conditions, isValueCorrect: true });
                                                    } else {
                                                        setConditions({ ...conditions, isValueCorrect: false });
                                                    }
                                                }}
                                                variant="outlined"
                                                label="Enter new value"
                                                inputProps={{ maxLength: 4, tabIndex: 2 }}
                                                error={!conditions.isValueCorrect}
                                            />
                                            {
                                                conditions.isValueCorrect
                                                    ? ''
                                                    : <p className={styles.helpText}>Alphabets and Special characters are not allowed</p>
                                            }
                                            {
                                                isPopsEntered
                                                    ? <Button
                                                        className={styles.ButtonPOP}
                                                        onClick={() => {
                                                            updateTrainings(id, { 'DAY_NAME': popDay, 'DAY_ID': iskey, 'NO_OF_DAYS': popValue });
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
