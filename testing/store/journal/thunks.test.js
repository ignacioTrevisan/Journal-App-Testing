import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { JournalSlice, adNewEmptyNote, isCreatingNewNote, setActiveNote, setNotes } from "../../../src/store/journal/journalSlices";
import { startLoadingNotes, startNewNote } from "../../../src/store/journal/thunk";
import { FireBaseDB } from "../../../src/firebase/config";
import { conNotasCargadas, initialState } from "../../fixtures/journalFixtures";

describe('pruebas a thunks', () => {
    const dispatch = jest.fn()
    const getState = jest.fn()
    const LoadNotes = jest.fn();

    beforeEach(() => jest.clearAllMocks());
    test('startNewNote debe crear una nota en blanco', async () => {


        getState.mockReturnValue({ authSlice: { uid: 'TEST-UID' } })

        await startNewNote()(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith(isCreatingNewNote());
        expect(dispatch).toHaveBeenCalledWith(adNewEmptyNote({
            id: expect.any(String),
            title: 'Titulo',
            body: '',
            date: expect.any(Number),
        }));
        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            id: expect.any(String),
            title: 'Titulo',
            body: '',
            date: expect.any(Number),
        }));
        const uid = getState();

        const collectionRef = collection(FireBaseDB, `${uid.authSlice.uid}/journal/notes`);
        const docs = await getDocs(collectionRef);
        const deletePromises = [];
        docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)));
        await Promise.all(deletePromises);
    })

    test('Debe agregar las notas al store', async () => {
        getState.mockReturnValue({ authSlice: { uid: 'TEST-UID' } })
        await startLoadingNotes()(dispatch, getState)
        const uid = getState();

        const collectionRef = collection(FireBaseDB, `${uid.authSlice.uid}/journal/notes`);
        const docs = await getDocs(collectionRef);
        const ref = [];
        docs.forEach(doc => ref.push({ ...doc.data(), id: doc.id }));
        expect(dispatch).toHaveBeenCalledWith(setNotes(ref))
        expect(JournalSlice.reducer(initialState, setNotes(ref)).notes).toEqual(ref);
        // console.log(JournalSlice.reducer(initialState, setNotes(ref)));

    })

    // export const startLoadingNotes = () => {

    //     return async (dispatch, getState) => {
    //         const { authSlice } = getState();
    //         if (!authSlice.uid) throw new Error('El UID no existe');
    //         const notes = await LoadNotes(authSlice.uid);
    //         dispatch(setNotes(notes));
    //     }
    // }
})