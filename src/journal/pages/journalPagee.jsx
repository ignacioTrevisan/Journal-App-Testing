import { Button, IconButton, Typography } from '@mui/material'
import React from 'react'
import { JournalLayout } from '../layout/journalLayout'
import { NoteView, NothingSelectedView } from '../views'
import { AddOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal/thunk'




export const JournalPagee = () => {

    const dispatch = useDispatch();
    const onClickNewNote = () => {
        dispatch(startNewNote());
    }
    const { isSaving, active } = useSelector(state => state.journal);

    return (

        <JournalLayout>
            {
                active !== null
                    ?
                    <NoteView />
                    :
                    <NothingSelectedView />
            }
            <IconButton disabled={isSaving}
                onClick={onClickNewNote}
                size='large'
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                    position: 'fixed',
                    right: 50,
                    bottom: 50
                }}
            >
                <AddOutlined sx={{ fontSize: 30 }} />
            </IconButton>
        </JournalLayout>
    )
}
