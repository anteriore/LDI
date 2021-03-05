import PDCDisbursements from '../../screens/Accounting/PDCDisbursements';
import AccountTitles from '../../screens/Accounting/AccountTitles';
import ChequePrintings from '../../screens/Accounting/ChequePrintings';

export const routes = [
  {
    title: 'Purchase Vouchers',
    path: '/purchase-vouchers',
    component: null,
  },
  {
    title: 'Journal Vouchers',
    path: '/journal-vouchers',
    component: null,
  },
  {
    title: 'Vouchers Payables',
    path: '/vouchers-payables',
    component: null,
  },
  {
    title: 'Account Titles',
    path: '/account-titles',
    component: AccountTitles,
  },
  {
    title: 'Cheque Printings',
    path: '/cheque-printings',
    component: ChequePrintings,
  },
  {
    title: 'Cheque Disbursement Vouchers',
    path: '/cheque-disbursement-vouchers',
    component: null,
  },
  {
    title: 'Credit Memos',
    path: '/credit-memos',
    component: null,
  },
  {
    title: 'Debit Memos',
    path: '/debit-memos',
    component: null,
  },
  {
    title: 'Cash Receipt Vouchers',
    path: '/cash-receipt-vouchers',
    component: null,
  },
  {
    title: 'PDC Disbursements',
    path: '/pdc-disbursements',
    component: PDCDisbursements,
  },
  {
    title: 'PDC Vouchers',
    path: '/pdc-vouchers',
    component: null,
  },
];
