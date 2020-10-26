import React, { useState } from 'react';
import { LayoutPanel, Select } from 'fundamental-react';
import LuigiClient from '@luigi-project/client';

export const Home = ({ localeDict, currentLocale }) => {
    const [locale, setLocale] = useState(currentLocale);
    const options = [{ key:'en-US', text: 'en-US'}, { key:'de-DE', text: 'de-DE'}];

    const onChangeValue = (event) => {
        setLocale(event.target.textContent);
        LuigiClient.sendCustomMessage({id: 'set-language', 'locale': event.target.textContent})
    }

    return (
        <LayoutPanel>
            <LayoutPanel.Body>
                <h2>{ localeDict.WELCOME_LUIGI }</h2>
                <br/>
                <span style={{marginRight: "12px"}}>{ localeDict.SELECT_LANGUAGE }</span>
                <Select
                    options={options}
                    placeholder={ localeDict.SELECT_LANGUAGE }
                    onSelect={(e) => onChangeValue(e)}
                    selectedKey={locale}
                />
            </LayoutPanel.Body>
        </LayoutPanel>
    );
}
