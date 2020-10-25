import React from 'react';
import { List } from './List.jsx';
import { ProductCollection } from '../../../ui5-mf/uimodule/webapp/model/products.json';
import { LayoutPanel, LayoutGrid } from 'fundamental-react';

export const Products = ({ localeDict }) => (
    <section className="fd-section">
        <LayoutPanel>
            <LayoutPanel.Header>
                <h3>{localeDict.ITEMS} ({ProductCollection.length})</h3>
            </LayoutPanel.Header>
            <LayoutPanel.Body>
                <LayoutGrid cols={2}>
                    <List items={ProductCollection} localeDict={localeDict} />
                </LayoutGrid>
            </LayoutPanel.Body>
        </LayoutPanel>
    </section>
);

export default Products;
