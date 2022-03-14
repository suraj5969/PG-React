import React from 'react';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableContainer, TableHead, TableRow, TableCell, Box, Button, TableBody, TextField } from '@material-ui/core';
import { useStyles } from '../Globals/styles';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import Loader from '../Loader';
import getMiscellanousAPI from '../../../apis/admin/getMiscellanousAPI';
import editMiscellanousAPI from '../../../apis/admin/editMiscellanousAPI'

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
    const [popValue, setPopValue] = React.useState('');
    const [isPopsEntered, setPopsEntered] = React.useState(true);

    const [conditions, setConditions] = React.useState({
        isValueCorrect: true,
    })

    const styles = useStyles();

    React.useEffect(() => {
        async function fetchData() {
            setData(false);
            const apiResponse = await getMiscellanousAPI();
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
                if (row.name.toLowerCase().trim().includes(searchName)
                    || row.value.toLowerCase().trim().includes(searchName)) {
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
        if (popName?.length > 0 && popValue?.length > 0) {
            setPopsEntered(true);
        }
        else {
            setPopsEntered(false);
        }
    }, [popName, popValue])

    React.useEffect(() => {
        if (iskey !== -1) {
            let pos = 0;
            for (let i = 0; i < Values.length; i++) {
                if (Values[i].id === iskey) {
                    pos = i;
                }
            }
            setPopName(Values[pos].name);
            setPopValue(String(Values[pos].value));
        }
    }, [iskey, Values])

    const editMiscellanous = async (id, entries) => {
        if (conditions.isValueCorrect && popValue.length > 0) {
            const apiResponse = await editMiscellanousAPI(id, entries);
            if (apiResponse.status !== 200) {
                toast.info('Something went wrong!', {
                    autoClose: 2000,
                });
                toast.error('Cannot connect to server. Please Contact the Administrator', {
                    autoClose: 2000,
                });

                setPopOpen(false);
                setPopName('');
                setPopValue('');
                setkey(-1);
                setId(0);
                setConditions({
                    isValueCorrect: true,
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
                let resultArr = [...prevArr, { 'name': popName, 'id': iskey, 'value': popValue }, ...endArr];
                setValues(resultArr);
                setPopOpen(false);
                setPopName('')
                setPopValue('')
                setkey(-1);
                setId(0);
                setConditions({
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
                    ? <>
                        <TableContainer className={styles.tableOutlay} style={{ maxWidth: '650px' }}>
                            <Table className={styles.table}>
                                <TableHead className={styles.tableHead}>
                                    <TableRow>
                                        <TableCell align="center">Operations</TableCell>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Value</TableCell>
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
                                                                setId(key)
                                                                //popRef.current.focus()
                                                            }}>Edit</Button>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center">
                                                    {item.name}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {item.value}
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
                                                    setPopValue('');
                                                    setId(0);
                                                    setkey(-1);
                                                    setConditions({
                                                        isValueCorrect: true,
                                                    });
                                                }}
                                            >
                                                <ClearRoundedIcon className={styles.icons} />
                                            </Box>
                                            <TextField
                                                required
                                                className={styles.inputPOP}
                                                id="input-wording-update"
                                                value={popName}
                                                onChange={(e) => {
                                                    setPopName(e.target.value)
                                                }}
                                                variant="outlined"
                                                label="Name"
                                                disabled
                                            />
                                            <TextField
                                                required
                                                className={styles.inputPOP}
                                                id="input-value-update"
                                                value={popValue}
                                                onChange={(e) => {
                                                    setPopValue(e.target.value);
                                                    if (/^[a-zA-Z]{0,1}\.\d{1,2}\.\d{1,2}\.\d{1,2}$/.test(e.target.value)
                                                        || /^[0-9]+\.?[0-9]*$/.test(e.target.value)
                                                        || e.target.value.length === 0) {
                                                        setConditions({ ...conditions, isValueCorrect: true });
                                                    } else {
                                                        setConditions({ ...conditions, isValueCorrect: false });
                                                    }
                                                }}
                                                variant="outlined"
                                                label="Enter value"
                                                inputProps={{ maxLength: 10, tabIndex: 1 }}
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
                                                            editMiscellanous(id, { 'name': popName, 'id': iskey, 'value': popValue });
                                                        }}
                                                        tabIndex={2}
                                                    >save</Button>
                                                    : <Button
                                                        className={styles.ButtonPOPD}
                                                        tabIndex={3}
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
