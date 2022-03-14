import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Login from './components/login';
import Admin from './components/admin';
import Client from './components/client';
import Loader from './components/admin/Loader';
import ForgotPassword from './components/ForgotPassword';
import PasswordReset from './components/PasswordReset';
import ResetPassword from './components/ResetPassword';
import verifyAPI from './apis/admin/verifyAPI.js';
import Typography from '@mui/material/Typography';

function App() {

  const history = useHistory();

  const [verified, setVerified] = React.useState(null);

  React.useEffect(() => {
    if (window.location.pathname.includes('forgot-password') ||
      window.location.pathname.includes('reset-password')) {
      setVerified(false);
      return;
    }
    const fetchData = async () => {
      let credentials = localStorage.getItem('credentials') || sessionStorage.getItem('credentials');
      // console.log('use effect called in app.js', credentials)
      if (credentials) {
        credentials = JSON.parse(credentials);
        if (credentials?.email && credentials?.password) {
          const apiResult = await verifyAPI(credentials);
          // console.log(apiResult)
          if (apiResult.status === 200 && apiResult.data instanceof Array
            && typeof apiResult.data[0] === "object") {
            if (apiResult.data.length > 0) {
              // console.log('in use effect of app.js')
              sessionStorage.setItem('role', apiResult.data[0].role_id);
              sessionStorage.setItem('fname', apiResult.data[0].fname);
              sessionStorage.setItem('lname', apiResult.data[0].lname);
              sessionStorage.setItem('user_id', apiResult.data[0].user_id);
              sessionStorage.setItem('solution_specialist', apiResult.data[0].solution_specialist.trim());
              sessionStorage.setItem('country', apiResult.data[0].country);
              sessionStorage.setItem('rights', JSON.stringify({
                'can_view': apiResult.data[0].can_view,
                'can_create': apiResult.data[0].can_create,
                'can_approve': apiResult.data[0].can_approve,
                'edit_other': apiResult.data[0].edit_other,
                'gets_notified': apiResult.data[0].gets_notified,
              }));

              setVerified(true);
              return;
            }
          }
        }
      }
      // this is going to execute if credentials are wrong or does not exist
      history.push('/auth/login');
      setVerified(false);
    }
    fetchData();
  }, [history]);

  //take care that you always check to not to push auth/login if the current page is on auth/login 
  //because it goes in infinite loop then 
  //don't use useLocation of react-router-dom for getting pathname  as it rerenders for every location change and create bugs here
  // if (verified !== null && !verified &&
  //   !window.location.pathname.includes('auth/login') && !window.location.pathname.includes('forgot-password')) {
  // history.push('/auth/login');
  // }

  return (
    verified === null
      ? <Loader />
      : <div>
        <Switch>
          <Route exact path="/">
            {
              Number(sessionStorage.getItem('role')) === 1
                ? <Redirect exact from="/" to="/admin" />
                : <Redirect exact from="/" to="/client" />
            }
          </Route>
          <Route path="/auth/login">
            <Login />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/reset-password/:token">
            <ResetPassword />
          </Route>
          <Route path="/change-password">
            <PasswordReset />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/client">
            <Client />
          </Route>
          <Route exact path='/access-error'>
            <Typography variant="h3">
              You don't have access to this page.
            </Typography>
          </Route>
          <Route path='*'>
            <Typography variant="h3">
              This Page Dosen't Exist
            </Typography>
          </Route>
        </Switch>
      </div >
  )
}

export default App;
