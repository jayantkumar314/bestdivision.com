import React, { useState, useEffect, useRef } from 'react'
// import './Home.css'

import HelmetMetaData from 'components/core/HelmetMetaData'

import axios from 'axios'

// import './Content.css'
import Loader from 'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

// import 'components/common/css/common.css'
import Header from 'components/Header'
import LeftNav from 'components/LeftNav/LeftNav.js'
import Footer from 'components/Footer'

import { useStateValue } from 'StateProvider'
// import 'components/common/css/pills.css'
// import 'components/common/css/search.css'
import Pills from 'components/Pills/Pills'
import HomeTabRow from 'components/homeTabRow'
// import NavItem from './NavItem'
import Svg from 'components/Svg'
// import { ReactComponent as Mysvg } from './Mysvg.svg'
import { FormattedMessage } from "react-intl"
// import SelectSearch from 'react-select-search'

const homeHero = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 3510.8 349.9" xml:space="preserve"><style type="text/css">.st0{opacity:0.35;fill:#f5f5f5;}.st1{fill:#f5f5f5;}</style><path class="st0" d="M1538.6,349.9c-8.5-5.8-17-11.5-25.4-17.2c-201.1-134-443.1-203.1-683.1-195.3	c-227.5,7.5-446.5,85.8-635.3,212.4H1538.6z"></path><path class="st1" d="M3510.8,204.2c-20.4-11.2-41.6-21.2-62.2-29.5c-82.7-33.3-189.3-48.1-283.7-29.4
		c-145.5,29-226.9,126.3-365.6,165.7c-122,34.6-266.8,18.4-392.2-11.3c-243.9-57.8-476.4-125.1-746.4-111c-148,7.7-291,38.8-421.4,82
		c-134.5,44.6-293.8,106.7-448.7,58.3c-131.8-41.3-200.4-132.1-322.4-182c-91.2-37.3-207.8-50.7-315.1-36.3
		C98,118.1,45.7,132.9,0,153.3v197.2h3510.8V204.2z"></path><path class="st0" d="M3510.8,282.8c-117.5-97.4-255.6-201.2-413.4-176.4c-111.4,17.5-184.7,114-282.7,161
		c-127.3,61-227.1-16.9-341-69.3c-153.7-70.6-343.6-51.4-480.7,48.6c-42.4,31-83,70-125.2,103.2h1643V282.8z"></path><path class="st0" d="M3510.8,161.9c-21.6-2.7-43-3.1-62.3-1.6c-73,5.5-142.2,33.4-209.5,62.3c-67.3,28.9-134.9,59.4-207.2,70.9
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
	blogs: [],
	tutorials: [],
	services: [],
	placeholder: "Search Tutorials"

}

const initialFormState = {
	group: {},
	searchQuery: "",
	searhedResult: ""
}
const initialSearchState = []
const initialContentsList = ['tutorials', 'blogs']

