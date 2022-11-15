import React, { Fragment, useState, useEffect, useRef } from 'react'
// import { useHistory, useLocation } from 'react-router-dom'
import { createMemoryHistory, createBrowserHistory } from 'history';
// import './Header.css'
// import 'common/css/search.css';
import maleAvatar from 'common/images/avatar-male-30x30.jpeg'
import CustomDesktopSearch from './CustomDesktopSearch'

//import { Helmet } from 'react-helmet'
import Svg from 'components/Svg'

import { ReactComponent as BellIcon } from '../../icons/bell.svg';
import { ReactComponent as MessengerIcon } from '../../icons/messenger.svg';
import { ReactComponent as CaretIcon } from '../../icons/caret.svg';
import { ReactComponent as PlusIcon } from '../../icons/plus.svg';

import HeaderMenu from './HeaderMenu'
import HeaderLogo from './HeaderLogo'
import MegaMenu from './MegaMenu'
import Navbar, { setOpen } from './Navbar'
import NavItem from './NavItem'
import DropdownMenu from './DropdownMenu'
import NotificationsDropdownMenu from './NotificationsDropdownMenu'
import Profile from './Profile'
import Login from './Login'
import Register from './Register'

// import SelectSearch from 'react-select-search'
// import "react-virtualized-select/styles.css";
// import Select from "react-virtualized-select";
// import Select from 'react-select';
// import AsyncSelect from 'react-select/lib/Async';
// import "react-select/dist/react-select.css";

import Modal from '../Modal'
import SearchModal from '../Modal/SearchModal'

import axios, { axiosAjax } from 'axios'

import { useStateValue } from 'StateProvider'
// import reducer, { initialState, getBasketTotal } from '../../reducer';
const initialFormState = {
	group: "",
	login: "",
	searchQuery: "",
	searhedResult: ""
}
const initialSearchState = [];

const initialParams = {
	q: '',
	start: 0
}

