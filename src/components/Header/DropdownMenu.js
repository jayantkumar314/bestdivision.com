import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import { ReactComponent as CogIcon } from '../../icons/cog.svg';
import { ReactComponent as Settings } from '../../icons/settings.svg';
import { ReactComponent as DarkModeIcon } from '../../icons/darkmode.svg';
import { ReactComponent as LightModeIcon } from '../../icons/lightmode.svg';
import { ReactComponent as ChevronIcon } from '../../icons/chevron.svg';
import { ReactComponent as ArrowIcon } from '../../icons/arrow.svg';
import { ReactComponent as BoltIcon } from '../../icons/bolt.svg';

import { useStateValue } from '../../StateProvider'

function DropdownMenu({onClickLogin, onClickRegister}) {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    const [{ appSession, searchValue }, dispatch] = useStateValue();

    // $('#container').html('<button id="btn">Say Hello</button>');
    // $('#btn').click(function () {
    //     alert('Hello!');
    // });

    // function Button() {
    //     return <button id="btn">Say Hello</button>;
    // }

    // ReactDOM.render(
    //     <Button />,
    //     document.getElementById('container'),
    //     function () {
    //         $('#btn').click(function () {
    //             alert('Hello!');
    //         });
    //     }
    // );

    function Button(props) {
        return <button onClick={props.onClick}>Say Hello</button>;
    }

    // function HelloButton() {
    //     function handleClick() {
    //         alert('Hello!');
    //     }
    //     return <Button onClick={handleClick} />;
    // }

    // ReactDOM.render(
    //     <HelloButton />,
    //     document.getElementById('container')
    // );

    useEffect(() => {
        //const hello = dropdownRef;
        //debugger;
        //this one is modified latest one
        //setMenuHeight(dropdownRef.current ? dropdownRef.firstChild.offsetHeight: 0)
    }, [])
    
    useEffect(() => {
        // setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [appSession.user.isLoggedIn])

    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }
    function enableLightMode() {
        // $('html').removeClass('dark-mode');
    }
    function enableDarkMode() {
        // $('html').addClass('dark-mode');
    }
    
    function logoutNow() {
        dispatch({
            type: 'LOGOUT'
        })
    }

    function DropdownItem(props) {

        return (
            <a onClick={props.logoutNow} href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </a>
        );
    }
    function DropdownItemLogout(props) {

        return (
            <a onClick={props.logoutNow} href="#" className="menu-item">
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </a>
        );
    }

    return (
        <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>

            <CSSTransition in={activeMenu === 'main'} timeout={500} classNames="menu-primary" unmountOnExit onEnter={calcHeight}>
                <div className="menu">
                    {appSession.user.isLoggedIn ?
                        <>
                            <DropdownItem>My Profile</DropdownItem>
                            <DropdownItem leftIcon={<Settings />} rightIcon={<ChevronIcon />} goToMenu="settings"> Settings </DropdownItem>
                            <DropdownItem leftIcon="🦧" rightIcon={<ChevronIcon />} goToMenu="animals"> Animals </DropdownItem>
                            <DropdownItem leftIcon="🦧" rightIcon={<ChevronIcon />} goToMenu="appearance"> Appearance </DropdownItem>
                            <DropdownItemLogout leftIcon="🦧" logoutNow={logoutNow} >Logout </DropdownItemLogout>

                        </>
                        :
                        <>
                            <DropdownItem>
                                <button onClick={onClickRegister} type="button" className="btn btn-outline-primary mr-1" >Join Now</button>
                                <button onClick={onClickLogin} type="button" className="btn btn-primary">Login</button>
                            </DropdownItem>
                            
                        </>
                    }
                </div>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === 'settings'}
                timeout={500}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="menu">
                    <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                        <h2>My Tutorial</h2>
                    </DropdownItem>
                    <DropdownItem leftIcon={<BoltIcon />}>HTML</DropdownItem>
                    <DropdownItem leftIcon={<BoltIcon />}>CSS</DropdownItem>
                    <DropdownItem leftIcon={<BoltIcon />}>JavaScript</DropdownItem>
                    <DropdownItem leftIcon={<BoltIcon />}>Awesome!</DropdownItem>
                </div>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === 'animals'}
                timeout={500}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="menu">
                    <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                        <h2>Animals</h2>
                    </DropdownItem>
                    <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
                    <DropdownItem leftIcon="🐸">Frog</DropdownItem>
                    <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
                    <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
                </div>
            </CSSTransition>
            <CSSTransition
                in={activeMenu === 'appearance'}
                timeout={500}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="menu">
                    <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                        <h2>Appearance</h2>
                    </DropdownItem>
                    <DropdownItem leftIcon={<LightModeIcon />} onClick={enableLightMode()}>Light</DropdownItem>
                    <DropdownItem leftIcon={<DarkModeIcon />} onClick={enableDarkMode()}>Dark</DropdownItem>
                </div>
            </CSSTransition>
        </div>
    )
}

export default DropdownMenu