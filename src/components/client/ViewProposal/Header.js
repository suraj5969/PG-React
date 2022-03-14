import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SwitchAccountRoundedIcon from '@mui/icons-material/SwitchAccountRounded';
import LockIcon from '@material-ui/icons/Lock';
import Logout from '@mui/icons-material/Logout';
import { teal } from '@mui/material/colors';
import { useStyles } from '../Dashboard/Header/styles';
import { Link, useHistory } from 'react-router-dom';

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
    const { headerInfo } = props;
    const styles = useStyles();

    const history = useHistory();

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
    let fname = sessionStorage.getItem('fname') || 'User';
    fname = fname.length > 7 ? fname.substring(0, 6) + '...' : fname;

    return (
        <Box sx={{ flexGrow: 1, maxWidth: '1400px', width: '100%', margin: { xs: '0 auto', lg: '20px auto 0 auto' } }} >
            <AppBar position="static" style={{ background: 'white', boxShadow: 'none' }} sx={{ paddingBottom: { xs: '0.5rem', md: 0 } }}>
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item  xl={1.8} md={1.8} sm={4} sx={{ p: 0 }}>
                            <Link to="/client/dashboard">
                                <img src="/lexisnexis.png" alt="logo" style={{ width: '100%', maxWidth: '160px', paddingLeft: '0' }} />
                            </Link>
                        </Grid>

                        <Grid item container xl={9} md={9} sm={11.5} xs={12} spacing={1} >
                            <Grid item container xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'flex-start' }} wrap="wrap" >
                                <Grid item sm={4} xs={12} >
                                    <Stack spacing={1} direction="row" sx={{ alignItems: 'center' }}>
                                        <Typography variant="subtitle" sx={{ color: 'black', whiteSpace: 'nowrap', width: { xs: '30%', sm: 'auto' } }}>Value: </Typography>
                                        <TextField value={headerInfo.value} size="small" disabled />
                                    </Stack>
                                </Grid>
                                <Grid item sm={4} xs={12} >
                                    <Stack spacing={1} direction="row" sx={{ alignItems: 'center' }}>
                                        <Typography variant="subtitle" sx={{ color: 'black', whiteSpace: 'nowrap', width: { xs: '30%', sm: 'auto' } }}>Updated Date: </Typography>
                                        <TextField value={headerInfo.updatedDate} size="small" disabled />
                                    </Stack>
                                </Grid>
                                <Grid item sm={4} xs={12} >
                                    <Stack spacing={1} direction="row" sx={{ alignItems: 'center' }}>
                                        <Typography variant="subtitle" sx={{ color: 'black', whiteSpace: 'nowrap', width: { xs: '30%', sm: 'auto' } }}>Updated By: </Typography>
                                        <TextField value={headerInfo.updatedBy} size="small" disabled />
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Grid item container xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'flex-start' }} wrap="wrap" >
                                <Grid item sm={4} xs={12} >
                                    <Stack spacing={1} direction="row" sx={{ alignItems: 'center' }}>
                                        <Typography variant="subtitle" sx={{ color: 'black', whiteSpace: 'nowrap', width: { xs: '30%', sm: 'auto' } }}>Status: </Typography>
                                        <TextField value={headerInfo.status} size="small" disabled multiline maxRows={3}/>
                                    </Stack>
                                </Grid>
                                <Grid item sm={4} xs={12} >
                                    <Stack spacing={1} direction="row" sx={{ alignItems: 'center' }}>
                                        <Typography variant="subtitle" sx={{ color: 'black', whiteSpace: 'nowrap', width: { xs: '30%', sm: 'auto' } }}>Proposal No: </Typography>
                                        <TextField value={headerInfo.proposalNo} size="small" disabled />
                                    </Stack>
                                </Grid>
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
