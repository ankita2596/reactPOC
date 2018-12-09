import React from 'react';

import './BuildControl.css';

const buildControl = (props) => (
    <div className="build_control">
        <div>{props.label}</div>
        <button  
            className="build_control_button" 
            onClick={props.removed}
            disabled={props.disabled}>Less</button>
        <button 
            className="build_control_button"
            onClick={props.added}>More</button>
    </div>
);

export default buildControl;