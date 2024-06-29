import { createSlice } from '@reduxjs/toolkit';

export const JournalSlice = createSlice({
    name: 'Journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        messageDelete: '',
        notes: [],
        active: null
    },
    reducers: {
        isCreatingNewNote: (state, action) => {
            state.isSaving = true;
        },
        setPhotoToActiveNote: (state, action) => {
            state.isSaving = false;
            state.active.imageURL = state.active.imageURL
                ? [...state.active.imageURL, ...action.payload]
                : [...action.payload]

        },
        adNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.messageSaved = '';
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, action) => {
            state.notes = action.payload.list.filter((nota) => nota.id !== action.payload.active.id)
            state.notes.push(action.payload.active);
            state.isSaving = false;
            state.messageSaved = `${action.payload.active.title} actualizada correctamente! `;
        },
        deleteNoteId: (state, action) => {
            state.notes = state.notes.filter((notas) => notas.id !== action.payload);
            state.messageDelete = 'Nota eliminada correctamente';
        },
        clearSlice: (state) => {
            state.isSaving = false,
                state.messageSaved = '',
                state.notes = [],
                state.active = null
        },
        deleteMessageDesactive: (state) => {
            state.active = null;
            state.messageDelete = '';
        }
    }
});


// Action creators are generated for each case reducer function
export const { adNewEmptyNote, deleteMessageDesactive, setActiveNote, setPhotoToActiveNote, setNotes, setSaving, updateNote, isCreatingNewNote, clearSlice, deleteNoteId } = JournalSlice.actions;