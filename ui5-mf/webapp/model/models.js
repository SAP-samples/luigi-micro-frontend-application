sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/BindingMode",
	"sap/ui/Device"
], function(JSONModel, BindingMode, Device) {
	"use strict";

	return {
		createDeviceModel : () => {
			const oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode(BindingMode.OneWay);
			return oModel;
		}
	};

});
