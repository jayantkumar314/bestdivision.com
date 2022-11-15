import React from 'react'
// import './CourseCard.css';
import { Link } from "react-router-dom";
import Svg from '../Svg'

import { useStateValue } from '../../StateProvider'

function CourseCard(props) {
    // debugger
    const [{ baseUrl }, dispatch] = useStateValue();
    return (
        <div className="card_single">
            <div className="card jk-card card-img-top">
                <div className="card_brandLogo">
                    <Svg svg={props.item.brand_logo} />
                </div>
                <Link style={{cursor: 'pointer'}} to={`/${props.type}/${props.item.slug}`} >
                    <img className="card_thumbnail card-img-top" src={`${props.item.thumbnail}`} alt={props.item.name}/>
                </Link>
                <div className="card-body">
                    <h6 className="font-weight-bold mb-0"><a className="text-dark" href={`tutorials/${props.item.slug}`}>{props.item.name}</a></h6>
                    <div className="media-body">
                        <div className="mb-3">
                            <a className="d-inline-block small pt-1" href={`tutorials/${props.item.slug}`}></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard
