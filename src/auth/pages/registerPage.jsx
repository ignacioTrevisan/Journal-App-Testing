import React, { useEffect, useMemo, useState } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { AuthLayout } from '../layout/authLayout'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { UseForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { RegisterWithEmailPassword } from '../../store/auth/thunks'
import { logout } from '../../store/auth'



const formData = {
    nombre: '',
    email: '',
    contraseña: '',
}
export const RegisterPage = () => {
    const { status, errorMessage } = useSelector(state => state.authSlice);

    const [mensajeDeError, setMensajeDeError] = useState({ display: 'none', mensaje: '' })

    useEffect(() => {
        if (errorMessage != null) {

            if (errorMessage.includes('Error (auth/email-already-in-use).')) {
                setMensajeDeError({ display: '', mensaje: 'Ya existe una cuenta con este correo electronico' })
            } else {
                setMensajeDeError({ display: '', mensaje: errorMessage })
            }

        } else {
            setMensajeDeError({ display: 'none', mensaje: '' });
        }
    }, [errorMessage])



    const [formSubmited, setFormSubmited] = useState(false);


    const formValidations = {
        contraseña: [(value) => value.length > 5 && /[A-Z]/.test(value), 'La contraseña debe contener al menos 6 caracteres y una mayuscula'],
        email: [(value) => (value.includes('@gmail') || value.includes('@hotmail') || value.includes('@outlook')) && value.includes('.'), 'Ingrese un correo electronico valido'],
        nombre: [(value) => value.length > 0, 'El nombre es obligatorio']
    }

    const { nombre, email, contraseña, formState, OnInputchange,
        reset, nombreValid, emailValid, contraseñaValid, isFormValid } = UseForm(
            formData, formValidations
        );


    const submit = (event) => {

        event.preventDefault();
        setFormSubmited(true);
        if (!isFormValid) return;
        onRegisterWithEmailPassword();

    }


    const isChecking = useMemo(() => status === 'Checking' ? true : false, [status]);


    const dispatch = useDispatch();
    const onRegisterWithEmailPassword = () => {
        dispatch(RegisterWithEmailPassword(formState));
    }

    const limpiarEstado = () => {
        dispatch(logout());
    }
    return (
        <AuthLayout tittle='Crear una cuenta'>
            <form onSubmit={submit} className='animate__animated animate__fadeIn animate__faster'>
                <h1>FormValid {isFormValid ? 'valido' : 'no valido'}</h1>
                <Grid container >
                    <Grid item xs={12} sx={{ mt: 1 }}>
                        <TextField
                            type='text'
                            label='Nombre completo'
                            placeholder='Ingrese nombre'
                            name='nombre'
                            value={nombre}
                            onChange={OnInputchange}
                            error={formSubmited && !!nombreValid ? true : false}
                            helperText={formSubmited ? nombreValid : ''}
                            fullWidth />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type='email'
                            label='Correo'
                            name='email'
                            error={formSubmited && !!emailValid ? true : false}
                            helperText={formSubmited ? emailValid : ''}
                            value={email}
                            onChange={OnInputchange}
                            placeholder='correo@google.com'
                            fullWidth />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type='password'
                            label='Contraseña'
                            name='contraseña'
                            error={formSubmited && !!contraseñaValid ? true : false}
                            helperText={formSubmited ? contraseñaValid : ''}
                            value={contraseña}
                            onChange={OnInputchange}
                            placeholder='Ingrese contraseña'
                            fullWidth />
                    </Grid>
                    <Grid container sx={{ mt: 2 }}>


                        <Grid item xs={12} >
                            <Button
                                fullWidth
                                variant='contained'
                                type='submit'
                                disabled={isChecking}
                            >
                                Crear cuenta
                            </Button>
                        </Grid>

                        <Grid item xs={12} mt={2} display={mensajeDeError.display}>
                            <Alert severity='error' xs={12}>
                                {mensajeDeError.mensaje}
                            </Alert>


                        </Grid>

                        <Grid container direction='row' justifyContent='end' >
                            <Typography sx={{ mr: 1, mt: 2 }} >¿Ya tienes cuenta?</Typography>
                            <Link to='/auth/login' component={LinkRouter} color='inherit' sx={{ mt: 2 }} onClick={limpiarEstado}>
                                <Typography>ingresar</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid >
            </form >
        </AuthLayout >
    )
}