function Header(props) {
	// const history = useHistory();
	let history
	if (typeof document !== 'undefined') {
		history = createBrowserHistory();
		// const history = createMemoryHistory();
	}
	// const location = useLocation();
	const header = useRef(null);
	const mobileSearch = useRef(null)
	// const ModalContent = '';
	// const modalClassName = '';
	// const appSession = '';
	// const stateValue = useStateValue();

	const [{ appSession, ModalContent, modalClassName }, dispatch] = useStateValue();
	// const [{ user, appSession, searchValue, ModalContent, modalClassName }, dispatch] = useStateValue();
	const [params, setParams] = useState(initialParams)
	const [blogs, setBlogs] = useState([])
	const [blogsSearch, setBlogsSearch] = useState([])
	const [totalBlogs, setTotalBlogs] = useState([])
	const [q, setQ] = useState('')
	const urlParams = new URLSearchParams((typeof window !== 'undefined') && window.location.search)
	const [error, setError] = useState(false)

	//const [q, setQ] = useState('')

	// const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
	const isMobile = (typeof window !== 'undefined') && window.innerWidth <= 500;
	const [open, setOpen] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [searchModalOpen, setSearchModalOpen] = useState(false);
	const [formState, updateFormState] = useState(initialFormState);
	const [searchState, updateSearchState] = useState(initialSearchState);
	const [mobileSearchBar, setMobileSearchBar] = useState(false);
	const [loading, setLoading] = useState(false)

	let emptyMessage = '';
	const changeModalContent = (Component, modalClassName) => {
		dispatch({
			type: 'CHANGE_MODAL_CONTENT',
			ModalContent: Component
		})
		dispatch({
			type: 'CHANGE_MODAL_CLASSNAME',
			modalClassName: modalClassName
		})
	};

	async function insertUserIntoDb(attributes) {
		let response = await axios({
			method: 'post',
			url: `get_leftnav_menu`,
			// data: {
			// 	"user": {
			// 		"cognitoId": attributes.sub,
			// 		"firstName": attributes.name,
			// 		"lastName": "lastName9",
			// 		"email": attributes.email,
			// 		"phone": attributes.phone_number
			// 	}
			// }
		}).then((response) => {
			//setLeftMenuItems(() => (response.data.data))
		}).catch((error) => {
			// debugger;
		}).finally(() => {
		});
	}
	let source = axios.CancelToken.source();

	async function getBlogs(attributes) {
		setLoading(true)
		setError(false)
		let response = await axios({
			method: 'post',
			// url: `blogs?search=${encodeURIComponent(q).replace(/%20/g, "+")}`,
			url: `search?q=${formState.searchQuery}`,
			cancelToken: source.token
			// params: params
			// data: {
			// 	"user": {
			// 		"cognitoId": attributes.sub,
			// 		"firstName": attributes.name,
			// 		"lastName": "lastName9",
			// 		"email": attributes.email,
			// 		"phone": attributes.phone_number
			// 	}
			// }
		}).then((response) => {
			setBlogsSearch(() => {
				return [...new Set([...response?.data?.data])]
			})

			// setTotalBlogs(response.data.total_blogs)
			// useEffect(() => {
			//     setBlogs([])
			// }, [query])
		}).catch((error) => {
			if (axios.isCancel(error)) {
				return
			}
			setError(true)
			//debugger;
		}).finally(() => {
			// setLoading(false)
		});
		return () => source.cancel()
	}
	useEffect(() => {
		let text = urlParams.get('q')
		setQ(text);
		return () => source.cancel()
	}, [urlParams.get('q')])

	useEffect(() => {
		//window.scrollTo(0, 0)
		//setBlogs([])
		getBlogs();
		return () => source.cancel()
	}, [q, params, formState.searchQuery])

	async function testingCorsIssue(attributes) {
		let response = await axios({
			method: 'POST',
			url: `?view=authenticate`,
			// data: {
			// 	"user": {
			// 		"cognitoId": attributes.sub,
			// 		"firstName": attributes.name,
			// 		"lastName": "lastName9",
			// 		"email": attributes.email,
			// 		"phone": attributes.phone_number
			// 	}
			// }
		}).then((response) => {
			//setLeftMenuItems(() => (response.data.data))
		})
			.catch((error) => {
				// debugger;
			})
			.finally(() => {
			});
	}
	// console.log(stateValue);
	useEffect(() => {
		insertUserIntoDb();
		changeModalContent(<Login onChange={onChange} onClickLogin={onClickLogin} />, 'login_modal');
		emptyMessage = "Sorry!! No Results Found";
		// testingCorsIssue();
		// let response = await axios({
		// 	method: 'post',
		// 	url: `get_leftnav_menu`,
		// 	data: {
		// 		"user": {
		// 			"cognitoId": attributes.sub,
		// 			"firstName": attributes.name,
		// 			"lastName": "lastName9",
		// 			"email": attributes.email,
		// 			"phone": attributes.phone_number
		// 		}
		// 	}
		// }).then((response) => {
		// 	setSucceeded(true);
		// 	updateFormState(() => ({ ...formState, formType: "signedIn" }))
		// 	setErrors(() => ({ ...errors, ['usernamePassword']: "" }))
		// })
		// .catch((error) => {
		// 	setSucceeded(false);
		// 	setErrors(() => ({ ...errors, ['usernamePassword']: error.message }))
		// })
		// .finally(() => {
		// 	setProcessing(false)
		// });
	}, [])

	function onChange(e) {
		e.persist();
		if (e.target.name === 'searchQuery' || e.target.name === 'q') {
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
		console.log(formState);
	}
	function onClickRegister(e) {
		e.persist();
		changeModalContent(<Register setModalOpen={setModalOpen} onClickLogin={onClickLogin} />, 'register_modal');
		setModalOpen(true)
	}
	function onClickLogin(e) {
		e.persist();
		// changeModalContent(<Login onSubmit={onSubmit} onChange={onChange} onClickRegister={onClickRegister} />);
		changeModalContent(<Login setModalOpen={setModalOpen} onClickRegister={onClickRegister} />, 'login_modal');
		setModalOpen(true)
	}

	function handleKeyDown(e) {
		//e.preventDefault();
		// updateFormState(() => ({
		// 	...formState,
		// 	searchQuery: e.target.value
		// }));
		let keyPressed = e.keyCode;
		if (keyPressed === 13) {
			e.preventDefault();
			closeMobileSearchBar()
			if (e.target.name === 'q') {
				history.push('/search?q=' + formState.searchQuery)
				// updateFormState(() => ({
				// 	...formState,
				// 	searchQuery: e.target.value
				// }));
			}
		}
	}
	// const [selectedValue, setSelectedValue] = useState(3);
	const selectedValue = "Simple Html Page";
	const handleSearch = e => {
		// debugger
		// let row = searchState[e];
		updateFormState(() => ({
			...formState,
			searchedResult: JSON.stringify(searchState)
		}));
		// var url = row.name.replaceAll(/[^\w\s]/gi, '').trim();
		// var url = url.replace(/ +(?= )/g, '').trim();
		// history.replace('/blog/'+encodeURIComponent(row.name).replace(/%20/g, "+").replace(`%3F`, ""))
		// history.push('/search?q=' + encodeURIComponent(row.name).replace(/%20/g, "+"))
	}
	function showMobileSearchBar() {
		setMobileSearchBar(!mobileSearchBar);
		setSearchModalOpen(true)
	}
	function closeMobileSearchBar() {
		setMobileSearchBar(false);
		setSearchModalOpen(false)
	}
	function onClickMobileSearchInput(e) {
		e.persist();
		setSearchModalOpen(true)
	}
	function onClickMobileSearchIcon(e) {
		e.persist();
		closeMobileSearchBar()
		history.push('/search?q=' + formState.searchQuery)
	}
	function SearchItem() {
		return (
			<ul className="list-group search_ul">
				{blogsSearch && blogsSearch.map((item) => (
					<li className="list-group-item">{item.title}</li>
				))
				}
			</ul>
		)
	}

	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);
	const handleScroll = () => {
		const currentScrollPos = typeof window !== "undefined" && window.pageYOffset;
		if (prevScrollPos > currentScrollPos) {
			setVisible(true)
		} else {
			setVisible(false)
		}
		//setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10);
		setPrevScrollPos(currentScrollPos);
	};
	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener('scroll', handleScroll);
			return () => window.removeEventListener('scroll', handleScroll);
		}
	}, [prevScrollPos, visible, handleScroll]);

	// const filterColors = (inputValue) => {
	// 	debugger
	// 	return colourOptions.filter(i =>
	// 		i.label.toLowerCase().includes(inputValue.toLowerCase())
	// 	);
	// };

	// const promiseOptions = inputValue =>
	// 	new Promise(resolve => {
	// 		debugger
	// 		setTimeout(() => {
	// 			resolve(filterColors(inputValue));
	// 		}, 1000);
	// 	});

	// var prevScrollpos = window.pageYOffset;
	// window.onscroll = function () {
	// 	var currentScrollPos = window.pageYOffset;
	// 	if (prevScrollpos > currentScrollPos) {
	// 		document.getElementById("navbar").style.top = "0";
	// 	} else {
	// 		document.getElementById("navbar").style.top = "-50px";
	// 	}
	// 	prevScrollpos = currentScrollPos;
	// }


	return (
		<section id="section_header" className="css-scope section_header" >
			{/* <Helmet>
				<meta name="description"
					content="Best Division is an Online Educational Platform. Web Development, Android Development, GATE, Competitive Exams, Courses, Online Teachers" />
				<title></title>
				<meta name="Keywords"
					content="best division, blogs, tutorials, html, css, javascript, php, python, web development  " />
				<link rel="canonical" href={`${process.env.REACT_APP_BASE_URL}`} />
				<meta name="Author" content="Best Division" />
				<title>Best Division - Online Educational Platform</title>
			</Helmet> */}
			{
				modalOpen &&
				<Modal setModalOpen={setModalOpen} modalClassName={modalClassName} children={ModalContent} />
			}
			{
				searchModalOpen &&
				<SearchModal setModalOpen={setSearchModalOpen} modalContainer_className="search_modal" modalClassName="search_modal_content" closeMobileSearchBar={closeMobileSearchBar} children={<SearchItem />} />
			}
			<nav id="header" className={visible ? `css-scope header` : `css-scope header top`} itemScope="itemscope" itemType="https://schema.org/WPHeader">
				<div className="header_containerOne">
					<div className="header_containerTwo">
						<div className="header_containerThree">
							<div className="css-scope header_item header_itemStart">
								<HeaderMenu />
								<HeaderLogo />
							</div>
							<div id="jk_top_nav_right_end" className="css-scope header_item header_itemCenter">
								{isMobile ?
									<div className="css-scope show">
										<div onClick={showMobileSearchBar} className="css-scope header_icon waves-effect">
											<div className="css-scope header_btn">
												<div className="css-scope icon">
													<Svg className="search-svg-container" svg={`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="icon_svg" style="pointer-events:none;display:block;width:100%;height:100%;" viewBox="0 0 24 24"><title>search</title><path d="M9.516 14.016q1.875 0 3.188-1.313t1.313-3.188-1.313-3.188-3.188-1.313-3.188 1.313-1.313 3.188 1.313 3.188 3.188 1.313zM15.516 14.016l4.969 4.969-1.5 1.5-4.969-4.969v-0.797l-0.281-0.281q-1.781 1.547-4.219 1.547-2.719 0-4.617-1.875t-1.898-4.594 1.898-4.617 4.617-1.898 4.594 1.898 1.875 4.617q0 0.984-0.469 2.227t-1.078 1.992l0.281 0.281h0.797z"></path></svg>
												`} />
												</div>
											</div>
										</div>
										{mobileSearchBar &&
											<div className="search-form-wrapper open">
												<form className="search-form">
													<div className="jk-search-input-group">
														<input autoComplete="off" type="text" onClick={onClickMobileSearchInput} onChange={onChange} onKeyDown={handleKeyDown} value={formState.searchQuery} name="q" className="search mobile_search_nav jk-form-control form-control" placeholder="Search" />
														{/* <div id="jk_mob_search_original"><i className="material-icons" style="opacity: 1;">search</i></div> */}
														<div props={mobileSearch} onClick={onClickMobileSearchIcon} id="jk_mob_search_original">
															{/* <i className="material-icons">search</i> */}
															<Svg className="search-svg-container" svg={`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="icon_svg" style="pointer-events:none;display:block;width:100%;height:100%;" viewBox="0 0 24 24"><title>search</title><path d="M9.516 14.016q1.875 0 3.188-1.313t1.313-3.188-1.313-3.188-3.188-1.313-3.188 1.313-1.313 3.188 1.313 3.188 3.188 1.313zM15.516 14.016l4.969 4.969-1.5 1.5-4.969-4.969v-0.797l-0.281-0.281q-1.781 1.547-4.219 1.547-2.719 0-4.617-1.875t-1.898-4.594 1.898-4.617 4.617-1.898 4.594 1.898 1.875 4.617q0 0.984-0.469 2.227t-1.078 1.992l0.281 0.281h0.797z"></path></svg>`} />
														</div>
													</div>
												</form>
												<div className="jk-searchbar-container">
												</div>
											</div>
										}
									</div> :
									<div id="search_container" className="css-scope search hide-on-landscape visible">
										{/* <form method="GET" action="search" id="search_form" className="css-scope search_form">
										<div className="css-scope search_containerOne" > */}
										{/* <?php
											$search_value = '';
											if(isset($_GET['q']) && $this->router->fetch_class() == 'search') {
													$search_value = str_replace('+', ' ', $_GET['q']);
											}
										?> */}
										{/* <input id="search"  type="text" name="search" value={searchValue} placeholder="Search" aria-label="Search" autoComplete="off"/> */}
										<input type="hidden" onChange={onChange} name="searchQuery" value={formState.searchedResult} className="form-control search-icon" id="searchQuery" placeholder="Enter your city" required />
										{/* <div className="inputContainer">
											<form action="/results">
												<input type="search_query" id="searchbox" />
											</form>
											<div className="dropdown"></div>
										</div> */}
										<CustomDesktopSearch/>
										{/* <Select 
											// value={selectedOption}
											options={searchState}
											onChange={handleSearch}
											placeholder="Search"
											isSearchable
										/> */}
										{/* https://stackoverflow.com/questions/52984105/react-select-async-loadoptions-is-not-loading-options-properly */}
										
										
										{/* </div> */}
										{/* <div className="css-scope search_containerTwo">
											<div className="css-scope header_icon waves-effect">
												<div className="css-scope header_btn">
													<div className="css-scope icon search_icon">
														<svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="icon_svg" viewBox="0 0 24 24"><title>search</title><path d="M9.516 14.016q1.875 0 3.188-1.313t1.313-3.188-1.313-3.188-3.188-1.313-3.188 1.313-1.313 3.188 1.313 3.188 3.188 1.313zM15.516 14.016l4.969 4.969-1.5 1.5-4.969-4.969v-0.797l-0.281-0.281q-1.781 1.547-4.219 1.547-2.719 0-4.617-1.875t-1.898-4.594 1.898-4.617 4.617-1.898 4.594 1.898 1.875 4.617q0 0.984-0.469 2.227t-1.078 1.992l0.281 0.281h0.797z"></path></svg>
													</div>
												</div>
											</div>
										</div>
									</form> */}
									</div>
								}
							</div>
							{isMobile ?
								<div className="css-scope header_item header_itemEnd">
									<Navbar>
										<NavItem icon={<CaretIcon />}>
											<DropdownMenu onClickRegister={onClickRegister} onClickLogin={onClickLogin}></DropdownMenu>
										</NavItem>
									</Navbar>

								</div>
								:
								<div className="css-scope header_item header_itemEnd">
									{appSession?.user?.isLoggedIn
										?
										<Navbar>
											<NavItem icon={<PlusIcon />} />
											{/* <DropdownMenu></DropdownMenu> */}
											<NavItem icon={<BellIcon />} >
												<NotificationsDropdownMenu></NotificationsDropdownMenu>
											</NavItem>
											<NavItem icon={<MessengerIcon />} >
												<DropdownMenu></DropdownMenu>
											</NavItem>
											<NavItem icon={<CaretIcon />}>
												<DropdownMenu></DropdownMenu>
											</NavItem>
										</Navbar>
										:
										<>
											<button onClick={onClickRegister} type="button" className="btn btn-outline-primary mr-1" >Join Now</button>
											{/* <button type="button" onClick={signOut} className="btn btn-primary">Sign Out</button>  */}
											<button onClick={onClickLogin} type="button" className="btn btn-primary">Login</button>
										</>
									}
									{/* <Profile/> */}
								</div>
							}
						</div>
					</div>
				</div>
			</nav>
			<div className="search-form-wrapper" >
				<form className="search-form" id="" action="">
					<div className="jk-search-input-group">
						<input type="text" name="search" className="search jk-form-control form-control" placeholder="Search Blogs" />
						<div className="css-scope header_icon waves-effect">
							<div className="css-scope header_btn">
								<div className="css-scope icon">
									<svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="icon_svg" viewBox="0 0 24 24"><title>search</title><path d="M9.516 14.016q1.875 0 3.188-1.313t1.313-3.188-1.313-3.188-3.188-1.313-3.188 1.313-1.313 3.188 1.313 3.188 3.188 1.313zM15.516 14.016l4.969 4.969-1.5 1.5-4.969-4.969v-0.797l-0.281-0.281q-1.781 1.547-4.219 1.547-2.719 0-4.617-1.875t-1.898-4.594 1.898-4.617 4.617-1.898 4.594 1.898 1.875 4.617q0 0.984-0.469 2.227t-1.078 1.992l0.281 0.281h0.797z"></path></svg>
								</div>
							</div>
						</div>
					</div>
				</form>
				<div className="jk-searchbar-container">
				</div>
			</div>
		</section>
	)
}

export default Header