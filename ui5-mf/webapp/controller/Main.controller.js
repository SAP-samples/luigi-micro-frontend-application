// First step Tutorial: No Localization
// sap.ui.define(["luigi/ui5/controller/BaseController"], function (Controller) {
//   "use strict";

//   return Controller.extend("luigi.ui5.controller.Main", {
//     onInit: function (Controller) {
//       const oModel = new sap.ui.model.json.JSONModel();

//       oModel.loadData("../model/products.json");
//       this.getView().setModel(oModel);
//     },

//     onListItemPress: function (oEvent) {
//       const id = oEvent.getSource().getBindingContext().getProperty("id");

//       LuigiClient.linkManager().openAsModal('/home/products/' + id, { title: 'Product Detail', size: 'm' });
//     }
//   });
// });

// Second step Tutorial: Localization
sap.ui.define(["luigi/ui5/controller/BaseController"], function (Controller) {
  "use strict";

  return Controller.extend("luigi.ui5.controller.MainView", {
    onInit: function (Controller) {
      const oModel = new sap.ui.model.json.JSONModel();

      oModel.loadData("../model/products.json");
      this.getView().setModel(oModel);
      //THIS HAS BEEN ADDED - TO UPDATE THE CURRENT LANGUAGE
      const updateCurrentLanguage = () => {
        const currentLanguage = LuigiClient.uxManager().getCurrentLocale();
        sap.ui.getCore().getConfiguration().setLanguage(currentLanguage);
      }
      //THIS HAS BEEN ADDED - LISTENER FOR LANGUAGE CHANGES
      LuigiClient.addInitListener(updateCurrentLanguage);
    },

    onListItemPress: function (oEvent) {
      const id = oEvent.getSource().getBindingContext().getProperty("id");
      // GETTING TRANSLATED TITLE TEXT FOR THE MODAL TITLE
      const title = this.getView().getModel("i18n").getResourceBundle().getText("ModalText");

      LuigiClient.linkManager().openAsModal('/home/products/' + id, { title: title, size: 'm' });
    }
  });
});