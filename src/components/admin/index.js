import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { makeStyles } from '@material-ui/core';
import NavbarAdmin from './NavbarAdmin';
import UserManagement from './UserManagement';
import NewUser from './NewUser';
import UserDetails from './UserDetails';
import EditUserDetails from './UserDetails/EditUser';
import MigrationOptions from './MigrationOptions';
import EditMigrations from './EditMigrations';
import ProductList from './ProductList';
import TrainingMethods from './TrainingMethods';
import SoftwareManagement from './SoftwareManagement';
import QuickServices from './QuickServices';
import ContactDetails from './ContactDetails';
import GSTpercentage from './GSTpercentage';
import WorkflowApproval from './WorkflowApproval';
import DayConvertion from './DayConvertion';
import HoursPerDay from './HoursPerDay';
import OracleWording from './OracleWording';
import Miscellaneous from './Miscellanous';
import Typography from '@mui/material/Typography';
import Loader from './Loader'

const useStyles = makeStyles({
    outer: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'row',
        position: 'relative',
    },
    outerBody: {
        width: '80%',
        height: '100vh',
        background: '#D9DDDC',
        overflow: 'auto',
        color: '#2D3F4B',
        // paddingLeft: '1.5rem',

        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

        '@media (max-width:1000px)': {
            width: '100%',
        },
    },
    zeroPadding: {
        padding: 'auto 300',
        width: '100%',
    }
})

function Admin() {

    const history = useHistory();

    const styles = useStyles();
    const layoutRef = React.useRef();
    const [isNavopen, setNavopen] = React.useState(true);

    const credentials = localStorage.getItem('credentials') || sessionStorage.getItem('credentials');
    if (!credentials) {
        history.push('/auth/login');
    }
    const role = sessionStorage.getItem('role');
    // if (credentials && Number(role) !== 1) {
    //     history.push('/access-error');
    // }

    return (
        !credentials
            ? <Loader />
            : Number(role) !== 1
                ? <Typography variant="h3">
                    You don't have access to this page.
                </Typography>
                : <>
                    <CssBaseline />
                    <Container maxWidth="xl" disableGutters={true}>
                        <Box className={styles.outer} ref={layoutRef} >
                            {
                                isNavopen
                                    ? <NavbarAdmin setNavopen={setNavopen}></NavbarAdmin>
                                    : ''
                            }
                            <Box className={styles.outerBody}>
                                <Switch>
                                    <Route exact path="/admin">
                                        <Redirect exact from="/" to="/admin/user-management" />
                                    </Route>
                                    <Route exact path="/admin/user-management">
                                        <UserManagement setNavopen={setNavopen} />
                                    </Route>
                                    <Route exact path="/admin/new-user">
                                        <NewUser />
                                    </Route>
                                    <Route exact path="/admin/user-details/:id">
                                        <UserDetails />
                                    </Route>
                                    <Route exact path="/admin/edit-user/:id">
                                        <EditUserDetails />
                                    </Route>
                                    <Route exact path="/admin/migration-options">
                                        <MigrationOptions setNavopen={setNavopen} />
                                    </Route>
                                    <Route exact path="/admin/edit-migrations/:id">
                                        <EditMigrations />
                                    </Route>
                                    <Route exact path="/admin/product-list">
                                        <ProductList setNavopen={setNavopen} />
                                    </Route>
                                    <Route exact path="/admin/trainings">
                                        <TrainingMethods setNavopen={setNavopen} />
                                    </Route>
                                    <Route exact path="/admin/software-management">
                                        <SoftwareManagement setNavopen={setNavopen} />
                                    </Route>
                                    <Route exact path="/admin/quick-services">
                                        <QuickServices setNavopen={setNavopen} />
                                    </Route>
                                    <Route exact path="/admin/contact-details">
                                        <ContactDetails setNavopen={setNavopen} />
                                    </Route>
                                    <Route exact path="/admin/gst-percentage">
                                        <GSTpercentage setNavopen={setNavopen} />
                                    </Route>
                                    <Route exact path="/admin/workflow-approval">
                                        <WorkflowApproval setNavopen={setNavopen} />
                                    </Route>
                                    <Route exact path="/admin/day-convertion">
                                        <DayConvertion setNavopen={setNavopen} />
                                    </Route>
                                    <Route exact path="/admin/hours-per-day">
                                        <HoursPerDay setNavopen={setNavopen} />
                                    </Route>
                                    <Route exact path="/admin/oracle-wording">
                                        <OracleWording setNavopen={setNavopen} />
                                    </Route>
                                    <Route exact path="/admin/miscellaneous">
                                        <Miscellaneous setNavopen={setNavopen} />
                                    </Route>
                                    <Route path='*'>
                                        <Typography variant="h3">
                                            This Page Dosen't Exist
                                        </Typography>
                                    </Route>
                                </Switch>
                            </Box>
                        </Box>
                    </Container>
                </>
    )
}

export default Admin;
