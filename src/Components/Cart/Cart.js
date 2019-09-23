import React, { Component } from 'react';
import Title from '../Title';
import CartColumns from './cartColumns';
import Empty from './Empty';
import {ProductsConsumer} from '../../Context';
import Cartlist from './Cartlist';
import CartTotal from './CartTotal';
class Cart extends Component {
    render() {
        return (
            <section>
                <ProductsConsumer>
                    {value=>{
                        const{cart}=value;
                        if(cart.length>0){
                            return (
                                <React.Fragment>
                                            
                                        <Title name="Your" title="cart"/>
                                        <CartColumns/>
                                        <Cartlist value={value}/>
                                            <CartTotal value={value}/>

                                </React.Fragment>

                            )

                        }
                        else{
                            return(<Empty/> )    
                        }
                    }}
                   
                </ProductsConsumer>
            </section>
        );
    }
}

export default Cart;