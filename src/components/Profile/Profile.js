import React, { Fragment, useState, useEffect } from 'react'
import { withRouter } from "react-router-dom";
// import './Profile.css'
import { useStateValue } from '../../StateProvider'
import axios from 'axios'
// import './ContentSection.css'
// import '../components/common/css/pills.css'
// import '../components/common/css/search.css'
// import Pills from '../components/Pills/Pills'
import CourseCard from '../CourseCard'
// import NavItem from './NavItem'
import Svg from '../Svg'
import Modal from '../Modal'
import EditProfile from './EditProfile'

// import { ReactComponent as Mysvg } from './Mysvg.svg'
import { FormattedMessage } from "react-intl"

// import SelectSearch from 'react-select-search'
const homeHero = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 3510.8 349.9" xml:space="preserve"><style type="text/css">.st0{opacity:0.35;fill:#f5f5f5;}.st1{fill:#f5f5f5;}</style><path className="st0" d="M1538.6,349.9c-8.5-5.8-17-11.5-25.4-17.2c-201.1-134-443.1-203.1-683.1-195.3	c-227.5,7.5-446.5,85.8-635.3,212.4H1538.6z"></path><path className="st1" d="M3510.8,204.2c-20.4-11.2-41.6-21.2-62.2-29.5c-82.7-33.3-189.3-48.1-283.7-29.4
		c-145.5,29-226.9,126.3-365.6,165.7c-122,34.6-266.8,18.4-392.2-11.3c-243.9-57.8-476.4-125.1-746.4-111c-148,7.7-291,38.8-421.4,82
		c-134.5,44.6-293.8,106.7-448.7,58.3c-131.8-41.3-200.4-132.1-322.4-182c-91.2-37.3-207.8-50.7-315.1-36.3
		C98,118.1,45.7,132.9,0,153.3v197.2h3510.8V204.2z"></path><path className="st0" d="M3510.8,282.8c-117.5-97.4-255.6-201.2-413.4-176.4c-111.4,17.5-184.7,114-282.7,161
		c-127.3,61-227.1-16.9-341-69.3c-153.7-70.6-343.6-51.4-480.7,48.6c-42.4,31-83,70-125.2,103.2h1643V282.8z"></path><path className="st0" d="M3510.8,161.9c-21.6-2.7-43-3.1-62.3-1.6c-73,5.5-142.2,33.4-209.5,62.3c-67.3,28.9-134.9,59.4-207.2,70.9
		c-241.2,38.3-440.7-133.6-663.5-189c-201.9-50.2-415.8-6.8-611.8,62.6c-199.5,70.6-405.5,169.7-612.9,127.5
		c-146-29.7-268.2-125.9-403.1-189.1C501.4-6.7,247.5-4.2,0,50.1v299.8h3510.8V161.9z"></path></svg>`;

const initialSelectSearchState = {
    options: [],
    getOptions: {
        url: 'tutorials/categories',
        params: {
            "type": "categories",
            "search": "",
            // "limit": "2",
            // "offset": 1
        }
    },
    placeholder: "Search Tutorials"

}
// const initialTabSelected = {
//     options:[],
//     getOptions:{
//         url:'tutorial',
//         params: {
//             "type": "category",
//             "search": "",
//             // "limit": "2",
//             // "offset": 1
//         }
//     },
//     placeholder:"Search Tutorials"

// }
const initialTabSelected = 'tutorials';
const initialTabContent = {
    options: [],
    getOptions: {
        url: 'tutorials/categories',
        params: {
            "type": "categories",
            "search": "",
            // "limit": "2",
            // "offset": 1
        }
    },
    placeholder: "Search Tutorials"

}

const initialFormState = {
    group: {},
    searchQuery: "",
    searhedResult: ""
}
const initialSearchState = [];



