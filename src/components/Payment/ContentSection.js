import React, { Fragment, useState, useEffect } from 'react'
import { useStateValue } from '../../StateProvider'
import axios from 'axios';
// import './ContentSection.css';
// import 'common/css/pills.css';
// import 'common/css/search.css';
import Pills from '../Pills/Pills';
import CourseCard from '../CourseCard';

import { FormattedMessage } from "react-intl";

// import SelectSearch from 'react-select-search';

const initialSelectSearchState = {
    options: [],
    getOptions: {
        url: 'tutorial',
        params: {
            "type": "category",
            "search": "",
            // "limit": "2",
            // "offset": 1
        }
    },
    placeholder: "Search Tutorials"

}
const initialTutorials = '';
const initialContentTitle = 'Tutorial';

const initialFormState = {
    group: {},
    searchQuery: "",
    searhedResult: ""
}
const initialSearchState = [];

function ContentSection() {
    const [formState, updateFormState] = useState(initialFormState);
    const [searchState, updateSearchState] = useState(initialSearchState);
    const [selectSearchState, updateSelectSearchState] = useState(initialSelectSearchState);

    const [contentTitle, updateContentTitle] = useState(initialContentTitle);

    const [{ leftNavIsActive, user, searchValue }, dispatch] = useStateValue();
    const [tutorials, setTutorials] = useState(initialTutorials);
    async function callSetTutorials(attributes){
        let response = await axios({
            method: 'get',
            url: `blogs`,
            params: {
                "type": "category",
                // "limit": "2",
                // "offset": 1
            }
        }).then((response) => {
            setTutorials(() => (response.data.data))
        }).catch((error) => {
        }).finally(() => {
        });
    }
    useEffect(() => {
        callSetTutorials();
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
    const handleCityChange = e => {
        let row = searchState[e];
        updateFormState(() => ({
            ...formState,
            searchedResult: JSON.stringify(row)
        }));
    }
    function onClick(e) {
        let content = e.target.dataset.content;
        content = content.charAt(0).toUpperCase() + content.slice(1)
        updateContentTitle(() => (content));
        // updateFormState(() => ({
        // 		...formState,
        // 		group: { ...formState.group, [e.target.name]: e.target.value }
        // 	}));
        updateSelectSearchState(() => ({
            ...selectSearchState,
            placeholder: `Search ${content}`,
            getOptions: {
                ...selectSearchState.getOptions,
                type: content,
                // search": "",
            }
        }));
    }
    return (
        <section id="section_content" className="css-scope section_content" >
            <div className="content_items content_items-top">
                <div className="bd_blog_top_wrapper hero">

                </div>
            </div>
            <div className="container" id="jk_after_overlay_container">
                <div className="container-fluid">
                    <div className="row clearfix">
                        <main className="jkkkmain">
                            <div className="box shadow-sm border rounded bg-white mb-3 jk-share-post">
                                <ul className="nav border-bottom jk-line-tab" id="myTab" role="tablist">

                                    <li onClick={onClick} className="nav-item">
                                        <a className={`nav-link ${(contentTitle === "Tutorials") ? 'active' : ''}`} id="tutorials-tab" data-content="tutorials" >Tutorials</a>
                                    </li>
                                    <li onClick={onClick} className="nav-item">
                                        <a className={`nav-link ${(contentTitle === "Blogs") ? 'active' : ''}`} id="blogs-tab" data-content="blogs" >Blogs</a>
                                    </li>
                                    <li onClick={onClick} className="nav-item">
                                        <a className={`nav-link ${(contentTitle === "Services") ? 'active' : ''}`} id="services-tab" data-content="services" >Services</a>
                                    </li>
                                </ul>
                                <div className="row border-bottom">

                                    <div className="col-lg-8 col-md-6 col-sm-12 col-xs-12">
                                        <div className="pt-4">
                                            <form className="payment_form">
                                                <div className="paymentForm_radioContanier" >
                                                    <input className="" type="radio" name="payment" value="debit_credit_card" />
                                                    <label htmlFor="debit_credit_card" >Debit or Credit Card</label>
                                                </div>
                                                <div className="paymentForm_radioContanier" >
                                                    <input className="" type="radio" name="payment" value="debit_credit_card" />
                                                    <label htmlFor="debit_credit_card" >Debit or Credit Card</label>
                                                </div>
                                                <div className="paymentForm_radioContanier" >
                                                    <input className="" type="radio" name="payment" value="debit_credit_card" />
                                                    <label htmlFor="debit_credit_card" >Debit or Credit Card</label>
                                                </div>
                                            </form>
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
                                        {tutorials.length > 0 &&
                                            tutorials.map((key, value) => {
                                                return (<CourseCard props={key} />);
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
            <div id="main_content" className="jk-main-content container mt-5 mb-5">
                {/* <?php $this->load->view('common/snippets/owl.php'); ?> */}
            </div>
            {/* <?php $this->load->view($this->router->fetch_class().'/pages/'.$this->router->fetch_method()); ?> */}
        </section>
    )
}

export default ContentSection
