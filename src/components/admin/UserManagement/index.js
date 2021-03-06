import React from 'react';
import {Box} from '@material-ui/core';
import { useStyles } from '../Globals/styles';
import HeaderBar from '../Globals/HeaderBar';
import DataTable from './DataTable.js';

function UserManagement(props) {

    React.useEffect(() => {
        document.title = 'User Management';
    }, []);

    const {setNavopen} = props;

    const styles = useStyles();

    const [searchName,setsearchName] = React.useState('');

    return (
        <Box className={styles.inner}>
            <HeaderBar searchName={searchName} setsearchName={setsearchName} setNavopen={setNavopen} searchText="search user" addBut={true} isDisabled={false} isSearchAppear={true}/>
            <DataTable searchName={searchName}/>
        </Box>
    )
}

export default UserManagement
