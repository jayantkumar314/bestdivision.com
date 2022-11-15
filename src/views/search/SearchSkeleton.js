import React from 'react'
import styled from 'styled-components'

const SearchSkeletonPulse = styled.div`
      display: none;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: radial-gradient(
                center, 
                ellipse farthest-corner, 
                rgba(255,255,255,0) 0%,
                rgba(255,255,255,0) 100%
        );
    .active {
        display: block;
        background: radial-gradient(
            center, 
            ellipse farthest-corner, 
            rgba(255,255,255,0.5) 0%,
            rgba(255,255,255,0.1) 100%
    );
    }
    .active img, .active video {
        max-width: 70%;
        height: auto !important;
        margin: 0 auto;
        opacity: 1;
        /* box-shadow: 0px 2px 7px rgba(0,0,0,0.2); */
        transition: opacity 0.5s linear;
        animation: fadeInScale 1.2s ease-in-out;
        max-height: 70%;
        width: auto !important;
        position: relative;
        top: 11%;
}
`;

function SearchSkeleton() {
    return (
        <div>

        </div>
    )
}

export default SearchSkeleton
