import { combineReducers } from 'redux';

import purchaseVouchers from '../PurchaseVouchers/redux';
import accountTitles from '../AccountTitles/redux';
import cashReceiptVouchers from '../CashReceiptVouchers/redux';
import chequePrintings from '../ChequePrintings/redux';
import chequeDisbursements from '../ChequeDisbursements/redux';
import PDCDisbursements from '../PDCDisbursements/redux';
import PDCVouchers from '../PDCVouchers/redux';

const accounting = combineReducers({
  accountTitles,
  PDCDisbursements,
  chequePrintings,
  chequeDisbursements,
  purchaseVouchers,
  PDCVouchers,
  cashReceiptVouchers,
});

export default accounting;
