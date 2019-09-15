package com.sap.Bill_Tracker.repository;

import org.springframework.data.repository.CrudRepository;

import com.sap.Bill_Tracker.models.Bill;

public interface BillRepository  extends CrudRepository<Bill, Long>{

}
