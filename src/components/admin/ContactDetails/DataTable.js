import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableContainer,TableHead,TableRow,TableCell,Box,Button, TableBody, TextField,FormControl,InputLabel,Select,MenuItem } from '@material-ui/core';
import { useStyles } from '../Globals/styles';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import Loader from '../Loader';
import getContactDetailsAPI from '../../../apis/admin/getContactDetailsAPI';
import editContactDetailsAPI from '../../../apis/admin/editContactDetailsAPI';

toast.configure();
function DataTable(props) {

    const [Values,setValues] = React.useState([]);
    const [copiedRows,setCopiedRows] = React.useState([]);
    const [isData,setData] = React.useState(false);
    const [id,setId] = React.useState(0);

    const [isPopOpen,setPopOpen] = React.useState(false);
    const [iskey,setkey] = React.useState(-1);
    const [popCountry,setPopCountry] = React.useState('');
    const [popPhone,setPopPhone] = React.useState('');
    const [popEmail,setPopEmail] = React.useState('');
    const [isPopsEntered,setPopsEntered] = React.useState(false);

    const [conditions,setConditions] = React.useState({
        isPhoneCorrect: true,
        isMailCorrect: true,
    })

    const styles=useStyles();
    const {searchName} = props;

    React.useEffect(()=>{
        async function fetchData(){
            setData(false);
            const apiResponse = await getContactDetailsAPI();

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
                if(row.country_name.toLowerCase().trim().includes(searchName)
                    || row.phone_no.toLowerCase().trim().includes(searchName)
                    || row.email.toLowerCase().trim().includes(searchName)){
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
        if(popCountry?.length > 0 && popPhone?.length > 0 && popEmail?.length > 0 ){
            setPopsEntered(true);
        }
        else{
            setPopsEntered(false);
        }
    },[popCountry,popPhone,popEmail])

    React.useEffect(()=>{
        if(iskey !== -1){
            let pos = 0;
            for(let i=0;i<Values.length;i++){
                if(Values[i].id === iskey){
                    pos = i;
                }
            }
            setPopCountry(Values[pos].country_name);
            setPopPhone(Values[pos].phone_no);
            setPopEmail(Values[pos].email);
        }
    },[iskey,Values])

    const editDetails = async (id,entries) => {
        if(conditions.isMailCorrect && conditions.isPhoneCorrect){
            const apiResponse = await editContactDetailsAPI(id,entries);
            if(apiResponse.status !== 200){
                toast.info('Something went wrong!',{
                    autoClose: 2000,
                });
                toast.error('Cannot connect to server. Please Contact the Administrator',{
                    autoClose: 2000,
                });

                setPopOpen(false);
                setPopCountry('');
                setPopPhone('');
                setPopEmail('');
                setkey(-1);
                setId(0);
                setConditions({
                    isPhoneCorrect: true,
                    isMailCorrect: true,                        
                });
            }
            else{
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
                let resultArr = [...prevArr,{'country_name': popCountry,'id': iskey,'phone_no': popPhone,'email': popEmail},...endArr];
                setValues(resultArr);

                setPopOpen(false);
                setPopCountry('');
                setPopPhone('');
                setPopEmail('');
                setkey(-1);
                setId(0);
                setConditions({
                    isPhoneCorrect: true,
                    isMailCorrect: true,                        
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
            ? 
            <>
            <TableContainer className={styles.tableOutlay} style={{ maxWidth: '900px' }}>
            <Table className={styles.table}>
                <TableHead className={styles.tableHead}>
                    <TableRow>
                        <TableCell align="center">Operations</TableCell>
                        <TableCell align="center">Country</TableCell>
                        <TableCell align="center">Phone</TableCell>
                        <TableCell align="center">Email</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody className={styles.tableBody}>
                    {
                        copiedRows.map((item) => (
                            <TableRow key={item.email} className={styles.tableRow}>
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
                                    {item.phone_no}
                                </TableCell>
                                <TableCell align="center">
                                    {item.email}
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
                            setPopPhone('');
                            setPopEmail('');
                            setId(0);
                            setkey(-1);
                            setConditions({
                                isPhoneCorrect: true,
                                isMailCorrect: true,                        
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
                        id="input-phone-update"
                        value={popPhone}
                        onChange={(e)=>{
                            setPopPhone(e.target.value);
                            if((/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/.test(e.target.value)) && e.target.value.length > 0){
                                setConditions({...conditions,isPhoneCorrect : true});
                            }else{
                                setConditions({...conditions,isPhoneCorrect : false});
                            }                
                        }}
                        variant="outlined"
                        label="Enter new phone number"
                        inputProps={{tabIndex:2,maxLength:13}}
                        error={!conditions.isPhoneCorrect}
                    />
                    {
                        conditions.isPhoneCorrect
                        ? ''
                        : <p className={styles.helpText}>Phone Number field can not have Alphabets, Special characters and decimal values in it</p>
                    }
                    <TextField 
                        required
                        className={styles.inputPOP}
                        id="input-email-update"
                        value={popEmail}
                        onChange={(e)=>{
                            setPopEmail(e.target.value);
                            if(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(e.target.value) && e.target.value.length >= 4){
                                setConditions({...conditions,isMailCorrect : true});
                            }else{
                                setConditions({...conditions,isMailCorrect : false});
                            }
                        }}
                        variant="outlined"
                        label="Enter new email ID"
                        inputProps={{tabIndex:2,maxLength:50}}
                        error={!conditions.isMailCorrect}
                    />
                    {
                        conditions.isMailCorrect
                        ? ''
                        : <p className={styles.helpText}>Please enter a valid email Id</p>
                    }
                    {
                        isPopsEntered
                        ? <Button 
                        className={styles.ButtonPOP}
                        onClick={() => {
                            editDetails(id,{'country_name': popCountry,'id': iskey,'phone_no': popPhone,'email': popEmail});
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
