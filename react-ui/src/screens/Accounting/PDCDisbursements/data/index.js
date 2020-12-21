import React from 'react';
import { useSelector } from 'react-redux';
import { Table, Typography } from 'antd';

const { Text } = Typography;

export const columns = [
  {
    title: 'PDC Number',
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
    title: 'Payee',
    dataIndex: 'payee',
    key: 'payee',
    datatype: 'string',
    render: (object) => object.name,
    sorter: (a, b) => a.payee.name.localeCompare(b.payee.name),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    datatype: 'string',
  },
];

const FormDetails = () => {
  const vendors = useSelector((state) => state.maintenance.vendors.list);
  const departments = useSelector((state) => state.maintenance.departmentArea.deptList);
  const areas = useSelector((state) => state.maintenance.departmentArea.areaList);
  const units = useSelector((state) => state.maintenance.units.unitList);
  const purchaseRequests = useSelector((state) => state.dashboard.purchaseRequests.list);

  const formDetails = {
    form_name: 'pdc_disbursement',
    form_items: [
      {
        label: 'PDC Number',
        name: 'number',
        placeholder: 'AUTOGENERATED UPON CREATION',
        readOnly: true,
      },
      {
        label: 'Date',
        name: 'date',
        type: 'date',
        rules: [{ required: true }],
      },
      {
        label: 'Payee',
        name: 'payee',
        type: 'select',
        selectName: 'name',
        choices: vendors,
        render: (payee) => `[${payee.code}] ${payee.name}`,
        rules: [{ required: true }],
      },
      {
        label: 'Cheque(s)',
        name: 'cheques',
        type: 'list',
        selectName: 'number',
        rules: [{ required: true }],
        fields: [
          {
            name: 'id',
            type: 'hidden',
          },
          {
            label: 'Cheque Number',
            name: 'number',
            type: 'string',
            rules: [{ required: true, message: 'Cheque number is required' }],
            placeholder: 'Cheque Number',
          },
          {
            label: 'Date',
            name: 'date',
            type: 'date',
            rules: [{ required: true, message: 'Date is required' }],
          },
          {
            label: 'Amount',
            name: 'amount',
            prefix: 'Amount',
            rules: [
              {
                required: true,
                pattern: new RegExp('^[0-9]*.?[0-9]*$'),
                message: 'Please enter a valid amount',
              },
            ],
            placeholder: 'Amount',
          },
          {
            label: 'Remarks',
            name: 'remarks',
            type: 'string',
            rules: [{ message: 'Please provide a valid remark' }],
            placeholder: 'Remarks',
          },
        ],
      },
      {
        label: 'Remarks',
        name: 'remarks',
        type: 'textArea',
        rules: [{ message: 'Please provide a valid remark' }],
        placeholder: 'Remarks',
      },
    ],
  };

  return { formDetails };
};

export default FormDetails;
