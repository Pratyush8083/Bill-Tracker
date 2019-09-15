sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";
	var oModel;
	return Controller.extend("SAP-Bill-Tracker.SAP-Bill-Tracker.controller.App", {
		
		onInit: function () 
		{
			//this.byId("b_date").setMinDate(new Date());
			this.byId("b_date").setMaxDate(new Date());
			
			 oModel = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(oModel);
			
			jQuery.ajax({
				type: "GET",
				contentType: "application/json",
				dataType: "json",
				url: "/Model/bill/all",
				async: false, 
				success: function(data, textStatus, jqXHR) {
				oModel.setData(data);
				}
			});
		
			this.getView().byId("myTable").setModel(oModel);
		},
		
		
		onSave: function()
		{
			// Get the values of the header input fields
			var bNum = this.getView().byId("b_num").getValue();
			var bDate = this.getView().byId("b_date").getValue();
			var mDate=new Date(bDate);
			var month_num=mDate.getMonth();
			var bMonth;
			switch (month_num)
			{
				case 0: bMonth = "Jan"; break;
				case 1: bMonth = "Feb"; break;
				case 2: bMonth = "Mar"; break;
				case 3: bMonth = "Apr"; break;
				case 4: bMonth = "May"; break;
				case 5: bMonth = "Jun"; break;
				case 6: bMonth = "Jul"; break;
				case 7: bMonth = "Aug"; break;
				case 8: bMonth = "Sep"; break;
				case 9: bMonth = "Oct"; break;
				case 10: bMonth = "Nov"; break;
				case 11: bMonth = "Dec"; break;
			}
			var bAmount = this.getView().byId("b_amount").getValue();
			
			if (bNum === "" || bDate === "" || bAmount === "") {
				sap.m.MessageToast.show("Input cannot be blank!");
			}
			else
			{
				// Push this entry into array and bind it to the table
				var oEntry = {
				id : bNum,
				date : bDate,
				month : bMonth,
				amount: bAmount
				};
				 $.ajax({
							  type: "POST",
							  
							  url: "/Model/bill/add",
							  dataType: "json", 
				              data: JSON.stringify(oEntry),
				              contentType: "application/json" ,
							  success: function() {  
								  sap.m.MessageToast.show("Bill Added Successfully");
							
		                      },
							  
				                error: function() {  
				                	sap.m.MessageToast.show("Error while adding the bill");
				                }  
							});
				
				// Clear the input fields.
				this.getView().byId("b_num").setValue("");
				this.getView().byId("b_date").setValue("");
				this.getView().byId("b_amount").setValue("");
				
			}
		},
		
		onRefresh: function()
		{
				
			
			jQuery.ajax({
				type: "GET",
				contentType: "application/json",
				dataType: "json",
				url: "/Model/bill/all",
				async: false, 
				success: function(data, textStatus, jqXHR) {
				oModel.setData(data);
				}
			});
			sap.ui.getCore().byId("myTable").getModel().refresh(true);
		},
		
		onDelete: function()
		{
			
			var del_id = this.getView().byId("b_num_del").getValue();
			var oEntry = {
				id : del_id,
				date : "",
				month : "",
				amount: 0
				};
			$.ajax({
							  type: "POST",
							  
							  url: "/Model/bill/delete",
							  dataType: "json", 
				              data: JSON.stringify(oEntry),
				              contentType: "application/json" ,
							  success: function() {  
								  sap.m.MessageToast.show("Deleted Successfully");
		                      },
							  
				                error: function() {  
				                	sap.m.MessageToast.show("Error while deleting the bill");
				                }  
							});
			this.getView().byId("b_num_del").setValue("");
		},
		
		onPress: function(oEvent)
		{
			  var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			  oRouter.navTo("View1");
		}
	});
});