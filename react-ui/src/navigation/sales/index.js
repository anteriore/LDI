import SalesOrders from '../../screens/Sales/SalesOrders';
import OrderSlips from '../../screens/Sales/OrderSlips';
import AcknowledgementReceipts from '../../screens/Sales/AcknowledgementReceipts';
import SalesInvoice from '../../screens/Sales/SalesInvoice';

export const routes = [
  {
    title: 'Sales Orders',
    path: '/sales-orders',
    component: SalesOrders,
  },
  {
    title: 'Order Slips',
    path: '/order-slips',
    component: OrderSlips,
  },
  {
    title: 'Sales Invoices',
    path: '/sales-invoices',
    component: SalesInvoice,
  },
  {
    title: 'Acknowledgement Receipts',
    path: '/acknowledgement-receipts',
    component: AcknowledgementReceipts,
  },
  {
    title: 'Return Slips',
    path: '/return-slips',
    component: '',
  },
  {
    title: 'Sales Journal Vouchers',
    path: '/sales-journal-vouchers',
    component: '',
  },
  {
    title: 'Official Receipts',
    path: '/official-receipts',
    component: '',
  },
];
