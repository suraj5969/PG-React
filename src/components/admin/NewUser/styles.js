import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
    inner: {
        width: '95%',
        borderRadius: '5px',
        background: '#FFF',
        color: '#2D3F4B',
        margin: '1rem 0',

        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

        '@media (max-width:800px)': {
            justifyContent: 'center',
            alignItems: 'center',
        },
    },
    headerText: {
        width: '100vw',
        margin: '1rem 2rem',
    },
    formControl: {
        width: '300px',
        height: '40px',
        margin: '1.5rem',

        '@media (max-width:1440px)': {
            margin: '1rem',
        },
    },
    formControlMOB: {
        width: '300px',
        height: '40px',
        margin: '1.5rem',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

        '@media (max-width:1440px)': {
            margin: '1rem',
        },
    },
    formControlErr: {
        width: '300px',
        height: '40px',
        margin: '1.5rem',
        color: 'red',

        '@media (max-width:1440px)': {
            margin: '1rem',
        },
    },
    helpText: {
        width: '90%',
        padding: '1rem',
        fontSize: '10px',
        color: 'red',
        background: '#fff',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
        zIndex: 999,

        '@media (max-width:400px)': {
            width: '95%',
        },
    },
    formControlXL: {
        width: '90%',
        height: '40px',
        margin: '1.5rem',

        '@media (max-width:1440px)': {
            margin: '1rem',
        },
    },
    formControlMTL: {
        width: '85%',
        height: '70px',
        margin: '1.5rem',

        '@media (max-width:1440px)': {
            margin: '1rem',
        },
    },
    input: {
        fontSize: '16px',
    },
    inputMOB: {
        width: '100%',
        height: '100%',
    },
    inputMOBCode: {
        fontSize: '12px',
        width: '50px',
        height: '100%',
    },
    inputErr: {
        fontSize: '16px',
        color: 'red',
    },
    selectList: {
        background: '#FFF',
    },
    radioGroup: {
        flexDirection: 'row',
    },
    chkGroup: {
        flexDirection: 'row',
    },
    btnGroup: {
        width: '300px',
        margin: '1.5rem',
        borderRadius: '3px',
        boxShadow: 'none',

        '@media (max-width:500px)': {
            marginTop: '3rem',
        },
    },
    button: {
        width: '100px',
        color: '#FFF',
    },
    buttonDis: {
        width: '100px',
        backgroundColor: '#c6c6c6',
        color: '#000',
        borderRadius: 0,
    },
    icons: {
        color: '#2D3F4B'
    },
    detailsSection: {
        width: '100%',
        margin: '0.5rem 1rem',

        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',

        '& > *': {
            margin: 'auto 0.8rem'
        }
    },
})