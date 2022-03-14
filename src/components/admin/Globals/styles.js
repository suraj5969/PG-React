import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
    inner: {
        width: '98%',
        color: '#2D3F4B',
        margin: '1rem 0',
        paddingLeft: '1rem',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

        //position: 'relative',
    },
    header: {
        width: '100%',
        height: '60px',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        position: 'relative',

        '@media (max-width:500px)': {
            width: '100%',
            height: '120px',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
        },
    },
    headerWT: {
        width: '100%',
        height: '60px',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-betweeen',
        alignItems: 'center',

        '@media (max-width:500px)': {
            width: '100%',
            height: '120px',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
    },
    hamburger: {
        width: '100px',
        height: '40px',

        display: 'none',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

        '@media (max-width:1000px)': {
            display: 'flex',
        },
    },
    header1: {
        width: '50%',
        height: '100%',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

        '@media (max-width:500px)': {
            width: '100%',
            justifyContent: 'center',
        },
    },
    profile: {
        width: '150px',
        height: '40px',
        padding: '0 5px',
        borderRadius: '40px',
        background: '#FFF',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        '@media (max-width:500px)': {
            position: 'absolute',
            top: 0,
            right: 0,
        },
    },
    userProfile: {
        width: '70px',
    },
    formControl: {
        width: '300px',
        height: '100%',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formControlErr: {
        width: '300px',
        height: '100%',
        border: '2px solid red',
        borderRadius: '0.5rem',
        background: 'red',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBox: {
        width: '100%',
        height: '40px',
        borderRadius: '25px',
        background: '#FFF',
    },
    input: {
        paddingLeft: '10px',
        color: '#2D3F4B',
    },
    inputXL: {
        width: '70%',
        height: '40px',
        backgroundColor: '#FFF',
        borderRadius: '5px 0 0 5px',
        color: '#2D3F4B',
        paddingLeft: '10px',

        '@media (max-width:500px)': {
            width: '100%',
            height: '50px',
            borderRadius: 0,
        },
    },
    button: {
        width: '100px',
        height: '40px',
        boxShadow: 'none',
        background: '#00ABAB',
        color: 'white',
        borderRadius: '40px',
        margin: '0 .5rem',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        "&:hover": {
            boxShadow: 'none',
            background: '#00ABAB',
        },
    },
    buttonXL: {
        width: '30%',
        height: '70%',
        boxShadow: 'none',
        borderRadius: '0 5px 5px 0',
        background: '#199797',
        color: 'white',

        '@media (max-width:500px)': {
            width: '100%',
            height: '40px',
            borderRadius: 0,
        },

        "&:hover": {
            boxShadow: 'none',
            background: '#00ABAB',
        }
    },
    addIcon: {
        width: '25px',
        height: '25px',
        color: 'white',
    },
    tableOutlay: {
        width: '100%',
        // maxWidth: '1000px',

        //display: 'flex',
        //justifyContent: 'center',
        //alignItems: 'center',
        borderRadius: '5px',
        marginTop: '2rem',
    },
    table: {
        width: '100%',
        height: '100%',
        borderRadius: '5px',
        background: '#FFF',
    },
    tableDG: {
        width: '100%',
        height: '100%',
        background: '#FFF',
        margin: '2rem',
    },
    tableHead: {
        width: '100%',
        background: '#97bbcd',
        color: '#2D3F4B',
        borderRadius: '5px',
    },
    tableHeadRow: {
        width: '100%',
        borderRadius: '5px',
    },
    tableRow: {
        background: '#FFF',
        //"&:hover": {
        //    background: '#D9DDDC',
        //}
    },
    ButtonRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonBox: {
        maxWidth: '200px',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    Button1: {
        width: '70px',
        height: '30px',
        margin: '.4rem',
        background: '#199797',
        color: '#FFF',
        fontSize: '12px',
        boxShadow: 'none',

        "&:hover": {
            background: '#00abab',
            boxShadow: 'none',
        }
    },
    Button2: {
        width: '70px',
        height: '30px',
        margin: '.4rem',
        background: '#FF4B77',
        color: '#FFF',
        fontSize: '12px',
        boxShadow: 'none',

        "&:hover": {
            background: '#FF4B77',
            boxShadow: 'none',
        }
    },
    popup: {
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(4px)',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        position: 'absolute',
        top: '0',
        left: '0',
    },
    innerpop: {
        width: '350px',
        borderRadius: '5px',
        background: '#F8F8FF',
        padding: '1rem',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    popUPClose: {
        width: '300px',

        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    ButtonPOP: {
        width: '300px',
        height: '40px',
        background: 'blue',
        boxShadow: 'none',
        color: '#FFF',

        "&:hover": {
            background: 'blue',
            boxShadow: 'none',
        },
    },
    ButtonPOPD: {
        width: '300px',
        height: '40px',
        background: 'red',
        boxShadow: 'none',
        color: '#FFF',

        "&:hover": {
            background: 'red',
            boxShadow: 'none',
        },
    },
    inputPOP: {
        width: '300px',
        margin: '1rem 0',
    },
    bigCell: {
        maxWidth: '300px',
        height: '100%',
    },
    helpText: {
        width: '90%',
        padding: '1rem',
        fontSize: '10px',
        color: 'red',
        background: '#fff',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
        zIndex: 999,
        position: 'relative',

        '@media (max-width:400px)': {
            width: '95%',
        },

        '&::before': {
            content: '""',
            width: '20px',
            height: '20px',
            background: '#FFF',
            position: 'absolute',
            top: '-10px',
            left: '10px',

            transform: 'rotate(45deg)',
        }
    },

    menuList: {
        maxHeight: '400px',
    },
    menuListSmall: {
        maxHeight: '290px',
    }
})