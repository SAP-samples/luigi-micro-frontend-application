import React, { Component, useRef } from "react";
import "../../node_modules/fundamental-styles/dist/fundamental-styles.css";
import { ProductCollection } from "../../../ui5-mf/luigi/ui5/uimodule/webapp/model/products.json";
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

export default function ProductDetail() {
  const id = linkManager().fromContext("product").currentContext.context.id;
  let product = ProductCollection.find(
    (product) => product.id.toString() === id
  );
  
  if(!product) {
    product = ProductCollection[0];
  }
  const toast = useRef();
  const showToast = () => {
    toast.current.show();
  };

  const navBack = () => {
    linkManager().navigate("/home/product");
  };

  const icon = () => {
    return (
      <ui5-icon
        class="samples-margin"
        name={product.icon}
        style={{ width: "3rem", height: "3rem" }}
      ></ui5-icon>
    );
  };

  let availability = {
    state: "Warning",
    text: "Out of stock",
  };

  if (product.stock) {
    availability.state = "Success";
    availability.text = "Available";
  }

  console.log(product);
  return (
    <Grid
      position="Center"
      defaultIndent="XL1 L1 M1 S1"
      defaultSpan="XL10 L10 M10 S10"
    >
      <ObjectPage
        headerContent={
          <DynamicPageHeader>
            <FlexBox alignItems="Center" wrap="Wrap">
              <FlexBox direction="Column" style={{ padding: "10px" }}>
                <Label>Available quantity: {product.stock}</Label>
              </FlexBox>
            </FlexBox>
          </DynamicPageHeader>
        }
        footer={
          <Bar
            design="FloatingFooter"
            endContent={
              <>
                <Button design="Emphasized" onClick={showToast}>Add to cart</Button>
                <Button design="Default" onClick={navBack}>Back</Button>
              </>
            }
          />
        }
        headerContentPinnable
        headerTitle={
          <DynamicPageTitle
            actions={
              <>
                <Toast ref={toast}>The product has been added!</Toast>
                <Button design="Emphasized" onClick={showToast}>
                  Add to cart
                </Button>

                <Button onClick={navBack}>Back</Button>
              </>
            }
            header={product.name}
          >
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
        }}
      >
        <ObjectPageSection
          aria-label="Details"
          id="details"
          titleText="Details"
        >
          <ObjectPageSubSection
            aria-label="Details"
            id="details-subsection"
            titleText="Details"
          >
            <Form
              columnsL={2}
              columnsM={2}
              columnsXL={3}
              labelSpanL={1}
              labelSpanM={1}
              labelSpanXL={1}
            >
              <FormItem label="Name">
                <Text>{product.name}</Text>
              </FormItem>
              <FormItem label="Description">
                <Text>{product.description}</Text>
              </FormItem>
              <FormItem label="Price">
                <Text>{product.price + " " + product.currencyCode}</Text>
              </FormItem>
            </Form>
          </ObjectPageSubSection>
        </ObjectPageSection>
      </ObjectPage>
    </Grid>
  );
}
