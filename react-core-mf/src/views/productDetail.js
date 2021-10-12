import React, { Component, useRef, useState } from "react";
import "../../node_modules/fundamental-styles/dist/fundamental-styles.css";
import { ProductCollection } from "../../../ui5-mf/uimodule/webapp/model/products.json";
import {
  Grid,
  ObjectPage,
  Label,
  DynamicPageHeader,
  DynamicPageTitle,
  ObjectStatus,
  FlexBox,
  Button,
  Toast,
  ObjectPageSection,
  FormItem,
  Form,
  Text,
  ObjectPageSubSection,
  Bar
} from "@ui5/webcomponents-react";
import { linkManager } from "@luigi-project/client";
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import { render } from "react-dom";

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.toast = React.createRef();
  }

  render() {
    console.log(linkManager().hasBack())
    const id = linkManager().currentContext.context.id;
    let product = ProductCollection.find(
      (product) => product.id.toString() === id
    );
    
    if(!product) {
      product = ProductCollection[0];
    }

    const showToast = () => {
      this.toast.current.show();
    };
  
    const navBack = () => {
      if(linkManager().hasBack()) {
        linkManager().goBack();
      } else {
        linkManager().navigate("/home/products");
      }
    };
  
    const icon = () => {
      return (
        <ui5-icon class="samples-margin" name={product.icon} style={{ width: "3rem", height: "3rem" }}></ui5-icon>
      );
    };
  
    let availability = {
      state: "Warning",
      text: this.props.localeDict.OUTOFSTOCK,
    };
  
    if (product.stock) {
      availability.state = "Success";
      availability.text = this.props.localeDict.AVAILABLE;
    }

    return (
      <Grid position="Center" defaultIndent="XL1 L1 M1 S1" defaultSpan="XL10 L10 M10 S10">
        <ObjectPage headerContent={
            <DynamicPageHeader>
              <FlexBox alignItems="Center" wrap="Wrap">
                <FlexBox direction="Column" style={{ padding: "10px" }}>
                  <Label>{this.props.localeDict.AVAILABLEQUANT + product.stock}</Label>
                </FlexBox>
              </FlexBox>
            </DynamicPageHeader>}
          footer={<Bar design="FloatingFooter" endContent={
                <>
                  <Button design="Emphasized" onClick={showToast}>{this.props.localeDict.ADDTOCART}</Button>
                  <Button design="Default" onClick={navBack}>{this.props.localeDict.BACK}</Button>
                </>
              }/>}
          headerContentPinnable
          headerTitle={<DynamicPageTitle actions={
                <>
                  <Toast ref={this.toast}>{this.props.localeDict.PRODUCTADDED}</Toast>
                  <Button design="Emphasized" onClick={showToast}>
                    {this.props.localeDict.ADDTOCART}
                  </Button>
                  <Button onClick={navBack}>{this.props.localeDict.BACK}</Button>
                </>
              }
              header={product.name}>
              <ObjectStatus state={availability.state}>
                {availability.text}
              </ObjectStatus>
            </DynamicPageTitle>
          }
          image={icon()}
          imageShapeCircle
          onSelectedSectionChange={function noRefCheck() {}}
          onSelectedSectionChanged={null}
          selectedSectionId="details"
          showHideHeaderButton
          style={{
            height: "700px",
          }}>
          <ObjectPageSection aria-label="Details" id="details" titleText="Details">
            <ObjectPageSubSection aria-label="Details" id="details-subsection" titleText="Details">
              <Form columnsL={2} columnsM={2} columnsXL={3} labelSpanL={1} labelSpanM={1} labelSpanXL={1}>
                <FormItem label="Name">
                  <Text>{product.name}</Text>
                </FormItem>
                <FormItem label={this.props.localeDict.DESCRIPTION}>
                  <Text>{product.description}</Text>
                </FormItem>
                <FormItem label={this.props.localeDict.PRICE}>
                  <Text>{product.price + " " + product.currencyCode}</Text>
                </FormItem>
              </Form>
            </ObjectPageSubSection>
          </ObjectPageSection>
        </ObjectPage>
      </Grid>
    );
  }
   
}