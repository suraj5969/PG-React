import React from 'react';
import { v4 as uuid } from 'uuid';
// import {useHistory} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableContainer, TableHead, TableRow, TableCell, Box, Button, TableBody, TextField, InputBase } from '@material-ui/core';
import HeaderBar from '../Globals/HeaderBar';
import { useStyles } from '../Globals/styles';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import Loader from '../Loader';
import getSoftwaresAPI from '../../../apis/admin/getSoftwaresAPI';
import deleteSoftwareAPI from '../../../apis/admin/deleteSoftwareAPI';
import addSoftwareAPI from '../../../apis/admin/addSoftwareAPI';
import editSoftwareAPI from '../../../apis/admin/editSoftwareAPI';

toast.configure();
function SoftwareManagement(props) {

    // const history = useHistory();

    const [Values, setValues] = React.useState([]);
    const [software, setSoftware] = React.useState('');
    const [isPopOpen, setPopOpen] = React.useState(false);
    const [iskey, setkey] = React.useState(-1);
    const [id, setId] = React.useState(0);
    const [popValue, setPopValue] = React.useState('');
    const [isPopsEntered, setPopsEntered] = React.useState(true);
    const [isData, setData] = React.useState(false);

    const [conditions, setConditions] = React.useState({
        isSoftwareCorrect: true,
        isPopSoftwareCorrect: true,
    });

    const [CopiedValues, setCopiedValues] = React.useState([]);

    const styles = useStyles();
    const { setNavopen } = props;

    React.useEffect(() => {
        async function fetchData() {
            const apiResponse = await getSoftwaresAPI();
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
                setCopiedValues(apiResponse.data);
                setData(true);
            }
        }
        fetchData();
    }, [])

    React.useEffect(() => {
        if (popValue?.length > 0) {
            setPopsEntered(true);
        }
        else {
            setPopsEntered(false);
        }
    }, [popValue])

    const popRef = React.useRef();

    const addSoftware = async () => {
        if (software.length > 0 && conditions.isSoftwareCorrect) {
            const apiResponse = await addSoftwareAPI({ 'soft_name': software, 'version': '1.0' });
            if (!apiResponse.status === 200) {
                toast.info('Something went wrong!', {
                    autoClose: 2000,
                });
                toast.error('Server down! Try again later', {
                    autoClose: 2000,
                });
                setSoftware('');
            } else {
                toast.success('Software Added!', {
                    autoClose: 2000,
                })
                setSoftware('');

                const apiResponse = await getSoftwaresAPI();
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
                    setCopiedValues(apiResponse.data);
                    setData(true);
                }
            }
            // console.log(apiResponse);
        } else {
            toast.info('Validation Failed!', {
                autoClose: 2000,
            })
        }
    }

    const editSoftware = async (entries) => {
        if (popValue?.length > 0 && conditions.isPopSoftwareCorrect) {
            const apiResponse = await editSoftwareAPI(id, entries);
            // console.log(apiResponse);
            if (apiResponse.status !== 200) {
                toast.info('Something went wrong!', {
                    autoClose: 2000,
                });
                toast.error('Server down! Try again later', {
                    autoClose: 2000,
                });
                setPopOpen(false);
                setPopValue('');
                setId(0);
                setkey(-1);
                setConditions({
                    isSoftwareCorrect: true,
                    isPopSoftwareCorrect: true,
                });
            } else {
                let pos = 0;
                for (let i = 0; i < CopiedValues.length; i++) {
                    if (CopiedValues[i].id === iskey) {
                        pos = i;
                    }
                }
                let prevArr = CopiedValues.slice(0, pos);
                let endArr = CopiedValues.slice(pos + 1, CopiedValues.length);
                let resultArr = [...prevArr, { 'soft_name': popValue, 'id': iskey, 'version': '1.0' }, ...endArr];
                setValues(resultArr);
                setCopiedValues(resultArr);
                setPopOpen(false);
                setPopValue('');
                setId(0);
                setkey(-1);
                setConditions({
                    isSoftwareCorrect: true,
                    isPopSoftwareCorrect: true,
                });

                toast.success('Updated Successfully!', {
                    autoClose: 2000,
                })
            }
        } else {
            toast.error('Validation Failed!', {
                autoClose: 2000,
            })
        }
    }

    React.useEffect(() => {
        if (iskey !== -1) {
            let pos = 0;
            for (let i = 0; i < Values.length; i++) {
                if (Values[i].id === iskey) {
                    pos = i;
                }
            }
            setPopValue(Values[pos]?.soft_name);
        }
    }, [iskey, Values]);

    const deleteSoftware = async (id, index) => {
        const apiResponse = await deleteSoftwareAPI(id);
        // console.log(apiResponse);
        if (apiResponse.status !== 200) {
            toast.info('Something went wrong!', {
                autoClose: 2000,
            });
            toast.error('Server down! Try again later', {
                autoClose: 2000,
            });
        } else {
            const softwares = CopiedValues.filter((item, itemIndex) => itemIndex !== index);
            setCopiedValues(softwares);
            toast.success('Software Deleted!', {
                autoClose: 2000,
            })
            // history.push('/admin/software-management');
        }
        // console.log(apiResponse);
    }

    return (
        <Box className={styles.inner} >
            <HeaderBar setNavopen={setNavopen} searchText="--disabled--" addBut={false} isDisabled={true} isSearchAppear={false} />
            {
                isData
                    ?
                    <>
                        <TableContainer style={{ maxWidth: '600px' }}>
                            <Box className={styles.headerWT}>
                                <InputBase
                                    className={styles.inputXL}
                                    placeholder="Enter Software Name"
                                    id="input-software-name"
                                    value={software}
                                    onChange={(e) => {
                                        setSoftware(e.target.value);
                                        if (/^[a-zA-Z]+$/.test(e.target.value.trim()) || e.target.value.length === 0) {
                                            setConditions({ ...conditions, isSoftwareCorrect: true });
                                        } else {
                                            setConditions({ ...conditions, isSoftwareCorrect: false });
                                        }
                                    }}
                                    onKeyDown={
                                        (e) => {
                                            if (e.key === "Enter") {
                                                addSoftware();
                                            }
                                        }
                                    }
                                    label="Enter Software Name"
                                    variant="outlined"
                                />
                                <Button
                                    className={styles.buttonXL}
                                    onClick={addSoftware}
                                    variant="contained"
                                    color="primary"
                                >Add Software</Button>
                            </Box>
                            {
                                conditions.isSoftwareCorrect
                                    ? ''
                                    : <p className={styles.helpText}>This feild cannot have Integer value, Special characters and decimal values in it.</p>
                            }
                            <Table className={styles.tableOutlay}>
                                <TableHead className={styles.tableHead}>
                                    <TableRow className={styles.tableHeadRow}>
                                        <TableCell align="center">Operations</TableCell>
                                        <TableCell align="center">Software Name</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody className={styles.tableBody}>
                                    {
                                        CopiedValues.map((item, index) => (
                                            <TableRow key={uuid()} className={styles.tableRow}>
                                                <TableCell align="center" className={styles.ButtonRow}>
                                                    <Box className={styles.ButtonBox}>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            className={styles.Button1}
                                                            onClick={() => {
                                                                setkey(item.id);
                                                                setPopOpen(true);
                                                                setId(item.id);
                                                                //popRef.current.focus()
                                                            }}>Edit</Button>
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            className={styles.Button2}
                                                            onClick={() => { deleteSoftware(item.id, index) }}
                                                        >InActive</Button>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center">
                                                    {item?.soft_name || '--'}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {
                            isPopOpen
                                ? <Box className={styles.popup}>
                                    <Box className={styles.innerpop}>
                                        <Box
                                            className={styles.popUPClose}
                                            onClick={() => {
                                                setPopOpen(false);
                                                setPopValue('');
                                                setId(0);
                                                setkey(-1);
                                                setConditions({
                                                    isSoftwareCorrect: true,
                                                    isPopSoftwareCorrect: true,
                                                });
                                            }}
                                        >
                                            <ClearRoundedIcon className={styles.icons} />
                                        </Box>
                                        <TextField
                                            className={styles.inputPOP}
                                            id="input-software-name-update"
                                            value={popValue}
                                            onChange={(e) => {
                                                setPopValue(e.target.value);
                                                if (/^[a-zA-Z ]+$/.test(e.target.value) || e.target.value.length === 0) {
                                                    setConditions({ ...conditions, isPopSoftwareCorrect: true });
                                                } else {
                                                    setConditions({ ...conditions, isPopSoftwareCorrect: false });
                                                }
                                            }}
                                            label="Enter new name here"
                                            variant="outlined"
                                            ref={popRef}
                                            error={!conditions.isPopSoftwareCorrect || popValue.length === 0}
                                        />
                                        {
                                            conditions.isPopSoftwareCorrect
                                                ? ''
                                                : <p className={styles.helpText}>User Cannot not have Integer value, Special characters and decimal values in it</p>
                                        }
                                        {
                                            isPopsEntered
                                                ? <Button
                                                    className={styles.ButtonPOP}
                                                    onClick={() => {
                                                        editSoftware({ 'soft_name': popValue, 'version': '1.0' })
                                                    }}
                                                >save</Button>
                                                : <Button
                                                    className={styles.ButtonPOPD}
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
                    : <Loader />
            }
        </Box>
    )
}

export default SoftwareManagement
