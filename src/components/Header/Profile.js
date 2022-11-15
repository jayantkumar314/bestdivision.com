import React, {Fragment} from 'react'
import maleAvatar from '../common/images/avatar-male-30x30.jpeg'
import MegaMenu from './MegaMenu'


function Profile() {
    return (
        <Fragment>
            <div className="css-scope show-on-landscape hide">
                <div className="css-scope header_icon waves-effect">
                    <div className="css-scope header_btn">
                        <div className="css-scope icon">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="icon_svg" viewBox="0 0 24 24"><title>search</title><path d="M9.516 14.016q1.875 0 3.188-1.313t1.313-3.188-1.313-3.188-3.188-1.313-3.188 1.313-1.313 3.188 1.313 3.188 3.188 1.313zM15.516 14.016l4.969 4.969-1.5 1.5-4.969-4.969v-0.797l-0.281-0.281q-1.781 1.547-4.219 1.547-2.719 0-4.617-1.875t-1.898-4.594 1.898-4.617 4.617-1.898 4.594 1.898 1.875 4.617q0 0.984-0.469 2.227t-1.078 1.992l0.281 0.281h0.797z"></path></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="css-scope dropdown header_dropdown hide-on-small_tablet">
                <div id="notifications" className="css-scope header_icon waves-effect" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <div className="css-scope header_btn">
                        <div className="css-scope icon">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="icon_svg" viewBox="0 0 24 24"><title>notifications</title><path d="M18 15.984l2.016 2.016v0.984h-16.031v-0.984l2.016-2.016v-4.969q0-2.344 1.195-4.078t3.305-2.25v-0.703q0-0.609 0.422-1.055t1.078-0.445 1.078 0.445 0.422 1.055v0.703q2.109 0.516 3.305 2.25t1.195 4.078v4.969zM12 21.984q-0.844 0-1.43-0.563t-0.586-1.406h4.031q0 0.797-0.609 1.383t-1.406 0.586z"></path></svg>
                        </div>
                    </div>
                </div>
                <ul className="css-scope notifications dropdown-menu" aria-labelledby="notifications">
                    <h5>
                        <b>20</b> Notifications <i className="fa fa-circle-o-notch spin hidden"></i>
                    </h5>
                    <li>
                        <ul className="css-scope notifications_list">
                            <li className="notifications_single">
                                {/* <a href="/profile" className="fluid" style="display: block;"> */}
                                <a href="/profile" className="fluid">
                                    <div className="notifications_avatar">
                                        {/* <img src="/assets/uploads/avatar/avatar-male-30x30.jpeg" alt="Avatar" className="full-size" /> */}
                                        <img src={maleAvatar} alt="Avatar" className="full-size" />
                                    </div>
                                    <div className="notifications_info">
                                        <p>
                                            <span className="username">Jayant</span>
                                            <span>added you as his friend</span>
                                            <span></span>
                                        </p>
                                        <time>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="feather feather-user-plus"
                                            >
                                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="8.5" cy="7" r="4"></circle>
                                                <line x1="20" y1="8" x2="20" y2="14"></line>
                                                <line x1="23" y1="11" x2="17" y2="11"></line>
                                            </svg>
                                                    12 months ago
													</time>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className="css-scope app dropdown header_dropdown">
                <div id="app" className="css-scope header_icon waves-effect" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <div className="css-scope header_btn">
                        <div className="css-scope icon">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="icon_svg" viewBox="0 0 24 24"><title>apps</title><path d="M15.984 20.016v-4.031h4.031v4.031h-4.031zM15.984 14.016v-4.031h4.031v4.031h-4.031zM9.984 8.016v-4.031h4.031v4.031h-4.031zM15.984 3.984h4.031v4.031h-4.031v-4.031zM9.984 14.016v-4.031h4.031v4.031h-4.031zM3.984 14.016v-4.031h4.031v4.031h-4.031zM3.984 20.016v-4.031h4.031v4.031h-4.031zM9.984 20.016v-4.031h4.031v4.031h-4.031zM3.984 8.016v-4.031h4.031v4.031h-4.031z"></path></svg>
                        </div>
                    </div>
                </div>
                <div className="dropdown-menu app_content" area-labelledby="app">
                    <div>
                        <MegaMenu />
                    </div>
                </div>
            </div>

        <div className="css-scope profile dropdown header_dropdown hide-on-small_tablet" >
            <div id="jk_profile" className="profile_container" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                <div className="profile_img">
                    <img src={maleAvatar} alt="Profile Image" />
                </div>
                <div className="profile_name">
                    <div className="profile_nameContainerOne" >
                        <b>Name</b>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 8l4 4 4-4z" /></svg>
                    </div>
                    <div className="profile_nameContainerTwo" >
                        <small>@username</small>
                    </div>
                </div>
            </div>
            <ul className="dropdown-menu profile_content" aria-labelledby="jk_profile">
                <li className="css-scope list" >
                    <ul className="css-scope">
                        <li className="css-scope list_item"><a className="css-scope waves-effect" href="/">helllllo</a></li>
                    </ul>
                </li>
                <li className="css-scope list" >
                    <ul className="css-scope">
                        <li className="css-scope list_item"><a className="css-scope waves-effect" href="/">helllllo</a></li>
                    </ul>
                </li>
                <li className="css-scope list" >
                    <ul className="css-scope">
                        <li className="css-scope list_item"><a className="css-scope waves-effect" href="/">helllllo</a></li>
                    </ul>
                </li>
                <li className="css-scope list" >
                    <ul className="css-scope">
                        <li className="css-scope list_item"><a className="css-scope waves-effect" href="/">helllllo</a></li>
                    </ul>
                </li>
                <li className="css-scope list" >
                    <ul className="css-scope">
                        <li className="css-scope list_item"><a className="css-scope waves-effect" href="/">helllllo</a></li>
                    </ul>
                </li>
                {/* <?{ ?>
											<li className="css-scope list" >
												<ul className="css-scope">
													<li className="css-scope list_item"><a className="css-scope waves-effect" href="/"><?=$settings_logo?>Cart</a></li>
												</ul>
											</li>
											<li className="css-scope list" >
												<ul className="css-scope">
													<li className="css-scope list_item"><a className="css-scope waves-effect" href="/"><?=$settings_logo?>Likes</a></li>
												</ul>
											</li>
										<? php } ?>
										<?{ ?>
											<li className="css-scope list" >
												<ul className="css-scope">
													<li className="css-scope list_item"><a className="css-scope waves-effect" href="<?=base_url('auth/login')?>"><?=$settings_logo?>Sign In</a></li>
												</ul>
											</li>
										<? php } else { ?>
											<li className="css-scope list" >
												<ul className="css-scope">
													<li className="css-scope list_item"><a className="css-scope waves-effect" href="<?=base_url('auth/logout')?>"><?=$settings_logo?>Sign Out</a></li>
												</ul>
											</li>
										<? php }  ?> */}
                <li role="separator" className="divider"></li>
                <li className="css-scope list" >
                    <ul className="css-scope">
                        <li className="css-scope list_item"><a className="css-scope waves-effect" href="/auth/logout">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </div>
        </Fragment>
    )
}

export default Profile
