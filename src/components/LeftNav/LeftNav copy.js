import React, { Fragment, useState, useHistory } from 'react'
// import './leftnav.css'
import { useStateValue } from '../../StateProvider'

import { ReactComponent as BellIcon } from '../../icons/bell.svg';
import { ReactComponent as MessengerIcon } from '../../icons/messenger.svg';
import { ReactComponent as CaretIcon } from '../../icons/caret.svg';
import { ReactComponent as PlusIcon } from '../../icons/plus.svg';

import LeftnavItem from './LeftnavItem';

import axios from '../../axios';

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
		this.setState({ students: response })
		// setSucceeded(true);
		// updateFormState(() => ({ ...formState, formType: "signedIn" }))
		// setErrors(() => ({ ...errors, ['usernamePassword']: "" }))
	})
		.catch((error) => {
			// setSucceeded(false);
			// setErrors(() => ({ ...errors, ['usernamePassword']: error.message }))
		})
		.finally(() => {
		// setProcessing(false)
	});
}
insertUserIntoDb();

function LeftNav() {
	const [open, setOpen] = useState(false);

	//const history = useHistory();
	const [{ leftNavIsActive, user, searchValue }, dispatch] = useStateValue();
	const toggleLeftNav = () => {
		dispatch({
			type: 'TOGGLE_LEFTNAV'
		})
	};

	// useEffect(() => {
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
	// }, [])

	return (
		<div id="leftNav" className={`css-scope leftnav ${leftNavIsActive ? 'active' : ''}`} role="navigation" itemscope="itemscope" itemtype="https://schema.org/SiteNavigationElement">
			<ul className="css-scope leftnav_scroll">
				<li className="css-scope list leftnav_list" >
					<ul className="css-scope">
						<LeftnavItem icon={<BellIcon/>} />
						<LeftnavItem icon={<MessengerIcon/>} />
						<LeftnavItem icon={<CaretIcon/>} />
						<LeftnavItem icon={<PlusIcon/>} />
						
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