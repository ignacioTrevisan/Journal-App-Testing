import { JournalSlice, adNewEmptyNote, setPhotoToActiveNote, updateNote } from "../../../src/store/journal/journalSlices"
import { conNotasCargadas, initialState } from "../../fixtures/journalFixtures"

describe('pruebas a JournalSlices', () => {
    test('Debe mostrar el estado inicial', () => {
        expect(JournalSlice.name).toBe('Journal')
        expect(JournalSlice.reducer(initialState, {})).toBe(initialState)
    })

    test('debe activar las fotos', () => {
        const listaDeImagenes = ['imagen1.jpg', 'imagen2.jpg', 'imagen3.jpg'];
        expect(JournalSlice.reducer(initialState, setPhotoToActiveNote(listaDeImagenes)).active.imageURL).toEqual(listaDeImagenes)
    })
    test('debe agregar una nota nueva', () => {
        const newNote = {
            title: 'Titulo',
            date: new Date().getTime(),
        }

        expect(JournalSlice.reducer(conNotasCargadas, adNewEmptyNote(newNote)).notes).toContain(newNote);
    })

    test('debe actualizar la nota', () => {


        const action = {
            active: { id: 2, date: 1717582122, title: 'titulo', body: 'Carta editada' },
            list: conNotasCargadas.notes
        }
        expect(JournalSlice.reducer(conNotasCargadas, updateNote(action)).notes).toContain(action.active);
        console.log(JournalSlice.reducer(conNotasCargadas, updateNote(action)).notes);


    })




})