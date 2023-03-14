import React, { useState, useEffect } from 'react';
import "fundamental-styles/dist/fundamental-styles.css";
import { addInitListener, addContextUpdateListener, removeContextUpdateListener, removeInitListener, sendCustomMessage } from "@luigi-project/client";
import { Grid, Panel, Select, Option } from "@ui5/webcomponents-react";


const Home = (props) => {
  const [options] = useState([{ key: 'en-US', text: 'en-US' }, { key: 'de-DE', text: 'de-DE' }]);

  function onChangeValue(event) {
    sendCustomMessage({
      id: "set-language",
      locale: event.detail.selectedOption.innerText,
    });
  }

  return (
    <Grid position="Center" defaultIndent="XL1 L1 M1 S1" defaultSpan="XL10 L10 M10 S10">
      <Panel headerText={props.localeDict.WELCOME_LUIGI} headerLevel="H3">
        <Select onChange={onChangeValue}>
          {options.map((language) => (
            <Option key={language.key}>{language.text}</Option>
          ))}
        </Select>
      </Panel>
    </Grid>
  );
};

export default Home;
