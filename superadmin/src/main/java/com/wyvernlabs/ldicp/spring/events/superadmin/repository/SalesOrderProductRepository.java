package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.FinishedGood;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesOrderProduct;

public interface SalesOrderProductRepository extends JpaRepository<SalesOrderProduct, Long> {

	List<SalesOrderProduct> findByDepotAndSoNumber(Depot depot, String soNumber);

	List<SalesOrderProduct> findByStatusInAndDepotAndFinishedGood(String[] status, Depot depot, FinishedGood finishedGood);
}
