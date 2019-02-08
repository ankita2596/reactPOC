import React from 'react';

import classes from './BuildControl.css';

const buildControl = (props) => (
    <div className={classes.Build_Control}>
        <div>{props.label}</div>
        <button  
            className={classes.Build_Control_Button} 
            onClick={props.removed}
            disabled={props.disabled}>Less</button>
        <button 
            className={classes.Build_Control_Button}
            onClick={props.added}>More</button>
    </div>
);

export default buildControl;