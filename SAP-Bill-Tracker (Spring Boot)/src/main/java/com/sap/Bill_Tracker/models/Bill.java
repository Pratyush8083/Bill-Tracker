package com.sap.Bill_Tracker.models;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;


import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.Getter;

import lombok.AllArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString

public class Bill {
	
	@Id
	@Column(name ="id", unique=true)
	private long id;
	@Column(name ="date")
	private String date;
	@Column(name ="month")
	private String month;
	@Column(name ="amount")
	private String amount;
	
	public long getId()
	{
		return id;
	}

}
