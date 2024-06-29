import { Link as LinkRouter } from 'react-router-dom'
import { Google } from '@mui/icons-material'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { AuthLayout } from '../layout/authLayout'
import { UseForm } from '../../hooks/useForm'
import { LoginWithEmailPassword, checkingAuthentication, logout, startGoogleSignIn } from '../../store/auth'
import { useDispatch, useSelector } from 'react-redux'


const formData = {
    email: '', password: ''
}
export const LoginPage = () => {

    const [errorLogin, setErrorLogin] = useState({ display: 'none', message: 'Contraseña incorrecta' });
    const { status, errorMessage } = useSelector(state => state.authSlice);
    const isAuthenticating = useMemo(() => status === 'Checking', [status])


    useEffect(() => {
        if (errorMessage != null) {
            console.log(errorLogin);
            setErrorLogin({ display: '', message: errorMessage })
        }
    }, [errorMessage])

    const dispatch = useDispatch();
    const { email, password, OnInputchange, formState } = UseForm(formData)
    const submit = (event) => {

        event.preventDefault();
        dispatch(checkingAuthentication(email, password));

    }
    const onGoogleSignIn = ({ email, password }) => {
        dispatch(startGoogleSignIn());
    }
    const onLogin = () => {
        dispatch(LoginWithEmailPassword(formState));
    }
    const limpiarEstado = () => {
        dispatch(logout());
    }
    return (
        <AuthLayout tittle='Login'>
            <form onSubmit={submit} className='animate__animated animate__fadeIn animate__faster'>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Correo"
                            name='email'
                            onChange={OnInputchange}
                            value={email}
                            type='email'
                            placeholder='Correo@google.com'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Contraseña"
                            name='password'
                            onChange={OnInputchange}
                            value={password}
                            type='password'
                            placeholder='Contraseña'
                            fullWidth

                        />
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} sm={6} >
                            <Button
                                type='submit'
                                variant='contained'
                                fullWidth
                                disabled={isAuthenticating}
                                onClick={onLogin}
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <Button
                                variant='contained'
                                onClick={onGoogleSignIn}
                                fullWidth
                                disabled={isAuthenticating}
                            >
                                <Google /><Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={12} mt={2} display={errorLogin.display}>
                            <Alert severity='error' xs={12} >
                                {errorLogin.message}
                            </Alert>


                        </Grid>
                        <Grid container direction='row' justifyContent='end' sx={{ mt: 2 }}>
                            <Link variant='button' component={LinkRouter} to='/auth/register' color='inherit' onClick={limpiarEstado}>
                                Crear una cuenta
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>

            </form>

        </AuthLayout >



    )
}
