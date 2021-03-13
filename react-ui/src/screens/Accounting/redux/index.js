import { combineReducers } from 'redux';

import purchaseVouchers from '../PurchaseVouchers/redux';
import voucherPayables from '../VoucherPayables/redux';
import accountTitles from '../AccountTitles/redux';
import cashReceiptVouchers from '../CashReceiptVouchers/redux';
import chequePrintings from '../ChequePrintings/redux';
import chequeDisbursements from '../ChequeDisbursements/redux';
import PDCDisbursements from '../PDCDisbursements/redux';
import PDCVouchers from '../PDCVouchers/redux';
import debitMemo from '../DebitMemo/redux';
import creditMemo from '../CreditMemo/redux';
import journalVouchers from '../JournalVouchers/redux';
import vouchers from '../Vouchers/redux';


const accounting = combineReducers({
  accountTitles,
  PDCDisbursements,
  chequePrintings,
  chequeDisbursements,
  purchaseVouchers,
  voucherPayables,
  PDCVouchers,
  debitMemo,
  creditMemo,
  journalVouchers,
  cashReceiptVouchers,
  vouchers,
});

export default accounting;
