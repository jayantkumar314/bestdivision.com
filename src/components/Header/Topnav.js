import React from 'react'

function Topnav(props) {
    return (
        <div>
            <ul>{props.children}</ul>
        </div>
    )
}

export default Topnav
