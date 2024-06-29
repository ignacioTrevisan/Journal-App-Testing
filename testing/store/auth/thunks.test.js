import { LogoutFireBase, loginWithEmailAndPassword, registerWithEmailPassword, signInGoogle } from "../../../src/firebase/providers";
import { checkingCredencials, login, logout } from "../../../src/store/auth/authSlices";
import { LoginWithEmailPassword, OnLogout, RegisterWithEmailPassword, checkingAuthentication, startGoogleSignIn } from "../../../src/store/auth/thunks";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers');


describe('pruebas a <Thunks />', () => {
    const dispatch = jest.fn();
    beforeEach(() => jest.clearAllMocks());
    test('debe invocar el checking credencials', async () => {
        const email = 'lala@gmail.com';
        const password = '123';

        await checkingAuthentication(email, password)(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredencials());
        expect(dispatch).toHaveBeenCalledWith(login({ email: email, password: password }))
        expect(dispatch).toHaveBeenCalledTimes(2);
    })

    test('Debe llamar el startGoogleSignIn y logearse correctamente', async () => {
        const loginData = { ok: true, ...demoUser }
        await signInGoogle.mockResolvedValue(loginData);
        await startGoogleSignIn()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredencials());
        expect(dispatch).toHaveBeenCalledWith(login({ ...demoUser }))
    })

    test('Debe llamar el startGoogleSignIn y logearse correctamente', async () => {
        const loginData = { ok: false, ...demoUser, errorMessage: 'invalid credentials' }
        await signInGoogle.mockResolvedValue(loginData);
        await startGoogleSignIn()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredencials());
        expect(dispatch).toHaveBeenCalledWith(logout({ error: loginData.errorMessage }))
    })

    test('startLoginWithEmailAnd password debe llamar checkingCredenmtials y logear con exito', async () => {
        const loginData = { ok: true, ...demoUser };
        await loginWithEmailAndPassword.mockResolvedValue(loginData);

        await LoginWithEmailPassword({ email: loginData.user, password: '123456' })(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredencials());
        expect(dispatch).toHaveBeenCalledWith(login({ ...demoUser }))


    })


    test('startLoginWithEmailAndpassword debe llamar checkingCredenmtials, no logear y mostrar error', async () => {
        const loginData = { ok: false, ...demoUser, errorMessage: 'todo mal' };
        await loginWithEmailAndPassword.mockResolvedValue(loginData);

        await LoginWithEmailPassword({ email: loginData.user, password: '123456' })(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredencials());
        expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: loginData.errorMessage }))


    })

    test('startLogout debe llamar a LogoutFirebase, clearNotes y logout', async () => {
        await OnLogout()(dispatch);
        expect(LogoutFireBase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(logout({ error: null }))
    })


    test('RegisterWithEmailPassword debe registrar un nuevo usuario', async () => {
        const registerData = { ok: true, ...demoUser, errorMessage: null }
        await registerWithEmailPassword.mockResolvedValue(registerData);
        await RegisterWithEmailPassword({ email: registerData.email, contraseña: '123456', nombre: registerData.displayName })(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredencials());
        expect(dispatch).toHaveBeenCalledWith(login({ email: registerData.email, displayName: registerData.displayName, photoURL: registerData.photoURL, uid: registerData.uid, errorMessage: null }));
    })


})
