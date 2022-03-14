import {makeStyles} from '@material-ui/core';
import bgImg from '../images/bg-img.png';

const useStyles = makeStyles({
    outer : {
        width : '100vw',
        height: '100vh',
        background: `url(${bgImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundColor: '#7000FF',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner: {
        width: '400px',
        height: '70%',
        maxHeight: '600px',
        background: 'rgba(255,255,255,.15)',
        boxShadow: 'rgba(255, 255, 255, 0.3) 0px 2px 5px, rgba(255, 255, 255, 0.3) 0px 1px 3px;',
        color: '#FFF',
        borderRadius: '5px',
        zIndex: 9,
        /*border: '5px solid transparent',
        borderImage: 'linear-gradient(45deg, rgba(255,255,255,.3), rgba(0, 0, 0, 0))',
        borderImageSlice: 1,*/
        backdropFilter: 'blur(150px)',

        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',

        '@media (max-width:500px)': {
            width: '90%',
            height: '100%',
        },
        '@media (max-width:400px)': {
            width: '95%',
            height: '100%',
        },
    },
    innerSM: {
        width: '400px',
        height: '55%',
        padding: '2rem 0',
        maxHeight: '400px',
        background: 'rgba(255,255,255,.15)',
        boxShadow: 'rgba(255, 255, 255, 0.3) 0px 2px 5px, rgba(255, 255, 255, 0.3) 0px 1px 3px;',
        color: '#FFF',
        borderRadius: '5px',
        zIndex: 9,
        /*border: '5px solid transparent',
        borderImage: 'linear-gradient(45deg, rgba(255,255,255,.3), rgba(0, 0, 0, 0))',
        borderImageSlice: 1,*/
        backdropFilter: 'blur(150px)',

        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',

        '@media (max-width:500px)': {
            width: '90%',
        },
        '@media (max-width:400px)': {
            width: '95%',
        },
    },
    innerinner: {
        width: '100%',
        height: '90%',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',

        '@media (max-width:500px)': {
            height: '70%',
        },
        '@media (max-width:400px)': {
            height: '70%',
        },
    },
    form : {
        width: '100%',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBox: {
        width: '80%',
        height: '50px',
        background: 'rgba(255,255,255,.15)',
        borderRadius: '5px',
        margin: '.5rem 0',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

        '@media (max-width:400px)': {
            width: '95%',
        },
    },
    inputBoxErr: {
        width: '80%',
        height: '50px',
        background: 'rgba(255,255,255,.2)',
        borderRadius: '5px',
        border: 'solid 2px red',
        margin: '.5rem 0',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

        '@media (max-width:400px)': {
            width: '95%',
        },
    },
    inputBox2: {
        width: '100%',
        height: '100%',
        border: '0px solid transparent',
        color: '#FFF',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        color: 'rgba(255,255,255,.7)',
        width: '90%',
    },
    helpText: {
        width: '80%',
        fontSize: '11px',
        color: '#DDDDDD',

        '@media (max-width:400px)': {
            width: '95%',
        },
    },
    icons: {
        color: 'rgb(255,255,255,0.7)'
    },
    chkBox: {
        width: '80%',

        display: 'flex',
        alignItems: 'flex-start',

        '@media (max-width:400px)': {
            width: '95%',
        },
    },
    checker: {
        transform: 'scale(0.7)',
    },
    chkicon: {
        borderRadius: 2,
        width: 20,
        height: 20,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#ffffff',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 20,
            height: 20,
            backgroundImage:
                "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
                " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
                "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#106ba3',
        },
    },
    Button: {
        width: '80%',
        height: '40px',
        backgroundColor: '#7000FF',
        color: '#FFF',
        float: 'right',
        boxShadow: 'none',

        "&:hover": {
            backgroundColor: '#7000FF',
            boxShadow: 'none',
        },

        '@media (max-width:500px)': {
            width: '80%',
        },
        '@media (max-width:400px)': {
            width: '95%',
        },
    },
    ButtonDis: {
        width: '80%',
        height: '40px',
        backgroundColor: '#c6c6c6',
        color: '#000',
        float: 'right',
        boxShadow: 'none',

        "&:hover": {
            backgroundColor: '#c6c6c6',
            boxShadow: 'none',
        },

        '@media (max-width:500px)': {
            width: '80%',
        },
        '@media (max-width:400px)': {
            width: '95%',
        },
    },
    formLinks: {
        margin: '1rem 0 2rem 0',
        transform: 'scale(0.7)',
    },
    forgotPassword: {
        textDecoration: 'none', 
        fontSize: '1.2rem',
        color: '#DDDDDD'
    },
    logoHolder: {
        height: '70px',
        width: '120px',
        borderRadius: '100px 100px 0 0',
        background: 'rgba(255,255,255,.15)',
        backdropFilter: 'blur(150px)',

        position: 'absolute',
        top: '0%',
        left: '50%',
        transform: 'translate(-50%,-100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        '@media (max-width:500px)': {
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,.15)',

            position: 'relative',
            top: '0',
            left: '0',
            transform: 'translate(0,0)',
        },
        '@media (max-width:400px)': {
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,.15)',

            position: 'relative',
            top: '0',
            left: '0',
            transform: 'translate(0,0)',
        },
    },
    errText: {
        fontSize: '14px',
        color: 'red',
    },
    errBox: {
        width: '80%',
        padding: '5px',
        borderRadius: '50px',
        background: 'rgba(255,0,0,0.5)',
        color: 'white',
        fontSize: '12px',
        lineHeight: '1rem',
        textAlign: 'center',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    successBox: {
        width: '80%',
        padding: '5px',
        borderRadius: '50px',
        background: 'rgba(0,255,0,0.5)',
        color: 'white',
        fontSize: '12px',
        lineHeight: '1rem',
        textAlign: 'center',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default useStyles;