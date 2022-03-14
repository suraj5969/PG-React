import React , {useState} from 'react';
import { v4 as uuid } from 'uuid';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Table,TableContainer,TableHead,TableRow,TableCell,TableBody} from '@material-ui/core';
import { useStyles } from '../Globals/styles';
import getProductListAPI from '../../../apis/admin/getProductListAPI';
import Loader from '../Loader';

toast.configure()
function DataTable(props) {

    const {searchName} = props;
    const styles = useStyles();
    //const history = useHistory();

    const [isData,setData] = useState(false);
    
    //sample data
    const [rows,setRows] = React.useState([]);
    const [copiedRows,setCopiedRows] = React.useState([]);

    React.useEffect(()=>{
        async function fetchData(){
            const productList = await getProductListAPI();

            if(!productList.status === 200){
                toast.info('Something went wrong!',{
                    autoClose: 2000,
                });
                toast.error('Server down! Try again later',{
                    autoClose: 2000,
                });    
            }else{
                setRows(productList.data);
                setCopiedRows(productList.data);
                setData(true);
            }
        }
        fetchData();
    },[]);
    
    React.useEffect(()=>{
        if(searchName.length > 0 && isData){
            setData(false);
            let arr = [];
            rows.forEach((row)=>{
                if(row?.prdct_name.toLowerCase().includes(searchName) 
                    || row?.PRDCT_ID.toLowerCase().includes(searchName)
                    || row?.EFF_START_DT.toLowerCase().includes(searchName)
                    || row?.BU_NAME.toLowerCase().includes(searchName)){
                    arr.push(row);
                }
            })
            setCopiedRows(arr);
            setData(true);
        }else{
            setCopiedRows(rows);
            setData(true);
        }
    },[isData, rows, searchName]);

    return (
        <>
        {
        isData
        ? <TableContainer className={styles.tableOutlay} style={{ maxWidth: '950px' }}>
            <Table className={styles.table}>
                <TableHead className={styles.tableHead}>
                    <TableRow key={uuid()} className={styles.tableHeadRow}>
                        <TableCell align="center">Product Name</TableCell>
                        <TableCell align="center">Product ID (ISBN)</TableCell>
                        <TableCell align="center">STD Unit Price</TableCell>
                        <TableCell align="center">EFF Start Date</TableCell>
                        <TableCell align="center">Country</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className={styles.tableBody}>
                    {
                        copiedRows.map((row) => (
                            <TableRow key={uuid()} className={styles.tableRow}>
                                <TableCell align="center">
                                    {row.prdct_name}
                                </TableCell>
                                <TableCell align="center">{row.PRDCT_ID}</TableCell>
                                <TableCell align="center">${row.STD_UNIT_PRICE_AMT}</TableCell>
                                <TableCell align="center">{row.EFF_START_DT}</TableCell>
                                <TableCell align="center">{row.BU_NAME}</TableCell>
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
