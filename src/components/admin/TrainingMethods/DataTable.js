import React from 'react';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableContainer, TableHead, TableRow, TableCell, Box, Button, TableBody, TextField, FormControl } from '@material-ui/core';
import { useStyles } from '../Globals/styles';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import moment from 'moment';
import Loader from '../Loader';
import getTrainingMethodsAPI from '../../../apis/admin/getTrainingMethodsAPI';
import editTrainingsAPI from '../../../apis/admin/editTrainingsAPI';

toast.configure();
function DataTable(props) {

    const { searchName } = props;

    const [Values, setValues] = React.useState([]);
    const [copiedRows, setCopiedRows] = React.useState([]);
    const [isData, setData] = React.useState(false);
    const [id, setId] = React.useState(0);

    const [isPopOpen, setPopOpen] = React.useState(false);
    const [iskey, setkey] = React.useState(-1);
    const [popName, setPopName] = React.useState('');
    const [popHours, setPopHours] = React.useState('');
    const [popDateAdded, setPopDateAdded] = React.useState('');
    const [popLastMod, setPopLastMod] = React.useState('');
    const [isPopsEntered, setPopsEntered] = React.useState(true);

    const [conditions, setConditions] = React.useState({
        isHoursCorrect: true,
        isDateAddedCorrect: true,
        isLastModifiedCorrect: true,
    })

    const styles = useStyles();

    React.useEffect(() => {
        async function fetchData() {
            setData(false);
            const trainingsDetails = await getTrainingMethodsAPI();

            if (trainingsDetails.status !== 200) {
                toast.info('Something went wrong!', {
                    autoClose: 2000,
                });
                toast.error('Cannot connect to server. Please Contact the Administrator', {
                    autoClose: 2000,
                });
            } else {
                setValues(trainingsDetails.data);
                setCopiedRows(trainingsDetails.data);
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
                if (row.training_name.toLowerCase().includes(searchName)
                    || String(row.HOURS).toLowerCase().includes(searchName)
                    || String(row.dateAdded).toLowerCase().includes(searchName)
                    || String(row.dateModified).toLowerCase().includes(searchName)) {
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
        if (popName.length > 0 && String(popHours).length > 0) {
            setPopsEntered(true);
        }
        else {
            setPopsEntered(false);
        }
    }, [popName, popHours])

    React.useEffect(() => {
        if (iskey !== -1) {
            let pos = 0;
            for (let i = 0; i < Values.length; i++) {
                if (Values[i].id === iskey) {
                    pos = i;
                }
            }
            setPopName(Values[pos].training_name);
            setPopHours(String(Values[pos].HOURS));
            setPopDateAdded(Values[pos].dateAdded);
            setPopLastMod(Values[pos].dateModified);
        }
    }, [iskey, Values])

    async function updateTrainings() {

        let entries = { 'training_name': popName, 'id': iskey, 'HOURS': popHours, 'dateAdded': popDateAdded, 'dateModified': popLastMod }


        if (conditions.isHoursCorrect
            && conditions.isDateAddedCorrect
            && conditions.isLastModifiedCorrect
            && popHours.length > 0) {
            const apiResponse = await editTrainingsAPI(id, entries);

            if (apiResponse.status !== 200) {
                toast.info('Something went wrong!', {
                    autoClose: 2000,
                });
                toast.error('Cannot connect to server. Please Contact the Administrator', {
                    autoClose: 2000,
                });

                setPopOpen(false);
                setPopName('');
                setPopHours('');
                setPopDateAdded('');
                setPopLastMod('');
                setkey(-1);
                setId(0);
                setConditions({
                    isHoursCorrect: true,
                    isDateAddedCorrect: true,
                    isLastModifiedCorrect: true,
                });
            } else {
                toast.success('Sucessfully Updated!', {
                    autoClose: 2000,
                })

                let pos = 0;
                for (let i = 0; i < Values.length; i++) {
                    if (Values[i].id === iskey) {
                        pos = i;
                    }
                }
                let prevArr = Values.slice(0, pos);
                let endArr = Values.slice(pos + 1, Values.length);
                let resultArr = [...prevArr, { 'training_name': popName, 'id': iskey, 'HOURS': popHours, 'dateAdded': popDateAdded, 'dateModified': popLastMod }, ...endArr];

                setValues(resultArr);
                setPopOpen(false);
                setPopName('');
                setPopHours('');
                setPopDateAdded('');
                setPopLastMod('');
                setkey(-1);
                setId(0);
                setConditions({
                    isHoursCorrect: true,
                    isDateAddedCorrect: true,
                    isLastModifiedCorrect: true,
                });
            }
        } else {
            toast.error('Validation Failed!', {
                autoClose: 2000,
            });
        }
    }

    return (
        <>
            {
                isData
                    ?
                    <>
                        <TableContainer className={styles.tableOutlay} style={{ maxWidth: '900px' }}>
                            <Table className={styles.table}>
                                <TableHead className={styles.tableHead}>
                                    <TableRow>
                                        <TableCell align="center">Operations</TableCell>
                                        <TableCell align="center">Training Name</TableCell>
                                        <TableCell align="center">Hours</TableCell>
                                        <TableCell align="center">Date Added</TableCell>
                                        <TableCell align="center">Last Modified</TableCell>
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
                                                                let key = item.id;
                                                                setPopOpen(true);
                                                                setkey(key);
                                                                setId(item.id);
                                                                //popRef.current.focus()
                                                            }}>Edit</Button>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center">
                                                    {item.training_name}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {item.HOURS}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {moment(item.dateAdded).format('DD-MM-YYYY')}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {moment(item.dateModified).format('DD-MM-YYYY')}
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
                                                    setPopName('');
                                                    setPopHours('');
                                                    setPopDateAdded('');
                                                    setPopLastMod('');
                                                    setId(0);
                                                    setkey(-1);
                                                    setConditions({
                                                        isHoursCorrect: true,
                                                        isDateAddedCorrect: true,
                                                        isLastModifiedCorrect: true,
                                                    });
                                                }}
                                            >
                                                <ClearRoundedIcon className={styles.icons} />
                                            </Box>
                                            <TextField
                                                required
                                                className={styles.inputPOP}
                                                id="input-name-update"
                                                value={popName}
                                                onChange={(e) => {
                                                    setPopName(e.target.value);
                                                }}
                                                variant="outlined"
                                                label="Training Name"
                                                disabled
                                            />
                                            <TextField
                                                required
                                                className={styles.inputPOP}
                                                id="input-hours-update"
                                                value={popHours}
                                                onChange={(e) => {
                                                    setPopHours(e.target.value);
                                                    if (/^[0-9]+[.]{0,1}[0-9]*$/.test(e.target.value)) {
                                                        setConditions({ ...conditions, isHoursCorrect: true })
                                                    } else {
                                                        setConditions({ ...conditions, isHoursCorrect: false })
                                                    }
                                                }}
                                                variant="outlined"
                                                label="Enter no of hours"
                                                inputProps={{ maxLength: 5, tabIndex: 1 }}
                                                error={!conditions.isHoursCorrect}
                                            />
                                            {
                                                conditions.isHoursCorrect
                                                    ? ''
                                                    : <p className={styles.helpText}>Decimal number field can not have Alphabet characters and Special characters in it</p>
                                            }
                                            <FormControl className={styles.inputPOP}>
                                                <TextField
                                                    label="Date added"
                                                    value={moment(popDateAdded).format('DD-MM-YYYY')}
                                                    tabIndex={2}
                                                    variant="outlined"
                                                    disabled
                                                />
                                            </FormControl>
                                            <FormControl className={styles.inputPOP}>
                                                <TextField
                                                    label="Last Modified Date"
                                                    value={moment(popLastMod).format('DD-MM-YYYY')}
                                                    tabIndex={2}
                                                    variant="outlined"
                                                    disabled
                                                />
                                            </FormControl>
                                            {
                                                isPopsEntered
                                                    ? <Button
                                                        className={styles.ButtonPOP}
                                                        onClick={() => {
                                                            updateTrainings();
                                                        }}
                                                        tabIndex={4}
                                                    >save</Button>
                                                    : <Button
                                                        className={styles.ButtonPOPD}
                                                        tabIndex={5}
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
