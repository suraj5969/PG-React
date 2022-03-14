import React from 'react';
import { Box, Button, FormControl, Grid, InputBase, Menu, MenuItem, styled, alpha } from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import { useHistory } from 'react-router-dom';
import { useStyles } from './styles';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import LockIcon from '@material-ui/icons/Lock';
import Logout from '@mui/icons-material/Logout';
import SwitchAccountRoundedIcon from '@mui/icons-material/SwitchAccountRounded';
import { teal } from '@mui/material/colors';

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

function HeaderBar(props) {

    const { searchName, setsearchName, setNavopen, searchText, addBut, isDisabled, isSearchAppear } = props;
    const styles = useStyles();

    const history = useHistory();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isTextEntered, setTextEntered] = React.useState(false);

    let fname = sessionStorage.getItem('fname') || 'User';
    fname = fname.length > 7 ? fname.substring(0, 6) + '...' : fname;

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSwitchUser = () => {
        history.push("/client/dashboard");
        // setAnchorEl(null);
    };
    const handleChangePassword = () => {
        history.push("/change-password");
    };

    const addUser = () => {
        history.push("/admin/new-user");
    }

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

    return (
        <Box className={styles.header}>
            <Box className={styles.hamburger} onClick={() => { setNavopen(true) }}>
                <MenuRoundedIcon />
            </Box>
            <Box className={styles.header1}>
                {
                    isSearchAppear
                        ? <FormControl
                            className={styles.formControl}
                            disabled={isDisabled && true}
                        //onMouseEnter={()=>setTextEntered(true)}
                        //onMouseLeave={()=>setTextEntered(false)}
                        >
                            <Grid container spacing={1} alignItems="flex-end" className={styles.inputBox}>
                                <Grid item xs={10}>
                                    <InputBase
                                        id="input-search"
                                        placeholder={
                                            isDisabled
                                                ? '--disabled--'
                                                : searchText}
                                        inputProps={{ 'aria-label': 'naked' }}
                                        className={styles.input}
                                        value={searchName}
                                        onChange={(e) => {
                                            setsearchName(e.target.value.toLowerCase());
                                            if (searchName.length === 0) { setTextEntered(false) }
                                            else { setTextEntered(true) }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    {
                                        isTextEntered
                                            ? <ClearRoundedIcon className={styles.icon}
                                                onClick={() => {
                                                    setsearchName('');
                                                    setTextEntered(false);
                                                }}
                                                style={{ cursor: 'pointer' }}
                                            />
                                            : <SearchRoundedIcon className={styles.icon} />
                                    }
                                </Grid>
                            </Grid>
                        </FormControl>
                        : ''
                }
                {
                    addBut
                        ? <Button
                            variant="contained"
                            className={styles.button}
                            endIcon={<AddRoundedIcon className={styles.addIcon} />}
                            onClick={addUser}
                        >Add</Button>
                        : ''
                }
            </Box>
            <Box className={styles.profile}>
                <Avatar sx={{ bgcolor: teal[900], width: 35, height: 35 }}>{fname[0].toUpperCase() || 'U'}</Avatar>
                <Button
                    id="user-customized-button"
                    className={styles.userMenu}
                    aria-controls="user-customized-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="text"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                >{fname || 'User'}</Button>
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
                    <MenuItem onClick={handleSwitchUser}>
                        <SwitchAccountRoundedIcon />
                        Switch to User
                    </MenuItem>
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
        </Box>
    )
}

export default HeaderBar
