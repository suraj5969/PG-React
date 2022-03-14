import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button, Box } from '@material-ui/core';
import { useStyles } from '../Globals/styles';
import Loader from '../Loader.js';
import getUserDetailsAPI from '../../../apis/admin/getUserDetailsAPI.js';
import toggleActiveAPI from '../../../apis/admin/toggleActiveAPI';

toast.configure();
function DataTable(props) {

    const { searchName } = props;
    const styles = useStyles();
    const history = useHistory();

    const [isData, setData] = React.useState(false);

    const userDetails = (id) => {
        history.push(`/admin/user-details/${id}`);
    }

    async function toggleActive(user_id, activeStat) {
        setData(false);
        const apiResponse = await toggleActiveAPI(user_id, { value: activeStat });
        if (apiResponse.status === 200) {
            if (activeStat === '1') {
                toast.info("User Inactivated!", {
                    autoClose: 2000,
                });
            } else {
                toast.success("User Activated!", {
                    autoClose: 2000,
                })
            }
        }
        fetchData();
        setData(true);
    }

    const [rows, setRows] = React.useState([]);
    const [copiedRows, setCopiedRows] = React.useState([]);

    async function fetchData() {
        const userDetails = await getUserDetailsAPI();

        if (userDetails.status !== 200) {
            toast.info('Something went wrong!', {
                autoClose: 2000,
            });
            toast.error('Server down! Try again later', {
                autoClose: 2000,
            });
        } else {
            setRows(userDetails.data);
            setCopiedRows(userDetails.data);
            setData(true);
        }
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    React.useEffect(() => {
        if (searchName.length > 0 && isData) {
            setData(false);
            let arr = [];
            rows.forEach((row) => {
                if (row.fname.toLowerCase().includes(searchName)
                    || row.lname.toLowerCase().includes(searchName)
                    || row.email.toLowerCase().includes(searchName)
                    || row.phone.includes(searchName)
                    || row.country.toLowerCase().includes(searchName)
                ) {
                    arr.push(row);
                }
            })
            setCopiedRows(arr);
            setData(true);
        } else {
            setCopiedRows(rows);
        }
    }, [isData, rows, searchName]);

    return (
        <>
            {
                isData
                    ? <TableContainer className={styles.tableOutlay}>
                        <Table className={styles.table}>
                            <TableHead className={styles.tableHead}>
                                <TableRow>
                                    <TableCell align="center">Operations</TableCell>
                                    <TableCell align="center">Email</TableCell>
                                    <TableCell align="center">Firstname</TableCell>
                                    <TableCell align="center">Lastname</TableCell>
                                    <TableCell align="center">Solution Specialist</TableCell>
                                    <TableCell align="center">Country</TableCell>
                                    <TableCell align="center">Admin</TableCell>
                                    <TableCell align="center">Phone</TableCell>
                                    {/* <TableCell align="center">Designation</TableCell> */}
                                    <TableCell align="center">Active/Inactive</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className={styles.tableBody}>
                                {
                                    copiedRows.map((row) => (
                                        <TableRow key={uuidv4()} className={styles.tableRow}>
                                            <TableCell align="center">
                                                <Box className={styles.ButtonBox}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        className={styles.Button1}
                                                        onClick={() => { userDetails(row?.user_id) }}
                                                    >Details</Button>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        className={styles.Button2}
                                                        onClick={() => toggleActive(row?.user_id, row.is_active)}>
                                                        {
                                                            Number(row?.is_active) === 1 ? 'Inactive' : 'Activate'
                                                        }
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                {row?.email}
                                            </TableCell>
                                            <TableCell align="center">{row?.fname}</TableCell>
                                            <TableCell align="center">{row?.lname}</TableCell>
                                            <TableCell align="center">{row?.solution_specialist}</TableCell>
                                            <TableCell align="center">{row?.country}</TableCell>
                                            <TableCell align="center">{Number(row?.role_id) === 1 ? 'Yes' : 'No'}</TableCell>
                                            <TableCell align="center">{row?.phone}</TableCell>
                                            {/* <TableCell align="center">--</TableCell> */}
                                            <TableCell align="center">{Number(row?.is_active) === 1 ? 'Active' : 'Inactive'}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : <Loader />
            }
        </>
    )
}

export default DataTable
