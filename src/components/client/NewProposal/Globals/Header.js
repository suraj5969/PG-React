import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SwitchAccountRoundedIcon from '@mui/icons-material/SwitchAccountRounded';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Logout from '@mui/icons-material/Logout';
import { teal } from '@mui/material/colors';
import { useStyles } from '../../Dashboard/Header/styles';
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

export default function Header() {

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

    const handleProfile = () => {
        handleClose();
        history.push("/client/user-profile");
    }

    const handleChangePassword = () => {
        history.push("/change-password");
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
                        <Grid item xl={1.8} md={1.8} sm={4} sx={{ p: 0 }}>
                            <Link to="/client/dashboard">
                                <img src="/lexisnexis.png" alt="logo" style={{ width: '100%', maxWidth: '160px', paddingLeft: '0' }} />
                            </Link>
                        </Grid>
                    </Grid>
                    <Box sx={{ flexGrow: 1 }} />
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
