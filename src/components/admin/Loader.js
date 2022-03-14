import React from "react";
import { Box, CircularProgress } from '@mui/material'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    Loader: {
        width: '100%',
        height: '100%',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

function Loader() {

    const styles = useStyles();

    return (
        <Box sx={{ display: 'flex' }} className={styles.Loader}>
            <CircularProgress />
        </Box>
    )
}

export default Loader

