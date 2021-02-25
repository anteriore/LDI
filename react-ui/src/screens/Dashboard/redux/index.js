import { combineReducers } from 'redux';

import purchaseRequests from '../PurchaseRequests/redux';
import productInventories from '../ProductInventories/redux';
import FGIssuances from '../FGIssuances/redux';
import FGReceivings from '../FGReceivings/redux';
import materialIssuances from '../MaterialIssuances/redux';
import materialReceivings from '../MaterialReceivings/redux';
import inventory from '../Inventory/redux';
import productMovements from '../ProductMovements/redux';
import inventoryMovements from '../InventoryMovements/redux';
import employees from '../Employees/redux';
import engineeringInventories from '../EngineeringInventories/redux';
import jobOrders from '../JobOrder/redux';
import materialReevaluations from '../MaterialReevalutaions/redux';
import receivingReceipts from '../ReceivingReceipts/redux';
import approvedReceipts from '../ApprovedReceipts/redux';

const dashboard = combineReducers({
  purchaseRequests,
  productInventories,
  FGIssuances,
  FGReceivings,
  materialIssuances,
  materialReceivings,
  inventory,
  productMovements,
  jobOrders,
  engineeringInventories,
  inventoryMovements,
  employees,
  materialReevaluations,
  receivingReceipts,
  approvedReceipts,
});

export default dashboard;
