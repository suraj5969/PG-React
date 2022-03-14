import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Avatar from '@mui/material/Avatar';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SwitchAccountRoundedIcon from '@mui/icons-material/SwitchAccountRounded';
import Logout from '@mui/icons-material/Logout';
import { teal } from '@mui/material/colors';
import { useStyles } from './styles';
import { useHistory, Link } from 'react-router-dom';
import getDashboardSlnSpecialistAPI from '../../../../apis/client/getDashboardSlnSpecialistAPI.js'
import getWorkflowAPI from '../../../../apis/admin/getWorkflowAPI.js';
import getUserDetailsAPI from '../../../../apis/admin/getUserDetailsAPI.js';
import './Header.css';



const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[500],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function Header(props) {

  const { setFilterOptions } = props;

  const history = useHistory();

  const styles = useStyles();

  const [approvalStatusID, setApprovalStatusID] = React.useState(0);
  const handleApprovalStatusChange = (event) => {
    setApprovalStatusID(event.target.value);
  };

  const [allNextApprover, setAllNextApprover] = React.useState([]);
  const [nextApproverID, setnextApproverID] = React.useState(0);
  const handleNextApproverChange = (event) => {
    setnextApproverID(event.target.value);
  };

  const [AllsolutionSpecialist, setAllSolutionSpecialist] = React.useState([]);
  const [solutionSpecialistID, setSolutionSpecialistID] = React.useState(0);
  const handleSolutionSpecialistChange = (event) => {
    setSolutionSpecialistID(event.target.value);
  };

  const [lifecycleID, setLifecycleID] = React.useState(1);
  const handleLifecycleChange = (event) => {
    setLifecycleID(event.target.value);
  };

  let fname = sessionStorage.getItem('fname') || 'User';
  fname = fname.length > 7 ? fname.substring(0, 6) + '...' : fname;

  React.useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {

      const getUserName = (allUsers, user_id) => {
        const user = allUsers.filter(user => user.user_id === user_id);
        if (user.length > 0) return user[0].fname + ' ' + user[0].lname;
        return '';
      }
      const workflow = await getWorkflowAPI();
      const users = await getUserDetailsAPI();

      const country = sessionStorage.getItem('country') || '';
      // console.log(country, users, 'users')
      if (workflow.status !== 200 || users.status !== 200) {
        console.log('getWorkflowAPI  or getUserDetailsAPI is not working');
      }
      else {
        if (typeof workflow.data === 'object' && workflow.data.length > 0 &&
          typeof users.data === 'object' && users.data.length > 0) {
          // console.log('calling')
          if (isMounted) {
            if (country === 'Australia') {
              setAllNextApprover([
                { user_id: workflow.data[0]?.aus_user_id, user_name: getUserName(users.data, workflow.data[0]?.aus_user_id) }, // 4 for pending for sales approval
                { user_id: workflow.data[1]?.aus_user_id, user_name: getUserName(users.data, workflow.data[1]?.aus_user_id) }, // 5 for pending for commercial lead approval
                { user_id: workflow.data[2]?.aus_user_id, user_name: getUserName(users.data, workflow.data[2]?.aus_user_id) }, // 6 for cfo approval
                { user_id: workflow.data[3]?.aus_user_id, user_name: getUserName(users.data, workflow.data[3]?.aus_user_id) }, // 7 for ops approval
              ])
            }
            else if (country === 'New Zealand') {
              setAllNextApprover([
                { user_id: workflow.data[0]?.nz_user_id, user_name: getUserName(users.data, workflow.data[0]?.nz_user_id) }, // 4 for pending for sales approval
                { user_id: workflow.data[1]?.nz_user_id, user_name: getUserName(users.data, workflow.data[1]?.nz_user_id) }, // 5 for pending for commercial lead approval
                { user_id: workflow.data[2]?.nz_user_id, user_name: getUserName(users.data, workflow.data[2]?.nz_user_id) }, // 6 for cfo approval
                { user_id: workflow.data[3]?.nz_user_id, user_name: getUserName(users.data, workflow.data[3]?.nz_user_id) }, // 7 for ops approval
              ])
            }
          }
        }
      }
    }
    fetchData();

    return () => {
      isMounted = false;
    }
  }, [])

  React.useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const country = sessionStorage.getItem('country') || '';
      const solSpecialist = await getDashboardSlnSpecialistAPI(country);
      // console.log(solSpecialist,'solSpecialist.data')
      if (solSpecialist.status !== 200) {
        console.log('getAllSolutionSpecialistAPI is not working');
      }
      else {
        if (solSpecialist.data instanceof Array && solSpecialist.data.length > 0 && isMounted) {
          setAllSolutionSpecialist(solSpecialist.data);
          // console.log(solSpecialist.data,'solSpecialist.data')
        }
      }
    }
    fetchData();

    return () => {
      isMounted = false;
    }
  }, [])

  React.useEffect(() => {
    setFilterOptions({
      approvalStatusID: approvalStatusID,
      nextApproverID: nextApproverID,
      solutionSpecialistID: solutionSpecialistID,
      lifecycleID: lifecycleID
    })
  }, [approvalStatusID, nextApproverID, solutionSpecialistID, lifecycleID, setFilterOptions])


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    handleClose();
    sessionStorage.clear();
    localStorage.clear();
    history.push("/auth/login");
  }

  const handleChangePassword = () => {
    history.push("/change-password");
  }

  const handleProfile = () => {
    handleClose();
    history.push("/client/user-profile");
  }

  const role = Number(sessionStorage.getItem('role'));
  const switchToAdmin = () => {
    handleClose();
    history.push("/admin");
  }


  const rights = JSON.parse(sessionStorage.getItem('rights')) || {};

  return (
    <Box sx={{ flexGrow: 1, maxWidth: '1400px', width: '100%', margin: { sm: '0 auto', xl: '20px auto 0 auto' } }} >
      <AppBar position="static" style={{ background: 'white', boxShadow: 'none' }} sx={{ paddingBottom: { xs: '0.5rem', md: 0 } }}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item xl={1.8} md={1.8} sm={4} sx={{ p: 0 }}>
              <Link to="/client/dashboard" >
                <img src="/lexisnexis.png" alt="logo" style={{ width: '100%', maxWidth: '160px', paddingLeft: '0' }} />
              </Link>
            </Grid>
            <Grid item container spacing={2} xl={2.1} md={2.5} sm={5} sx={{ marginLeft: { xs: 0 }, marginTop: { sm: 0, md: 1 } }}>
              <Button
                disabled={Number(rights.can_create) !== 1}
                variant="contained" className="header-button" title='Create New Proposal'
                onClick={() => history.push('/client/new-proposal')}>
                New Proposal
              </Button>
              {/* <Button variant="contained" className="header-button" title='export records to excel'>Export</Button> */}
            </Grid>

            <Grid item container xl={7.2} md={7} sm={11.5} xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'around' }} wrap="wrap" >
              <Grid item xl={3.6} md={3.1} sm={4} xs={12} >
                <FormControl fullWidth>
                  <InputLabel id="approval-status" style={{ color: 'black' }}>Approval Status</InputLabel>
                  <Select
                    labelId="approval-status"
                    id="approval-status-select"
                    value={approvalStatusID}
                    label="Approval Status"
                    onChange={handleApprovalStatusChange}
                  >
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={1}>Rejected</MenuItem>
                    <MenuItem value={2}>Not Submitted for Approval</MenuItem>
                    <MenuItem value={3}>Proposal without GCRM client</MenuItem>
                    <MenuItem value={4}>Pending for Sales Approval</MenuItem>
                    <MenuItem value={5}>Pending for Commercial Lead Approval</MenuItem>
                    <MenuItem value={6}>Pending for CFO Approval</MenuItem>
                    <MenuItem value={7}>Pending for Ops Team Approval</MenuItem>
                    <MenuItem value={8}>Approved</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xl={2.6} md={2.7} sm={3.8} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="next-approver" style={{ color: 'black' }}>Next Approver</InputLabel>
                  <Select
                    labelId="next-approver"
                    id="next-approver-select"
                    value={nextApproverID}
                    label="Next Approver"
                    onChange={handleNextApproverChange}
                  >
                    <MenuItem value={0} >All</MenuItem>
                    {
                      allNextApprover.map((item) => (
                        <MenuItem value={item.user_id} key={item.user_id}>{item.user_name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>


              <Grid item xl={2.6} md={2.7} sm={3.8} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="solution-specialist" style={{ color: 'black' }}>Solution Specialist</InputLabel>
                  <Select
                    labelId="solution-specialist"
                    id="solution-specialist-select"
                    value={solutionSpecialistID}
                    label="Solution Specialist"
                    onChange={handleSolutionSpecialistChange}
                  >
                    <MenuItem value={0} >All</MenuItem>
                    {
                      AllsolutionSpecialist.map((item) => (
                        <MenuItem value={item.user_id} key={item.user_id}>{item.fname + ' ' + item.lname}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>


              <Grid item xl={3.2} md={2.5} sm={3.5} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="lifecycle" style={{ color: 'black' }}>Lifecycle</InputLabel>
                  <Select
                    labelId="lifecycle"
                    id="lifecycle-select"
                    value={lifecycleID}
                    label="lifecycle"
                    onChange={handleLifecycleChange}
                  >
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={1}>Active Only</MenuItem>
                    <MenuItem value={2}>Archived Only</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

          </Grid>

          <Box className={styles.profile}>
            <Avatar sx={{ bgcolor: teal[900], width: 35, height: 35 }}>{fname[0]}</Avatar>
            <Button
              id="user-customized-button"
              aria-controls="user-customized-menu"
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="text"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {fname || 'User'}
            </Button>
            <StyledMenu
              id="user-menu"
              MenuListProps={{
                'aria-labelledby': 'user-menu-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>
                <AccountCircleRoundedIcon />
                Profile
              </MenuItem>
              {
                role === 1
                  ? <MenuItem onClick={switchToAdmin}>
                    <SwitchAccountRoundedIcon />
                    Switch to Admin
                  </MenuItem>
                  : ''
              }
              <MenuItem onClick={handleChangePassword}>
                <LockIcon />
                Change Password
              </MenuItem>
              <MenuItem onClick={logOut}>
                <Logout />
                Logout
              </MenuItem>
            </StyledMenu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
