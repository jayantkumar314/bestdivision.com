import React, { Fragment, useState, useEffect, useRef } from 'react'
import { Link, useHistory } from "react-router-dom";
// import './leftnav.css'
import { ReactComponent as HomeIcon } from '../../icons/home.svg';
import * as AiIcons from "react-icons/ai"
import { IconContext } from "react-icons"
import LeftnavItem from './LeftnavItem';
import axios from 'axios';
const closeLeftNav = () => {
	document.getElementById('leftNavOutside')?.classList?.remove('visible')
	document.getElementById('leftNav')?.classList?.remove('active')
	removeScrollLock()
};
const toggleLeftNav = () => {
	document.getElementById('leftNavOutside')?.classList?.toggle('visible')
	document.getElementById('leftNav')?.classList?.toggle('active')
	//leftNav.current?.classList?.toggle('active')
	toggleScrollLock()
};
const toggleScrollLock = () => {
	document.querySelector('html')?.classList?.toggle('scroll-lock');
};
const removeScrollLock = () => {
	document.querySelector('html')?.classList?.remove('scroll-lock');
};
const onClickOutside = (event, ref) => {
	if (ref && ref.current.contains(event.target)) return;
	closeLeftNav();
};

export { toggleLeftNav, toggleScrollLock, onClickOutside }
function LeftNav() {
	const [isShown, setIsShown] = useState(false)
	//const [leftMenuItems, setLeftMenuItems] = useState(initialLeftMenuItems);
	const [open, setOpen] = useState(false);
	const header = useRef(null);
	const leftNav = useRef(null);
	const outSideNav = useRef(null);
	const history = useHistory();
	//const [{ leftNavIsActive, user, searchValue }, dispatch] = useStateValue();
	async function insertUserIntoDb(attributes){
		let response = await axios({
			method: 'post',
			url: `get_leftnav_menu`,
		}).then((response) => {
		})
			.catch((error) => {
			})
			.finally(() => {
			});
	}

	useEffect(() => {
		insertUserIntoDb();
	}, [])

	history.listen((location, action) => {
		closeLeftNav();
	})
	const onClickOutsideNav = (event, ref) => {
		if (ref && ref.current.contains(event.target)) return;
		closeLeftNav();
	};

	const leftMenuItems = [
		{
			title: 'Home',
			slug: '/',
			icon: <HomeIcon/>,
			cName: 'nav-text'
		},
		{
			title: 'Templates',
			slug: '/templates',
			icon: <AiIcons.AiFillRocket />,
			cName: 'nav-text'
		},
		{
			title: 'All Blogs',
			slug: '/blogs',
			icon: <AiIcons.AiFillSnippets />,
			cName: 'nav-text'
		},
		{
			title: 'All Tutorials',
			slug: '/tutorials',
			icon: <AiIcons.AiFillStar />,
			cName: 'nav-text'
		},

	];

	return (
		<IconContext.Provider value={{ color: '#050505' }} >
			<div id="leftNavOutside" onClick={onClickOutsideNav} ref={outSideNav} className="css-scope tent" ></div>
			<div ref={leftNav} id="leftNav" className={`css-scope leftnav ${isShown ? 'active' : ''}`} role="navigation" itemScope="itemscope" itemType="https://schema.org/SiteNavigationElement">
				<ul className="css-scope leftnav_scroll">
					<li className="css-scope list leftnav_list" >
						<ul className="css-scope">
							{leftMenuItems.length > 0 &&
								leftMenuItems.map((key, value) => {
									return (<LeftnavItem title={key.title} slug={key.slug} icon={key.icon} />);
								})
							}
						</ul>
					</li>
				</ul>
			</div>
		</IconContext.Provider>
	)
}

export default LeftNav