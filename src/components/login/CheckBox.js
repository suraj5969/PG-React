import React from 'react';
import clsx from 'clsx';
import {FormControlLabel,FormControl,Checkbox} from '@material-ui/core';
import useStyles from './styles.js';

export const CheckBox = (props) => {

    const {values,setValues} = props;
    const styles = useStyles();

    const handleChkBox = () => {
        setValues({ ...values, rememberMe: !values.rememberMe });
        // console.log(values.rememberMe);
    };

    return (
        <FormControl className={styles.chkBox}>
            <FormControlLabel
                control={
                            <Checkbox 
                                checked={values.rememberMe} 
                                name="remember me" 
                                onClick={handleChkBox}
                                checkedIcon={<span className={clsx(styles.chkicon, styles.checkedIcon)} />}
                                icon={<span className={styles.chkicon} />}
                            />
                        }
                label="Remember me"
                className={styles.checker}
            />
        </FormControl>
    )
}