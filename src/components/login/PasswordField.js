import React from 'react';
import {FormControl,Grid,InputBase,InputAdornment,IconButton} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import useStyles from './styles.js';


export const PasswordField = (props) => {

    const {values,setValues} = props;
    const styles = useStyles();

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validatePassword = (key) => {
        if((/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(key)&&key.length>4) || key.length <= 0){
            setValues({...values,isPasswordCorrect: true,password: key.trim(),isValidated: true});
        }
        else{
            setValues({...values,isPasswordCorrect: false,password: key.trim(),isValidated: true});
        }
    }

    return (
        <>
            <FormControl 
                className={
                    values.isPasswordCorrect 
                    ? styles.inputBox
                    : styles.inputBoxErr
                }
            >
                <Grid container spacing={3} alignItems="flex-end" className={styles.inputBox2}>
                    <Grid item xs={1}>
                        <LockOutlinedIcon className={styles.icons}/>
                    </Grid>
                    <Grid item xs={11}>
                        <InputBase
                            id="input-password"
                            required
                            className={styles.input}
                            placeholder="Password"
                            inputProps={{ maxLength: 20,'aria-label': 'naked' }}
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={
                                (e)=>{
                                    validatePassword(e.target.value);
                                }
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                    {
                                    values.showPassword ? 
                                        <Visibility className={styles.icons}/> : 
                                        <VisibilityOff className={styles.icons}/>
                                    }
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </Grid>
                </Grid>
            </FormControl>
            {
                    values.isPasswordCorrect
                    ? ''
                    : <p className={styles.helpText}>
                        1. Password Cannot be less than 8 Characters.
                        <br/>
                        2. Password Should have at least one Capital/Uppercase letter.
                        <br />
                        3. Password Should have at least one Small/Lower-case letter.
                        <br />
                        4. Password Should have a Numerical in it.
                        <br />
                        5. Password Should have a Symbol in it.
                    </p>
            }
        </>
    )
}