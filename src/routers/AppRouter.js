import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
} from 'react-router-dom';

import { RotateSpinner } from "react-spinners-kit";

import { firebase } from '../firebase/firebase-config';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { useDispatch } from 'react-redux';
import { login } from '../action/authAction';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { startLoadingNotes } from '../action/notesAction';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        firebase.auth().onAuthStateChanged(async(user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName))
                setIsLoggedIn(true)
                
                dispatch(startLoadingNotes(user.uid));
            } else {
                setIsLoggedIn(false)
            }

            setChecking(false);
        })
    }, [dispatch, setChecking, setIsLoggedIn])


    if (checking) {
        return (
            <div style={{
                width: '100vw',
                height: '100vh',
                backgroundColor: '#5c62c5',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',

                
            }}>
                <RotateSpinner />
            </div>
        )
    }


    return (
        <div>
            <Router>
                <div>
                    <Switch>
                        <PublicRoute path="/auth" component={AuthRouter} isAuthenticated={isLoggedIn}/>
                        <PrivateRoute exact path="/" component={JournalScreen} isAuthenticated={isLoggedIn} />

                        {/* {
                            ( isLoggedIn == true )
                                ? (
                                    <Route
                                        exact
                                        path='/'
                                        component={JournalScreen}
                                    />
                                ) : (
                                    <Redirect
                                        to='/auth/login'
                                        component={AuthRouter}
                                    />
                                )
                        }

                        {
                            ( isLoggedIn == false )
                                ? (
                                    <Route
                                        exact
                                        path='/auth/login'
                                        component={AuthRouter}
                                    />
                                ) : (
                                    <Redirect
                                        to='/'
                                        component={JournalScreen}
                                    />
                                )
                        } */}


                    </Switch>
                </div>
            </Router>
        </div>
    )
}
