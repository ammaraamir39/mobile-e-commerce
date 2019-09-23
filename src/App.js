import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Switch,Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './Components/Navbar';
import ProductsList from './Components/ProductsList';
import Details from './Components/Details';
import Cart from './Components/Cart/Cart';
import Default from './Components/Default';
import Modal from './Components/Modal';


function App() {
  return (
   <React.Fragment>
     <Navbar/>
      <Switch>
          <Route exact path="/" component={ProductsList}/>
          <Route path="/details" component={Details}/>
          <Route path="/cart" component={Cart}/>

          <Route component={Default} />
      </Switch>
    <Modal/>
    
   </React.Fragment>
  );
}

export default App;
