import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Ankita',
                address: {
                    street: 'Nineleaps lane',
                    zipCode: '560034',
                    country: 'India'
                },
                email: 'Test@test.com'   
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json',order)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({ loading:false });
        })
    }
    render() {
        let form = (
            <form> 
                <input className={classes.Input} type='text' placeholder='Your Name' name='name' />
                <input className={classes.Input} type='email' placeholder='Your Email' name='email' />
                <input className={classes.Input} type='text' placeholder='Street' name='street' />
                <input className={classes.Input} type='text' placeholder='Postal code' name='postal' />
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <div>
                    {form}
                </div>
            </div>
           
        )
    }
}

export default ContactData;