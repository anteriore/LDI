import { useSelector } from 'react-redux';

export const DisplayDetails = () => {
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      defaultSortOrder: 'ascend',
      datatype: 'date',
    },
    {
      title: 'R.R No',
      dataIndex: 'number',
      key: 'number',
      align: 'center',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.number.length - b.number.length,
    },
    {
      title: 'DR',
      dataIndex: 'drNumber',
      key: 'drNumber',
      align: 'center',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.number.length - b.number.length,
    },
    {
      title: 'SI',
      dataIndex: 'siNumber',
      key: 'siNumber',
      align: 'center',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.number.length - b.number.length,
    },
    {
      title: 'Received By',
      dataIndex: 'receivedBy',
      key: 'receivedBy',
      align: 'center',
      defaultSortOrder: 'ascend',
      render: (object) => object.firstName.concat(` ${object.lastName}`),
      sorter: (a, b) =>
        a.receivedBy.firstName
          .concat(` ${a.receivedBy.lastName}`)
          .localeCompare(b.receivedBy.firstName.concat(` ${b.receivedBy.lastName}`)),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.number.length - b.number.length,
    },
  ];

  const itemColumns = [
    {
      title: 'Item',
      dataIndex: 'item',
      render: (object) => `[${object?.code}] ${object?.name}`,
    },
    {
      title: 'Type',
      dataIndex: 'item',
      render: (object) => object?.type?.name,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Unit',
      dataIndex: 'item',
      render: (object) => object?.unit?.code,
    },
  ];

  return { columns, itemColumns };
};

export const FormDetails = () => {
  const poList = useSelector((state) => state.purchaseOrders.list);

    const formDetails = {
      form_name: 'receivingReceipts',
      toggle_name: 'tolling',
      form_items: [
        {
          label: 'R.R. Number',
          name: 'number',
          placeholder: 'AUTOGENERATED UPON CREATION',
          readOnly: true,
        },
        {
          label: 'Date Created',
          name: 'date',
          type: 'date',
          rules: [{ required: true, message: 'Please select a date' }],
        },
        {
            label: 'Received By',
            name: 'receivedBy',
            rules: [{ required: true, message: 'Please login a valid user' }],
            placeholder: '',
            type: 'readOnly',
            writeOnly: true,
        },
      ],
      
      tolling_details: [
        {
          label: 'Tolling',
          name: 'tolling',
          type: 'radioGroup',
          selectName: 'name',
          initialValue: false,
          choices: [
            {
              id: false,
              value: false,
              name: 'False',
            },
            {
              id: true,
              value: true,
              name: 'True',
            },
          ],
          rules: [{ required: true }],
        },
        {
          label: 'Purchase Order No.',
          name: 'poNumber',
          toggle: true,
          toggleCondition: (value) => {
            if (!value) {
              return true;
            }
            return false;
          },
          initialValue: null,
          rules: [{ required: true, message: 'Please provide a Purchase Order No.' }],
          placeholder: 'Purchase Order No.',
      },
        {
          label: 'Delivery Receipt No.',
          name: 'drNumber',
          type: 'string',
          rules: [{ required: true, message: 'Please provide a Delivery Receipt No.' }],
          placeholder: 'Delivery Receipt No.',
        },
        {
            label: 'Sales Invoice No.',
            name: 'siNumber',
            type: 'string',
            rules: [{ required: true, message: 'Please provide a Sales Invoice No.' }],
            placeholder: 'Sales Invoice No.',
        },
        {
            label: 'Delivery Type',
            name: 'deliveryType',
            type: 'string',
            rules: [{ required: true, message: 'Please provide a Delivery Type' }],
            placeholder: 'Delivery Type',
        },
        {
            label: 'Origin',
            name: 'origin',
            type: 'string',
            rules: [{ required: true, message: 'Please specify the origin' }],
            placeholder: 'Origin',
        },
        {
            label: 'Remarks',
            name: 'remarks',
            rules: [{}],
            placeholder: 'Remarks (optional)',
            type: 'textArea',
        },
      ],
  }

  const tableDetails = {
    label: 'Purchase Order',
    name: 'receivedItems',
    key: 'id',
    preloadedData: true,
    rules: [{ required: true, message: 'Please select a Purchase Order' }],
    isVisible: poList.length > 0,
    fields: [
      {
        label: 'PO Number',
        name: 'poNumber',
      },
      {
        label: 'Item',
        name: 'item',
        render: (object) => `[${object.item.code}] ${object.item.name}`,
      },
      
      {
        label: 'Requested Item',
        name: 'requestedItemId',
        type: 'hiddenNumber',
      },
      {
        label: 'Type',
        name: 'item',
        render: (object) => object?.item?.type?.name,
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
        render: (object) => object?.unit?.code,
      },
    ],

    foreignKey: 'purchaseOrder',
    selectedKey: 'number',
    selectData: poList,
    selectFields: [
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
        datatype: 'object',
        dataToString: (object) => {
          return object?.fullName ?? "";
        },
        render: (object) => {
          return object?.fullName ?? "";
        },
      },
      {
        title: 'Department',
        dataIndex: 'department',
        key: 'department',
        datatype: 'object',
        dataToString: (object) => {
          return object?.name ?? "";
        },
        render: (object) => {
          return object?.name ?? "";
        }, 
      },
      {
        title: 'Due Date',
        dataIndex: 'dueDate',
        key: 'dueDate',
        datatype: 'date',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        datatype: 'string',
      },
    ],
    nestedData: {
      label: 'Ordered Items',
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
          render: (object) => object?.type?.code ?? "",
        },
        {
          title: 'Unit',
          dataIndex: 'item',
          key: 'unit',
          render: (object) => object?.unit?.code ?? "",
        },
      ],
      data: 'orderedItems',
    },

    getValues: (values) => {
      return values.receivedItems;
    },

    processData: (data) => {
      const processedData = [];
      data.orderedItems.forEach((item) => {
        processedData.push({
          poNumber: data.number,
          orderedItemID: item.id,
          item: item.item,
          unit: item.unit,
        });
      })
      return processedData;
    },

    checkSelected: (selectedData, rowData) => {
      if (
        typeof selectedData !== 'undefined' &&
        selectedData !== null &&
        selectedData.some((item) => item.poNumber === rowData.number)
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
        if (field.type === 'select') {
          field.render = (object) => object[field.name]?.name ?? 'No data';
        }

        columns.push({
          title: field.label,
          key: field.name,
          render: (object) => {
            return field.render(object);
          },
        });
      });

      return columns;
    },
  };

  return { formDetails, tableDetails };
};

