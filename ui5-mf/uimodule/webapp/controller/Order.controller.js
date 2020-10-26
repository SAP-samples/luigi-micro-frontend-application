sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function(Controller) {
  "use strict";

  return Controller.extend("luigi.ui5.controller.Order", {
    onInit: function (Controller) {
      const updateCurrentLanguage = () => {
        const currentLanguage = LuigiClient.uxManager().getCurrentLocale();
        sap.ui.getCore().getConfiguration().setLanguage(currentLanguage);
      }

      LuigiClient.addInitListener(updateCurrentLanguage);

      const oModel = new sap.ui.model.json.JSONModel();

      oModel.loadData("../model/products.json");
      this.getView().setModel(oModel);
    },
    
    onListItemPress: function (oEvent) {
      const id = oEvent.getSource().getBindingContext().getProperty("id");
 
      LuigiClient.linkManager().openAsModal('/home/products/' + id , {title:'Product Detail', size:'m'});
		}
  });
});
