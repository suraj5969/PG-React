import React from 'react';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableContainer, TableHead, TableRow, TableCell, Box, Button, TableBody, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useStyles } from '../Globals/styles';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import getWorkflowDetailsAPI from '../../../apis/admin/getWorkflowAPI';
import updateWorkflowAPI from '../../../apis/admin/updateWorkflowAPI';
import getUserDetailsAPI from '../../../apis/admin/getUserDetailsAPI.js';
import Loader from '../Loader'

toast.configure();
function DataTable(props) {

    const [Values, setValues] = React.useState([]);
    const [copiedRows, setCopiedRows] = React.useState([]);
    const [isPopOpen, setPopOpen] = React.useState(false);

    const [isData, setData] = React.useState(false);
    const [iskey, setkey] = React.useState(-1);
    const [popAUSuserId, setpopAUSuserId] = React.useState(-1);
    // const [popNZuserId, setpopNZuserId] = React.useState(-1);
    const [popRole, setpopRole] = React.useState('');
    const [isPopsEntered, setPopsEntered] = React.useState(true);

    const [allUsers, setAllUsers] = React.useState([]);
    const styles = useStyles();
    const { searchName } = props;

    React.useEffect(() => {
        async function fetchData() {
            const users = await getUserDetailsAPI();
            let allUsers = [];
            if (users.data instanceof Array && users.data.length > 0) {
                // console.log(users.data)
                allUsers = users.data.filter(user => Boolean(user.can_approve));
                setAllUsers(allUsers);
            }

            const getUserName = (user_id) => {
                const user = allUsers.filter(user => user.user_id === user_id);
                if (user.length > 0) return user[0].fname + ' ' + user[0].lname;
                return '';
            }

            const apiResponse = await getWorkflowDetailsAPI();
            // console.log(apiResponse);
            if (apiResponse.data instanceof Array && apiResponse.data.length > 0) {
                let workflow = apiResponse.data;
                for (let i = 0; i < workflow.length; i++) {
                    workflow[i]['aus_user_name'] = getUserName(workflow[i]['aus_user_id']);
                    // workflow[i]['nz_user_name'] = getUserName(workflow[i]['nz_user_id']);
                }
                setValues(workflow);
                setCopiedRows(workflow);
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
                if (row.role.toLowerCase().includes(searchName)) {
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
        if (popAUSuserId !== -1 && popRole?.length > 0) {
            setPopsEntered(true);
        }
        else {
            setPopsEntered(false);
        }
    }, [popAUSuserId, popRole])

    React.useEffect(() => {
        if (iskey !== -1) {
            let pos = 0;
            for (let i = 0; i < Values.length; i++) {
                if (Values[i].id === iskey) {
                    pos = i;
                }
            }
            setpopAUSuserId(Values[pos].aus_user_id);
            setpopRole(Values[pos].role);
        }
    }, [iskey, Values])

    const getUserName = (user_id) => {
        const user = allUsers.filter(user => user.user_id === user_id);
        if (user.length > 0) return user[0].fname + ' ' + user[0].lname;
        return '';
    }

    const updateTable = async (row_id, values) => {
        const apiResponse = await updateWorkflowAPI(row_id, values);
        // console.log(apiResponse)
        if (apiResponse.status === 200) {
            if (apiResponse.data?.status === 205) {
                toast.error(apiResponse.data?.data, {
                    autoClose: 2000,
                })
            } else {
                toast.success("Successfully Updated!", {
                    autoClose: 2000,
                })
            }
        } else {
            toast.error("Some Error Occurred. Please Try again later.", {
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
                        <TableContainer className={styles.tableOutlay} style={{ maxWidth: '700px' }}>
                            <Table className={styles.table}>
                                <TableHead className={styles.tableHead}>
                                    <TableRow>
                                        <TableCell align="center">Operations</TableCell>
                                        <TableCell align="center">Role</TableCell>
                                        <TableCell align="center">Pacific</TableCell>
                                        {/* <TableCell align="center">New Zealand</TableCell> */}
                                    </TableRow>
                                </TableHead>

                                <TableBody className={styles.tableBody}>
                                    {
                                        copiedRows.map((item, index) => (
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
                                                            }}>Edit</Button>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center">
                                                    {item.role}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {
                                                        item.aus_user_name
                                                    }
                                                </TableCell>
                                                {/* <TableCell align="center">
                                                    {
                                                        item.nz_user_name
                                                    }
                                                </TableCell> */}
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
                                                setpopAUSuserId(-1);
                                                // setpopNZuserId(-1);
                                                setpopRole('');
                                                setkey(-1);
                                            }}
                                        >
                                            <ClearRoundedIcon className={styles.icons} />
                                        </Box>
                                        <TextField
                                            required
                                            className={styles.inputPOP}
                                            id="input-role"
                                            value={popRole}
                                            variant="outlined"
                                            label="Role"
                                            disabled
                                        />
                                        <FormControl className={styles.formControl}>
                                            <InputLabel id="input-ausrole">Pacific</InputLabel>
                                            <Select
                                                labelId="input-ausrole-update"
                                                id="input-ausrole-updtae"
                                                value={popAUSuserId}
                                                onChange={(e) => {
                                                    // for (let i = 0; i < Values.length; i++) {
                                                    //     if (Values[i].aus_user_id === e.target.value || Values[i].nz_user_id === e.target.value) {
                                                    //         alert('Selected user is already a approver. Please select some other person');
                                                    //         return;
                                                    //     }
                                                    // }
                                                    setpopAUSuserId(e.target.value)
                                                }}
                                                className={styles.inputPOP}
                                                MenuProps={{ classes: { list: styles.menuList } }}
                                            // disabled={country !== 'Australia'}
                                            >
                                                {
                                                    allUsers.map((user) => (
                                                        <MenuItem key={user.user_id} value={user.user_id}>{user.fname + ' ' + user.lname}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                        {/* {
                                            <FormControl className={styles.formControl}>
                                                <InputLabel id="input-nzrole">New Zealand</InputLabel>
                                                <Select
                                                    labelId="input-nzrole-update"
                                                    id="input-nzrole-updtae"
                                                    value={popNZuserId}
                                                    onChange={(e) => {
                                                        setpopNZuserId(e.target.value)
                                                    }}
                                                    className={styles.inputPOP}
                                                    MenuProps={{ classes: { list: styles.menuList } }}
                                                >
                                                    {
                                                        allUsers.map((user) => (
                                                            <MenuItem key={user.user_id} value={user.user_id}>{user.fname + ' ' + user.lname}</MenuItem>
                                                        ))
                                                    }
                                                </Select>
                                            </FormControl>
                                        } */}
                                        {
                                            isPopsEntered
                                                ? <Button
                                                    className={styles.ButtonPOP}
                                                    onClick={() => {
                                                        let pos = 0;
                                                        for (let i = 0; i < Values.length; i++) {
                                                            if (Values[i].id === iskey) {
                                                                pos = i;
                                                            }
                                                        }
                                                        let prevArr = Values.slice(0, pos);
                                                        let endArr = Values.slice(pos + 1, Values.length);
                                                        let resultArr = [...prevArr, {
                                                            'role': popRole, 'id': iskey, 'aus_user_id': popAUSuserId, 'aus_user_name': getUserName(popAUSuserId)
                                                        }, ...endArr];
                                                        setValues(resultArr);
                                                        setPopOpen(false);
                                                        setpopAUSuserId(-1);
                                                        setpopRole('');
                                                        // setpopNZuserId(-1);
                                                        updateTable(iskey, { aus_user_id: popAUSuserId })
                                                    }}
                                                >save</Button>
                                                : <Button
                                                    className={styles.ButtonPOPD}
                                                    onClick={() => {
                                                        toast.error('Cannot save the changes', {
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
        </>
    )
}

export default DataTable
