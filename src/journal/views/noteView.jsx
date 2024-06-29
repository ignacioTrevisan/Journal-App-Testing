import { DeleteOutline, SaveOutlined, TextFields, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, Input, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { UseForm } from "../../hooks/useForm"
import 'sweetalert2/dist/sweetalert2.css'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo, useRef } from "react"
import { deleteMessageDesactive, setActiveNote } from "../../store/journal/journalSlices"
import { startDeletingNote, startSavingNotes, startUploadingFiles } from "../../store/journal/thunk"
import Swal from "sweetalert2"

export const NoteView = () => {

    const { active: note } = useSelector(state => state.journal);
    const { messageSaved, isSaving, messageDelete } = useSelector(state => state.journal);

    const { OnInputchange, formState, title, body, date, imageURL } = UseForm(note);
    const fileInputRef = useRef();

    const newDate = useMemo(() => {
        return new Date(date).toUTCString();
    }, [date])
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])

    const onSaveNote = () => {
        dispatch(startSavingNotes(note))
    }

    useEffect(() => {
        if (messageSaved.includes('actualizada correctamente')) {
            Swal.fire({
                title: 'Actualizacion de nota',
                text: messageSaved,
                icon: 'success',
                confirmButtonText: 'Ok'
            })
        }
    }, [messageSaved])
    useEffect(() => {
        console.log(messageDelete)
        if (messageDelete.includes('Nota')) {
            console.log("entro aca 2")

            Swal.fire({
                title: 'Eliminacion de nota',
                text: messageDelete,
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(deleteMessageDesactive());
                }
            });
        }
    }, [messageDelete]);
    const onFileInputChange = ({ target }) => {
        if (target.files.length === 0) return;
        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = () => {
        dispatch(startDeletingNote())
    }

    return (
        <Grid container direction='row' justifyContent='space-between' sc={{ mb: 1 }} alignItems='center'>
            <Grid item>
                <Typography fontSize={39} fontWeight='light'>{newDate}</Typography>
            </Grid>
            <Grid item>
                <input
                    type={'file'}
                    ref={fileInputRef}
                    multiple
                    onChange={onFileInputChange}
                    style={{ display: 'none' }}
                />
                <IconButton color="primary" disabled={isSaving} onClick={() => fileInputRef.current.click()}>
                    <UploadOutlined />
                </IconButton>
                <Button
                    color='primary'
                    sx={{ padding: 2 }}
                    onClick={(onSaveNote)}
                    disabled={isSaving}

                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>
            <Grid container>
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='Ingrese titulo'
                    value={title}
                    name="title"
                    onChange={OnInputchange}

                    sx={{ border: 'none', mb: 1 }}
                />
                <TextField
                    type='text'
                    variant='filled'
                    value={body}
                    name="body"
                    onChange={OnInputchange}
                    multiline
                    fullWidth
                    placeholder='¿Que sucedió hoy?'
                    minRows={'5'}
                />

            </Grid>
            <Grid container justifyContent={'end'}>
                <Button
                    onClick={onDelete}
                    sx={{
                        mt: 2,
                    }}
                    color='error'
                >
                    <DeleteOutline />
                    Borrrar
                </Button>
            </Grid>
            <ImageGallery />
        </Grid>
    )
}
