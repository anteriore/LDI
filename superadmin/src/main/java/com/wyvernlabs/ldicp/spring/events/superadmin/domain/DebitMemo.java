package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import javax.persistence.Entity;
import javax.persistence.PrePersist;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class DebitMemo extends MemoSlip{

	@PrePersist
	@Override
	public void updateBalance() {
		super.getReference().deductFromRemainingBalance(super.getAmount());
	}
	
}
