import React, { Component } from 'react';
import {storeProducts , detailProduct } from './data';


const ProductContext=React.createContext();




class ProductsProvider extends Component {
  state={
    products:[],
    detailProducts:detailProduct,
    cart:[],
    modalOpen:false,
    modalProduct:detailProduct,
    cartSubTotal:0,
    cartTotal:0,
    cartTax:0
  };
  componentDidMount(){
    this.setProducts();
  }
  setProducts= () =>{
    let products=[];
    storeProducts.forEach(item=>{
      const singleItem={...item};
      products=[...products,singleItem];

    })
    this.setState(()=>{
      return {products};
    });
  };
  getItem=(id)=>{
    const product=this.state.products.find(item=>
        item.id===id
    );
    return product;
  }

  handleDetail=(id)=>{
    const product=this.getItem(id);
    this.setState(()=>{
      return {detailProducts:product};
    })
  }

  addToCart=(id)=>{
    const tempProducts=[...this.state.products];
    const index=tempProducts.indexOf(this.getItem(id));
    const product=tempProducts[index];
    product.inCart=true;
    product.count=1;
    const price=product.price;
    product.total=price;

    this.setState(()=>{
      return { products: tempProducts, cart:[...this.state.cart,product]} 
    },
      ()=>{
        this.addTotals();
      }
    );

  };

  openModal=(id)=>{
    const product=this.getItem(id);
    this.setState(()=>{
      return {modalProduct:product,modalOpen:true};
      
    })

  }
  closeModal=()=>{
    this.setState(()=>{
      return {modalOpen:false};
    }
    )
  }
  increment=(id)=>{
    let tempCart=[...this.state.cart];
    const selectedProduct=tempCart.find(item=>item.id===id)
    const index= tempCart.indexOf(selectedProduct);

    const product=tempCart[index];

    product.count=product.count+1;
    product.total=product.count* product.price;

    this.setState(()=>{
      return{
        cart:[...tempCart]
      }
    },()=>{
      this.addTotals();
    })
  }
  
  decrement=(id)=>{
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id)
    const index = tempCart.indexOf(selectedProduct);

    const product = tempCart[index];

    product.count=product.count-1;

    if(product.count === 0 ){
      this.removeItem(id);
    }
    else{
      product.total=product.count*product.price;
    }

    this.setState(() => {
      return {
        cart: [...tempCart]
      }
    }, () => {
      this.addTotals();
    })

  }
removeItem=(id)=>{
  let tempProducts=[...this.state.products];
  let tempCart=[...this.state.cart];

  tempCart=tempCart.filter(item=>item.id!==id);

  const index=tempProducts.indexOf(this.getItem(id));
  let removedProduct=tempProducts[index];
  removedProduct.inCart=false;
  removedProduct.count=0;
  removedProduct.total=0;

console.log('removed')

  this.setState(()=>{
    return{
      cart:[...tempCart],
      products:[...tempProducts]
    

    };

  },()=>{
    this.addTotals();
      console.log('state got removed')
  })

}
clearCart=()=>{
  this.setState(()=>{
    return {
      cart:[]
    }
  },()=>{
    this.setProducts();
    this.addTotals();
  })
}
addTotals=()=>{
  let subTotal=0;
  this.state.cart.map(item=>(subTotal+=item.total));
  const tempTax=subTotal*0.1;
  const tax= parseFloat(tempTax.toFixed(2));
  const total=subTotal+tax;
  this.setState(()=>{
   return{
     cartSubTotal: subTotal,
     cartTotal: total,
     cartTax: tax

   }   })

}

  render() {
    return (
      <ProductContext.Provider value={{
        ...this.state,
        handleDetail:this.handleDetail,
        addToCart:this.addToCart,
        openModal:this.openModal,
        closeModal:this.closeModal,
        increment:this.increment,
        decrement:this.decrement,
        clearCart:this.clearCart,
        removeItem:this.removeItem
      }}> 
            {this.props.children}      
     </ProductContext.Provider>
    );
  }
}

const ProductsConsumer=ProductContext.Consumer;

export {ProductsConsumer, ProductsProvider}