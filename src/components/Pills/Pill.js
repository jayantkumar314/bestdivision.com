import React, { Fragment, useState, useEffect } from 'react'
import axios, { axiosAjax } from 'axios'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const initialTags = [];

function Pill({props}) {
    return (
        <Link to={`/tags/${props.slug}`} href={props.slug} className="pills_item swiper-slide">{props.name}</Link>
    )
}

export default Pill
