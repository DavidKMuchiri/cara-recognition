import React from 'react';
import "./Box.css";

const Box = (props) => {
    return(      
        <div className="bounding-box" style={{
            top: props.top,
            right: props.right,
            bottom: props.bottom,
            left: props.left}}>
        </div>
    )
}

export default Box;