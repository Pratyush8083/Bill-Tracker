package com.sap.Bill_Tracker.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sap.Bill_Tracker.models.Bill;
import com.sap.Bill_Tracker.services.BillService;

@RestController

public class BillController {
	
Logger log = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private BillService billService;
	
	@RequestMapping("/bill/all")
	public List<Bill> getAllBills(){
		log.info("Searching all employees");
		return billService.findAllBill();
	}
	
	@RequestMapping(method=RequestMethod.POST, value = "/bill/add")
	public boolean addBill(@RequestBody Bill bill) {
		
		log.info("Creation/Updating Employee - "+bill.toString());
		return billService.insertBill(bill);
	}
	
	@RequestMapping(method=RequestMethod.POST, value = "/bill/delete")
	public boolean deleteBill(@RequestBody Bill bill) {
		long id=bill.getId();
		return billService.deleteBill(id);
	}
	
}
