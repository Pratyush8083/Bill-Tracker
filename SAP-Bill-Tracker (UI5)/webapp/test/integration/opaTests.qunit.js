/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"SAP-Bill-Tracker/SAP-Bill-Tracker/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});