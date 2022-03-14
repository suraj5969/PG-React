import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
    profile: {
        width: '150px',
        height: '40px',
        padding: '0 5px',
        borderRadius: '40px',
        background: '#ddd',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        '@media (max-width:900px)': {
            width: '120px',
            position: 'absolute',
            top: '38px',
            right: '25px',
        },
    }
});