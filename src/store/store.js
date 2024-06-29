import { configureStore } from '@reduxjs/toolkit';
import { AuthSlice } from './auth/authSlices';
import { JournalSlice } from './journal/journalSlices';

export const Store = configureStore({
    reducer: {
        authSlice: AuthSlice.reducer,
        journal: JournalSlice.reducer,
    },
})