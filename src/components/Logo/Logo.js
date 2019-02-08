import React from 'react';

import burgerLogo from '../../assets/BurgerImage.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt='Burger logo' />
    </div>
);

export default logo;