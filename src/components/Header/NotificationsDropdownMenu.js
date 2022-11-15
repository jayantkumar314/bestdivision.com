import React, { Fragment, useState, useEffect, useRef, useCallback } from 'react'
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import { ReactComponent as CogIcon } from '../../icons/cog.svg';
import { ReactComponent as Settings } from '../../icons/settings.svg';
import { ReactComponent as DarkModeIcon } from '../../icons/darkmode.svg';
import { ReactComponent as LightModeIcon } from '../../icons/lightmode.svg';
import { ReactComponent as ChevronIcon } from '../../icons/chevron.svg';
import { ReactComponent as ArrowIcon } from '../../icons/arrow.svg';
import { ReactComponent as BoltIcon } from '../../icons/bolt.svg';

import Svg from 'components/Svg'
import axios, { axiosAjax } from 'axios'
import useNotificationSearch from './useNotificationsSearch'

import Loader from 'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


import { useStateValue } from '../../StateProvider'
const initialParams = {
    q: '',
    start: 0
}

function NotificationsDropdownMenu() {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);
    const [params, setParams] = useState(initialParams)
    const { loading, error, notifications, hasMore } = useNotificationSearch(params)


    const [{ appSession, searchValue }, dispatch] = useStateValue();

    const observer = useRef()
    const lastNotificationElementRef = useCallback(node => {
        if (loading) {
            return
        }
        if (observer.current) {
            observer.current.disconnect()
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setParams(() => ({
                    ...params,
                    start: parseInt(params.start) + 10
                }));
            }
        })
        if (node) {
            observer.current.observe(node)
        }
    }, [loading, hasMore])

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
        debugger;
        // setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])

    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }
    
    function DropdownItem({props, lastNotificationElementRef}) {
        return (
            <>
                {/* <ul class="css-scope notifications dropdown-menu show" aria-labelledby="notifications" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(-118px, 40px, 0px);"> */}

                <li key={props.id} ref={lastNotificationElementRef} >
                    <ul class="css-scope notifications_list"><li class="notifications_single">
                        {/* <a href="http://localhost/boroktv.com/@deepak" class="fluid" style="display: block;"> */}
                        <a href={`/${props.url}`} class="fluid">
                            <div class="notifications_avatar">
                                <img class="full-size" src={`${process.env.REACT_APP_ASSETS_URL}/uploads/avatar/jayantkumar314.jpg`} alt={props.user_name} />
                            </div>
                            <div class="notifications_info">
                                <p>
                                    <span class="username">{props.display_name}</span>
                                    {/* <span> added you as his friend</span> */}
                                    <span> {props.notification_type}</span>
                                    <span></span>
                                </p>
                                <time>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="8.5" cy="7" r="4"></circle>
                                        <line x1="20" y1="8" x2="20" y2="14"></line>
                                        <line x1="23" y1="11" x2="17" y2="11"></line>
                                    </svg>
                        12 months ago
                    </time>
                            </div>
                        </a>
                    </li></ul>
                </li>
            </>
        );
    }

    return (
        <div className="dropdown" style={{ height: menuHeight, minHeight: 400 }} ref={dropdownRef}>
            <CSSTransition
                in={activeMenu === 'main'}
                timeout={500}
                classNames="menu-primary"
                unmountOnExit
                onEnter={calcHeight}
            >
                <div className="menu">
                    <ul class="css-scope notifications dropdown-menu show" aria-labelledby="notifications" x-placement="bottom-start" >
                        <h5>
                            <b>{notifications.unseen_notifications_count}</b> Notifications
                                <i class="fa fa-circle-o-notch spin hidden" aria-hidden="true"></i>
                        </h5>
                        {notifications && notifications.length > 0 &&
                            notifications.map((notification, index) => {
                                if (notifications.length === index + 1) {
                                    return (<DropdownItem props={notification} lastNotificationElementRef={lastNotificationElementRef} />);
                                } else {
                                    return (<DropdownItem props={notification} />);
                                }
                            })
                        }
                        {loading &&
                            <div className="loader_container" >
                                <Loader type="Puff" color="#00BFFF" height={100} width={100} timeout={3000} />
                            </div>
                        }
                        <div>{error && 'Error...'}</div>
                    </ul>
                </div>
            </CSSTransition>
        </div>
    )
}

export default NotificationsDropdownMenu
