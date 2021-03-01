import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Typography, message } from 'antd';
import { listPRByStatus, clearData as clearPR } from '../../Dashboard/PurchaseRequests/redux';

const { Text } = Typography;

export const columns = [
  {
    title: 'PO Number',
    dataIndex: 'number',
    key: 'number',
    datatype: 'string',
  },
  {
    title: 'Vendor',
    dataIndex: 'vendor',
    key: 'vendor',
    datatype: 'string',
    render: (object) => object.name,
    sorter: (a, b) => a.vendor.name.localeCompare(b.vendor.name),
  },
  {
    title: 'Department',
    dataIndex: 'department',
    key: 'department',
    datatype: 'string',
    render: (object) => object.name,
    sorter: (a, b) => a.department.name.localeCompare(b.department.name),
  },
  {
    title: 'Due Date',
    dataIndex: 'dueDate',
    key: 'dueDate',
    datatype: 'date',
  },
  {
    title: 'Total Amount',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    datatype: 'number',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    datatype: 'string',
  },
];

const FormDetails = () => {
  const dispatch = useDispatch();
  const vendors = useSelector((state) => state.maintenance.vendors.list);
  const departments = useSelector((state) => state.maintenance.departmentArea.deptList);
  const areas = useSelector((state) => state.maintenance.departmentArea.areaList);
  const units = useSelector((state) => state.maintenance.units.unitList);
  const purchaseRequests = useSelector((state) => state.dashboard.purchaseRequests.list);
  const selectedCompany = useSelector((state) => state.company.selectedCompany);

  const formDetails = {
    form_name: 'depot',
    form_items: [
      {
        label: 'PO Number',
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
        label: 'Vendor',
        name: 'vendor',
        type: 'select',
        selectName: 'name',
        choices: vendors,
        render: (vendor) => `[${vendor.code}] ${vendor.name}`,
        rules: [{ required: true }],
      },
      {
        label: 'Department',
        name: 'department',
        type: 'select',
        selectName: 'name',
        choices: departments,
        rules: [{ required: true }],
        onChange: (e) => {
          dispatch(clearPR())
          dispatch(listPRByStatus({ company: selectedCompany, message, status: 'Approved' }))
        },
      },
      {
        label: 'Area',
        name: 'area',
        type: 'select',
        selectName: 'name',
        choices: areas,
        rules: [{ required: true }],
      },
      {
        label: 'Currency',
        name: 'currency',
        rules: [{ required: true, message: 'Please provide a valid currency' }],
        placeholder: 'Currency',
      },
      {
        label: 'Terms',
        name: 'terms',
        type: 'number',
        rules: [{ required: true, message: 'Please provide a valid term' }],
        min: 0,
        placeholder: 'Terms',
      },
      {
        label: 'Job Order Number',
        name: 'jobOrderNo',
        rules: [{ message: 'Please provide a valid Job Order Number' }],
        placeholder: 'Job Order Number',
      },
      {
        label: 'Due Date',
        name: 'dueDate',
        type: 'date',
        rules: [{ required: true }],
      },
      {
        label: 'Deliver To',
        name: 'deliverTo',
        rules: [{ required: true, message: 'Please provide a valid value for the delivery' }],
        placeholder: 'Deliver To',
      },
      {
        label: 'VAT (Percentage)',
        name: 'vat',
        type: 'number',
        rules: [{ required: true, message: 'Please provide a valid value for VAT' }],
        min: 0,
        max: 100,
        placeholder: 'VAT',
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

  const tableDetails = {
    label: 'Purchase Request',
    name: 'orderedItems',
    key: 'id',
    rules: [{ required: true }],
    isVisible: purchaseRequests.length > 0,
    fields: [
      {
        label: 'Item',
        name: 'item',
        render: (object) => `[${object.item.code}] ${object.item.name}`,
      },
      {
        label: 'PRF Number',
        name: 'prfNumber',
      },
      {
        label: 'Requested Item',
        name: 'requestedItemId',
        type: 'hiddenNumber',
      },
      {
        label: 'Quantity',
        name: 'quantity',
        type: 'number',
        rules: [{ required: true }],
        min: 0,
      },
      {
        label: 'Unit',
        name: 'unit',
        type: 'select',
        choices: units,
        rules: [{ required: true }],
        placeholder: 'Unit of Measurement',
      },
      {
        label: 'Unit Price',
        name: 'unitPrice',
        type: 'number',
        rules: [{ required: true }],
        min: 0,
      },
      {
        label: 'Amount',
        name: 'amount',
        render: (object) => {
          return object.quantity * object.unitPrice || 0;
        },
      },
    ],
    summary: (data) => {
      let totalAmount = 0;

      data.forEach(({ quantity, unitPrice }) => {
        totalAmount += quantity * unitPrice;
      });

      return (
        <Table.Summary.Row>
          <Table.Summary.Cell>Total Amount</Table.Summary.Cell>
          <Table.Summary.Cell>
            <Text>{totalAmount}</Text>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      );
    },
    // select data
    foreignKey: 'number',
    selectedKey: 'prfNumber',
    selectData: purchaseRequests,
    selectFields: [
      {
        title: 'PRF Number',
        dataIndex: 'number',
        key: 'number',
      },
      {
        title: 'Requested by',
        dataIndex: 'requestedBy',
        key: 'requestedBy',
        render: (item) => {
          return `${item?.firstName} ${item?.lastName}`;
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
    ],
    nestedData: {
      label: 'Requested Items',
      fields: [
        {
          title: 'Code',
          dataIndex: 'item',
          key: 'code',
          render: (item) => item.type.code,
        },
        {
          title: 'Item',
          dataIndex: 'item',
          key: 'item',
          render: (item) => item.name,
        },
        {
          title: 'Type',
          dataIndex: 'item',
          key: 'type',
          render: (item) => item.type.name,
        },
        {
          title: 'Quantity',
          dataIndex: 'quantityRequested',
          key: 'quantity',
        },
        {
          title: 'Unit',
          dataIndex: 'unit',
          key: 'unit',
          render: (object) => object?.name ?? null,
        },
      ],
      data: 'requestedItems',
    },
    getValues: (values) => {
      return values.orderedItems;
    },
    processData: (data) => {
      const processedData = [];

      data.requestedItems.forEach((item) => {
        processedData.push({
          prfNumber: data.number,
          requestedItemId: item.id,
          item: item.item,
          quantity: item.quantityRequested,
        });
      });

      return processedData;
    },
    checkSelected: (selectedData, rowData) => {
      if (
        typeof selectedData !== 'undefined' &&
        selectedData !== null &&
        selectedData.some((item) => item.prfNumber === rowData.number)
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
        if(field.type === 'select'){
          field.render = (object) => object[field.name]?.name ?? "No data";
        }

        columns.push({
          title: field.label,
          key: field.name,
          render: (object) => {
            return field.render(object)
          },
        });
        
      });
  
      return columns;
    },
  };

  return { formDetails, tableDetails };
};

export default FormDetails;
