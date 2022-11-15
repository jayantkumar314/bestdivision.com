import React, { useState, useEffect } from 'react'
import { useStateValue } from '../../StateProvider'
import axios from 'axios'
    
const initialFormState = {
    login: "",
    loginErrors: ""
}

function EditProfile({onClickRegister}) {
    const [formState, updateFormState] = useState(initialFormState);
    const [{ user, appSession, searchValue, ModalContent, modalClassName }, dispatch] = useStateValue();

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
    async function getUser(attributes){
        debugger;
        let response = await axios({
            method: 'get',
            url: `users/1`
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
                dispatch({
                    type: 'UPDATE_APP_SESSION',
                    key: 'isLoggedIn',
                    value: false
                })
            }
        }).catch((error) => {
            debugger;
        }).finally(() => {
            debugger;
        });
    }
    function onSubmit(e) {
        e.preventDefault();
        getUser();
    }
    return (
        <>
            <div id="login_content_container" className="login_secondDiv">
                <h5 className="text-center loginSignInText">Edit Profile</h5>
                <form onSubmit={onSubmit} id="login_form" className="form-auth login_form">
                    <div className="form-group">
                        <div className="form_validation_error"></div>
                        <div className="form-label-group">
                            <label htmlFor="display_name">Display Name</label>
                            <input type="display_name" onChange={onChange} id="display_name" name="display_name" size="25" className="form-control change" placeholder="Display Name" required="" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form_validation_error"></div>
                        <div className="form-label-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" onChange={onChange} id="email" name="email" size="25" className="form-control change" placeholder="Email address" required="" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form_validation_error"></div>
                        <div className="form-label-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" onChange={onChange} id="username" name="username" size="25" className="form-control change" placeholder="Username" required="" autoComplete="off" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-label-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" className="form-control change" placeholder="Password" size="25" required="" autoComplete="off" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form_validation_error"></div>
                        <div className="form-label-group">
                            <label htmlFor="cpassword">Confirm Password</label>
                            <input type="password" id="cpassword" name="cpassword" className="form-control change" placeholder="Confirm Password" size="25" required="" autoComplete="off" />
                        </div>
                    </div>

                    {/* <button id="register_btn" className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" di="" disabled="disabled">Resister</button> */}
                    <button type="submit" id="login_btn" name="submit" className="btn btn-login login_btn btn-lg btn-primary btn-block text-uppercase">Register</button>
                </form>
                <div className="custom-control custom-checkbox mt-3 login_registerLink">
                    <a onClick={onClickRegister} href="#">Login</a>
                </div>
            </div>
        </>
    )
}

export default EditProfile
