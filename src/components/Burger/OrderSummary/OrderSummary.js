import React, {Component} from 'react';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    // This could be functional component. 
    componentWillUpdate() {
        console.log('[OrderSummary] willUpdate');
    }
    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map(igkey => {
            return  <li key={igkey}>
                        <span style={{textTransform: 'capitalize'}}>{igkey}</span> : {this.props.ingredients[igkey]}
                    </li>
        });
        return (
            <React.Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p> 
                <ul>
                    {ingredientsSummary}
                </ul>
                <p>Continue to checkout?</p>
                <p><strong>Total price : {this.props.price.toFixed(2)}</strong></p>
                <Button btnType='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </React.Fragment>
           
        )
    }
};

export default OrderSummary;