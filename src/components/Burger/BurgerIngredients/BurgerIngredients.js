import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredients.css';

class BurgerIngredient extends Component {
    render() {        
        let ingredient = null;
        switch(this.props.type){
            case ('bread-bottom'):
                ingredient = <div className={classes.Bread_Bottom}></div>
                break;
            case ('bread-top'):
                ingredient = <div className={classes.Bread_Top}></div>           
                break;
            case ('meat'):
                ingredient = <div className={classes.Meat}></div>
                break;
            case ('cheese'):
                ingredient = <div className={classes.Cheese}></div>
                break;
            case ('bacon'):
                ingredient = <div className={classes.Bacon}></div>
                break;
            case ('salad'):
                ingredient = <div className={classes.Salad}></div>
                break;
            default:
                ingredient = null  
        }
        return ingredient;
    }
} 
BurgerIngredient.propTypes = {
    type : PropTypes.string.isRequired
};

export default BurgerIngredient;