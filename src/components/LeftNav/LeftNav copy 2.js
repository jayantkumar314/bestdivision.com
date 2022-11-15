import React, { Fragment, useState, useEffect, useHistory } from 'react'
// import './leftnav.css'
import { useStateValue } from '../../StateProvider'

import { ReactComponent as BellIcon } from '../../icons/bell.svg';
import { ReactComponent as MessengerIcon } from '../../icons/messenger.svg';
import { ReactComponent as CaretIcon } from '../../icons/caret.svg';
import { ReactComponent as PlusIcon } from '../../icons/plus.svg';

import LeftnavItem from './LeftnavItem';

import axios from '../../axios';

const initialLeftMenuItems = {};

function LeftNav() {
	const [leftMenuItems, setLeftMenuItems] = useState(initialLeftMenuItems);
	const [open, setOpen] = useState(false);

	//const history = useHistory();
	const [{ leftNavIsActive, user, searchValue }, dispatch] = useStateValue();
	const toggleLeftNav = () => {
		dispatch({
			type: 'TOGGLE_LEFTNAV'
		})
	};

	const insertUserIntoDb = async (attributes) => {
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
			setLeftMenuItems(() => (response.data.data))
		})
		.catch((error) => {
			debugger;
			})
			.finally(() => {
			});
	}
	
	useEffect(() => {
		insertUserIntoDb();
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

	return (
		<div id="leftNav" className={`css-scope leftnav ${leftNavIsActive ? 'active' : ''}`} role="navigation" itemScope="itemscope" itemType="https://schema.org/SiteNavigationElement">
			<ul className="css-scope leftnav_scroll">
				<li className="css-scope list leftnav_list" >
					<ul className="css-scope">
						{ leftMenuItems.length > 0 &&
							leftMenuItems.map((key, value) => {
								return (<LeftnavItem id={key.id} listName={key.name} slug={key.slug} icon={key.brand_logo} iconSvg={key.icon} />);
							})
						}
						{/* <LeftnavItem icon={<BellIcon/>} />
						<LeftnavItem icon={<MessengerIcon/>} />
						<LeftnavItem icon={<CaretIcon/>} />
						<LeftnavItem icon={<PlusIcon/>} /> */}
						
						{/* <?php
						$menus = $this -> db -> where('status', 1) -> get('left_sidebar_main_menu') -> result();
					foreach($menus as $menu) {
							echo '<li className="css-scope list_item"><a className="css-scope waves-effect" href="'.base_url($menu->slug).'">'.$menu->icon.$menu->name.'</a></li>';
					}
				?> */}
					</ul>
				</li>
			</ul>
		</div>
	)
}

export default LeftNav