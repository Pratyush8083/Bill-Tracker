package com.sap.Bill_Tracker.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sap.Bill_Tracker.models.Bill;
import com.sap.Bill_Tracker.repository.BillRepository;

@Service
public class BillService {
	
	@Autowired
	private BillRepository billRepository;
	
	public List<Bill> findAllBill(){
		List<Bill> bill = new ArrayList<>();
		billRepository.findAll().forEach(bill::add);
		return bill;
	}
	
	public boolean insertBill(Bill bill) {
		 try {
			billRepository.save(bill);
			return true;
		 	} 
		 catch (Exception e) {
			return false;
			}
		}
	public boolean deleteBill(long id) {
		Bill bill = billRepository.findById(id).orElse(null);
		if(bill!=null) {
			billRepository.delete(bill);
			return true;
		}
		return false;
	}

}
