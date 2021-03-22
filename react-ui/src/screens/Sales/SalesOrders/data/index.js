import {useSelector} from 'react-redux';

export const tableHeader = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    defaultSortOrder: 'ascend',
    datatype: 'date',
  },
  {
    title: 'SO Number',
    dataIndex: 'number',
    key: 'number',
    align: 'center',
    defaultSortOrder: 'ascend',
    datatype: 'string'
  },
  {
    title: 'Prepared By',
    dataIndex: 'preparedBy',
    key: 'preparedBy',
    align: 'center',
    defaultSortOrder: 'ascend',
    render: (object) => object.firstName.concat(` ${object.lastName}`),
    sorter: (a, b) =>
      a.preparedBy.firstName
        .concat(` ${a.preparedBy.lastName}`)
        .localeCompare(b.preparedBy.firstName.concat(` ${b.preparedBy.lastName}`)),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.status.length - b.status.length,
  },
];

const FormDetails = () => {
  const user = useSelector((state) => state.auth.user);

  const formDetails = {
    form_name: 'sales_orders',
    form_items: [
      {
        label: 'SO Number',
        name: 'number',
        placeholder: 'AUTOGENERATED UPON CREATION',
        readOnly: true,
      },
      {
        label: 'Date',
        name: 'date',
        rules: [{ required: true, message: 'Please provide a sales order date' }],
        placeholder: 'Sales order number',
        type: 'date',
      },
      {
        label: 'Type',
        name: 'type',
        rules: [{ required: true, message: 'Please provide a sales order type' }],
        placeholder: 'Sales order type',
        type: 'select',
        render: (object) => object.name,
        choices: [
          { id: 'DR_SI', name: 'DR/SI' },
          { id: 'OS', name: 'OS' },
          { id: 'PS', name: 'PS' },
        ],
      },
      {
        label: 'Depot',
        name: 'depot',
        rules: [{ required: true, message: 'Please provide a sales order depot' }],
        placeholder: 'Sales order depot',
        render: (depot) => {
          return `[${depot?.code ?? ""}] ${depot?.name ?? ""}`;
        },
        type: 'select',
        choices: [],
      },
      {
        label: 'Client',
        name: 'client',
        rules: [{ required: true, message: 'Please provide a sales order client' }],
        placeholder: 'Sales order client',
        render: (client) => {
          return `[${client.code}] ${client.name}`;
        },
        type: 'selectSearch',
        choices: [],
      },
      {
        label: 'Prepared By',
        name: 'preparedBy',
        type: 'selectSearch',
        choices: [user],
        render: (user) => `${user?.firstName ?? ""} ${user?.lastName ?? ""}`,
        initialValue: user.id,
        rules: [{ required: true }],
        readOnly: true,
      },
      {
        label: 'Checked By',
        name: 'checkedBy',
        type: 'selectSearch',
        choices: [user],
        render: (user) => `${user?.firstName ?? ""} ${user?.lastName ?? ""}`,
        initialValue: user.id,
        rules: [{ required: true }],
        readOnly: true,
      },
      {
        label: 'Remarks',
        name: 'remarks',
        rules: [{}],
        placeholder: 'Remarks (optional)',
        type: 'textArea',
      },
    ],
  };
  
  const itemColumn = [
    {
      title: 'Finished Good',
      dataIndex: 'finishedGood',
      key: 'finishedGood',
      render: (object) => object?.name ?? ""
    },
    {
      title: 'Depot',
      dataIndex: 'depot',
      key: 'depot',
      render: (object) => object?.code ?? "",
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Quantity Requested',
      dataIndex: 'quantityRequested',
      key: 'quantityRequested',
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ]

  const tableProductInventory = [
    {
      title: 'Lot #',
      dataindex: 'product',
      render: (object) => object.product.lotNumber,
    },
    {
      title: 'FG Code',
      dataIndex: 'product',
      render: (object) => object.finishedGood.code,
    },
    {
      title: 'Finished Good',
      dataIndex: 'product',
      render: (object) => object.finishedGood.name,
    },
    {
      title: 'Stock on Hand',
      dataIndex: 'quantity',
    },
  ];

  const tableDetails = {
    label: 'Sales Order Products',
    name: 'salesOrderProducts',
    key: 'id',
    rules: [{required: true, message: "Please select items to be requested"}],
    emptyText: "Please select a department for the items to be requested",
    fields: [
      {
        title: 'FG ID',
        key: 'finishedGoodID',
        dataIndex: 'finishedGoodID',
      },
      {
        title: 'Code',
        dataIndex: 'code',
        render: (object) => object.code,
      },
      {
        title: 'Finished Good',
        dataIndex: 'finishedGood',
        render: (object) => object.name,
      },
      {
        title: 'Stock on Hand',
        dataIndex: 'quantity',
      },
      {
        title: 'Quantity',
        dataIndex: 'quantityRequested',
        key: 'quantityRequested',
        editable: true,
        item: {
          name: 'requestedQuantiry',
          rules: [{ required: true, message: 'Quantity is missing' }],
          min: 1,
          placeholder: 'quantity',
          type: 'number',
        },
      },
      {
        title: 'Remaining',
        dataIndex: 'quantityRemaining',
      },
      {
        title: 'Unit Price',
        dataIndex: 'unitPrice',
        key: 'unitPrice',
        editable: true,
        item: {
          name: 'unitPrice',
          rules: [{ required: true, message: 'Unit price is missing' }],
          min: 1,
          placeholder: 'price',
          type: 'number',
        },
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
      },
      {
        title: 'Action',
      },
    ]
  }
  
  return {
    tableDetails,
    tableProductInventory, 
    itemColumn, 
    formDetails
  }
}

export default FormDetails;