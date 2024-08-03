
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite'
import { GetEnvironments } from "../helpers/getEnvironments";



const {
    VITE_APIKEY,
    VITE_AUTHDOMAIN,
    VITE_PROJECTID,
    VITE_STORAGEBUCKET,
    VITE_APPID,
    VITE_MESSAGINGSENDERID,
} = GetEnvironments();


//dev/prod
const firebaseConfig = {
    apiKey: "AIzaSyCt_Mpe2r8Hm8mLy6bWFFTmiQLTC_twBxk",
    authDomain: "react-curso-441bf.firebaseapp.com",
    projectId: "react-curso-441bf",
    storageBucket: "react-curso-441bf.appspot.com",
    messagingSenderId: "31459251569",
    appId: "1:31459251569:web:175ca2ac5b83524c6852d0"
};

// const firebaseConfig = {
//     apiKey: VITE_APIKEY,
//     authDomain: VITE_AUTHDOMAIN,
//     projectId: VITE_PROJECTID,
//     storageBucket: VITE_STORAGEBUCKET,
//     messagingSenderId: VITE_MESSAGINGSENDERID,
//     appId: VITE_APPID,
// };

console.log(firebaseConfig)


export const FireBaseApp = initializeApp(firebaseConfig);
export const FireBaseAuth = getAuth(FireBaseApp);
export const FireBaseDB = getFirestore(FireBaseApp);