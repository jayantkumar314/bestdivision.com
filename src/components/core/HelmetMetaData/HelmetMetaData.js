import React from 'react'
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
// import { Helmet, HelmetProvider } from "react-helmet-async"
// import { useLocation } from "react-router-dom"

function HelmetMetaData(props) {
    // let location = useLocation();
    // let currentUrl = "https://react.bestdivision.com" + location.pathname;
    let currentUrl = `${process.env.REACT_APP_BASE_URL}`;
    let quote = props.quote !== undefined ? props.quote : "";
    let title = props.title ? props.title : "Bestdivision - Online Educational Website";
    let image = props.image !== undefined ? props.image : `${process.env.REACT_APP_ASSETS_URL}/images/best_division_logo.jpg`;
    let description = props.description !== undefined ? props.description : "Best Division is an Online Educational Platform. Web Development, Android Development, GATE, Competitive Exams.";
    let keywords = props.keywords !== undefined ? `${props.keywords} best division blogs, bestdivision blogs` : "best division blogs, bestdivision blogs";
    let hashtag = props.hashtag !== undefined ? props.hashtag : "#bestdivision";
    
    let ogTitle = props.ogTitle !== undefined ? props.ogTitle : title;
    let ogHashtag = props.ogHashtag !== undefined ? props.ogHashtag : hashtag;
    let ogImage = props.ogImage !== undefined ? props.ogImage : image;
    let ogDescription = props.ogDescription !== undefined ? props.ogDescription : description;

    return (
        <Helmet>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta charset="utf-8"></meta>
            <meta name="theme-color" content="#000000" />
            <title>{title}</title>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="csrf_token" content="" />
            <meta property="type" content="website" />
            <meta property="url" content={currentUrl} />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
            <meta name="_token" content="" />
            <meta name="robots" content="noodp" />
            <meta property="title" content={title} />
            <meta property="quote" content={quote} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta property="image" content={image} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={ogTitle} />
            <meta property="og:quote" content={quote} />
            <meta property="og:hashtag" content={ogHashtag} />
            <meta property="og:image" content={ogImage} />
            <meta content="image/*" property="og:image:type" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:site_name" content="Best Division" />
            <meta property="og:description" content={ogDescription} />    
        </Helmet>
    )
}

export default HelmetMetaData
