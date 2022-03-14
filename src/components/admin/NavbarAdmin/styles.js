import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
    outer: {
        width: '25%',
        maxWidth: '350px',
        height: '100vh',
        background: '#97bbcd',
        color: '#0E2128',
        //boxShadow: 'rgba(0, 0, 0, 0.48) 6px 2px 16px 0px, rgba(0, 0, 0, 0.8) -6px -2px 16px 0px',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        position: 'relative',

        '@media (max-width:1000px)': {
            width: '100vw',
            height: '100%',
            position: 'absolute',
            zIndex: '9',
            top: 0,
            left: 0,
        },
    },
    closeNav: {
        position: 'absolute',
        top: '0%',
        left: '80%',
        padding: '1rem',
        display: 'none',

        '@media (max-width:1000px)': {
            display: 'block',
        },
    },
    logo: {
        width: '100%',
        height: '20vh',
        margin: '2rem 0',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoHandle: {
        width: '60px',
        height: '60px',
        background: 'rgba(255,255,255,0.5)',
        borderRadius: '50%',
    },
    logoText: {
        margin: '0.5rem',
    },
    list: {
        width: '100%',
        height: '80vh',
        overflow: 'auto',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    listItem: {
        width: '80%',
        padding: '.5rem',
        margin: '.5rem',
        background: '#D9DDDC',
        borderRadius: '5px',
        textTransform: 'capitalize',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        "&:hover" : {
            background: '#97AEBC',
            color: '#2D3F4B',
        },

        "&.active": {
            background:'#00abab',
            // border: '3px solid  #839eaf',
            boxShadow: '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(156, 39, 176, 0.4)',
            "& h6" : {
                color: 'white',
            }
        },
    },
    icon: {
        color: '#0E2128',
        width: '15%',
        transform: 'scale(0.8)',

        "&.active": {
            color:'#FFF',
        },
    },
    linkText: {
        width: '80%',
        fontSize: '1.1rem',
        color: '#2D3F4B',
    },
    linkTextActive: {
        width: '80%',
        fontSize: '1.1rem',
        color: '#2D3F4B',
    },
})