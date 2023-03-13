import React, { useEffect, useState, useRef } from 'react';
import "../../node_modules/fundamental-styles/dist/fundamental-styles.css";
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import {
    Grid, ObjectPage, Label, DynamicPageHeader, DynamicPageTitle, ObjectStatus, FlexBox, Button, Toast, ObjectPageSection, FormItem, Form, Text, Bar
} from "@ui5/webcomponents-react";
import { linkManager, getContext } from "@luigi-project/client";
import { ProductCollection } from "../assets/products.js";

const ProductDetail = (props) => {
    const [currentProduct, setCurrentProduct] = useState({});
    const [availability, setAvailability] = useState({
        state: "Warning",
        text: props.localeDict.OUTOFSTOCK
    });
    const toast = useRef(null);

    useEffect(() => {
        setProductAndAvailability();
    }, []);

    function setProductAndAvailability() {
        // get id from Luigi Client getContext API
        const id = getContext().id;

        let product = ProductCollection.find(
            (product) => product.id.toString() === id
        ) || ProductCollection[0]

        setCurrentProduct(product);
        currentProduct.stock ? setAvailability({ state: "Success", text: props.localeDict.AVAILABLE }) : ""
    }

    // Use Luigi Client linkManager API to navigate to the previous microfrontend
    function navBack() {
        // checks if there is a previous view in history
        if (linkManager().hasBack()) {
            // navigates to the previously openend microfrontend
            linkManager().goBack();
        } else {
            // navigates to the products page directly
            linkManager().navigate("/home/products");
        }
    };

    return (
        <Grid position="Center" defaultIndent="XL1 L1 M1 S1" defaultSpan="XL10 L10 M10 S10">
            <ObjectPage
                headerContent={
                    <DynamicPageHeader>
                        <FlexBox alignItems="Center" wrap="Wrap">
                            <FlexBox direction="Column" style={{ padding: "10px" }}>
                                <Label>
                                    {props.localeDict.AVAILABLEQUANT + currentProduct.stock}
                                </Label>
                            </FlexBox>
                        </FlexBox>
                    </DynamicPageHeader>
                }
                footer={
                    <Bar design="FloatingFooter"
                        endContent={
                            <>
                                <Button design="Emphasized" onClick={() => { toast.current.show() }}>
                                    {props.localeDict.ADDTOCART}
                                </Button>
                                <Button design="Default" onClick={navBack}>
                                    {props.localeDict.BACK}
                                </Button>
                            </>
                        }
                    />
                }
                headerContentPinnable
                headerTitle={
                    <DynamicPageTitle
                        actions={
                            <>
                                <Toast ref={toast}>
                                    {props.localeDict.PRODUCTADDED}
                                </Toast>
                                <Button design="Emphasized" onClick={() => { toast.current.show() }}>
                                    {props.localeDict.ADDTOCART}
                                </Button>
                                <Button onClick={navBack}>
                                    {props.localeDict.BACK}
                                </Button>
                            </>
                        }
                        header={currentProduct.name}
                    >
                        <ObjectStatus state={availability.state}>
                            {availability.text}
                        </ObjectStatus>
                    </DynamicPageTitle>
                }
                onSelectedSectionChange={function noRefCheck() { }}
                selectedSectionId="details"
                showHideHeaderButton
                style={{
                    height: "700px",
                }}
            >
                <ObjectPageSection aria-label="Details" id="details" titleText="Details">
                    <Form columnsL={2} columnsM={2} columnsXL={3} labelSpanL={1} labelSpanM={1} labelSpanXL={1}>
                        <FormItem label="Name">
                            <Text>{currentProduct.name}</Text>
                        </FormItem>
                        <FormItem label={props.localeDict.DESCRIPTION}>
                            <Text>{currentProduct.description}</Text>
                        </FormItem>
                        <FormItem label={props.localeDict.PRICE}>
                            <Text>
                                {currentProduct.price + " " + currentProduct.currencyCode}
                            </Text>
                        </FormItem>
                    </Form>
                </ObjectPageSection>
            </ObjectPage>
        </Grid>
    );
};

export default ProductDetail;
