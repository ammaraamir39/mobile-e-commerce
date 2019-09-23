import React, { Component } from 'react';
import { ProductsConsumer } from '../Context';
import styled from 'styled-components';
import {Link } from 'react-router-dom';

class Products extends Component {
    render() {
        const {id, title, img, price, inCart} = this.props.product;
        return (
            <ProductsWrapper className="mx-auto my-3 col-9 col-md-6 col-lg-4 p-2"> 
                <div className="card">
                    <ProductsConsumer>
                        {(value)=>(
                            <div className="img-container p-5"
                                onClick={()=>value.handleDetail(id)}
                            >
                                <Link to="/details">
                                    <img src={img} alt="Product" className="card-img-top" />
                                </Link>
                                <button className="cart-btn" disabled={inCart ? true : false} onClick={() => { value.addToCart(id);
                                            value.openModal(id);
                                            
                                             }}>
                                    {inCart ? (<p className="text-capitalize mb-0" disabled>
                                        {""}
                                        inCart

                                        </p>)
                                        : (
                                            <i className="fas fa-cart-plus" />
                                        )
                                    }
                                </button>
                            </div>


                        )}

                    
                    </ProductsConsumer>

                        <div className="card-footer d-flex justify-content-between">
                            <p className="align-self-center mb-0 main-Blue">{title}</p>
                                <h5 className="text-blue font-italic mb-0">
                                    <span className="mr-1">$</span>
                                    {price}
                                </h5>
                        </div>
                </div>
            </ProductsWrapper>
        );
    }
}

export default Products;

const ProductsWrapper = styled.div`
.card{
    border-color:transparent;
    transition: all 1s Linear;
}
.card-footer{
    border-color:transparent;
    border-top:transparent;
    transition:all 1s Linear;
}
&:hover{
    .card{
        border:0.04rem solid rgba(0,0,0,0.2);
        box-shadow:2px 2px 5px 0px rgba(0,0,0,0.2);
    }
    .card-footer{
           background:rgba(247,247,247);
    }
}
.img-container{
    position:relative;
    overflow:hidden;
}
.card-img-top{
    transition:all 1s Linear;
}
.img-container:hover .card-img-top{
    transform: scale(1.2);
}
.cart-btn{
    position:absolute;
    bottom:0;
    right:0;
    padding:0.2rem 0.4rem;
    background:var(--lightBlue);
    color:var(--mainWhite);
    font-size:1.4rem;
    border:none;
    border-radius:0.5rem 0 0 0;
    transform:translate(100%,100%);
    transition:all 1s Linear;


}
.img-container:hover .cart-btn{
    transform:translate(0,0);
}
.cart-btn:hover{
    color:var(--mainBlue);
    cursor:pointer;
}
`;