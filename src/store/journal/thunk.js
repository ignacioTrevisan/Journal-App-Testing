import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore/lite'
import { FireBaseDB } from '../../firebase/config';
import { adNewEmptyNote, deleteMessageDesactive, deleteNoteId, isCreatingNewNote, setActiveNote, setNotes, setPhotoToActiveNote, setSaving, updateNote } from './journalSlices';
import { LoadNotes } from '../../helpers/loadNotes';
import { FilesUpload } from '../../helpers/fileUpload';



export const startNewNote = () => {
    return async (dispatch, getState) => {
        const { authSlice } = getState();
        dispatch(isCreatingNewNote());


        const newNote = {
            title: 'Titulo',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FireBaseDB, `${authSlice.uid}/journal/notes`))
        await setDoc(newDoc, newNote);
        newNote.id = newDoc.id;
        dispatch(adNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }

}
export const startLoadingNotes = () => {

    return async (dispatch, getState) => {
        const { authSlice } = getState();
        console.log(authSlice)
        if (!authSlice.uid) throw new Error('El UID no existe');
        const notes = await LoadNotes(authSlice.uid);
        dispatch(setNotes(notes));
    }
}

export const startSavingNotes = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving());
        const { notes } = getState().journal;
        const { uid } = getState().authSlice;
        const { active } = getState().journal;
        const noteToFirestore = { ...active };
        delete noteToFirestore.id;
        const docfRef = doc(FireBaseDB, `${uid}/journal/notes/${active.id}`)
        await setDoc(docfRef, noteToFirestore, { merge: true })
        dispatch(updateNote({ list: notes, active }))
    }
}
export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving());
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(FilesUpload(file));
        }
        const photoURL = await Promise.all(fileUploadPromises);
        dispatch(setPhotoToActiveNote(photoURL));
    }
}
export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().authSlice;
        const { active } = getState().journal;
        console.log(uid, active.id);
        const docRef = doc(FireBaseDB, `${uid}/journal/notes/${active.id}`);
        await deleteDoc(docRef);
        dispatch(deleteNoteId(active.id));

    }
}