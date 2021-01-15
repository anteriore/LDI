import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Typography, message } from 'antd';
import { listOrderSlipsByDepot } from '../../OrderSlips/redux';

const { Text } = Typography;

export const columns = [
  {
    title: 'AR Number',
    dataIndex: 'number',
    key: 'number',
    datatype: 'string',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    datatype: 'date',
  },
  {
    title: 'Prepared By',
    dataIndex: 'preparedBy',
    key: 'preparedBy',
    datatype: 'object',
    sorter: (a, b) => {
      if (typeof a.preparedBy !== 'undefined' && a.preparedBy !== null) {
        a = `${a.preparedBy.firstName} ${a.preparedBy.lastName}`;
      } else {
        a = '';
      }

      if (typeof b.preparedBy !== 'undefined' && b.preparedBy !== null) {
        b = `${b.preparedBy.firstName} ${b.preparedBy.lastName}`;
      } else {
        b = '';
      }
      return a.localeCompare(b);
    },
    render: (object) => {
      if (typeof object !== 'undefined' && object !== null) {
        return `${object.firstName} ${object.lastName}`;
      }

      return null;
    },
  },
  {
    title: 'Amount Paid',
    dataIndex: 'amountPaid',
    key: 'amountPaid',
    datatype: 'number',
  },
];

const FormDetails = () => {
  const dispatch = useDispatch();
  const depots = useSelector((state) => state.maintenance.depots.list);
  const clients = useSelector((state) => state.maintenance.clients.list);
  const orderSlips = useSelector((state) => state.sales.orderSlips.orderSlipsList);

  const formDetails = {
    form_name: 'acknowledgement_receipt',
    toggle_name: 'terms',
    form_items: [
      {
        label: 'AR Number',
        name: 'number',
        placeholder: 'Acknowledgement Receipt Number',
        rules: [{ required: true }],
        // placeholder: 'AUTOGENERATED UPON CREATION',
        // readOnly: true,
      },
      {
        label: 'Date',
        name: 'date',
        type: 'date',
        rules: [{ required: true }],
      },
      {
        label: 'Depot',
        name: 'depot',
        type: 'selectSearch',
        selectName: 'name',
        choices: depots,
        render: (depot) => `[${depot.code}] ${depot.name}`,
        rules: [{ required: true }],
        onChange: (e) => {
          dispatch(listOrderSlipsByDepot({ message, depot: e }));
        },
      },
      {
        label: 'Client',
        name: 'client',
        type: 'selectSearch',
        selectName: 'name',
        choices: clients,
        render: (client) => `[${client.code}] ${client.name}`,
        rules: [{ required: true }],
      },
      {
        label: 'Terms of Payment',
        name: 'terms',
        type: 'radioGroup',
        selectName: 'name',
        initialValue: 'CASH',
        choices: [
          {
            id: 'CASH',
            name: 'Cash',
          },
          {
            id: 'CHEQUE',
            name: 'Cheque',
          },
        ],
        rules: [{ required: true }],
      },
      {
        label: 'Cheque Number',
        name: 'chequeNumber',
        toggle: true,
        toggleCondition: (value) => {
          if (value === 'CHEQUE') {
            return true;
          }

          return false;
        },
        initialValue: null,
        rules: [{ required: true }],
      },
      {
        label: 'Cheque Date',
        name: 'chequeDate',
        type: 'date',
        toggle: true,
        toggleCondition: (value) => {
          if (value === 'CHEQUE') {
            return true;
          }

          return false;
        },
        initialValue: null,
        rules: [{ required: true }],
      },
      {
        label: 'Amount Paid',
        name: 'amountPaid',
        type: 'number',
        min: 0,
        rules: [{ required: true }],
      },
      {
        label: 'Cut Off Date',
        name: 'cutOffDate',
        type: 'date',
        toggle: true,
        toggleCondition: (value) => {
          if (value === 'CHEQUE') {
            return true;
          }

          return false;
        },
        initialValue: null,
        rules: [{ required: true }],
      },
    ],
  };

  const tableDetails = {
    label: 'Payments',
    name: 'payments',
    key: 'id',
    rules: [{ required: true }],
    isVisible: orderSlips.length > 0,
    fields: [
      {
        label: 'Type',
        name: 'type',
      },
      {
        label: 'Number',
        name: 'number',
      },
      {
        label: 'Total Amount',
        name: 'totalAmount',
      },
      {
        label: 'Remaining Balance',
        name: 'remainingBalance',
      },
      {
        label: 'Payment',
        name: 'appliedAmount',
        type: 'number',
        rules: [{ required: true }],
        min: 0,
      },
      {
        label: 'Remaining',
        name: 'remaining',
        render: (object) => {
          if (object.appliedAmount !== null && typeof object.appliedAmount !== 'undefined') {
            return object.remainingBalance - object.appliedAmount;
          }

          return object.remainingBalance || 0;
        },
      },
    ],
    summary: (data) => {
      let totalAppliedAmount = 0;
      let totalSIAmount = 0;
      data.forEach(({ totalAmount }) => {
        if (data.type === 'DR_SI') {
          totalSIAmount += totalAmount;
        } else {
          totalAppliedAmount += totalAmount;
        }
      });

      return (
        <Table.Summary.Row>
          <Table.Summary.Cell>Total Applied Amount</Table.Summary.Cell>
          <Table.Summary.Cell>
            <Text>{totalAppliedAmount}</Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell>Total SI Amount</Table.Summary.Cell>
          <Table.Summary.Cell>
            <Text>{totalSIAmount}</Text>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      );
    },
    foreignKey: 'number',
    selectedKey: 'number',
    selectData: orderSlips,
    selectFields: [
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Number',
        dataIndex: 'number',
        key: 'number',
      },
      {
        title: 'Total Amount',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
      },
      {
        title: 'Remaining Balance',
        dataIndex: 'remainingBalance',
        key: 'remainingBalance',
      },
    ],
    getValues: (values) => {
      const payments = [];
      values.payments.forEach((payment) => {
        payments.push({
          ...payment.reference,
          appliedAmount: payment.appliedAmount,
        });
      });
      return payments;
    },
    processData: (data) => {
      return { ...data, appliedAmount: 0 };
    },
    checkSelected: (selectedData, rowData) => {
      if (
        typeof selectedData !== 'undefined' &&
        selectedData !== null &&
        selectedData.some((item) => item.id === rowData.id)
      ) {
        return true;
      }
    },
  };

  return { formDetails, tableDetails };
};

export default FormDetails;
