sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/UIComponent",
  "sap/ui/core/routing/History"
], function (Controller, UIComponent, History) {
  "use strict";

  return Controller.extend("luigi.ui5.controller.BaseController", {
    getOwnerComponent: function() {
      return Controller.prototype.getOwnerComponent.call(this);
    },
    getRouter: function() {
      return UIComponent.getRouterFor(this);
    },
    getResourceBundle: function() {
      const oModel = this.getOwnerComponent().getModel("i18n");
      return oModel.getResourceBundle();
    },
    getModel: function(sName) {
      return this.getView().getModel(sName);
    },
    setModel: function(oModel, sName) {
      this.getView().setModel(oModel, sName);
      return this;
    },
    navTo: function(sName, oParameters, bReplace) {
      this.getRouter().navTo(sName, oParameters, undefined, bReplace);
    },
    onNavBack: function() {
      const sPreviousHash = History.getInstance().getPreviousHash();
      if (sPreviousHash !== undefined) {
        window.history.go(-1);
      } else {
        this.getRouter().navTo("main", {}, undefined, true);
      }
    }
  });

});
