import React, { Component, useState } from 'react';
import '../../node_modules/fundamental-styles/dist/fundamental-styles.css';
import {
  addInitListener,
  addContextUpdateListener,
  removeContextUpdateListener,
  removeInitListener,
  sendCustomMessage
} from '@luigi-project/client';
import { Title, Grid, Panel, Select, Option, } from '@ui5/webcomponents-react';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.locale = null;
    this.initListener = null;
    this.contextUpdateListener = null;
    this.locale = props.currentLocale;
    this.setLocale = null;
    this.options = [{ key: 'en-US', text: 'en-US' }, { key: 'de-DE', text: 'de-DE' }];
  }

  componentDidMount() {
    this.initListener = addInitListener(initialContext => {
      this.setState({
        message: 'Luigi Client initialized.'
      });
    });

    this.contextUpdateListener = addContextUpdateListener(updatedContext => {
      this.setState({
        message: 'Luigi Client updated.'
      });
    });
  }

  componentWillUnmount() {
    removeContextUpdateListener(this.contextUpdateListener);
    removeInitListener(this.initListener);
  }

  onChangeValue(event) {
    this.locale = event.detail.selectedOption.innerText;
    sendCustomMessage({ id: 'set-language', 'locale': event.detail.selectedOption.innerText })
  }

  render() {
    return (
      <Grid position="Center" defaultIndent="XL1 L1 M1 S1" defaultSpan="XL10 L10 M10 S10">
        <Panel headerText={this.props.localeDict.WELCOME_LUIGI} headerLevel="H3">
          <Select onChange={this.onChangeValue}>
            {this.options.map((language) => (
              <Option key={language.key}>
                {language.text}
              </Option>
            ))}
          </Select>
        </Panel>
      </Grid>
    );
  }

}


