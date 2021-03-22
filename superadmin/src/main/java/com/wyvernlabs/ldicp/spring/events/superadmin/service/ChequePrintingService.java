package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ChequePrinting;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.VouchersPayable;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ChequePrintingRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UserRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.VouchersPayableRepository;

@Service
public class ChequePrintingService {
	@Autowired
	private ChequePrintingRepository chequePrintingRepository;
	@Autowired
	private VouchersPayableRepository vouchersPayableRepository;
	@Autowired
	private UserRepository userRepository;

	@Transactional
	public ChequePrinting saveChequePrinting(ChequePrinting chequePrinting) {
		Long id = chequePrintingRepository.getMaxIdByStatus("Pending");
		if (id == null) {
			id = 0L;
		}

		chequePrinting.setNumber("CPFA" + id);
		chequePrinting.getPayables().forEach(vp -> {
			VouchersPayable payable = vouchersPayableRepository.getOne(vp.getId());
			payable.setStatus("Cheque Created");
			vouchersPayableRepository.save(payable);
		});
		return chequePrintingRepository.save(chequePrinting);
	}

	@Transactional
	public ChequePrinting approve(Long cpId, Long userId) {
		// TODO Auto-generated method stub
		Long id = chequePrintingRepository.getMaxIdByStatus("Approved");
		if (id == null) {
			id = 0L;
		}
		ChequePrinting chequePrinting = chequePrintingRepository.getOne(cpId);
		chequePrinting.setNumber("CP" + id);
		chequePrinting.setApprovedBy(userRepository.getOne(userId));
		chequePrinting.setStatus("Approved");

		return chequePrintingRepository.save(chequePrinting);
	}
	
	@Transactional
	public ChequePrinting reject(Long cpId, Long userId) {
		ChequePrinting chequePrinting = chequePrintingRepository.getOne(cpId);
		chequePrinting.setApprovedBy(userRepository.getOne(userId));
		chequePrinting.setStatus("Reject");

		return chequePrintingRepository.save(chequePrinting);
	}
}
