import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './views/home.js';
import Product from './views/product.js';
import ProductDetail from './views/productDetail';
import { addInitListener } from '@luigi-project/client';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    addInitListener(() => {
      console.log('Luigi Client initialized.');
    });
  }
  render() {
    return (
      <BrowserRouter basename={`sampleapp.html#`}>
        <Route path="/home" component={Home} />
        <Route path="/product" component={Product} />
        <Route path='/productDetail/:id' component={ProductDetail} />
      </BrowserRouter>
    );
  }
}

render(<App />, document.getElementById('root'));
