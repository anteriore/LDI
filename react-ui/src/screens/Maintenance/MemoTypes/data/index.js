export const tableHeader = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
    align: 'center',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.code.length - b.code.length,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.type.length - b.type.length,
  },
];

export const formDetails = {
  form_name: 'units',
  form_items: [
    {
      label: 'Name',
      name: 'name',
      rules: [{ required: true, message: 'Please provide a proper memo name' }],
      placeholder: 'Memo name',
    },
    {
      label: 'Code',
      name: 'code',
      rules: [{ required: true, message: 'Please provide a proper memo code' }],
      placeholder: 'Memo code',
    },
    {
      label: 'Type',
      name: 'type',
      rules: [{ required: true, message: 'Please provide a proper memo type' }],
      placeholder: 'Memo Type',
      type: 'select',
      choices: [
        { id: 'CM', name: 'CM' },
        { id: 'DM', name: 'DM' },
      ],
    },
  ],
};
