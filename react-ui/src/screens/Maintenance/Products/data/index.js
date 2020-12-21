export const tableHeaderFinishedGoods = [
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
    align: 'center',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
];

export const tableHeader = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
  },
  {
    title: 'Lot #',
    dataIndex: 'lotNumber',
    key: 'lotNumber',
    align: 'center',
    datatype: 'string'
  },
  {
    title: 'Finished Goods',
    dataIndex: 'finishedGood',
    key: 'finishedGood',
    align: 'center',
    datatype: 'object',
  },
  {
    title: 'Quantity Per Box',
    dataIndex: 'quantityPerBox',
    key: 'quantityPerBox',
    align: 'center',
  },
  {
    title: 'Unit Price',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    align: 'center',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    align: 'center',
    name: 'code',
    datatype: 'object',
  },
  {
    title: 'Division',
    dataIndex: 'division',
    key: 'division',
    align: 'center',
    name: 'code',
    datatype: 'object',
  },
];

export const formDetails = {
  form_name: 'products',
  form_items: [
    {
      label: 'Depot',
      name: 'depot',
      rules: [{ required: true, message: 'Please select a depot' }],
      placeholder: 'Depot',
      type: 'select',
      choices: [],
    },
    {
      label: 'Lot #',
      name: 'lotNumber',
      rules: [{ required: true, message: 'Please provide a proper product number' }],
      placeholder: 'Lot Number',
    },
    {
      label: 'Expiration Date',
      name: 'expiration',
      type: 'date',
      rules: [{ type: 'object', required: true, message: 'Please select expiration date' }],
      placeholder: 'Product expiration',
    },
    {
      label: 'Classification',
      name: 'classification',
      rules: [{ required: true, message: 'Please select a classification' }],
      placeholder: 'Classification',
      type: 'select',
      choices: [],
    },
    {
      label: 'Category',
      name: 'category',
      rules: [{ required: true, message: 'Please select a category' }],
      placeholder: 'Category',
      type: 'select',
      choices: [],
    },
    {
      label: 'Division',
      name: 'division',
      rules: [{ required: true, message: 'Please select a division' }],
      placeholder: 'Division',
      type: 'select',
      choices: [],
    },
    {
      label: 'Unit Price',
      name: 'unitPrice',
      rules: [{ required: true, message: 'Please provide a unit price', min: 1 }],
      placeholder: 'Product Unit Price',
      type: 'number',
    },
    {
      label: 'Small UOM',
      name: 'smallUnit',
      rules: [{ required: true, message: 'Please select unit product for small UOM' }],
      placeholder: 'Small UOM',
      type: 'select',
      choices: [],
    },
    {
      label: 'Big UOM',
      name: 'bigUnit',
      rules: [{ required: true, message: 'Please select unit product for big UOM' }],
      placeholder: 'Big UOM',
      type: 'select',
      choices: [],
    },
    {
      label: 'Quantity/Box',
      name: 'quantityPerBox',
      rules: [
        { required: true, message: 'Please provide product quantity per box', min: 1, max: 50 },
      ],
      placeholder: 'Product quantity per box',
      type: 'number',
    },
    {
      label: 'Reorder Level',
      name: 'reorderLevel',
      rules: [{ min: 1, max: 50 }],
      placeholder: 'Product reorder level',
      type: 'number',
    },
  ],
};
