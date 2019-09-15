  
package com.sap.Bill_Tracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class Bill_Tracker{

	public static void main(String[] args) {
		SpringApplication.run(Bill_Tracker.class, args);
	}

}