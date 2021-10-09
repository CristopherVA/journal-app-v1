import { facebookAuthProvider, firebase, googleAuthProvider } from '../firebase/firebase-config';
import Swal from 'sweetalert2';
import { types } from '../types/types';
import { finishLoading, startLoading } from './uiAction';

export const loginWidthEmailAndPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading())
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName))
                dispatch(finishLoading())
            })
            .catch(e => {
                console.log(e);
                dispatch(finishLoading())
                Swal.fire('Error', e.message, 'error');
            })
    }
}

export const startLoginWithGoogle = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(userCred => {
                dispatch(login(userCred.user.uid, userCred.user.displayName))
            })
    }
}

export const startRegisterWithEmailandPassword = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await user.updateProfile({ displayName: name });
                dispatch(login(user.uid, user.displayName))
            })
            .catch(e => {
                console.log(e);
            })
    }
}

export const startLogout = () => {
    return async (dispatch) => {
       await firebase.auth().signOut();

       dispatch(logout());

    }
}

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const logout = () => ({
    type: types.logout
})