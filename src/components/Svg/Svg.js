import React from 'react'

function Svg({svg, className}) {
    const svgWrapperRef = React.useRef();
    React.useEffect(() => {
        svgWrapperRef.current.innerHTML = svg;
    }, [])
    return (
        <div className={className} ref={svgWrapperRef}></div>
    )
}

export default Svg
