import { AuthSlice, login, logout } from "../../../src/store/auth/authSlices"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures";

describe('Pruebas a <AuthSlices />', () => {
    test('debe mostrar el estado inicial', () => {


        expect(AuthSlice.name).toBe('Auth');
        expect(AuthSlice.reducer(initialState, {})).toBe(initialState);

    })

    test('debe cambiar el estado a logeado', () => {

        expect(AuthSlice.reducer(initialState, login(demoUser))).toEqual(authenticatedState);

    })


    test('debe cambiar el estado a no logeado sin error', () => {
        const error = 'Contraseña invalida'
        expect(AuthSlice.reducer(authenticatedState, logout())).toEqual(notAuthenticatedState());

    })

    test('debe cambiar el estado a no logeado con error por argumento', () => {
        const error = 'Contraseña invalida'
        expect(AuthSlice.reducer(authenticatedState, logout({ errorMessage: error }))).toEqual(notAuthenticatedState(error));

    })
})