function Home() {

	const [formState, updateFormState] = useState(initialFormState);
	const [searchState, updateSearchState] = useState(initialSearchState);
	const [selectSearchState, updateSelectSearchState] = useState(initialSelectSearchState);
	const [tabContent, updateTabContent] = useState(initialTabContent);
	const [contentTitle, updateContentTitle] = useState('');
	const [tabSelected, updateTabSelected] = useState(initialTabSelected);
	const [contentList, updateContentsList] = useState(initialContentsList);
	const [currentMargin, setCurrentMargin] = useState(null);
	const [maxMargin, setMaxMargin] = useState(null);
	const [showArrowTagsRight, setShowArrowTagsRight] = useState(true);
	const bdMain = useRef(null);
	const swiperContainer = useRef(null);

	const dbGetHomeContents = () => {
		let tempContents = {
			blogs: [],
			tutorials: [],
			services: []
		};
		contentList && contentList.length > 0 &&
			contentList.forEach(async function(list){
				let response = await get(list);
				// tempContents = {
				// 	...tempContents,
				// 	[list]:response.data.data
				// }
				tempContents[list] = response.data.data
				// updateTabContent(() => ({
				// 	...tabContent,
				// 	[list]: response.data.data
				// }));
				updateTabContent(() => ({
					...tabContent,
					...tempContents
				}));
			});
	}
	async function get(list){
		let response = await axios({
			method: 'get',
			url: `${list}/categories`,
			params: searchState.params
		})
		// .then((response) => {
		// 	updateTabContent(() => ({
		// 		...tabContent,
		// 		[list]: response.data.data
		// 	}));
		// }).catch((error) => {
		// }).finally(() => {
		// });
		return response;
	}
	useEffect(() => {
		//window.scrollTo(0, 0)
		dbGetHomeContents();
		setMaxMargin(swiperContainer.current.scrollWidth);
	}, [])
	// useEffect(() => {
	// 	dbGetHomeContents();
	// }, [tabSelected])

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
	function moveTagsRight() {
		if (-currentMargin < maxMargin) {
			let newMargin = currentMargin - typeof window !== 'undefined' && window.innerWidth + 50
			swiperContainer.current.style.marginLeft = `${newMargin}px`
			setCurrentMargin(newMargin)
		} else {
			setShowArrowTagsRight(false)
		}
	}
	function moveTagsLeft() {
		if (currentMargin) {
			setShowArrowTagsRight(true)
			let newMargin = currentMargin + typeof window !== 'undefined' && window.innerWidth - 50
			swiperContainer.current.style.marginLeft = `${newMargin}px`
			if (newMargin) {
				setCurrentMargin(newMargin)
			} else {
				setCurrentMargin(null)
			}
		}
		//  else {
		// }
	}

	return (
		<section id="section_content" className="css-scope section_content" >
			{/* <HelmetMetaData /> */}
			<div className="content_items content_items-top">
				<div className="bd_blog_top_wrapper hero">
					<div ref={swiperContainer} className="swiper-container">
						<Pills />
					</div>
					{currentMargin &&
						<div onClick={moveTagsLeft} className="swiper-button-prev waves-effect" tabIndex="0" role="button" aria-label="Next slide" aria-disabled="false"></div>
					}
					{showArrowTagsRight &&
						<div onClick={moveTagsRight} className="swiper-button-next waves-effect" tabIndex="0" role="button" aria-label="Next slide" aria-disabled="false"></div>
					}
					<div id="kyalaal" className="swiper-button-prev swiper-button-disabled waves-effect" tabIndex="0" role="button" aria-label="Previous slide" aria-disabled="true"></div>
					<div className="contentItems_container" >
						<div className="container content_homePageContainer">
							<h1><FormattedMessage id="welcome" /></h1>
							<p id="welcome-p" className="jk-p">Spread your knowledge to the world on <b>Best Division</b>. Enjoy Reading from experts and also Write on any topics and get discovered</p>
						</div>
						<Svg className="svg-container" svg={homeHero} />
					</div>
					{/* <Mysvg /> */}
				</div>
			</div>
			<div className="container-fluid" id="jk_after_overlay_container">
				{/* <div className="container"> */}
				<div className="row clearfix box shadow-sm rounded mb-3 jk-share-post">
					{/* <div className="box shadow-sm rounded bg-white mb-3 jk-share-post"> */}
					{/* <div className=""> */}
					<ul className="nav border-bottom jk-line-tab" id="myTab" role="tablist">
						{/* <NavItem name="hello" /> */}
						<li onClick={onClick} className="nav-item">
							<a className={`nav-link ${(tabContent === "tutorials") ? 'active' : ''}`} id="tutorials-tab" data-content="tutorials" >Tutorials</a>
						</li>
						<li onClick={onClick} className="nav-item">
							<a className={`nav-link ${(tabContent === "blogs") ? 'active' : ''}`} id="blogs-tab" data-content="blogs" >Blogs</a>
						</li>
						<li onClick={onClick} className="nav-item">
							<a className={`nav-link ${(tabContent === "services") ? 'active' : ''}`} id="services-tab" data-content="services" >Services</a>
						</li>
					</ul>
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
				</div>
				<div className="row clearfix box shadow-sm rounded mb-3 jk-share-post">
					{
						// contentList.tutorials && contentList.tutorials.length > 0 &&
						// contentList.blogs && contentList.blogs.length > 0 &&
						// contentList.services && contentList.services.length > 0 &&
						contentList && contentList.length > 0 &&
						contentList.map((list) => {
							if (tabContent[list]) {
								return (<HomeTabRow contentTitle={list} tabContent={tabContent[list]} />);
							} else {
								return 0;
							}
						})
					}
					{/* </div> */}
					{/* </div> */}
				</div>
			</div>
			<div id="main_content" className="jk-main-content container mt-5 mb-5">
				{/* <?php $this->load->view('common/snippets/owl.php'); ?> */}
			</div>
			{/* <?php $this->load->view($this->router->fetch_class().'/pages/'.$this->router->fetch_method()); ?> */}
		</section>
	)
}

export default Home