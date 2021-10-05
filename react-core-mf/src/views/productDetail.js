import React, { Component } from 'react';
import '../../node_modules/fundamental-styles/dist/fundamental-styles.css';
import { ProductCollection } from '../../../ui5-mf/luigi.ui5/uimodule/webapp/model/products.json'
import { Grid, ObjectPage, Link, Label, DynamicPageHeader, DynamicPageTitle, BreadcrumbsItem, ObjectStatus, FlexBox, Button, Breadcrumbs, Bar } from '@ui5/webcomponents-react';
import { linkManager } from '@luigi-project/client';
import '@ui5/webcomponents-icons/dist/AllIcons.js'


export default class ProductDetail extends Component {

  render() {
    const id = linkManager().fromContext('product').currentContext.context.id;
    const product = ProductCollection.find(product => product.id.toString() === id);
    console.log(product)
    return (
      <Grid position="Center" defaultIndent="XL1 L1 M1 S1" defaultSpan="XL10 L10 M10 S10">
        <ObjectPage
          footer={<Bar design="FloatingFooter" endContent={<><Button design="Positive">Accept</Button><Button design="Negative">Reject</Button></>} />}
          headerContent={<DynamicPageHeader><FlexBox alignItems="Center" wrap="Wrap"><FlexBox direction="Column"><Link>+33 6 4512 5158</Link><Link href="mailto:ui5-webcomponents-react@sap.com">DeniseSmith@sap.com</Link><Link href="https://github.com/SAP/ui5-webcomponents-react">https://github.com/SAP/ui5-webcomponents-react</Link></FlexBox><FlexBox direction="Column" style={{ padding: '10px' }}><Label>San Jose</Label><Label>California, USA</Label></FlexBox></FlexBox></DynamicPageHeader>}
          headerContentPinnable
          headerTitle={<DynamicPageTitle actions={<><Button design="Emphasized">Primary Action</Button><Button>Action</Button></>} breadcrumbs={<Breadcrumbs currentLocationText="Employee Details"><BreadcrumbsItem>Manager Cockpit</BreadcrumbsItem><BreadcrumbsItem>My Team</BreadcrumbsItem></Breadcrumbs>} header="Denise Smith" showSubHeaderRight subHeader="Senior UI Developer"><ObjectStatus state="Success">employed</ObjectStatus></DynamicPageTitle>}
          image="static/media/DemoImage.4b12bcf0.png"
          imageShapeCircle
          onSelectedSectionChange={function noRefCheck() { }}
          onSelectedSectionChanged={null}
          selectedSectionId="goals"
          showHideHeaderButton
          style={{
            height: '700px'
          }}
        ></ObjectPage>
      </Grid>
    );
  }
}