import React from 'react';
import { MessageStrip, Avatar, LayoutPanel, LayoutGrid } from 'fundamental-react';
import { linkManager } from '@luigi-project/client';

const navigateToDetail = (id) => linkManager().navigate('/home/products/' + id);
const panelStyle = { cursor: 'pointer' };

export const List = ({ items, localeDict }) => (
   (items.length === 0) ? <MessageStrip type='error'>{ localeDict.NO_AVAILABLE_PRODUCT }</MessageStrip>
   : items.map(({id, name, price, icon, stock}) => {
       return (
            <LayoutPanel key={id} style={panelStyle} onClick={()=>navigateToDetail(id)}>
                <LayoutPanel.Header>
                    <LayoutPanel.Head  title={name} />
                </LayoutPanel.Header>
                <LayoutPanel.Body>
                    <LayoutGrid cols={2}>
                        <div>
                            <div>{ localeDict.PRICE }: &euro;{price}</div>
                            <div>{ localeDict.STOCKS }: {stock}</div>
                        </div>
                        <div><Avatar circle glyph={icon} size='s' /></div>
                    </LayoutGrid>
                </LayoutPanel.Body>
            </LayoutPanel>
       )
   })
);
