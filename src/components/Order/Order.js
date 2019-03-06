import React from 'react';

import classes from './Order.css'

const order = (props) => {
    const ingredientOutput = [];

    for(let ingredientName in props.ingredients){
        ingredientOutput.push({
            name: ingredientName,
            quantity: props.ingredients[ingredientName]
        })
    }
    let ingredientsDisplayed = ingredientOutput.map(igKey => {
        return <span 
            style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'}}>{igKey.name} ({igKey.quantity})
            </span>
    }) 

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsDisplayed}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
};

export default order;