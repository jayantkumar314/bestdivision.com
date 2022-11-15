import React, { useState, useEffect } from 'react'
import { useStateValue } from '../../StateProvider'
import GoogleLogin from '../Login/GoogleLogin'
import axios from 'axios'

const initialFormState = {
    login: "",
    loginErrors: ""
}
function Register({ onClickLogin }) {
    const [formState, updateFormState] = useState(initialFormState);
    const [formErrorState, updateFormErrorState] = useState(null);
    const [{ user, appSession, searchValue, ModalContent }, dispatch] = useStateValue();

    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

    const validateForm = (errors) => {
        let valid = true;
        if (errors !== '') {
            Object.values(errors).forEach(
                // if we have an error string set valid to false
                (val) => val.length > 0 && (valid = false)
            );
        }
        return valid;
    }
    function onChange(e) {
        e.persist();
        const { name, value } = e.target;
        switch (name) {
            case 'fullName':
                updateFormErrorState(() => ({
                    ...formErrorState,
                    display_name: value.length < 5 ? '' : 'Full Name must be 5 characters long!'
                }));
                break;
            case 'email':
                updateFormErrorState(() => ({
                    ...formErrorState,
                    email: validEmailRegex.test(value) ? '' : 'Email is not valid!'
                }));
                break;
            case 'password':
                updateFormErrorState(() => ({
                    ...formErrorState,
                    password: value.length < 8 ? '' : 'Password must be 8 characters long!'
                }));
                break;
            default:
                break;
        }

        if (name === 'searchQuery') {
            updateFormState(() => ({
                ...formState,
                searchQuery: value
            }));
        } else {
            updateFormState(() => ({
                ...formState,
                login: { ...formState.login, [name]: value }
            }));
        }
    }
    async function register(attributes) {
        let response = await axios({
            method: 'post',
            url: `users`,
            data: formState.login
        }).then((response) => {
            if (response.data.data) {
                response = response.data.data;
                if (response.token) {
                    dispatch({
                        type: 'UPDATE_APP_SESSION',
                        key: 'isLoggedIn',
                        value: true
                    })
                    dispatch({
                        type: 'UPDATE_APP_SESSION',
                        key: 'user',
                        value: {
                            name: 'Simer Singh',
                            address: 'Charlotte, NC'
                        }
                    })
                } else {
                    dispatch({
                        type: 'UPDATE_APP_SESSION',
                        key: 'isLoggedIn',
                        value: false
                    })
                }
            } else {
                // if(response.data.errors.length > 0) {

                // }
                alert("Sorry! Something went wrong")
                dispatch({
                    type: 'UPDATE_APP_SESSION',
                    key: 'isLoggedIn',
                    value: false
                })
            }
        }).catch((error) => {
        }).finally(() => {
        });
    }
    function onSubmit(e) {
        e.preventDefault();
        let isValid = validateForm(formState.loginErrors)
        if (isValid) {
            register();
        }
    }
    console.log(formState)
    console.log(formErrorState)
    return (
        <><div className="logo-sn d-block login_firstDiv">
            <div className="text-center">
                <div className="col s12 m8 offset-m2 l6 offset-l3">
                    <div className="card-panel grey lighten-5 z-depth-1">
                        <div className="row valign-wrapper">
                            <div className="signIn-logo">
                                <img src={`${process.env.REACT_APP_ASSETS_URL}/logo.png`} alt="bestdivision-logo" className="circle responsive-img" />
                            </div>
                        </div>
                        <div className="jk-logo-span row valign-wrapper ">
                            <div className="">BESTDIVISION</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div id="login_content_container" className="login_secondDiv">
                <h5 className="text-center loginSignInText">Register</h5>
                <form onSubmit={onSubmit} id="login_form" className="form-auth login_form">
                    <div className="form-group">
                        <div className="form_validation_error"></div>
                        <div className="form-label-group">
                            {formState.loginErrors > 0 &&
                                <span className='error'>{formState.loginErrors.email}</span>}
                            <label htmlFor="display_name">Display Name</label>
                            <input type="text" onChange={onChange} id="display_name" name="display_name" size="25" className="form-control change" placeholder="Display Name" required="" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form_validation_error"></div>
                        <div className="form-label-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" onChange={onChange} id="email" name="email" size="25" className="form-control change" placeholder="Email address" required="" />
                        </div>
                    </div>
                    {/* <div className="form-group">
                        <div className="form_validation_error"></div>
                        <div className="form-label-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" onChange={onChange} id="username" name="username" size="25" className="form-control change" placeholder="Username" required="" autoComplete="off" />
                        </div>
                    </div> */}
                    <div className="form-group">
                        <div className="form-label-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" onChange={onChange} id="password" name="password" className="form-control change" placeholder="Password" size="25" required="" autoComplete="off" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form_validation_error"></div>
                        <div className="form-label-group">
                            <label htmlFor="cpassword">Confirm Password</label>
                            <input type="password" onChange={onChange} id="cpassword" name="cpassword" className="form-control change" placeholder="Confirm Password" size="25" required="" autoComplete="off" />
                        </div>
                    </div>

                    {/* <button id="register_btn" className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" di="" disabled="disabled">Resister</button> */}
                    <button type="submit" id="login_btn" name="submit" className="btn btn-login login_btn btn-lg btn-primary btn-block text-uppercase">Register</button>
                    <div className="social-login-container login_socialIconsContainer">
                        <GoogleLogin/>
                        <div id="facebook-login-button" className="social-login-buttons login_socialIcons">
                            <div className="social-login">
                                <div className="social-login-icon">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32">
                                        <title>Login by Facebook</title>
                                        <path fill="#1877f2" d="M31.997 15.999c0-8.836-7.163-15.999-15.999-15.999s-15.999 7.163-15.999 15.999c0 7.985 5.851 14.604 13.499 15.804v-11.18h-4.062v-4.625h4.062v-3.525c0-4.010 2.389-6.225 6.043-6.225 1.75 0 3.581 0.313 3.581 0.313v3.937h-2.017c-1.987 0-2.607 1.233-2.607 2.498v3.001h4.437l-0.709 4.625h-3.728v11.18c7.649-1.2 13.499-7.819 13.499-15.804z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div id="twitter-login-button" className="social-login-buttons login_socialIcons">
                            <div className="social-login">
                                <div className="social-login-icon">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32">
                                        <title>Login by Twitter</title>
                                        <path fill="#1da1f2" d="M31.939 6.092c-1.18 0.519-2.44 0.872-3.767 1.033 1.352-0.815 2.392-2.099 2.884-3.631-1.268 0.74-2.673 1.279-4.169 1.579-1.195-1.279-2.897-2.079-4.788-2.079-3.623 0-6.56 2.937-6.56 6.556 0 0.52 0.060 1.020 0.169 1.499-5.453-0.257-10.287-2.876-13.521-6.835-0.569 0.963-0.888 2.081-0.888 3.3 0 2.28 1.16 4.284 2.917 5.461-1.076-0.035-2.088-0.331-2.971-0.821v0.081c0 3.18 2.257 5.832 5.261 6.436-0.551 0.148-1.132 0.228-1.728 0.228-0.419 0-0.82-0.040-1.221-0.115 0.841 2.604 3.26 4.503 6.139 4.556-2.24 1.759-5.079 2.807-8.136 2.807-0.52 0-1.039-0.031-1.56-0.089 2.919 1.859 6.357 2.945 10.076 2.945 12.072 0 18.665-9.995 18.665-18.648 0-0.279 0-0.56-0.020-0.84 1.281-0.919 2.4-2.080 3.28-3.397z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="custom-control custom-checkbox mt-3 login_registerLink">
                    <a onClick={onClickLogin} href="#">Login</a>
                </div>
            </div>
        </>
    )
}

export default Register
