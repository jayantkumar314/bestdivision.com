import React, {useState, useEffect} from 'react'
import brand from '../../icons/brand.svg';
import img_10 from '../../assets/images/avatars/10.jpg';
import chat from '../../assets/images/demos/chat.jpg'
import chatDark from '../../assets/images/demos/chat-dark.jpg'
import signInDark from '../../assets/images/demos/sign-in-dark.jpg'
import signUpDark from '../../assets/images/demos/sign-up-dark.jpg'
import passwordResetDark from '../../assets/images/demos/password-reset-dark.jpg'

import Main from 'components/Chat/Main'
import axios, { axiosAjax } from 'axios';

// import './Messenger.css'

const initialBlog = "";

function Messenger() {
    const [users, updateUsers] = useState(initialBlog);
    async function getUsers(attributes){
        let response = await axios({
            method: 'get',
            url: `users`,
            params: {
                // "limit": "2",
                // "offset": 1
            }
        }).then((response) => {
            updateUsers(() => (response.data.data))
        })
            .catch((error) => {
            })
            .finally(() => {
            });
    }
    useEffect(() => {
        getUsers();
    }, [])
    return (
        <div className="layout">
            <div className="navigation messenger_navbar messenger_navbar-light justify-content-center py-xl-7">
                <a href="#" className="d-none d-xl-block mb-6">
                    <img src={brand} className="jk-added-img mx-auto fill-primary" data-inject-svg="" alt="" />
                </a>
                <ul className="nav messenger_navbar-nav flex-row flex-xl-column flex-grow-1 justify-content-between justify-content-xl-center py-3 py-lg-0" role="tablist">
                    <li className="nav-item d-none d-xl-block invisible flex-xl-grow-1">
                        <a className="nav-link position-relative p-0 py-xl-3" href="#" title=""> <i className="icon-lg fe-x"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link position-relative p-0 py-xl-3" data-toggle="tab" href="#tab-content-create-chat" title="Create chat" role="tab"> <i className="icon-lg fe-edit"></i>
                        </a>
                    </li>
                    <li className="nav-item mt-xl-9">
                        <a className="nav-link position-relative p-0 py-xl-3" data-toggle="tab" href="#tab-content-friends" title="Friends" role="tab"> <i className="icon-lg fe-users"></i>
                        </a>
                    </li>
                    <li className="nav-item mt-xl-9">
                        <a className="nav-link position-relative p-0 py-xl-3 active" data-toggle="tab" href="#tab-content-dialogs" title="Chats" role="tab"> <i className="icon-lg fe-message-square"></i>
                            <div className="badge badge-dot badge-primary badge-bottom-center"></div>
                        </a>
                    </li>
                    <li className="nav-item mt-xl-9">
                        <a className="nav-link position-relative p-0 py-xl-3" data-toggle="tab" href="#tab-content-user" title="User" role="tab"> <i className="icon-lg fe-user"></i>
                        </a>
                    </li>
                    <li className="nav-item mt-xl-9 d-none d-xl-block flex-xl-grow-1">
                        <a className="nav-link position-relative p-0 py-xl-3" data-toggle="tab" href="#tab-content-demos" title="Demos" role="tab"> <i className="icon-lg fe-layers"></i>
                        </a>
                    </li>
                    <li className="nav-item mt-xl-9">
                        <a className="nav-link position-relative p-0 py-xl-3" href="settings.html" title="Settings"> <i className="icon-lg fe-settings"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="sidebar">
                <div className="tab-content h-100" role="tablist">
                    <div className="tab-pane fade h-100" id="tab-content-create-chat" role="tabpanel">
                        <div className="d-flex flex-column h-100">
                            <div className="hide-scrollbar">
                                <div className="container-fluid py-6">
                                    <h2 className="font-bold mb-6">Create group</h2>
                                    <form className="mb-6">
                                        <div className="input-group">
                                            <input type="text" className="form-control form-control-lg" placeholder="Search for messages or users..." aria-label="Search for messages or users..." />
                                            <div className="input-group-append">
                                                <button className="btn btn-lg btn-ico btn-secondary btn-minimal" type="submit"> <i className="fe-search"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    <ul className="nav nav-tabs nav-justified mb-6" role="tablist">
                                        <li className="nav-item"> <a href="#create-group-details" className="nav-link active" data-toggle="tab" role="tab" aria-selected="true">Details</a>
                                        </li>
                                        <li className="nav-item"> <a href="#create-group-members" className="nav-link" data-toggle="tab" role="tab" aria-selected="false">Members</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content" role="tablist">
                                        <div id="create-group-details" className="tab-pane fade show active" role="tabpanel">
                                            <form action="#">
                                                <div className="form-group">
                                                    <label className="small">Photo</label>
                                                    <div className="position-relative text-center bg-secondary rounded p-6">
                                                        <div className="avatar bg-primary text-white mb-5"> <i className="icon-md fe-image"></i></div>
                                                        <p className="small text-muted mb-0">
                                                            You can upload jpg, gif or png files.
                                                            <br />Max file size 3mb.
                                                        </p>
                                                        <input id="upload-chat-photo" className="d-none" type="file" />
                                                        <label className="stretched-label mb-0" htmlFor="upload-chat-photo"></label>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="small" htmlFor="new-chat-title">Name</label>
                                                    <input className="form-control form-control-lg" name="new-chat-title" id="new-chat-title" type="text" placeholder="Group Name" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="small" htmlFor="new-chat-topic">Topic (optional)</label>
                                                    <input className="form-control form-control-lg" name="new-chat-topic" id="new-chat-topic" type="text" placeholder="Group Topic" />
                                                </div>
                                                <div className="form-group mb-0">
                                                    <label className="small" htmlFor="new-chat-description">Description</label>
                                                    <textarea className="form-control form-control-lg" name="new-chat-description" id="new-chat-description" rows="6" placeholder="Group Description">Hello</textarea>
                                                </div>

                                            </form>
                                        </div>
                                        <div id="create-group-members" className="tab-pane fade" role="tabpanel">
                                            <nav className="list-group list-group-flush mb-n6">
                                                <div className="mb-6"> <small className="text-uppercase">A</small>
                                                </div>
                                                <div className="card mb-6">
                                                    <div className="card-body">
                                                        <div className="media">
                                                            <div className="avatar avatar-online mr-5">
                                                                <img className="avatar-img" src={img_10} alt="Anna Bridges" />
                                                            </div>
                                                            <div className="media-body align-self-center mr-6">
                                                                <h6 className="mb-0">Anna Bridges</h6>  <small className="text-muted">Online</small>
                                                            </div>
                                                            <div className="align-self-center ml-auto">
                                                                <div className="custom-control custom-checkbox">
                                                                    <input className="custom-control-input" id="id-user-1" type="checkbox" />
                                                                    <label className="custom-control-label" htmlFor="id-user-1"></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <label className="stretched-label" htmlFor="id-user-1"></label>
                                                </div>
                                                <div className="mb-6"> <small className="text-uppercase">B</small>
                                                </div>
                                                <div className="card mb-6">
                                                    <div className="card-body">
                                                        <div className="media">
                                                            <div className="avatar mr-5">
                                                                <img className="avatar-img" src={img_10} alt="Brian Dawson" />
                                                            </div>
                                                            <div className="media-body align-self-center mr-6">
                                                                <h6 className="mb-0">Brian Dawson</h6>  <small className="text-muted">last seen 2 hours ago</small>
                                                            </div>
                                                            <div className="align-self-center ml-auto">
                                                                <div className="custom-control custom-checkbox">
                                                                    <input className="custom-control-input" id="id-user-2" type="checkbox" />
                                                                    <label className="custom-control-label" htmlFor="id-user-2"></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <label className="stretched-label" htmlFor="id-user-2"></label>
                                                </div>
                                                <div className="mb-6"> <small className="text-uppercase">L</small>
                                                </div>
                                                <div className="card mb-6">
                                                    <div className="card-body">
                                                        <div className="media">
                                                            <div className="avatar mr-5">
                                                                <img className="avatar-img" src={img_10} alt="Leslie Sutton" />
                                                            </div>
                                                            <div className="media-body align-self-center mr-6">
                                                                <h6 className="mb-0">Leslie Sutton</h6>  <small className="text-muted">last seen 3 days ago</small>
                                                            </div>
                                                            <div className="align-self-center ml-auto">
                                                                <div className="custom-control custom-checkbox">
                                                                    <input className="custom-control-input" id="id-user-3" type="checkbox" />
                                                                    <label className="custom-control-label" htmlFor="id-user-3"></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <label className="stretched-label" htmlFor="id-user-3"></label>
                                                </div>
                                                <div className="mb-6"> <small className="text-uppercase">M</small>
                                                </div>
                                                <div className="card mb-6">
                                                    <div className="card-body">
                                                        <div className="media">
                                                            <div className="avatar mr-5">
                                                                <img className="avatar-img" src={img_10} alt="Matthew Wiggins" />
                                                            </div>
                                                            <div className="media-body align-self-center mr-6">
                                                                <h6 className="mb-0">Matthew Wiggins</h6>  <small className="text-muted">last seen 3 days ago</small>
                                                            </div>
                                                            <div className="align-self-center ml-auto">
                                                                <div className="custom-control custom-checkbox">
                                                                    <input className="custom-control-input" id="id-user-4" type="checkbox" />
                                                                    <label className="custom-control-label" htmlFor="id-user-4"></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <label className="stretched-label" htmlFor="id-user-4"></label>
                                                </div>
                                                <div className="mb-6"> <small className="text-uppercase">S</small>
                                                </div>
                                                <div className="card mb-6">
                                                    <div className="card-body">
                                                        <div className="media">
                                                            <div className="avatar mr-5">
                                                                <img className="avatar-img" src={img_10} alt="Simon Hensley" />
                                                            </div>
                                                            <div className="media-body align-self-center mr-6">
                                                                <h6 className="mb-0">Simon Hensley</h6>  <small className="text-muted">last seen 3 days ago</small>
                                                            </div>
                                                            <div className="align-self-center ml-auto">
                                                                <div className="custom-control custom-checkbox">
                                                                    <input className="custom-control-input" id="id-user-5" type="checkbox" />
                                                                    <label className="custom-control-label" htmlFor="id-user-5"></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <label className="stretched-label" htmlFor="id-user-5"></label>
                                                </div>
                                                <div className="mb-6"> <small className="text-uppercase">W</small>
                                                </div>
                                                <div className="card mb-6">
                                                    <div className="card-body">
                                                        <div className="media">
                                                            <div className="avatar mr-5">
                                                                <img className="avatar-img" src={img_10} alt="William Wright" />
                                                            </div>
                                                            <div className="media-body align-self-center mr-6">
                                                                <h6 className="mb-0">William Wright</h6>  <small className="text-muted">last seen 3 days ago</small>
                                                            </div>
                                                            <div className="align-self-center ml-auto">
                                                                <div className="custom-control custom-checkbox">
                                                                    <input className="custom-control-input" id="id-user-6" type="checkbox" />
                                                                    <label className="custom-control-label" htmlFor="id-user-6"></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <label className="stretched-label" htmlFor="id-user-6"></label>
                                                </div>
                                                <div className="card mb-6">
                                                    <div className="card-body">
                                                        <div className="media">
                                                            <div className="avatar mr-5">
                                                                <img className="avatar-img" src={img_10} alt="William Greer" />
                                                            </div>
                                                            <div className="media-body align-self-center mr-6">
                                                                <h6 className="mb-0">William Greer</h6>  <small className="text-muted">last seen 10 minutes ago</small>
                                                            </div>
                                                            <div className="align-self-center ml-auto">
                                                                <div className="custom-control custom-checkbox">
                                                                    <input className="custom-control-input" id="id-user-7" type="checkbox" />
                                                                    <label className="custom-control-label" htmlFor="id-user-7"></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <label className="stretched-label" htmlFor="id-user-7"></label>
                                                </div>
                                                <div className="mb-6"> <small className="text-uppercase">Z</small>
                                                </div>
                                                <div className="card mb-6">
                                                    <div className="card-body">
                                                        <div className="media">
                                                            <div className="avatar mr-5">
                                                                <img className="avatar-img" src={img_10} alt="Zane Mayes" />
                                                            </div>
                                                            <div className="media-body align-self-center mr-6">
                                                                <h6 className="mb-0">Zane Mayes</h6>  <small className="text-muted">last seen 3 days ago</small>
                                                            </div>
                                                            <div className="align-self-center ml-auto">
                                                                <div className="custom-control custom-checkbox">
                                                                    <input className="custom-control-input" id="id-user-8" type="checkbox" />
                                                                    <label className="custom-control-label" htmlFor="id-user-8"></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <label className="stretched-label" htmlFor="id-user-8"></label>
                                                </div>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                <div className="pb-6">
                                    <div className="container-fluid">
                                        <button className="btn btn-lg btn-primary btn-block" type="submit">Create group</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade h-100" id="tab-content-friends" role="tabpanel">
                        <div className="d-flex flex-column h-100">
                            <div className="hide-scrollbar">
                                <div className="container-fluid py-6">
                                    <h2 className="font-bold mb-6">Friends</h2>
                                    <form className="mb-6">
                                        <div className="input-group">
                                            <input type="text" className="form-control form-control-lg" placeholder="Search for messages or users..." aria-label="Search for messages or users..." />
                                            <div className="input-group-append">
                                                <button className="btn btn-lg btn-ico btn-secondary btn-minimal" type="submit"> <i className="fe-search"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    <button type="button" className="btn btn-lg btn-block btn-secondary d-flex align-items-center mb-6" data-toggle="modal" data-target="#invite-friends">Invite friends <i className="fe-users ml-auto"></i>
                                    </button>
                                    <nav className="mb-n6">
                                        <div className="mb-6"> <small className="text-uppercase">A</small>
                                        </div>
                                        <div className="card mb-6">
                                            <div className="card-body">
                                                <div className="media">
                                                    <div className="avatar avatar-online mr-5">
                                                        <img className="avatar-img" src={img_10} alt="Anna Bridges" />
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <h6 className="mb-0">Anna Bridges</h6>  <small className="text-muted">Online</small>
                                                    </div>
                                                    <div className="align-self-center ml-5">
                                                        <div className="messenger_dropdown z-index-max">
                                                            <a href="#" className="btn btn-sm btn-ico btn-link text-muted w-auto" data-toggle="messenger_dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fe-more-vertical"></i>
                                                            </a>
                                                            <div className="messenger_dropdown-menu"> <a className="messenger_dropdown-item d-flex align-items-center" href="#"> New chat <span className="ml-auto fe-edit-2"></span> </a>  <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Delete <span className="ml-auto fe-trash-2"></span> </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a href="chat-2.html" className="stretched-link"></a>
                                            </div>
                                        </div>
                                        <div className="mb-6"> <small className="text-uppercase">B</small>
                                        </div>
                                        <div className="card mb-6">
                                            <div className="card-body">
                                                <div className="media">
                                                    <div className="avatar mr-5">
                                                        <img className="avatar-img" src={img_10} alt="Brian Dawson" />
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <h6 className="mb-0">Brian Dawson</h6>  <small className="text-muted">last seen 2 hours ago</small>
                                                    </div>
                                                    <div className="align-self-center ml-5">
                                                        <div className="messenger_dropdown z-index-max">
                                                            <a href="#" className="btn btn-sm btn-ico btn-link text-muted w-auto" data-toggle="messenger_dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fe-more-vertical"></i>
                                                            </a>
                                                            <div className="messenger_dropdown-menu"> <a className="messenger_dropdown-item d-flex align-items-center" href="#"> New chat <span className="ml-auto fe-edit-2"></span> </a>  <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Delete <span className="ml-auto fe-trash-2"></span> </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a href="#" className="stretched-link"></a>
                                            </div>
                                        </div>
                                        <div className="mb-6"> <small className="text-uppercase">L</small>
                                        </div>
                                        <div className="card mb-6">
                                            <div className="card-body">
                                                <div className="media">
                                                    <div className="avatar mr-5">
                                                        <img className="avatar-img" src={img_10} alt="Leslie Sutton" />
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <h6 className="mb-0">Leslie Sutton</h6>  <small className="text-muted">last seen 3 days ago</small>
                                                    </div>
                                                    <div className="align-self-center ml-5">
                                                        <div className="messenger_dropdown z-index-max">
                                                            <a href="#" className="btn btn-sm btn-ico btn-link text-muted w-auto" data-toggle="messenger_dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fe-more-vertical"></i>
                                                            </a>
                                                            <div className="messenger_dropdown-menu"> <a className="messenger_dropdown-item d-flex align-items-center" href="#"> New chat <span className="ml-auto fe-edit-2"></span> </a>  <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Delete <span className="ml-auto fe-trash-2"></span> </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a href="#" className="stretched-link"></a>
                                            </div>
                                        </div>
                                        <div className="mb-6"> <small className="text-uppercase">M</small>
                                        </div>
                                        <div className="card mb-6">
                                            <div className="card-body">
                                                <div className="media">
                                                    <div className="avatar mr-5">
                                                        <img className="avatar-img" src={img_10} alt="Matthew Wiggins" />
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <h6 className="mb-0">Matthew Wiggins</h6>  <small className="text-muted">last seen 3 days ago</small>
                                                    </div>
                                                    <div className="align-self-center ml-5">
                                                        <div className="messenger_dropdown z-index-max">
                                                            <a href="#" className="btn btn-sm btn-ico btn-link text-muted w-auto" data-toggle="messenger_dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fe-more-vertical"></i>
                                                            </a>
                                                            <div className="messenger_dropdown-menu"> <a className="messenger_dropdown-item d-flex align-items-center" href="#"> New chat <span className="ml-auto fe-edit-2"></span> </a>  <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Delete <span className="ml-auto fe-trash-2"></span> </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a href="#" className="stretched-link"></a>
                                            </div>
                                        </div>
                                        <div className="mb-6"> <small className="text-uppercase">S</small>
                                        </div>
                                        <div className="card mb-6">
                                            <div className="card-body">
                                                <div className="media">
                                                    <div className="avatar mr-5">
                                                        <img className="avatar-img" src={img_10} alt="Simon Hensley" />
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <h6 className="mb-0">Simon Hensley</h6>  <small className="text-muted">last seen 3 days ago</small>
                                                    </div>
                                                    <div className="align-self-center ml-5">
                                                        <div className="messenger_dropdown z-index-max">
                                                            <a href="#" className="btn btn-sm btn-ico btn-link text-muted w-auto" data-toggle="messenger_dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fe-more-vertical"></i>
                                                            </a>
                                                            <div className="messenger_dropdown-menu"> <a className="messenger_dropdown-item d-flex align-items-center" href="#"> New chat <span className="ml-auto fe-edit-2"></span> </a>  <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Delete <span className="ml-auto fe-trash-2"></span> </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a href="#" className="stretched-link"></a>
                                            </div>
                                        </div>
                                        <div className="mb-6"> <small className="text-uppercase">W</small>
                                        </div>
                                        <div className="card mb-6">
                                            <div className="card-body">
                                                <div className="media">
                                                    <div className="avatar mr-5">
                                                        <img className="avatar-img" src={img_10} alt="William Wright" />
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <h6 className="mb-0">William Wright</h6>  <small className="text-muted">last seen 3 days ago</small>
                                                    </div>
                                                    <div className="align-self-center ml-5">
                                                        <div className="messenger_dropdown z-index-max">
                                                            <a href="#" className="btn btn-sm btn-ico btn-link text-muted w-auto" data-toggle="messenger_dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fe-more-vertical"></i>
                                                            </a>
                                                            <div className="messenger_dropdown-menu"> <a className="messenger_dropdown-item d-flex align-items-center" href="#"> New chat <span className="ml-auto fe-edit-2"></span> </a>  <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Delete <span className="ml-auto fe-trash-2"></span> </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a href="#" className="stretched-link"></a>
                                            </div>
                                        </div>
                                        <div className="card mb-6">
                                            <div className="card-body">
                                                <div className="media">
                                                    <div className="avatar mr-5">
                                                        <img className="avatar-img" src={img_10} alt="William Greer" />
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <h6 className="mb-0">William Greer</h6>  <small className="text-muted">last seen 10 minutes ago</small>
                                                    </div>
                                                    <div className="align-self-center ml-5">
                                                        <div className="messenger_dropdown z-index-max">
                                                            <a href="#" className="btn btn-sm btn-ico btn-link text-muted w-auto" data-toggle="messenger_dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fe-more-vertical"></i>
                                                            </a>
                                                            <div className="messenger_dropdown-menu"> <a className="messenger_dropdown-item d-flex align-items-center" href="#"> New chat <span className="ml-auto fe-edit-2"></span> </a>  <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Delete <span className="ml-auto fe-trash-2"></span> </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a href="#" className="stretched-link"></a>
                                            </div>
                                        </div>
                                        <div className="mb-6"> <small className="text-uppercase">Z</small>
                                        </div>
                                        <div className="card mb-6">
                                            <div className="card-body">
                                                <div className="media">
                                                    <div className="avatar mr-5">
                                                        <img className="avatar-img" src={img_10} alt="Zane Mayes" />
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <h6 className="mb-0">Zane Mayes</h6>  <small className="text-muted">last seen 3 days ago</small>
                                                    </div>
                                                    <div className="align-self-center ml-5">
                                                        <div className="messenger_dropdown z-index-max">
                                                            <a href="#" className="btn btn-sm btn-ico btn-link text-muted w-auto" data-toggle="messenger_dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fe-more-vertical"></i>
                                                            </a>
                                                            <div className="messenger_dropdown-menu"> <a className="messenger_dropdown-item d-flex align-items-center" href="#"> New chat <span className="ml-auto fe-edit-2"></span> </a>  <a className="messenger_dropdown-item d-flex align-items-center" href="#"> Delete <span className="ml-auto fe-trash-2"></span> </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a href="#" className="stretched-link"></a>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade h-100 show active" id="tab-content-dialogs" role="tabpanel">
                        <div className="d-flex flex-column h-100">
                            <div className="hide-scrollbar">
                                <div className="container-fluid py-6">
                                    <h2 className="font-bold mb-6">Chats</h2>
                                    <form className="mb-6">
                                        <div className="input-group">
                                            <input type="text" className="form-control form-control-lg" placeholder="Search for messages or users..." aria-label="Search for messages or users..." />
                                            <div className="input-group-append">
                                                <button className="btn btn-lg btn-ico btn-secondary btn-minimal" type="submit"> <i className="fe-search"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="text-center hide-scrollbar d-flex my-7" data-horizontal-scroll="">
                                        <a href="#" className="d-block text-reset mr-7 mr-lg-6">
                                            <div className="avatar avatar-sm avatar-online mb-3">
                                                <img className="avatar-img" src={img_10} alt="Image Description" />
                                            </div>
                                            <div className="small">William</div>
                                        </a>
                                        <a href="#" className="d-block text-reset mr-7 mr-lg-6">
                                            <div className="avatar avatar-sm avatar-online mb-3">
                                                <img className="avatar-img" src={img_10} alt="Image Description" />
                                            </div>
                                            <div className="small">Simon</div>
                                        </a>
                                        <a href="#" className="d-block text-reset mr-7 mr-lg-6">
                                            <div className="avatar avatar-sm avatar-online mb-3">
                                                <img className="avatar-img" src={img_10} alt="Image Description" />
                                            </div>
                                            <div className="small">Thomas</div>
                                        </a>
                                        <a href="#" className="d-block text-reset mr-7 mr-lg-6">
                                            <div className="avatar avatar-sm avatar-online mb-3">
                                                <img className="avatar-img" src={img_10} alt="Image Description" />
                                            </div>
                                            <div className="small">Zane</div>
                                        </a>
                                        <a href="#" className="d-block text-reset mr-7 mr-lg-6">
                                            <div className="avatar avatar-sm mb-3">
                                                <img className="avatar-img" src={img_10} alt="Image Description" />
                                            </div>
                                            <div className="small">Thomas</div>
                                        </a>
                                        <a href="#" className="d-block text-reset mr-7 mr-lg-6">
                                            <div className="avatar avatar-sm mb-3">
                                                <img className="avatar-img" src={img_10} alt="Image Description" />
                                            </div>
                                            <div className="small">William</div>
                                        </a>
                                        <a href="#" className="d-block text-reset mr-7 mr-lg-6">
                                            <div className="avatar avatar-sm mb-3">
                                                <img className="avatar-img" src={img_10} alt="Image Description" />
                                            </div>
                                            <div className="small">Simon</div>
                                        </a>
                                        <a href="#" className="d-block text-reset mr-7 mr-lg-6">
                                            <div className="avatar avatar-sm mb-3">
                                                <img className="avatar-img" src={img_10} alt="Image Description" />
                                            </div>
                                            <div className="small">Thomas</div>
                                        </a>
                                    </div>
                                    <nav className="nav d-block list-discussions-js mb-n6">
                                        
                                        <a className="text-reset nav-link p-0 mb-6" href="chat-2.html">
                                            <div className="card card-active-listener">
                                                <div className="card-body">
                                                    <div className="media">
                                                        <div className="avatar avatar-online mr-5">
                                                            <img className="avatar-img" src={img_10} alt="Anna Bridges" />
                                                        </div>
                                                        <div className="media-body overflow-hidden">
                                                            <div className="d-flex align-items-center mb-1">
                                                                <h6 className="text-truncate mb-0 mr-auto">Anna Bridges</h6>
                                                                <p className="small text-muted text-nowrap ml-4">10:42 am</p>
                                                            </div>
                                                            <div className="text-truncate">is typing<span className='typing-dots'><span>.</span><span>.</span><span>.</span></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <a className="text-reset nav-link p-0 mb-6" href="#">
                                            <div className="card card-active-listener">
                                                <div className="card-body">
                                                    <div className="media">
                                                        <div className="avatar mr-5">
                                                            <img className="avatar-img" src={img_10} alt="Simon Hensley" />
                                                        </div>
                                                        <div className="media-body overflow-hidden">
                                                            <div className="d-flex align-items-center mb-1">
                                                                <h6 className="text-truncate mb-0 mr-auto">Simon Hensley</h6>
                                                                <p className="small text-muted text-nowrap ml-4">10:38 am</p>
                                                            </div>
                                                            <div className="text-truncate">I’m sorry, this question would be out of my expertise.</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade h-100" id="tab-content-demos" role="tabpanel">
                        <div className="d-flex flex-column h-100">
                            <div className="hide-scrollbar">
                                <div className="container-fluid py-6">
                                    <h2 className="font-bold mb-6">Demos</h2>
                                    <form className="mb-6">
                                        <div className="input-group">
                                            <input type="text" className="form-control form-control-lg" placeholder="Search for messages or users..." aria-label="Search for messages or users..." />
                                            <div className="input-group-append">
                                                <button className="btn btn-lg btn-ico btn-secondary btn-minimal" type="submit"> <i className="fe-search"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="card mb-6">
                                        <div className="card-body">
                                            <div className="media align-items-center">
                                                <div className="mr-5">
                                                    <img className="jk-added-img1" src={brand} className="fill-primary" data-inject-svg="" alt="" />
                                                </div>
                                                <div className="media-body">
                                                    <h5 className="mb-0"> <a href="documentation/index.html" className="text-basic-inverse stretched-link">Documentation</a></h5>
                                                    <p>Quick setup and build tools.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h5 className="my-6">Chat Pages:</h5>
                                    <div className="card mb-6">
                                        <img className="card-img-top" alt="" src={chat} />
                                        <div className="card-body border-top">
                                            <div className="media">
                                                <div className="media-body">
                                                    <h5 className="mb-0">Light mode</h5>
                                                </div>
                                                <div className="align-self-center">
                                                    <a href="demo-light/index.html" className="text-muted stretched-link"> <i className="fe-link"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mb-6">
                                        <img className="card-img-top" alt="" src={chatDark} />
                                        <div className="card-body border-top">
                                            <div className="media">
                                                <div className="media-body">
                                                    <h5 className="mb-0">Dark mode</h5>
                                                </div>
                                                <div className="align-self-center">
                                                    <a href="demo-dark/index.html" className="text-muted stretched-link"> <i className="fe-link"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h5 className="my-6">Account Pages:</h5>
                                    <div className="card mb-6">
                                        <img className="card-img-top" alt="" src={signInDark} />
                                        <div className="card-body border-top">
                                            <div className="media">
                                                <div className="media-body">
                                                    <h5 className="mb-0">Sign In</h5>
                                                </div>
                                                <div className="align-self-center">
                                                    <a href="signin.html" className="text-muted stretched-link"> <i className="fe-link"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mb-6">
                                        <img className="card-img-top" alt="" src={signUpDark} />
                                        <div className="card-body border-top">
                                            <div className="media">
                                                <div className="media-body">
                                                    <h5 className="mb-0">Sign Up</h5>
                                                </div>
                                                <div className="align-self-center">
                                                    <a href="signup.html" className="text-muted stretched-link"> <i className="fe-link"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mb-6">
                                        <img className="card-img-top" alt="" src={passwordResetDark} />
                                        <div className="card-body border-top">
                                            <div className="media">
                                                <div className="media-body">
                                                    <h5 className="mb-0">Password Reset</h5>
                                                </div>
                                                <div className="align-self-center">
                                                    <a href="password-reset.html" className="text-muted stretched-link"> <i className="fe-link"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade h-100" id="tab-content-user" role="tabpanel">
                        <div className="d-flex flex-column h-100">
                            <div className="hide-scrollbar">
                                <div className="container-fluid py-6">
                                    <h2 className="font-bold mb-6">Profile</h2>
                                    <form className="mb-6">
                                        <div className="input-group">
                                            <input type="text" className="form-control form-control-lg" placeholder="Search for messages or users..." aria-label="Search for messages or users..." />
                                            <div className="input-group-append">
                                                <button className="btn btn-lg btn-ico btn-secondary btn-minimal" type="submit"> <i className="fe-search"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="card mb-6">
                                        <div className="card-body">
                                            <div className="text-center py-6">
                                                <div className="avatar avatar-xl mb-5">
                                                    <img className="avatar-img" src={img_10} alt="" />
                                                </div>
                                                <h5>Matthew Wiggins</h5>
                                                <p className="text-muted">Bootstrap is an open source toolkit for developing web with HTML.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mb-6">
                                        <div className="card-body">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item px-0 py-6">
                                                    <div className="media align-items-center">
                                                        <div className="media-body">
                                                            <p className="small text-muted mb-0">Country</p>
                                                            <p>Warsaw, Poland</p>
                                                        </div> <i className="text-muted icon-sm fe-globe"></i>
                                                    </div>
                                                </li>
                                                <li className="list-group-item px-0 py-6">
                                                    <div className="media align-items-center">
                                                        <div className="media-body">
                                                            <p className="small text-muted mb-0">Phone</p>
                                                            <p>+39 02 87 21 43 19</p>
                                                        </div> <i className="text-muted icon-sm fe-mic"></i>
                                                    </div>
                                                </li>
                                                <li className="list-group-item px-0 py-6">
                                                    <div className="media align-items-center">
                                                        <div className="media-body">
                                                            <p className="small text-muted mb-0">Email</p>
                                                            <p>anna@gmail.com</p>
                                                        </div> <i className="text-muted icon-sm fe-mail"></i>
                                                    </div>
                                                </li>
                                                <li className="list-group-item px-0 py-6">
                                                    <div className="media align-items-center">
                                                        <div className="media-body">
                                                            <p className="small text-muted mb-0">Time</p>
                                                            <p>10:03 am</p>
                                                        </div> <i className="text-muted icon-sm fe-clock"></i>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card mb-6">
                                        <div className="card-body">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item px-0 py-6">
                                                    <a href="#" className="media text-muted">
                                                        <div className="media-body align-self-center">Twitter</div> <i className="icon-sm fe-twitter"></i>
                                                    </a>
                                                </li>
                                                <li className="list-group-item px-0 py-6">
                                                    <a href="#" className="media text-muted">
                                                        <div className="media-body align-self-center">Facebook</div> <i className="icon-sm fe-facebook"></i>
                                                    </a>
                                                </li>
                                                <li className="list-group-item px-0 py-6">
                                                    <a href="#" className="media text-muted">
                                                        <div className="media-body align-self-center">Github</div> <i className="icon-sm fe-github"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col">
                                            <button type="button" className="btn btn-lg btn-block btn-basic d-flex align-items-center">Settings <span className="fe-settings ml-auto"></span>
                                            </button>
                                        </div>
                                        <div className="col">
                                            <button type="button" className="btn btn-lg btn-block btn-basic d-flex align-items-center">Logout <span className="fe-log-out ml-auto"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main" data-mobile-height="">
                <Main />
            </div>

            {/* <div id="dropzone-template-js">
                <div className="col-lg-4 my-3">
                    <div className="card bg-light">
                        <div className="card-body p-3">
                            <div className="media align-items-center">
                                <div className="dropzone-file-preview">
                                    <div className="avatar avatar rounded bg-secondary text-basic-inverse d-block mr-5"> <i className="fe-paperclip"></i>
                                    </div>
                                </div>
                                <div className="dropzone-image-preview">
                                    <div className="avatar avatar mr-5">
                                        <img src="#" className="avatar-img rounded" data-dz-thumbnail="" alt="" />
                                    </div>
                                </div>
                                <div className="media-body overflow-hidden">
                                    <h6 className="text-truncate small mb-0" data-dz-name></h6>
                                    <p className="extra-small" data-dz-size></p>
                                </div>
                                <div className="ml-5">
                                    <a href="#" className="btn btn-sm btn-link text-decoration-none text-muted" data-dz-remove> <i className="fe-x"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="modal fade" id="invite-friends" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="media flex-fill">
                                <div className="icon-shape rounded-lg bg-primary text-white mr-5"> <i className="fe-users"></i>
                                </div>
                                <div className="media-body align-self-center">
                                    <h5 className="modal-title">Invite friends</h5>
                                    <p className="small">Invite colleagues, clients and friends.</p>
                                </div>
                            </div>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form action="#">
                                <div className="form-group">
                                    <label htmlFor="invite-email" className="small">Email</label>
                                    <input type="text" className="form-control form-control-lg" id="invite-email" />
                                </div>
                                <div className="form-group mb-0">
                                    <label htmlFor="invite-message" className="small">Invitation message</label>
                                    <textarea className="form-control form-control-lg" id="invite-message" data-autosize="true"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messenger
