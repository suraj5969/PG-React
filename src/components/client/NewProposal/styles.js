import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
    row: {
        width: '100% !important',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '15px 30px',
        '@media (max-width:760px)': {
            flexDirection: 'column',
            padding: '10px',
            "& > *": {
                margin: '0.5rem',
            }
        },
        '@media (min-width:760px) and (max-width: 1199px)': {
            padding: '15px 5px',
        },
    },
    col1: {
        width: '90%',
        '@media (min-width:760px)': {
            width: '35%',
        },
        '@media (min-width:1199px)': {
            width: '32%',
        },
    },
    col2: {
        width: '90%',
        '@media (min-width:760px)': {
            width: '21%',
        },
        '@media (min-width:1199px)': {
            width: '21%',
        },
    },
    col3: {
        width: '90%',
        '@media (min-width:760px)': {
            width: '31%',
        },
    },
    col4: {
        width: '90%',
        '@media (min-width:760px)': {
            width: '24%',
        },
    },

    menuList: {
        maxHeight: '350px',
    },
    menuListSmall: {
        maxHeight: '290px',
    }
})