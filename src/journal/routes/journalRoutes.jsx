import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { JournalPagee } from '../pages/journalPagee'

export const JournalRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<JournalPagee />} />
            <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
    )
}
