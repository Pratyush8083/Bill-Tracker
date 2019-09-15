sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
], function (Controller, History, JSONModel) {
	"use strict";

	return Controller.extend("SAP-Bill-Tracker.SAP-Bill-Tracker.controller.View1", {
		onInit: function () {
			var oVizFrame = this.getView().byId("idcolumn");
			
			var myModel = new JSONModel();
			//var that = this;
			
			jQuery.ajax({
				type: "GET",
				contentType: "application/json",
				dataType: "json",
				url: "/Model/bill/all",
				async: false, 
				success: function(data, textStatus, jqXHR) {
				myModel.setData(data);
				}
				/*,
				 error : function(jqXHR,textStatus,errorThrown) {
					alert("error is: " + errorThrown + ", " + textStatus);
    			}*/
			
			});
			
			this.getView().setModel(myModel);
			
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({
				dimensions : [{
					name : "Months (2019)",
					value : "{month}"
				}],
				measures : [{
					name : "Expenditure (in Rs.)",
					value : "{amount}"
				}],
				data : {
					path : "/"
				}
			});
			
			oVizFrame.setDataset(oDataset);
			oVizFrame.setVizType("bar");
			
			//Set Viz Properties
			oVizFrame.setVizProperties({
				plotArea : {
					colorPalette : d3.scale.category20().range()		
				},
				title : {
					visible : "true",
					text : "Expenditure Graph"
				}
			});
			
			var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
				"uid" : "valueAxis",
				"type" : "Measure",
				"values" : ["Expenditure (in Rs.)"]
			}),
			
			feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
				"uid" : "categoryAxis",
				"type" : "Dimension",
				"values" : ["Months (2019)"]
			});
			
			oVizFrame.addFeed(feedValueAxis);
			oVizFrame.addFeed(feedCategoryAxis);
		},
	
	  onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("overview", true);
			}
		}
	});
});