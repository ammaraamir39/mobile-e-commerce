import React, { Component } from 'react';
import {detailProduct} from '../data';
import {ProductsConsumer} from '../Context';
import{Link} from 'react-router-dom';
import {ButtonContainer} from './Button';
 
class Details extends Component {
    render() {
           
        return (
            <ProductsConsumer>
                { value=>{
                    const {id,company,img,title,info,price,inCart}=value.detailProducts; 
                    return (
                        <div className="container">
                            <div className="row">
                                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                    <h1>{title}</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-10 mx-auto col-md-6 my-3">
                                    <img src={img} alt="product" className="img-fluid"/>
                                </div>
                                <div className="col-10 mx-auto text-capitalize col-md-6 my-3">
                                    <h2>model: {title}</h2>
                                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                        made by:<span className="text-uppercase">{company}</span>
                                    </h4>
                                    <h4 className="text-blue">
                                        <strong>
                                            price: <span>$</span>{price}
                                        </strong>
                                        
                                    </h4>
                                    <h5 className="text-capitalize font-weight-bold mt-3 mb-0">
                                        info about product:
                                    </h5>
                                    <p className="text-muted lead">
                                        {info}
                                    </p>
                                    <div>
                                        <Link to='/'>
                                            <ButtonContainer>
                                                Back To Products
                                            </ButtonContainer>
                                        </Link>
                                        <ButtonContainer
                                            cart
                                        disable={inCart?true:false}
                                            onClick={()=>{
                                                value.addToCart(id);
                                                value.openModal(id);
                                                
                                            }}
                                        >
                                            {inCart?'in Cart':'Add to cart'}
                                        </ButtonContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    }
                    }
            </ProductsConsumer>  
            
        );
    }
}

export default Details;