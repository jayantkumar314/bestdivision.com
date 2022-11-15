import React, { useState, useEffect } from 'react'
// import './Login.css'
import { useStateValue } from '../../StateProvider'
import axios, { fetchToken } from 'axios'
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
// import GoogleLogin from 'react-google-login';


const initialFormState = {
    login: "",
    loginErrors: ""
}

function Login({ onClickRegister, setModalOpen }) {
    const [formState, updateFormState] = useState(initialFormState);
    const [{ user, appSession, searchValue, ModalContent }, dispatch] = useStateValue();

    function onChange(e) {
        e.persist();
        if (e.target.name === 'searchQuery') {
            updateFormState(() => ({
                ...formState,
                searchQuery: e.target.value
            }));
        } else {
            updateFormState(() => ({
                ...formState,
                login: { ...formState.login, [e.target.name]: e.target.value }
            }));
        }
    }
    async function login(attributes){
        let response = await fetchToken({
            method: 'post',
            url: `token`,
            data: formState.login
        }).then((response) => {
            //cookies
            //debugger;
            //let newCookie = 'key=value';
            //let newCookie = 'key=value doSomethingOnlyOnce=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/';
            // let newCookie = 'key=value; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/';
            // let newCookie = 'key=; expires=Fri, 31 Dec 1970 00:00:00 UTC; path=/;';
            //document.cookie = newCookie;
            //console.log(document.cookie);
            //session storage
            //sessionStorage.setItem('token', 'lkajsdlfkjlajsdlfjljalsdjflj');
            //console.log('sessionStorage' + sessionStorage.setItem('token'));
            //local storage
            if (response.data.data.token) {
                if (formState.login.remember_me === 'on') {
                    localStorage.setItem('token', response.data.data.token);
                    //console.log('localStorage' + localStorage.setItem('token'));
                } else {
                    localStorage.setItem('token', response.data.data.token);
                    // sessionStorage.setItem('token', response.data.data.token);
                    //console.log('localStorage' + sessionStorage.setItem('token'));
                }
                response = response.data.data;
                if (response.token) {
                    // dispatch({
                    //     type: 'UPDATE_APP_SESSION',
                    //     key: 'appId',
                    //     value: true
                    // })
                    dispatch({
                        type: 'UPDATE_APP_SESSION',
                        key: 'user',
                        value: {
                            token: response.token,
                            isLoggedIn: true
                        }
                    })
                } else {
                    dispatch({
                        type: 'UPDATE_APP_SESSION',
                        key: 'user',
                        value: {
                            token: '',
                            isLoggedIn: false
                        }
                    })
                }
            } else {
                dispatch({
                    type: 'UPDATE_APP_SESSION',
                    key: 'user',
                    value: {
                        token: '',
                        isLoggedIn: false
                    }
                })
            }
            setModalOpen(false)

        }
            //sessionStorage.removeItem('token');
            //sessionStorage.clear();

        ).catch((error) => {
        }).finally(() => {
        });
    }
    function onSubmit(e) {
        e.preventDefault();
        login();
    }
    function responseFacebook() {
        debugger;
    } 
    const responseGoogle = (response) => {
        console.log(response);
    }

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
                <h5 className="text-center loginSignInText">Sign In</h5>
                <form onSubmit={onSubmit} id="login_form" className="form-auth login_form">
                    <input type="hidden" id="csrfToken" name="ci_csrf_token" value="" />
                    <div className="form-label-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" onChange={onChange} id="username" name="username" className="form-control" placeholder="Username" required="" autoFocus="" />
                    </div>
                    <div className="form-label-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" onChange={onChange} id="password" name="password" className="form-control" placeholder="Password" required="" />
                    </div>
                    <div className="custom-control custom-checkbox mb-3">
                        <input type="checkbox" onChange={onChange} id="remember_me" name="remember_me" className="custom-control-input" />
                        <label className="custom-control-label" htmlFor="remember_me">Remember password</label>
                        <a className="forgot-password" href={`${process.env.REACT_APP_BASE_URL}/auth/forgot_password`}>Forgot Password?</a>
                    </div>
                    <button type="submit" id="login_btn" name="submit" className="btn btn-login login_btn btn-lg btn-primary btn-block text-uppercase">Sign in</button>
                    <div className="social-login-container login_socialIconsContainer">
                        {/* <GoogleLogin
                            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                            render={renderProps => (
                                // <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
                                <div onClick={renderProps.onClick} disabled={renderProps.disabled} id="google-login-button" className="social-login-buttons login_socialIcons">
                                    <div className="social-login">
                                        <div className="social-login-icon">
                                            <svg width="40" height="40" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                                                <title>Login by Google</title>
                                                <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"></path>
                                                <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"></path>
                                                <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"></path>
                                                <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )}
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        /> */}
                        {/* <FacebookLogin
                            appId="1088597931155576"
                            // autoLoad
                            callback={responseFacebook}
                            render={renderProps => (
                                // <button onClick={renderProps.onClick}>This is my custom FB button</button>
                                <div onClick={renderProps.onClick} id="facebook-login-button" className="social-login-buttons login_socialIcons">
                                    <div className="social-login">
                                        <div className="social-login-icon">
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32">
                                                <title>Login by Facebook</title>
                                                <path fill="#1877f2" d="M31.997 15.999c0-8.836-7.163-15.999-15.999-15.999s-15.999 7.163-15.999 15.999c0 7.985 5.851 14.604 13.499 15.804v-11.18h-4.062v-4.625h4.062v-3.525c0-4.010 2.389-6.225 6.043-6.225 1.75 0 3.581 0.313 3.581 0.313v3.937h-2.017c-1.987 0-2.607 1.233-2.607 2.498v3.001h4.437l-0.709 4.625h-3.728v11.18c7.649-1.2 13.499-7.819 13.499-15.804z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )}
                        /> */}
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
                    <a onClick={onClickRegister} href="#">Register on Best Division?</a>
                </div>
            </div>
        </>
    )
}

export default Login
