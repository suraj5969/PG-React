import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import Loader from '../admin/Loader'
import NewProposal from "./NewProposal";
import Table from "./Dashboard/Table";
import ViewProposal from './ViewProposal';
import EditProposal from './EditProposal';
import Profile from './Profile';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
    outer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

        position: 'relative',
    },
    outerBody: {
        width: '80%',
        height: '100vh',
        background: '#D9DDDC',
        overflow: 'auto',
        color: '#2D3F4B',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',

        '@media (max-width:1000px)': {
            width: '100%',
        },
    },
})

function Client() {

    const history = useHistory();

    const styles = useStyles();

    //const [dimensions, setDimensions] = React.useState({ 
    //    height: window.innerHeight,
    //    width: window.innerWidth
    //})
    //
    //React.useEffect(() => {
    //    function handleResize() {
    //        setDimensions({
    //            height: window.innerHeight,
    //            width: window.innerWidth
    //        })
    //    
    //    }
    //    window.addEventListener('resize', handleResize)
    //})
    //
    //React.useEffect(()=>{
    //    setNavopen(true);
    //},[dimensions])

    const credentials = localStorage.getItem('credentials') || sessionStorage.getItem('credentials');

    if (!credentials) {
        history.push('/auth/login');
    }

    const refresh = sessionStorage.getItem('refresh');
    // console.log('client component called');
    if(!refresh && credentials) {
        sessionStorage.setItem('refresh', '1');
        window.location.reload();
    }
    // if(refresh === '1') {
    //     sessionStorage.removeItem('refresh');
    // }

    return (
        !credentials
            ? <Loader />
            : <Box className={styles.outer} >
                <Switch>
                    <Route exact path="/client">
                        <Redirect to="/client/dashboard" />
                    </Route>
                    <Route exact path="/client/dashboard">
                        <Table />
                    </Route>
                    <Route exact path="/client/new-proposal">
                        <NewProposal />
                    </Route>
                    <Route exact path="/client/view-proposal/:proposal_no">
                        <ViewProposal />
                    </Route>
                    <Route exact path="/client/edit-proposal/:proposal_no">
                        <EditProposal />
                    </Route>
                    <Route exact path="/client/user-profile">
                        <Profile />
                    </Route>
                    <Route path='*'>
                        <Typography variant="h3">
                            This Page Dosen't Exist
                        </Typography>
                    </Route>
                </Switch>
            </Box>
    )
}

export default Client;
