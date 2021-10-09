import React from 'react';
import { useDispatch } from 'react-redux';
import { startLoginWithGoogle } from '../../action/authAction';

export const GoogleButton = () => {

    const dispatch = useDispatch();

    const handleLoginGoogle = () => {
        dispatch(startLoginWithGoogle())
    }

    return (
        <div  className="google_container">
            <p>Login width Google</p>
            <div
                onClick={handleLoginGoogle}
                className="google-btn"
            >
                <div className="google-icon-wrapper">
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                </div>
                <p className="btn-text">
                    <b>Sign in with google</b>
                </p>
            </div>

        </div>
    )
}
