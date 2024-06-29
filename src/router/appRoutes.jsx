import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/authRoutes'
import { JournalRoutes } from '../journal/routes/journalRoutes'
import { CheckingAuth } from '../ui'
import { UseCheckStatus } from '../hooks/useCheckStatus'


export const AppRoutes = () => {

    const { status } = UseCheckStatus();


    if (status === 'Checking') {
        return <CheckingAuth />
    }


    return (
        <Routes>
            {
                status === 'authenticated'
                    ? <Route path='/*' element={<JournalRoutes />} />
                    : <Route path='/auth/*' element={<AuthRoutes />} />
            }
            {
                status !== 'authenticated' && <Route path='/*' element={<Navigate to="/auth/login" />} />
            }
        </Routes>
    )
}
