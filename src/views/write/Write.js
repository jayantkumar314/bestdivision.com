import React, {useState, useEffect} from 'react'
import Editor from './Editor'

function Write() {
    let defaultCss = `.body{background:red}`
    const [css, setCss] = useState(defaultCss)
    return (
        <div style={{paddingTop: "108px"}}>
            <Editor 
                language="css"
                displayName="CSS"
                value={css}
                onChange={setCss}
            />
        </div>
    )
}

export default Write