function Profile(props) {
    const [formState, updateFormState] = useState(initialFormState);
    const [searchState, updateSearchState] = useState(initialSearchState);
    const [selectSearchState, updateSelectSearchState] = useState(initialSelectSearchState);
    const [tabContent, updateTabContent] = useState(initialTabContent);
    const [contentTitle, updateContentTitle] = useState('');
    const [tabSelected, updateTabSelected] = useState(initialTabSelected);
    const [modalOpen, setModalOpen] = useState(false);
    const [user, setUser] = useState(null);
    // const [tutorials, setTutorials] = useState(initialTutorials);

    async function dbGetHomeContents(){
        let response = await axios({
            method: 'get',
            url: `${tabSelected}/categories`,
            params: searchState.params
        }).then((response) => {
            updateTabContent(() => (response.data.data))
        }).catch((error) => {
        }).finally(() => {
        });
    }
    async function getUser(){
        // debugger
        let response = await axios({
            method: 'get',
            // url: `users/${username}`,
            url: `users/${props.match.params.username}`,
            // url: `users/${user.slug}`,
        }).then((response) => {
            setUser(() => ({
                ...response.data.data
        	}));
            // setUser(() => ({user:}))
        }).catch((error) => {
        }).finally(() => {
        });
    }

    useEffect(() => {
        getUser();
        dbGetHomeContents();
    }, [])
    useEffect(() => {
        dbGetHomeContents();
    }, [tabSelected])

    function onChange(e) {
        // debugger;
        // e.persist();
        // if (e.target.name === 'searchQuery') {
        // 	updateFormState(() => ({
        // 		...formState,
        // 		searchQuery: e.target.value
        // 	}));
        // } else {
        // 	updateFormState(() => ({
        // 		...formState,
        // 		group: { ...formState.group, [e.target.name]: e.target.value }
        // 	}));
        // }
        // console.log(formState);
    }
   
    const [selectedValue, setSelectedValue] = useState(3);
    const handleSearchChange = e => {
        let row = searchState[e];
        updateFormState(() => ({
            ...formState,
            searchedResult: JSON.stringify(row)
        }));
        dbGetHomeContents();
    }
    function onClick(e) {
        let tabSelected = e.target.dataset.content;
        let url = `${tabSelected}/categories`
        updateTabSelected(tabSelected);
        // dbGetHomeContents(tabSelected);
        tabSelected = tabSelected.charAt(0).toUpperCase() + tabSelected.slice(1)
        updateContentTitle(tabSelected);
        updateSelectSearchState(() => ({
            ...selectSearchState,
            options: [],
            placeholder: `Search ${tabSelected}`,
            getOptions: {
                ...selectSearchState.getOptions,
                type: tabSelected,
                url: url,
                // search": "",
                params: {
                    "search": "",
                    // "limit": "2",
                    // "offset": 1
                }
            }
        }));
    }
    console.log(user);
    return (
        <>
            {/* <Modal isOpen={modalOpen} setModalOpen={setModalOpen} modalClassName={modalClassName} children={ModalContent} /> */}
            { user &&
            <section id="section_content" className="css-scope section_content">
                <div className="container-fluid" id="jk_overlay_container">
                    <div className="row clearfix">
                        <div className="col-12">
                            <div className="bd_blog_top_wrapper_parent">
                                <div className="profile-background-wallpaper"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container" id="jk_after_overlay_container">
                    <div className="container-fluid">
                        <div className="row clearfix">
                            <main className="profile_main">
                                <div className="box shadow-sm border rounded bg-white mb-3 jk-share-post">
                                    <div className="row jk-row">
                                        <div id="first_section" className="profile-section first-section col-lg-4">
                                            <div className="profile-container">
                                                <div className="profile-photo">
                                                    <img src="https://picsum.photos/300/300" alt="Robert Smith" />
                                                </div>
                                            </div>
                                            <div className="profile-section first-section-b">
                                                <div>Hello</div>
                                                <div>Hello</div>
                                                <div>Hello</div>
                                                <div>Hello</div>
                                                <div>Hello</div>
                                                <div>Hello</div>
                                            </div>
                                        </div>
                                        <div id="second_section" className="profile-section second-section col-lg-8">
                                            <div className="profile-header">
                                                <h1 className="profile-header-content profile-name">{user.display_name}</h1>  <span className="profile-header-content profile-user_name">@{user.user_name}</span>
                                            </div>
                                            <div className="profile-header profile-buttons"> <a href="#" className="badge badge-pill badge-light">Follwers 55 </a>  <a href="#" className="badge badge-pill badge-light">Following 44 </a>  <a href="#" className="badge badge-pill badge-light">Blogs 23 </a>
                                            </div>
                                            <div className="profile-header-content profile-tag_line">Enjoy Full Masti!!</div>
                                            {/* <button onClick={onClickEditProfile} type="button" className="btn btn-primary">Edit Profile</button> */}
                                            <button type="button" className="btn btn-primary">Edit Profile</button>
                                        </div>
                                    </div>
                                    <div className="notification">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-2 all-notification text-center">
                                                    <img src="/static/media/notification.005bf4a0.svg" />
                                                    <h4>Notifications</h4>
                                                    <button type="submit" className="btn btn-outline-primary btn-lg btn-block">All</button>
                                                </div>
                                                <div className="col-md-5 messages">
                                                    <div className="left"><span>1</span>
                                                    </div>
                                                    <div className="right col-11">
                                                        <div className="title">
                                                            <h4>Message Title</h4><span>10th, November, 2020, 15:30 am</span>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary btn-lg btn-block">Action</button>
                                                    </div>
                                                </div>
                                                <div className="col-md-5 messages">
                                                    <div className="left"><span>2</span>
                                                    </div>
                                                    <div className="right col-11">
                                                        <div className="title">
                                                            <h4>Title</h4><span>10th, November, 2020, 15:30 am</span>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary btn-lg btn-block">Action</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="find-players recent-matches">
                                        <div className="header">
                                            <div className="container">
                                                <div className="row">
                                                    {/* <h3>Recent Matches</h3> */}
                                                    {/* <button type="submit" className="btn btn-outline-secondary btn-lg btn-block ml-auto">View All</button> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="recent-matches-details">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="box">
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th colspan="5">
                                                                            <h3>Playoff</h3>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <img className="player-icon" src="/static/media/player-icon.fabda740.svg" />
                                                                        </td>
                                                                        <td className="light">S. Singh</td>
                                                                        <td></td>
                                                                        <td><span className="light-bg">3</span>
                                                                        </td>
                                                                        <td><span className="light-bg">0</span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <img className="player-icon" src="/static/media/player-icon.fabda740.svg" />
                                                                        </td>
                                                                        <td>R. Kramin</td>
                                                                        <td>
                                                                            <img src="/static/media/trophy.4de4786c.svg" />
                                                                        </td>
                                                                        <td><span className="dark-bg">6</span>
                                                                        </td>
                                                                        <td><span className="dark-bg">4</span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="box">
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th colspan="5">
                                                                            <h3>Quarterfinals</h3>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <img className="player-icon" src="/static/media/player-icon.fabda740.svg" />
                                                                        </td>
                                                                        <td>S. Singh</td>
                                                                        <td>
                                                                            <img src="/static/media/trophy.4de4786c.svg" />
                                                                        </td>
                                                                        <td><span className="dark-bg">3</span>
                                                                        </td>
                                                                        <td><span className="dark-bg">0</span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <img className="player-icon" src="/static/media/player-icon.fabda740.svg" />
                                                                        </td>
                                                                        <td className="light">R. Kramin</td>
                                                                        <td></td>
                                                                        <td><span className="light-bg">6</span>
                                                                        </td>
                                                                        <td><span className="light-bg">4</span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="box">
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th colspan="5">
                                                                            <h3>Final</h3>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <img className="player-icon" src="/static/media/player-icon.fabda740.svg" />
                                                                        </td>
                                                                        <td className="light">S. Singh</td>
                                                                        <td></td>
                                                                        <td><span className="light-bg">3</span>
                                                                        </td>
                                                                        <td><span className="light-bg">0</span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <img className="player-icon" src="/static/media/player-icon.fabda740.svg" />
                                                                        </td>
                                                                        <td>R. Kramin</td>
                                                                        <td>
                                                                            <img src="/static/media/trophy.4de4786c.svg" />
                                                                        </td>
                                                                        <td><span className="dark-bg">6</span>
                                                                        </td>
                                                                        <td><span className="dark-bg">4</span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container" id="jk_after_overlay_container">
                                        <div className="container-fluid">
                                            <div className="row clearfix">
                                                <main className="jkkkmain">
                                                    <div className="box shadow-sm border rounded bg-white mb-3 jk-share-post">
                                                        <ul className="nav border-bottom jk-line-tab" id="myTab" role="tablist">
                                                            {/* <NavItem name="hello" /> */}
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "tutorials") ? 'active' : ''}`} id="tutorials-tab" data-content="tutorials" >Home</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "tutorials") ? 'active' : ''}`} id="tutorials-tab" data-content="tutorials" >My Universe</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "tutorials") ? 'active' : ''}`} id="tutorials-tab" data-content="tutorials" >Discussion</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "tutorials") ? 'active' : ''}`} id="tutorials-tab" data-content="tutorials" >About</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "tutorials") ? 'active' : ''}`} id="tutorials-tab" data-content="tutorials" >Tutorials</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "blogs") ? 'active' : ''}`} id="blogs-tab" data-content="blogs" >Blogs</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >Recent Activities</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >Friends</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >Services</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >Events</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >History</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >Likes</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >Questions</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >Groups</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >History</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >History</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >History</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >History</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >History</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >History</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >History</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >History</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >History</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >History</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >History</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >History</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >History</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >History</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >History</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >History</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >History</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >History</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >History</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >History</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >History</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >History</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >History</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >History</a>
                                                            </li>
                                                            <li onClick={onClick} className="nav-item">
                                                                <a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >History</a>
                                                            </li>
                                                        </ul>
                                                        <div className="row border-bottom">
                                                            <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                                                <input type="hidden" onChange={onChange} name="searchQuery" value={formState.searchedResult} className="form-control search-icon" id="searchQuery" placeholder="Enter your city" required />
                                                                {/* <SelectSearch
                                                                    // options={[]} 
                                                                    options={searchState}
                                                                    // className="search_input css-scope jk-search-box"
                                                                    getOptions={(query) => {
                                                                        // debugger;
                                                                        // updateFormState(() => ({
                                                                        // 		...formState,
                                                                        // 		group: { ...formState.group, [e.target.name]: e.target.value }
                                                                        // 	}));
                                                                        // updateSelectSearchState(() => ({
                                                                        //     ...selectSearchState,
                                                                        //     getOptions: {
                                                                        //         ...selectSearchState.getOptions,
                                                                        //         query:query
                                                                        //     }
                                                                        // }));
                                                                        let params = selectSearchState.getOptions.params
                                                                        params.search = query;
                                                                        return axios({
                                                                            method: 'GET',
                                                                            url: selectSearchState.getOptions.url,
                                                                            params: params
                                                                        }).then(response => response.data)
                                                                            .then(({ data }) => {
                                                                                if (data) {
                                                                                    updateSearchState(() => (
                                                                                        data.map((row, index) => ({ name: row.name, value: index, data: row }))
                                                                                    ));
                                                                                }
                                                                                //return items.map(({title}) => ({ value: 'hello', name:title }))
                                                                            }).catch((error) => {
                                                                            }).finally(() => {
                                                                            })
                                                                    }}
                                                                    placeholder={selectSearchState.placeholder}
                                                                    search
                                                                    // onChange={setTitle}
                                                                    onChange={handleSearchChange}
                                                                    // onChange={onChange}
                                                                    // emptyMessage="Not Found"
                                                                    // value='helllo'  
                                                                    value={searchState.find(obj => obj.value === selectedValue)}
                                                                /> */}
                                                                {/* <form className="job-search p-3" autoComplete="off" action="/action_page.php"> */}
                                                                {/* <div className="input-group autoComplete"> */}

                                                                {/* <input id="search_tutorials" className="search_input" type="text" className="form-control" name="search_tutorials" placeholder="Search Tutorials" aria-label="Search" aria-describedby="basic-addon2"/>
                                                <div className="input-group-append">
                                                <button className="btn btn-outline-secondary" type="button">
                                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><title>Search</title><path d="M9.516 14.016q1.875 0 3.188-1.313t1.313-3.188-1.313-3.188-3.188-1.313-3.188 1.313-1.313 3.188 1.313 3.188 3.188 1.313zM15.516 14.016l4.969 4.969-1.5 1.5-4.969-4.969v-0.797l-0.281-0.281q-1.781 1.547-4.219 1.547-2.719 0-4.617-1.875t-1.898-4.594 1.898-4.617 4.617-1.898 4.594 1.898 1.875 4.617q0 0.984-0.469 2.227t-1.078 1.992l0.281 0.281h0.797z"></path></svg>
                                                </button>
                                            </div> */}
                                                                {/* </div> */}
                                                                {/* </form> */}
                                                            </div>
                                                            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                                                <div className="pt-4">
                                                                    {/* <!-- <b><?=count($tutorials)?> Results</b> --> */}
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                                                <div className="pt-4">
                                                                    {/* <!-- <b>1,234 Results</b> --> */}
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                                                <div className="pt-4">
                                                                    {/* <!-- <b>Sort By : </b> --> */}
                                                                    <button type="button" className="btn btn-primary">View All</button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="p-3 tutorials-tags">
                                                            {/* <!-- <button type="button" className="btn btn-outline-secondary btn-sm mr-1 active" data-id='0'>All</button> -->
                                    <?php 
                                        // foreach($groups as $group) {
                                        //     if($group->is_tutorial_group) {
                                        //         echo '<button type="button" className="btn btn-outline-secondary btn-sm mr-1" data-id="'.$group->id.'">'.$group->name.'</button>';
                                        //     }
                                        // }
                                    ?> */}
                                                        </div>

                                                        <div className="container jk-main-content">
                                                            <h2 className="">{contentTitle}</h2>
                                                            <div id="tutorials-cards_container" className="row clearfix cards_container">
                                                                {tabContent && tabContent.length > 0 &&
                                                                    tabContent.map((key, value) => {
                                                                        // return (<CourseCard props={key} />);
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="show_more" ><a href="<?php echo base_url(); ?>" >Show More ...</a></div>
                                                    </div>
                                                </main>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </main>
                        </div>
                    </div>
                </div>
                <div id="main_content" className="jk-main-content container mt-5 mb-5"></div>
            </section>
            }
        </>
    )
}

export default withRouter(Profile)