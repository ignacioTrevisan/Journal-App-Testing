import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut, updateProfile } from "firebase/auth";
import { FireBaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

export const signInGoogle = async () => {

    try {
        const result = await signInWithPopup(FireBaseAuth, googleProvider);
        const { displayName, email, photoURL, uid } = result.user;
        console.log(displayName, email, photoURL, uid);
        return {
            ok: true,
            displayName, email, photoURL, uid
        }
    } catch (error) {
        const errorMessage = error.message;
        console.log(errorMessage);
        return {
            ok: false,
            errorMessage: errorMessage,
        }
    }
}

export const registerWithEmailPassword = async (email, contraseña, nombre) => {

    try {
        console.log(email, contraseña, nombre)
        const resp = await createUserWithEmailAndPassword(FireBaseAuth, email, contraseña);
        console.log(resp.user);
        const { uid, photoURL } = resp.user
        updateProfile(FireBaseAuth.currentUser, { nombre });

        return {
            ok: true,
            uid, photoURL, nombre, email
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false, errorMessage: error.message
        }
    }
}


export const loginWithEmailAndPassword = async (email, password) => {
    try {
        const resp = await signInWithEmailAndPassword(FireBaseAuth, email, password);
        const { displayName, photoURL, uid, errorMessage } = resp.user;
        return {
            ok: true,
            uid, photoURL, displayName, email, errorMessage
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false, errorMessage: error.message
        }
    }
}

export const LogoutFireBase = async () => {
    return await FireBaseAuth.signOut();
}


