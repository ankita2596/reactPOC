import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
                return sum + el;
            }, 0)
        return sum > 0
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }
    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0){
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // } 
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }
    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }
    componentDidMount() {
        axios.get('/ingredients.json')
        .then(response => {
            this.setState({ ingredients: response.data });
        })
        .catch(error => {
            this.setState({error: true})
        })
    }
        render () { 
            const disabledInfo = {
                ...this.props.ings
            };
            // salad: true, meat: false, ...
            for(let key in disabledInfo){
                disabledInfo[key] = disabledInfo[key] <= 0;
            }
            
            let orderSummary = null;
            let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
            if(this.props.ings){
                burger = (
                    <React.Fragment>
                        <Burger ingredients={this.props.ings}/>
                        <BuildControls 
                            ingredientAdded={this.props.onIngredientAdded}
                            ingredientRemoved={this.props.onIngredientRemoved}
                            disabled={disabledInfo}
                            price={this.props.price}
                            purchasable={this.updatePurchaseState(this.props.ings)} 
                            ordered={this.purchaseHandler}/>
                    </React.Fragment> 
                ) 
                orderSummary =  <OrderSummary ingredients={this.props.ings}
                                              purchaseCancelled={this.purchaseCancelHandler} 
                                              purchaseContinued={this.purchaseContinueHandler}
                                              price={this.props.price} />
            }
            if(this.state.loading){
                orderSummary = <Spinner />
            }
            
            return (
                <React.Fragment>
                    <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                       {orderSummary}
                    </Modal>
                   {burger}
                </React.Fragment>
            );
        }
}
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));