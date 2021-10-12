import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './views/home.js';
import Products from './views/products.js';
import ProductDetail from './views/productDetail';
import { addInitListener, addContextUpdateListener, uxManager } from '@luigi-project/client';
import { dict } from './language.js';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currentLocale: 'en-US' };
    const updateCurrentLanguage = () => {
      this.setState({
        currentLocale: uxManager().getCurrentLocale()
      });
    };
  
    addInitListener(() => {
      console.log('Luigi Client initialized.');
      updateCurrentLanguage();
    });

    addContextUpdateListener(() => {
      updateCurrentLanguage();
    });
  }
  
  render() {
    return (
      <BrowserRouter basename={`sampleapp.html#`}>
        <Route path="/home" render={(props) => <Home {...props} localeDict={dict[this.state.currentLocale]} currentLocale={this.state.currentLocale} />} />
        <Route path="/products" render={(props) => <Products {...props} localeDict={dict[this.state.currentLocale]} />} />
        <Route path='/productDetail/:id' render={(props) => <ProductDetail {...props} localeDict={dict[this.state.currentLocale]} />} />
      </BrowserRouter>
    );
  }
}

render(<App />, document.getElementById('root'));
