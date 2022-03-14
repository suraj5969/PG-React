import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableContainer,TableHead,TableRow,TableCell,Box,Button, TableBody, TextField,FormControl,InputLabel,Select,MenuItem } from '@material-ui/core';
import { useStyles } from '../Globals/styles';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import Loader from '../Loader';
import getGSTpercentageAPI from '../../../apis/admin/getGSTpercentageAPI';
import editGSTpercentageAPI from '../../../apis/admin/editGSTpercentageAPI';

toast.configure();
function DataTable(props) {

    const [Values,setValues] = React.useState([]);
    const [copiedRows,setCopiedRows] = React.useState([]);
    const [isData,setData] = React.useState(false);
    const [id,setId] = React.useState(0);

    const [isPopOpen,setPopOpen] = React.useState(false);
    const [iskey,setkey] = React.useState(-1);
    const [popCountry,setPopCountry] = React.useState('');
    const [popGST,setPopGST] = React.useState('');
    const [isPopsEntered,setPopsEntered] = React.useState(true);

    const [conditions,setConditions] = React.useState({
        isGSTCorrect: true,
    })

    const styles=useStyles();
    const {searchName} = props;

    React.useEffect(()=>{
        async function fetchData(){
            setData(false);
            const apiResponse = await getGSTpercentageAPI();

            if(apiResponse.status !== 200){
                toast.info('Something went wrong!',{
                    autoClose: 2000,
                });
                toast.error('Cannot connect to server. Please Contact the Administrator',{
                    autoClose: 2000,
                });
            }else{
                setValues(apiResponse.data);
                setCopiedRows(apiResponse.data);
                setData(true);
            }    
        }
        fetchData();
    },[]);

    React.useEffect(()=>{
        if(searchName.length > 0 && isData){
            setData(false);
            let arr = [];
            Values.forEach((row)=>{
                if(row.country_name.toLowerCase().trim().includes(searchName)){
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
        if(popCountry?.length > 0 && popGST?.length > 0 ){
            setPopsEntered(true);
        }
        else{
            setPopsEntered(false);
        }
    },[popCountry,popGST])

    React.useEffect(()=>{
        if(iskey !== -1){
            let pos = 0;
            for(let i=0;i<Values.length;i++){
                if(Values[i].id === iskey){
                    pos = i;
                }
            }
            setPopCountry(Values[pos].country_name);
            setPopGST(String(Values[pos].gst_percentage));
        }
    },[iskey,Values])

    const editGSTpercentage = async (id,entries) => {
        if(conditions.isGSTCorrect && popCountry.length > 0 && popGST.length > 0){
            const apiResponse = await editGSTpercentageAPI(id,entries);
            if(apiResponse.status !== 200){
                toast.info('Something went wrong!',{
                    autoClose: 2000,
                });
                toast.error('Cannot connect to server. Please Contact the Administrator',{
                    autoClose: 2000,
                });

                setPopOpen(false);
                setPopCountry('');
                setPopGST('');
                setkey(-1);
                setId(0);
                setConditions({
                    isGSTCorrect: true,
                });
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
                let resultArr = [...prevArr,{'country_name': popCountry,'id': iskey,'gst_percentage': popGST},...endArr];
                setValues(resultArr);
                setPopOpen(false);
                setPopCountry('');
                setPopGST('');
                setkey(-1);
                setId(0);
                setConditions({
                    isGSTCorrect: true,
                });
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
            <TableContainer className={styles.tableOutlay} style={{ maxWidth: '600px' }}>
            <Table className={styles.table}>
                <TableHead className={styles.tableHead}>
                    <TableRow>
                        <TableCell align="center">Operations</TableCell>
                        <TableCell align="center">Country Name</TableCell>
                        <TableCell align="center">GST</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody className={styles.tableBody}>
                    {
                        copiedRows.map((item) => (
                            <TableRow key={item.country_name} className={styles.tableRow}>
                                <TableCell align="center" className={styles.ButtonRow}>
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
                                <TableCell align="center">
                                    {item.country_name}
                                </TableCell>
                                <TableCell align="center">
                                    {item.gst_percentage}
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
                            setPopCountry('');
                            setPopGST('');
                            setId(0);
                            setkey(-1);
                            setConditions({
                                isGSTCorrect: true,
                            });
                        }}
                    >
                        <ClearRoundedIcon className={styles.icons}/>
                    </Box>
                    <FormControl variant="filled" className={styles.inputPOP}>
                        <InputLabel id="select-country-label">Select country</InputLabel>
                        <Select
                            labelId="select-country-label"
                            id="input-country-name-update"
                            onChange={(e)=>{
                                setPopCountry(e.target.value);
                            }}                                
                            value={popCountry}
                            className={styles.selectList}
                            inputProps={{tabIndex:1}}
                            disabled
                        >
                            <MenuItem value={'Australia'} >Australia</MenuItem>
                            <MenuItem value={'New Zealand'}>New Zealand</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField 
                        required
                        className={styles.inputPOP}
                        id="input-gst-update"
                        value={popGST}
                        onChange={(e)=>{
                            setPopGST(e.target.value);
                            if(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/.test(e.target.value)){
                                setConditions({...conditions,isGSTCorrect : true});
                            }else{
                                setConditions({...conditions,isGSTCorrect : false});
                            }
                        }}
                        variant="outlined"
                        label="Enter new GST value"
                        inputProps={{tabIndex:2,maxLength:10}}
                        error={!conditions.isGSTCorrect}
                    />
                    {
                        conditions.isGSTCorrect
                        ? ''
                        : <p className={styles.helpText}>Alphabets and Special characters are not allowed</p>
                    }
                    {
                        isPopsEntered
                        ? <Button 
                        className={styles.ButtonPOP}
                        onClick={() => {
                            editGSTpercentage(id,{'country_name': popCountry,'id': iskey,'gst_percentage': popGST});
                        }}
                        tabIndex={3}
                        >save</Button>
                        : <Button 
                            className={styles.ButtonPOPD} 
                            tabIndex={4}
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
