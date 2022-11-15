import React, {useState, useEffect} from 'react'
import { useStateValue } from '../../StateProvider'
import LeftNav, { isShown, toggleLeftNav, toggleScrollLock, onClickOutside } from 'components/LeftNav/LeftNav.js'

function HeaderMenu() {
    return (
        <div id="menu" className="css-scope header_icon waves-effect" onClick={() => toggleLeftNav()} >
            <div className="css-scope header_btn">
                <div id="header_menuIcon" className="css-scope icon">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="icon_svg" viewBox="0 0 24 24">
                        <title>menu</title>
                        <path d="M3 6h18v2.016h-18v-2.016zM3 12.984v-1.969h18v1.969h-18zM3 18v-2.016h18v2.016h-18z"></path>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default HeaderMenu
