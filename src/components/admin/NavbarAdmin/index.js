import React from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from './styles';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Links from './Links';

function NavbarAdmin(props) {

    const { setNavopen } = props;
    const styles = useStyles();

    return (
        <Box className={styles.outer}>
            <Box className={styles.closeNav} onClick={() => setNavopen(false)}>
                <CloseRoundedIcon />
            </Box>
            <Box className={styles.logo}>
                <img src="/lexisnexis.png" alt="logo" style={{ width: '80%', objectFit: 'cover' }} />
            </Box>
            <Box className={styles.list}>
                <Links />
            </Box>
        </Box>
    )
}

export default NavbarAdmin
