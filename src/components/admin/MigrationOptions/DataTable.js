import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuid } from 'uuid';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button } from '@material-ui/core';
import { useStyles } from '../Globals/styles';
import getMigrationsAPI from '../../../apis/admin/getMigrationsAPI';
import Loader from '../Loader';

toast.configure();
function DataTable(props) {

    const { searchName } = props;
    const styles = useStyles();
    const history = useHistory();

    const [rows, setRows] = useState([]);
    const [copiedRows, setCopiedRows] = React.useState([]);
    const [isData, setData] = useState(false);

    useEffect(() => {
        setData(searchName)
    }, [setData, searchName])

    const editMigration = (id) => {
        history.push(`/admin/edit-migrations/${id}`);
    }

    React.useEffect(() => {
        async function fetchData() {
            const migrationOptions = await getMigrationsAPI();
            //setRows(migrationOptions);
            //setData(true);
            if (migrationOptions.status !== 200) {
                toast.info('Something went wrong!', {
                    autoClose: 2000,
                });
                toast.error('Cannot connect to server. Please Contact the Administrator', {
                    autoClose: 2000,
                });
            } else {
                setRows(migrationOptions.data);
                setCopiedRows(migrationOptions.data);
                setData(true);
            }
        }
        fetchData();
    }, []);

    React.useEffect(() => {
        if (searchName.length > 0 && isData) {
            setData(false);
            let arr = [];
            rows.forEach((row) => {
                if (row.migration_name.toLowerCase().includes(searchName)
                    // || row.country_name.toLowerCase().includes(searchName)
                    || String(row.more_than_ten_cost).toLowerCase().includes(searchName)
                    || String(row.dm_hours).toLowerCase().includes(searchName)
                    || String(row.account_consult_hrs).toLowerCase().includes(searchName)
                    || row.comments.toLowerCase().includes(searchName)) {
                    arr.push(row);
                }
            })
            setCopiedRows(arr);
            setData(true);
        } else {
            setCopiedRows(rows);
            setData(true);
        }
    }, [rows, isData, searchName]);

    return (
        <>
            {
                isData
                    ? <TableContainer className={styles.tableOutlay}>
                        <Table className={styles.table}>
                            <TableHead className={styles.tableHead}>
                                <TableRow className={styles.tableHeadRow}>
                                    <TableCell align="center">Operations</TableCell>
                                    <TableCell align="center">Migration Name</TableCell>
                                    <TableCell align="center">Cost</TableCell>
                                    {/* <TableCell align="center">Australia</TableCell>
                                    <TableCell align="center">New Zealand</TableCell> */}
                                    <TableCell align="center">DM Hours</TableCell>
                                    <TableCell align="center">Account Consultation Hours</TableCell>
                                    <TableCell align="center">Comment</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className={styles.tableBody}>
                                {
                                    copiedRows.map((row) => (
                                        <TableRow key={uuid()} className={styles.tableRow}>
                                            <TableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    className={styles.Button1}
                                                    onClick={() => editMigration(row?.migration_id)}>Edit</Button>
                                            </TableCell>
                                            <TableCell align="center">
                                                {row?.migration_name}
                                            </TableCell>
                                            <TableCell align="center">${row?.more_than_ten_cost}</TableCell>
                                            {/* <TableCell align="center">{Number(row?.australia) === 1 ? 'Yes' : 'No'}</TableCell>
                                            <TableCell align="center">{Number(row?.new_zealand) === 1 ? 'Yes' : 'No'}</TableCell> */}
                                            <TableCell align="center">{row?.dm_hours}</TableCell>
                                            <TableCell align="center">{row?.account_consult_hrs}</TableCell>
                                            <TableCell align="center">{row?.comments}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : <Loader />
            }
        </>
    )
}

export default DataTable
