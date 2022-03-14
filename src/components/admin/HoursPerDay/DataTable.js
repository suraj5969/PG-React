import React from 'react';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableContainer,TableHead,TableRow,TableCell,Box,Button, TableBody, TextField } from '@material-ui/core';
import { useStyles } from '../Globals/styles';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import Loader from '../Loader';
import getHoursPerDayAPI from '../../../apis/admin/getHoursPerDayAPI';
import editHoursPerDayAPI from '../../../apis/admin/editHoursPerDayAPI';

toast.configure();
function DataTable(props) {

    const {searchName} = props;

    const [Values,setValues] = React.useState([]);
    const [copiedRows,setCopiedRows] = React.useState([]);
    const [isData,setData] = React.useState(false);
    const [id,setId] = React.useState(0);

    const [isPopOpen,setPopOpen] = React.useState(false);
    const [iskey,setkey] = React.useState(-1);
    const [popCountry,setPopCountry] = React.useState('');
    const [popHours,setPopHours] = React.useState('');
    const [isPopsEntered,setPopsEntered] = React.useState(true);

    const [conditions,setConditions] = React.useState({
        isHoursCorrect: true,
    })

    const styles=useStyles();

    React.useEffect(()=>{
        async function fetchData(){
            setData(false);
            const apiResponse = await getHoursPerDayAPI();

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
                if(row.location.toLowerCase().trim().includes(searchName)
                    || row.hrs_per_days.toLowerCase().trim().includes(searchName)){
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
        if(popCountry.length > 0 && popHours.length > 0){
            setPopsEntered(true);
        }
        else{
            setPopsEntered(false);
        }
    },[popCountry,popHours])

    React.useEffect(()=>{
        if(iskey !== -1){
            let pos = 0;
            for(let i=0;i<Values.length;i++){
                if(Values[i].loc_id === iskey){
                    pos = i;
                }
            }
            setPopCountry(Values[pos].location);
            setPopHours(String(Values[pos].hrs_per_days));
        }
    },[iskey,Values])

    const editHoursPerDay = async (id,entries) => {
        if(conditions.isHoursCorrect){
            if(popHours.length > 0){
                const apiResponse = await editHoursPerDayAPI(id,entries);
                if(apiResponse.status !== 200){
                    toast.info('Something went wrong!',{
                        autoClose: 2000,
                    });
                    toast.error('Cannot connect to server. Please Contact the Administrator',{
                        autoClose: 2000,
                    });
    
                    setPopOpen(false);
                    setPopCountry('');
                    setPopHours('');
                    setkey(-1);
                    setId(0);  
                    setConditions({
                        isHoursCorrect: true,
                    });
                }else{
                    toast.success('Sucessfully Updated!',{
                        autoClose: 2000,
                    })    

                    let pos = 0;
                    for(let i=0;i<Values.length;i++){
                        if(Values[i].loc_id === iskey){
                            pos = i;
                        }
                    }
                    let prevArr = Values.slice(0,pos);
                    let endArr = Values.slice(pos+1,Values.length);
                    let resultArr = [...prevArr,{'location': popCountry,'loc_id': iskey,'hrs_per_days': popHours},...endArr];
                    setValues(resultArr);
                    setPopOpen(false);
                    setPopCountry('');
                    setPopHours('');
                    setId(0);
                    setkey(-1);
                    setConditions({
                        isHoursCorrect: true,
                    });
                }
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
                <TableContainer className={styles.tableOutlay} style={{ maxWidth: '600px' }}>
                <Table className={styles.table}>
                    <TableHead className={styles.tableHead}>
                        <TableRow>
                            <TableCell align="center">Operations</TableCell>
                            <TableCell align="center">Location</TableCell>
                            <TableCell align="center">Hours Per Day</TableCell>
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
                                            onClick={()=>{
                                                let key=item.loc_id;
                                                setPopOpen(true);
                                                setkey(key);
                                                setId(key);
                                                //popRef.current.focus()
                                            }}>Edit</Button>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.location}
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.hrs_per_days}
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
                                    setPopHours('');
                                    setId(0);
                                    setkey(-1);
                                    setConditions({
                                        isHoursCorrect: true,
                                    });
                                }}
                            >
                                <ClearRoundedIcon className={styles.icons}/>
                            </Box>
                            <TextField 
                                className={styles.inputPOP}
                                id="input-country-update"
                                value={popCountry}
                                onChange={(e)=>{
                                    setPopCountry(e.target.value)
                                }}
                                variant="outlined"
                                label="Location"
                                disabled
                            />
                            <TextField 
                                required
                                className={styles.inputPOP}
                                id="input-hours-update"
                                value={popHours}
                                onChange={(e)=>{
                                    setPopHours(e.target.value);
                                    if(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/.test(e.target.value)){
                                        setConditions({...conditions,isHoursCorrect : true});
                                    }else{
                                        setConditions({...conditions,isHoursCorrect : false});
                                    }        
                                }}
                                variant="outlined"
                                label="Hours Per Day"
                                inputProps={{maxLength:4,tabIndex:1}}
                                error={!conditions.isHoursCorrect}
                            />
                            {
                                conditions.isHoursCorrect
                                ? ''
                                : <p className={styles.helpText}>Alphabets and Special characters are not allowed</p>
                            }
                            {
                                isPopsEntered
                                ? <Button 
                                className={styles.ButtonPOP}
                                onClick={() => {
                                    editHoursPerDay(id,{'location': popCountry,'hrs_per_days': popHours});
                                }}
                                tabIndex={2}
                                >save</Button>
                                : <Button 
                                    className={styles.ButtonPOPD} 
                                    tabIndex={3}
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
