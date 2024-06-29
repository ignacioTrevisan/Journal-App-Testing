import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/loginPage'
import { RegisterPage } from '../pages/registerPage'

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register/*' element={<RegisterPage />} />
            <Route path='*' element={<Navigate to='/auth/login' />} />
        </Routes>
    )
}
