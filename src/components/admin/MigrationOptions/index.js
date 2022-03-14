import React from 'react';
import {Box} from '@material-ui/core';
import HeaderBar from '../Globals/HeaderBar';
import DataTable from './DataTable';
import { useStyles } from '../Globals/styles';

function MigrationOptions(props) {

    const {setNavopen} = props;
    const styles = useStyles();
    
    const [searchName,setsearchName] = React.useState('');

    return (
        <Box className={styles.inner}>
            <HeaderBar searchName={searchName} setsearchName={setsearchName} setNavopen={setNavopen} searchText="search migration" addBut={false} isDisabled={false} isSearchAppear={true}/>
            <DataTable searchName={searchName}/>
        </Box>
    )
}

export default MigrationOptions
