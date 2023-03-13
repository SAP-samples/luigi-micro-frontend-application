sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"./model/models"
  ], function (UIComponent, Device, models) {
	"use strict";
  
	return UIComponent.extend("luigi.ui5.Component", {
	  metadata: {
		manifest: "json"
	  },
	  init: function() {
		// call the base component's init function
		UIComponent.prototype.init.call(this); // create the views based on the url/hash
  
		// create the device model
		this.setModel(models.createDeviceModel(), "device");

		this.getRouter().initialize();
	  },
	  getContentDensityClass: function() {
		if (this.contentDensityClass === undefined) {
		  // check whether FLP has already set the content density class; do nothing in this case
		  if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
			this.contentDensityClass = "";
		  } else if (!Device.support.touch) {
			// apply "compact" mode if touch is not supported
			this.contentDensityClass = "sapUiSizeCompact";
		  } else {
			// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
			this.contentDensityClass = "sapUiSizeCozy";
		  }
		}
  
		return this.contentDensityClass;
	  }
	});
  
  });
  