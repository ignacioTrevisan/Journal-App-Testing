import React from 'react'
import { AppRoutes } from './router/appRoutes'
import { AppTheme } from './theme'

export const JournalApp = () => {
    return (
        <AppTheme>
            <AppRoutes />
        </AppTheme>
    )
}
