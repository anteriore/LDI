import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Table, Typography } from 'antd';

const { Text } = Typography;

export const columns = [
  {
    title: 'Number',
    dataIndex: 'number',
    key: 'number',
    datatype: 'string',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    datatype: 'string',
    render: (data) => moment(new Date(data)).format('DD/MM/YYYY')
  },
  {
    title: 'Vendor',
    dataIndex: 'vendor',
    key: 'vendor',
    datatype: 'object',
    dataToString: (object) => {
      return `[${object?.code}] ${object?.name}`;
    },
  },
  {
    title: 'Amount',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    datatype: 'string',
  },
];

const FormDetails = () => {

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [voucherChoices, setVoucherChoices] = useState([]);
  const [selectedPayee, setSelectedPayee] = useState(false);

  const vendors = useSelector((state) => state.maintenance.vendors.list);
  const accountTitles = useSelector((state) => state.accounting.accountTitles.list);
  const departments = useSelector((state) => state.maintenance.departmentArea.deptList);
  const areas = useSelector((state) => state.maintenance.departmentArea.areaList);
  const groups = useSelector((state) => state.maintenance.groupsCategories.groupList);

  const formDetails = {
    form_name: 'voucher_payables',
    setVoucherChoices: setVoucherChoices,
    setSelectedPayee: setSelectedPayee,
    form_items: [
      {
        label: 'Number',
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
        label: 'Remarks',
        name: 'remarks',
        type: 'textArea',
        rules: [{ message: 'Please provide a valid remark' }],
        placeholder: 'Remarks',
      },
      {
        label: 'Payee',
        name: 'vendor',
        rules: [{ required: selectedPayee, message: 'Please select a payee from the given options '}],
        placeholder: 'Select Payee',
        type: 'select',
        choices: vendors,
        readOnly: !selectedPayee,
        render: (object) => `[${object.code}] ${object.name}`
      },
      {
        label: 'Voucher Selection',
        name: 'variation',
        rules: [{ required: true, message: 'Please select a Voucher selection mode '}],
        placeholder: 'Select Voucher selection mode',
        type: 'select',
        choices: [
          {
            id: "1 Voucher",
            value: "1 Voucher",
            name: "Single Voucher"
          },
          {
            id: "Multiple PJV",
            value: "Multiple PJV",
            name: "Multiple Purchase Voucher"
          },
          {
            id: "Multiple JV",
            value: "Multiple JV",
            name: "Multiple Journal Voucher"
          }
        ],
      },
    ],
    accountTitles: 
    {
      label: 'Account Titles',
      name: 'accountTitles',
      type: 'listTable',
      rules: [{ required: true }],
      fields: [
        {
          label: 'Account Titles',
          name: 'accountTitle',
          rules: [{ required: true, message: 'Please select account title' }],
          placeholder: 'Select Account Title',
          render: (object) => `[${object?.type}] ${object?.title}` ?? "",
          type: 'selectSearch',
          choices: accountTitles,
          width: 200,
          onChange: (e) => {
            const accountTitle = accountTitles.find((data) => data.id === e)
            setSelectedAccount(accountTitle)
          }
        },{
          label: 'Department',
          name: 'department',
          rules: [{ required: true, message: 'Please select department' }],
          placeholder: 'Select Department',
          render: (object) => `[${object?.code ?? ""}] ${object?.name ?? ""}`,
          type: 'selectSearch',
          choices: departments,
          width: 200,
        },
        {
          label: 'Group',
          name: 'group',
          rules: [{ required: true, message: 'Please select group' }],
          placeholder: 'Select Group',
          render: (object) => object?.name ?? "",
          type: 'selectSearch',
          choices: groups,
          width: 200,
        },
        {
          label: 'Area',
          name: 'area',
          rules: [{ required: true, message: 'Please select area' }],
          placeholder: 'Select Area',
          render: (object) => `[${object?.code ?? ""}] ${object?.name ?? ""}`,
          type: 'selectSearch',
          choices: areas,
          width: 200,
        },
        {
          label: 'Debit',
          name: 'debit',
          type: 'number',
          dependencies: ['accountTitle'],
          rules: [{ required: true, message: 'Please provide debit' }],
          isVisible: (selectedAccount?.type ?? "") === "Debit",
          initialValue: 0,
          min: 0,
          width: 200,
        },
        {
          label: 'Credit',
          name: 'credit',
          type: 'number',
          rules: [{ required: true, message: 'Please provide credit' }],
          isVisible: (selectedAccount?.type ?? "") === "Credit",
          initialValue: 0,
          min: 0,
          width: 200,
        },
      ],
      handleAdd: (values) => {
        const accountTitle = accountTitles.find((data) => data.id === values.accountTitle)
        const department = departments.find((data) => data.id === values.department)
        const group = groups.find((data) => data.id === values.group)
        const area = areas.find((data) => data.id === values.area)
        return {
          ...values,
          accountTitle,
          department,
          group,
          area
        }
      },
      summary: (data) => {
        let totalCredit = 0;
        let totalDebit = 0;
        data.forEach((item) => {
          totalCredit += (item?.credit ?? 0)
          totalDebit += (item?.debit ?? 0)
        });
  
        return (
          <Table.Summary.Row>
            <Table.Summary.Cell>Total Credit</Table.Summary.Cell>
            <Table.Summary.Cell>
              <Text>{totalCredit}</Text>
            </Table.Summary.Cell>
            <Table.Summary.Cell>Total Debit</Table.Summary.Cell>
            <Table.Summary.Cell>
              <Text>{totalDebit}</Text>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        );
      },
    }
  };

  const tableDetails = {
    label: 'Voucher',
    name: 'vouchers',
    key: 'vouchers',
    rules: [{ required: true }],
    isVisible: voucherChoices.length > 0,
    fields: [
      {
        label: 'Number',
        name: 'number',
      },
      {
        label: 'Date',
        name: 'date',
        render: (data) => `${moment(new Date(data.date)).format('DD/MM/YYYY')}`
      },
      {
        label: 'DR',
        name: 'drNumber',
      },
      {
        label: 'SI',
        name: 'siNumber',
      },
      {
        label: 'PO',
        name: 'poNumber',
      },
      {
        label: 'RR',
        name: 'rrNumber',
      },
      {
        label: 'Amount',
        name: 'totalAmount',
      },
    ],
    foreignKey: 'number',
    selectedKey: 'number',
    selectData: voucherChoices,
    selectFields: [
      {
        title: 'Type',
        dataIndex: 'type',
      },
      {
        title: 'Number',
        dataIndex: 'number',
      },
      {
        title: 'Date',
        dataIndex: 'date',
        render: (data) => moment(new Date(data)).format('DD/MM/YYYY')
      },
      {
        title: 'Status',
        dataIndex: 'status',
      },
      {
        title: 'DR',
        dataIndex: 'drNumber',
      },
      {
        title: 'SI',
        dataIndex: 'siNumber',
      },
      {
        title: 'PO',
        dataIndex: 'poNumber',
      },
      {
        title: 'RR',
        dataIndex: 'rrNumber',
      },
    ],
    processData: (data) => {
      return data
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
    renderTableColumns: (fields) => {
      const columns = [];
      fields.forEach((field) => {
        if (typeof field.render === 'undefined' || field.render === null) {
          field.render = (object) => object[field.name];
        }
        columns.push({
          title: field.label,
          key: field.name,
          render: (object) => field.render(object),
        });
      });

      return columns;
    },
  };

  return { formDetails, tableDetails };
};

export default FormDetails;
