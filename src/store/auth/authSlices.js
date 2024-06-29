import { createSlice } from '@reduxjs/toolkit';

export const AuthSlice = createSlice({
    name: 'Auth',
    initialState: {
        status: 'Checking',
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
    },
    reducers: {
        login: (state, action) => {
            state.uid = action.payload.uid
            state.displayName = action.payload.displayName
            state.photoURL = action.payload.photoURL
            state.status = 'authenticated'
            state.email = action.payload.email
            state.errorMessage = action.payload.errorMessage
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated'
            state.uid = null
            state.email = null
            state.displayName = null
            state.photoURL = null
            state.errorMessage = payload?.errorMessage || null
        },
        checkingCredencials: (state) => {
            state.status = 'Checking'
            state.uid = null
            state.email = null
            state.displayName = null
            state.photoURL = null
            state.errorMessage = null
        }
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredencials } = AuthSlice.actions;