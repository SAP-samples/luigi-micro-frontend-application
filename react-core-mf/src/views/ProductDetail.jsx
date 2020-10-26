import React, { useState, useEffect } from 'react';
import { ProductCollection } from '../../../ui5-mf/uimodule/webapp/model/products.json';
import { LayoutPanel, MessageStrip } from 'fundamental-react';

export const ProductDetail = ({ match, localeDict }) => {
  const itemId = parseInt(match.params.id);
  const [item, setItem] = useState(null);

  useEffect(()=> {
      setItem(ProductCollection.find(product => product.id === itemId));
  }, [itemId]);

  const renderDetails = () => (
    <LayoutPanel>
        <LayoutPanel.Header>
            <h1 className="fd-section__title">{item.name}</h1>
        </LayoutPanel.Header>
        <LayoutPanel.Filters>
            <div>{ localeDict.PRICE }: &euro;{ item.price }</div>
            <div>{ localeDict.STOCKS }: { item.stock }</div>
        </LayoutPanel.Filters>
        <LayoutPanel.Body>
            <p>{ item.description }</p>
        </LayoutPanel.Body>
    </LayoutPanel>
  );

  const renderContent = () => {
    if (item === undefined) {
      return <MessageStrip type='error'>{ localeDict.NO_MATCH_PRODUCT }</MessageStrip>;
    }

    return item ? renderDetails() : null;
  }

  return (
    <section className="fd-section">
      { renderContent() }
    </section>
  );
};
