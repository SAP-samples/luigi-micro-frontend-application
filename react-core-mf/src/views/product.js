import React, { Component } from 'react';
import '../../node_modules/fundamental-styles/dist/fundamental-styles.css';
import { ProductCollection } from '../../../ui5-mf/luigi.ui5/uimodule/webapp/model/products.json'
import { Grid, List, StandardListItem } from '@ui5/webcomponents-react';
import { linkManager } from '@luigi-project/client';
import '@ui5/webcomponents-icons/dist/AllIcons.js'


export default class Product extends Component {

  render() {

    const handleItemClick = event => {
      console.log(event.detail.item.id);
      linkManager().navigate('/home/product/' + event.detail.item.id.toString());
    };

    const listItems = [];  
    ProductCollection.forEach(product => {
      listItems.push(
      <StandardListItem 
        id={product.id}
        key={product.id}
        additionalText={product.price + " " + product.currencyCode}
        additionalTextState="Information"
        description={product.description}
        growing="None"
        headerText={product.orderQuantity}
        icon={product.icon}
        type="Active"
        mode="None"
        onItemClick={() => handleItemClick(product.id)}>
          <p onClick={() => handleChildClick(product.id)}>
            {product.name}
          </p>
      </StandardListItem>)
    });

    return (
      <Grid position="Center" defaultIndent="XL1 L1 M1 S1" defaultSpan="XL10 L10 M10 S10">
        <List headerText="List with a customizable StandardListItem" onItemClick={handleItemClick}>
        {listItems}
        </List>
      </Grid>

    );
  }
}
