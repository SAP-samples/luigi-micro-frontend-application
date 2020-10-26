import React, { Component } from 'react';
import { render } from 'react-dom';
import { addInitListener, addContextUpdateListener, uxManager } from '@luigi-project/client';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './views/Home.jsx';
import { Products } from './views/Products.jsx';
import { ProductDetail } from './views/ProductDetail.jsx';
import { dict } from './language.js';
import './index.css';
class App extends Component {
 constructor(props) {
   super(props);
   this.state = { currentLocale : 'en-US' };

   const updateCurrentLanguage = () =>{
      this.setState({
        currentLocale: uxManager().getCurrentLocale()
      });
   };
   addInitListener(() => {
     console.log('Luigi Client initialized.');
     updateCurrentLanguage();
   });
   addContextUpdateListener(()=>{
      updateCurrentLanguage();
   });
 }
 render() {
   return (
     <Router basename={`/app.html#`}>
       <Route path="/home" render={(props) => <Home {...props} localeDict={dict[this.state.currentLocale]} currentLocale={this.state.currentLocale} />} />
       <Route path="/products" render={(props) => <Products {...props} localeDict={dict[this.state.currentLocale]} />} />
       <Route path="/productDetail/:id" render={(props) => <ProductDetail {...props} localeDict={dict[this.state.currentLocale]} />} />
     </Router>
   );
 }
}
 
render(<App />, document.getElementById('root'));