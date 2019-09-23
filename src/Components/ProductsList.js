import React, { Component } from 'react';
import Title from './Title';
import { ProductsConsumer } from '../Context';
import Products from './Products';

class ProductsList extends Component {
   
   
    render() {
        
        return (
            <React.Fragment>
                {/* <Products/> */}
                <div className="py-5">
                    <div className="container">
                            <Title name="our" title="products"/>
                        <div className="row">
                            <ProductsConsumer>
                                {value=>{
                                    return value.products.map((product)=>{
                                     return  <Products key={product.id} product={product}/>;

                                    });
                                }}
                            </ProductsConsumer>    
                        </div>

                        
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ProductsList;