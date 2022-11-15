import React from 'react'
import {Link} from 'react-router-dom'
import CourseCard from '../CourseCard'

function HomeTabRow({contentTitle, tabContent}) {
    return (
        <div className="container jk-main-content">
            <h2 className="">{contentTitle.charAt(0).toUpperCase() + contentTitle.slice(1)}</h2>
            <div className="viewAll_btn" >
                <Link to={`/${contentTitle}`} ><button className="btn btn-primary" >View All</button></Link>
            </div>
            <div id="tutorials-cards_container" className="row clearfix cards_container">
                {tabContent && tabContent.length > 0 &&
                    tabContent.map((item) => {
                        return (<CourseCard item={item} type={contentTitle} />);
                    })
                }
            </div>
        </div>
    )
}

export default HomeTabRow
