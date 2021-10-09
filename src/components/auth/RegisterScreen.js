import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../action/uiAction';
import { startRegisterWithEmailandPassword } from '../../action/authAction';
import Swal from 'sweetalert2';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui)

    console.log(msgError);

    const { value, handleInputChange } = useForm({
        nombre: '',
        email: '',
        password: '',
        password2: ''
    })

    const { nombre, email, password, password2 } = value;

    const hanldeRegister = e => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(startRegisterWithEmailandPassword(email, password, nombre))
        }
    }

    const isFormValid = () => {
        if ( nombre.trim() === "" ) {
            dispatch(setError('Nombre is required'))
            Swal.fire('Error', msgError, 'error');
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError('Email is required'))
            Swal.fire('Error', msgError, 'error');
            return false;
        } else if (password !== password2 || password.length < 5) {
            dispatch(setError('La password no es validad debe de tener mas de 5 caracteres'))
            Swal.fire('Error', msgError, 'error');
            return false;
        }

        dispatch(removeError())

        return true;
    }

    return (
        <div className="auth_container animate__animated animate__bounce animate__fadeInRight">
            <h1 className="auth_title">Register</h1>

            

            <form onSubmit={hanldeRegister} className="auth_form">
                <input
                    className="input_auth"
                    type="text"
                    name="nombre"
                    placeholder="Into your Full Name"
                    value={nombre}
                    onChange={handleInputChange}
                />

                <input
                    className="input_auth"
                    type="email"
                    name="email"
                    placeholder="Into your Email"
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

                <input
                    className="input_auth"
                    type="password"
                    name="password2"
                    placeholder="Confirm your Password"
                    value={password2}
                    onChange={handleInputChange}
                />

                <button
                    type="submit"
                    className="btn-primary"
                >Register</button>

                <Link
                    to="/auth/login"
                    className="auth_forgot-link"
                    href="#"
                >Sign in</Link>
            </form>

        </div>
    )
}
