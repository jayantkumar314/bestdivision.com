import React, { Fragment, useState, useEffect } from 'react'
import axios, { axiosAjax } from 'axios'

import Pill from './Pill'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const initialTags = [];

function Pills() {
    const [homeTags, updateHomeTags] = useState(initialTags);
    async function getHomeTags(attributes){
        let response = await axios({
            method: 'get',
            url: `home_tags`,
            params: {
                "limit": "100",
                "offset": 0
            }
        }).then((response) => {
            updateHomeTags(() => (response.data.data))
            localStorage.setItem("homeTags", JSON.stringify(response.data.data))
        }).catch((error) => {
            // setMode('offline')
            let homeTags = localStorage.getItem("homeTags")
            updateHomeTags(() => (JSON.parse(homeTags)))

        }).finally(() => {
        });
    }
    useEffect(() => {
        getHomeTags();
    }, [])
    return (
        <div className="swiper-wrapper pills tag hero_tag">
            <a href="/tags" className="pills_item pills_item-all swiper-slide all_tags">All Tags</a>
            {/* foreach($pills as $pill){ */}
            {/* <a href="'.base_url('tag/'.$pill->slug).'" className="pills_item swiper-slide">'.$pill->name</a> */}
            {homeTags && homeTags.length > 0 &&
                homeTags.map((item) => {
                    return (
                        <Pill props={item} />
                    );
                })
            }
        </div>
    )
}

export default Pills