export const TollingFormDetails = () => {
  const itemList = useSelector((state) => state.maintenance.items.list);

  const formDetails = {
    form_name: 'receivingReceipts',
    form_items: [
      {
        label: 'R.R. Number',
        name: 'number',
        placeholder: 'AUTOGENERATED UPON CREATION',
        readOnly: true,
      },
      {
        label: 'Date Created',
        name: 'date',
        type: 'date',
        rules: [{ required: true, message: 'Please select a date' }],
      },
      {
        label: 'Received By',
        name: 'receivedBy',
        rules: [{ required: true, message: 'Please login a valid user' }],
        placeholder: '',
        type: 'readOnly',
        writeOnly: true,
      },
      {
        label: 'Delivery Receipt No.',
        name: 'drNumber',
        type: 'string',
        rules: [{ required: true, message: 'Please provide a Delivery Receipt No.' }],
        placeholder: 'Delivery Receipt No.',
      },
      {
        label: 'Sales Invoice No.',
        name: 'siNumber',
        type: 'string',
        rules: [{ required: true, message: 'Please provide a Sales Invoice No.' }],
        placeholder: 'Sales Invoice No.',
      },
      {
        label: 'Delivery Type',
        name: 'deliveryType',
        type: 'string',
        rules: [{ required: true, message: 'Please provide a Delivery Type' }],
        placeholder: 'Delivery Type',
      },
      {
        label: 'Origin',
        name: 'origin',
        type: 'string',
        rules: [{ required: true, message: 'Please specify the origin' }],
        placeholder: 'Origin',
      },
      {
        label: 'Remarks',
        name: 'remarks',
        rules: [{}],
        placeholder: 'Remarks (optional)',
        type: 'textArea',
      }
    ],
  };

  const tableDetails = {
    label: 'Received Items',
    name: 'receivedItems',
    key: 'id',
    preloadedData: true,
    rules: [{ required: true }],
    fields: [
      {
        label: 'Item',
        name: 'item',
        render: (object) => `[${object.item.code}] ${object.item.name}`,
      },
      {
        label: 'Type',
        name: 'item',
        render: (object) => object?.item?.type?.name,
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
        render: (object) => object?.unit?.code,
      },
    ],

    foreignKey: 'itemID',
    selectedKey: 'id',
    selectData: itemList,
    selectFields: [
      {
        title: 'Item',
        dataIndex: 'name',
        key: 'name',
        datatype: 'string',
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        datatype: 'object',
        dataToString: (object) => object?.name,
        render: (object) => object?.name,
      },
      {
        title: 'Unit',
        dataIndex: 'unit',
        key: 'unit',
        datatype: 'object',
        dataToString: (object) => object?.name,
        render: (object) => object?.name,
      },
    ],

    processData: (data) => {
      const processedData = []
      data.forEach((item) => {
        processedData.push({
          item: item,
          unit: item?.unit
        })
      });
      return processedData;
    },
    checkSelected: (selectedData, rowData) => {
      if (
        typeof selectedData !== 'undefined' &&
        selectedData !== null &&
        selectedData.some((item) => item.itemID === rowData.item.id)
      ) {
        return true;
      }
    },
  };

  return { formDetails, tableDetails };
};
