import React from 'react';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableContainer,TableHead,TableRow,TableCell,Box,Button, TableBody, TextField } from '@material-ui/core';
import { useStyles } from '../Globals/styles';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import clsx from 'clsx';
import Loader from '../Loader';
import getOracleWordingsAPI from '../../../apis/admin/getOracleWordingsAPI';
import editOracleWordingsAPI from '../../../apis/admin/editOracleWordingsAPI';

toast.configure();
function DataTable(props) {
    
    const {searchName} = props;

    const [Values,setValues] = React.useState([]);
    const [copiedRows,setCopiedRows] = React.useState([]);
    const [isData,setData] = React.useState(false);
    const [id,setId] = React.useState(0);

    const [isPopOpen,setPopOpen] = React.useState(false);
    const [iskey,setkey] = React.useState(-1);
    const [popWording,setPopWording] = React.useState('');
    const [popValue,setPopValue] = React.useState('');
    const [isPopsEntered,setPopsEntered] = React.useState(true);
    const styles=useStyles();

    React.useEffect(()=>{
        async function fetchData(){
            const apiResponse = await getOracleWordingsAPI();
            setValues(apiResponse.data);
            setCopiedRows(apiResponse.data);
            setData(true);
        }
        fetchData();
    },[]);

    React.useEffect(()=>{
        if(searchName.length > 0 && isData){
            setData(false);
            let arr = [];
            Values.forEach((row)=>{
                if(row.wordings.toLowerCase().trim().includes(searchName)
                    || row.value.toLowerCase().trim().includes(searchName)){
                    arr.push(row);
                }
            })
            setCopiedRows(arr);
            setData(true);
        }else{
            setCopiedRows(Values);
        }
    },[Values, isData, searchName]);

    React.useEffect(()=>{
        if(popWording?.length > 0 && popValue?.length > 0 ){
            setPopsEntered(true);
        }
        else{
            setPopsEntered(false);
        }
    },[popWording,popValue])

    React.useEffect(()=>{
        if(iskey !== -1){
            let pos = 0;
            for(let i=0;i<Values.length;i++){
                if(Values[i].id === iskey){
                    pos = i;
                }
            }
            setPopWording(Values[pos].wordings);
            setPopValue(String(Values[pos].value));
        }
    },[iskey,Values])

    const editOracleWordings = async (id,entries) => {
        if(popWording.length < 200 && popValue.length < 200){
            const apiResponse = await editOracleWordingsAPI(id,entries);
            if(apiResponse.status !== 200){
                toast.info('Something went wrong!',{
                    autoClose: 2000,
                });
                toast.error('Cannot connect to server. Please Contact the Administrator',{
                    autoClose: 2000,
                });

                setPopOpen(false);
                setPopWording('');
                setPopValue('');
                setkey(-1);
                setId(0);
            }else{
                toast.success('Sucessfully Updated!',{
                    autoClose: 2000,
                })

                let pos = 0;
                for(let i=0;i<Values.length;i++){
                    if(Values[i].id === iskey){
                        pos = i;
                    }
                }
                let prevArr = Values.slice(0,pos);
                let endArr = Values.slice(pos+1,Values.length);
                let resultArr = [...prevArr,{'wordings': popWording,'id': iskey,'value': popValue},...endArr];
                setValues(resultArr);
                setPopOpen(false);
                setPopWording('');
                setPopValue('');
                setId(0);
                setkey(-1);
            }
        }else{
            toast.error('Validation Failed!',{
                autoClose: 2000,
            })
        }
    }

    return (
        <>
        {
            isData
            ? <>
                <TableContainer className={styles.tableOutlay} style={{ maxWidth: '900px' }}>
                <Table className={styles.table}>
                    <TableHead className={styles.tableHead}>
                        <TableRow>
                            <TableCell align="center">Operations</TableCell>
                            <TableCell align="center">Wording</TableCell>
                            <TableCell align="center">Value</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody className={styles.tableBody}>
                        {
                            copiedRows.map((item) => (
                                <TableRow key={uuid()} className={styles.tableRow}>
                                    <TableCell align="center" className={clsx(styles.ButtonRow,styles.bigCell)}>
                                        <Box className={styles.ButtonBox}>
                                            <Button 
                                            variant="contained" 
                                            color="primary"
                                            className={styles.Button1}
                                            onClick={()=>{
                                                let key=item.id;
                                                setPopOpen(true);
                                                setkey(key);
                                                setId(item.id);
                                                //popRef.current.focus()
                                            }}>Edit</Button>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center" className={styles.bigCell}>
                                        {item.wordings}
                                    </TableCell>
                                    <TableCell align="center" className={styles.bigCell}>
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
                                onClick={()=>{
                                    setPopOpen(false);
                                    setPopWording('');
                                    setPopValue('');
                                    setId(0);
                                    setkey(-1);
                                }}
                            >
                                <ClearRoundedIcon className={styles.icons}/>
                            </Box>
                            <TextField 
                                required
                                className={styles.inputPOP}
                                id="input-wording-update"
                                value={popWording}
                                onChange={(e)=>{
                                    setPopWording(e.target.value)
                                }}
                                variant="outlined"
                                label="Enter new wording"
                                multiline
                                error={popWording.length > 200 || popWording.length === 0 ? true : false}
                            />
                            <TextField 
                                required
                                className={styles.inputPOP}
                                id="input-value-update"
                                value={popValue}
                                onChange={(e)=>{
                                    setPopValue(e.target.value);
                                }}
                                variant="outlined"
                                label="Enter value"
                                multiline
                                error={popValue.length > 200 || popValue.length === 0 ? true : false}
                            />
                            {
                                isPopsEntered
                                ? <Button 
                                className={styles.ButtonPOP}
                                onClick={() => {
                                    editOracleWordings(id,{'wordings': popWording,'value': popValue});
                                }}
                                >save</Button>
                                : <Button 
                                    className={styles.ButtonPOPD}
                                    onClick={()=>{
                                        toast.error('Fill the required fields before saving the changes!',{
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
