import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FireBaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { startLoadingNotes } from '../store/journal/thunk'


export const UseCheckStatus = () => {

    const { status } = useSelector(state => state.authSlice);

    const dispatch = useDispatch();
    useEffect(() => {
        onAuthStateChanged(FireBaseAuth, async (user) => {
            if (!user) return dispatch(logout());
            dispatch(login({
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                email: user.email,
                errorMessage: null,
            }))
            dispatch(startLoadingNotes())
        })
    }, [])


    return { status };
}