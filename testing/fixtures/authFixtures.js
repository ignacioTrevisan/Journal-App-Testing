export const initialState = {
    status: 'Checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const authenticatedState = {

    status: 'authenticated',
    uid: 'ABC123',
    email: 'demo@google.com',
    displayName: 'DEMO USER',
    photoURL: 'https://demo.jpg',
    errorMessage: null,

}

export const notAuthenticatedState = (error = null) => {

    return ({

        status: 'not-authenticated',
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: error,
    })

}

export const demoUser = {
    uid: 'ABC123',
    email: 'demo@google.com',
    displayName: 'DEMO USER',
    photoURL: 'https://demo.jpg',
    errorMessage: null,
}