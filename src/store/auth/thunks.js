import { LogoutFireBase, loginWithEmailAndPassword, registerWithEmailPassword, signInGoogle } from "../../firebase/providers";
import { checkingCredencials, login, logout } from "./authSlices";

export const checkingAuthentication = (email, password) => {

    return async (dispatch, getState) => {

        dispatch(checkingCredencials());

        dispatch(login({ email: email, password: password }));
    }
}
export const startGoogleSignIn = () => {
    return async (dispatch, getState) => {
        dispatch(checkingCredencials());
        const result = await signInGoogle();
        if (result.ok) {
            dispatch(login({ email: result.email, displayName: result.displayName, photoURL: result.photoURL, uid: result.uid, errorMessage: result.errorMessage }))
        } else {
            dispatch(logout({ error: result.errorMessage }));
        }
    }
}
export const RegisterWithEmailPassword = ({ email, contraseña, displayName }) => {
    return async (dispatch) => {
        dispatch(checkingCredencials());
        const resp = await registerWithEmailPassword(email, contraseña, displayName);
        if (!resp.ok) {
            dispatch(logout({ errorMessage: resp.errorMessage }));
        } else {
            dispatch(checkingCredencials());
            dispatch(login({ email: resp.email, displayName: resp.displayName, photoURL: resp.photoURL, uid: resp.uid, errorMessage: null }));
        }

    }

}
export const LoginWithEmailPassword = ({ email, password }) => {

    return async (dispatch, getState) => {
        dispatch(checkingCredencials());
        const result = await loginWithEmailAndPassword(email, password);
        if (!result.ok) {

            dispatch(logout({ errorMessage: result.errorMessage }));

        } else {
            dispatch(login({ email: result.email, displayName: result.displayName, photoURL: result.photoURL, uid: result.uid, errorMessage: null }))
        }
    }
}

export const OnLogout = () => {
    return async (dispatch) => {
        await LogoutFireBase();

        dispatch(logout({ error: null }));
    }
}

