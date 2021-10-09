import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GoogleButton } from './GoogleButton';
import { useForm } from '../../hooks/useForm';
import { loginWidthEmailAndPassword } from '../../action/authAction';
import { validator } from 'validator';
import { removeError, setError } from '../../action/uiAction';
import Swal from 'sweetalert2';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { msgError, loading } = useSelector(state => state.ui)

    const { value, handleInputChange } = useForm({
        email: '',
        password: ''
    })

    const { email, password } = value;

    const handleSubmit = e => {
        e.preventDefault()
        if (isFormValid) {
            dispatch(loginWidthEmailAndPassword(email, password))
        }
    }

    const isFormValid = () => {
        if (!validator.isEmail(email)) {
            dispatch(setError('Email is required'))
            Swal.fire('Error', msgError, 'error')
            return false;
        } else if (password.length < 5) {
            dispatch(setError('La password no es validad'))
            Swal.fire('Error', msgError, 'error')
            return false;
        }

        dispatch(removeError())

        return true;
    }

    return (
        <div className="auth_container animate__animated animate__bounce animate__fadeInLeft">
            <h1 className="auth_title">Login</h1>

            <form onSubmit={handleSubmit} className="auth_form ">
                <input
                    className="input_auth"
                    type="email"
                    name="email"
                    placeholder="Into your Email"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    className="input_auth"
                    type="password"
                    name="password"
                    placeholder="Into your Password"
                    value={password}
                    onChange={handleInputChange}

                />

                <button
                    className="btn-primary"
                    disabled={ loading }
                >Login to Journal</button>
                
                <hr />
                <GoogleButton />

                <Link 
                    to="/auth/register" 
                    className="auth_create-link" 
                    href="#"
                >Create Account</Link>

            </form>

        </div>
    )
}
