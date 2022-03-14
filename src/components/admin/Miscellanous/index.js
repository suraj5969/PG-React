import React from 'react';
import {Box} from '@material-ui/core';
import { useStyles } from '../Globals/styles';
import HeaderBar from '../Globals/HeaderBar';
import DataTable from './DataTable';

function Miscellaneous(props) {

    const {setNavopen} = props;
    const styles = useStyles();
    
    const [searchName,setsearchName] = React.useState('');

    return (
        <Box className={styles.inner}>
            <HeaderBar searchName={searchName} setsearchName={setsearchName} setNavopen={setNavopen} searchText="search" addBut={false} isDisabled={false} isSearchAppear={true}/>
            <DataTable searchName={searchName}/>
        </Box>
    )
}

export default Miscellaneous
