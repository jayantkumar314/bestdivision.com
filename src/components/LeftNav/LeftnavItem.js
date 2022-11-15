import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useHistory } from "react-router-dom";

import { ReactComponent as BlogsIcon } from '../../icons/bell.svg';
import { ReactComponent as TutorialsIcon } from '../../icons/messenger.svg';
import { ReactComponent as TemplatesIcon } from '../../icons/caret.svg';
import { ReactComponent as PlusIcon } from '../../icons/plus.svg';
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import Svg from '../Svg'

function LeftnavItem(props) {
    return (
        <li className="css-scope list_item">
            <NavLink className="css-scope waves-effect" to={props.slug}>
                {props.icon}
                {props.title}
            </NavLink>
        </li>
    )
}
export default LeftnavItem