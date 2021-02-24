import { useSelector } from 'react-redux';

export const DisplayDetails = () => {
    const columns = [
        {
            title: 'A.R. No',
            dataIndex: 'number',
            key: 'rrNum',
            align: 'center',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.number.length - b.number.length,
        },
        {
            title: 'R.R. No',
            dataIndex: 'receivingReceipt',
            key: 'rrNumber',
            align: 'center',
            defaultSortOrder: 'ascend',
            dataToString: (object) => {
                return object.number
            },
        },
        {
            title: 'Material Type',
            dataIndex: 'item',
            key: 'itemType',
            align: 'center',
            defaultSortOrder: 'ascend',
            dataToString: (object) => {
                return object.type.name
            }
        },
        {
            title: 'Total Items',
            dataIndex: 'totalQuantity',
            key: 'totalQuantity',
            align: 'center',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.number.length - b.number.length,
        },
        {
            title: 'Control Number',
            dataIndex: 'controlNumber',
            key: 'controlNumber',
            align: 'center',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.number.length - b.number.length,
        },
        {
            title: 'DR',
            dataIndex: 'receivingReceipt',
            key: 'drNumber',
            align: 'center',
            defaultSortOrder: 'ascend',
            dataToString: (object) => {
                return object.drNumber
            }
        },
        {
            title: 'SI',
            dataIndex: 'receivingReceipt',
            key: 'siNumber',
            align: 'center',
            defaultSortOrder: 'ascend',
            dataToString: (object) => {
                return object.siNumber
            }
        },
    ];

    const itemColumns = [
        {
            title: 'Item',
            dataIndex: 'item',
            render: (object) => `[${object.code}] ${object.name}`,
        },
        {
            title: 'Received',
            dataIndex: 'receivedQuantity',
            key: 'receivedQuantity',
        },
        {
            title: 'Approved',
            dataIndex: 'approvedQuantity',
            key: 'approvedQuantity',
        },
        {
            title: 'Rejected',
            dataIndex: 'rejectedQuantity',
            key: 'rejectedQuantity',
        },
        {
            title: 'QC Samples',
            dataIndex: 'qcSamples',
            key: 'qcSamples',
        },
        {
            title: 'Total',
            dataIndex: 'totalQuantity',
            key: 'totalQuantity',
        },
        {
            label: 'Expiration',
            dataIndex: 'expiration',
            key: 'expiration',
        },
        {
            label: 'Best Before',
            dataIndex: 'bestBefore',
            key: 'bestBefore',
        },
        {
            label: 'Re-eval',
            dataIndex: 'reevaluation',
            key: 'reevaluation',
        },
        {
            label: 'Re-test',
            dataIndex: 'retest',
            key: 'retest',
        },
    ];

    return { columns, itemColumns}
};


export const FormDetails = () => {
    const rrList = useSelector((state) => state.dashboard.receivingReceipts.list);
    const itemList = useSelector((state) => state.maintenance.items.list);

    const formDetails = {
        form_name: 'approvedReceipts',
        form_items: [
            {
                label: 'R.R. No',
                name: 'receivingReceipt',
                type: 'selectSearch',
                selectName: 'name',
                choices: rrList,
                render: (object) => `${object.number}`,
                rules: [{ required: true }],
            },
            {
                label: 'A.R. Number',
                name: 'number',
                rules: [{ required: true, message: 'Please provide a valid A.R. Number' }],
                placeholder: 'A.R. Number',
            },
            {
                label: 'Control Number',
                name: 'controlNumber',
                rules: [{ required: true, message: 'Please provide a valid Control Number' }],
                placeholder: 'Control Number',
            },
            {
                label: 'Max Containers',
                name: 'maxContainers',
                type: 'number',
                min: 0,
                rules: [{ required: true, message: 'Please provide a valid Max Containers' }],
                placeholder: 'Max Containers',
            },
            {
                label: 'Specified Gravity',
                name: 'specifiedGravity',
                type: 'number',
                min: 0,
                rules: [{ required: true, message: 'Please provide a valid Specified Gravity' }],
                placeholder: 'Specified Gravity',
            },
            {
                label: 'Date',
                name: 'date',
                type: 'date',
                rules: [{ required: true, message: 'Please select a date' }],
            },
            {
                label: 'Date Created',
                name: 'dateCreated',
                type: 'date',
                rules: [{ required: true, message: 'Please select a date' }],
            },
            {
                label: 'Date Modified',
                name: 'modified',
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
                label: 'Remarks',
                name: 'remarks',
                rules: [{}],
                placeholder: 'Remarks (optional)',
                type: 'textArea',
            },
            {
                label: 'Received Item',
                name: 'item',
                type: 'selectSearch',
                selectName: 'name',
                choices: itemList,
                render: (object) => `[${object.code}] ${object.name}`,
                rules: [{ required: true }],
            },
        ]
    };

    const tableDetails = {
        label: 'Received Item',
        name: 'receivedItem',
        key: 'id',
        rules: [{ required: true }],
        fields: [
            {
                label: 'Item',
                key: 'item',
                name: 'item',
                type: 'readOnly',
                render: (object) => `[${object.code}] ${object.name}`,
            },
            {
                label: 'Received Quantity',
                type: 'number',
                name: 'receivingQuantity',
                min: 0,
                rules: [{ required: true, message: 'Please input a valid quantity' }],
            },
            {
                label: 'Approved Quantity',
                type: 'number',
                name: 'approvedQuantity',
                min: 0,
                rules: [{ required: true, message: 'Please input a valid quantity' }],
            },
            {
                label: 'Rejected Quantity',
                type: 'number',
                name: 'rejectedQuantity',
                min: 0,
                rules: [{ required: true, message: 'Please input a valid quantity' }],
            },
            {
                label: 'QC Samples',
                type: 'number',
                name: 'qcSamples',
                min: 0,
                rules: [{ required: true, message: 'Please input a valid quantity' }],
            },
            {
                label: 'Total Quantity',
                type: 'number',
                name: 'totalQuantity',
                min: 0,
                rules: [{ required: true, message: 'Please input a valid quantity' }],
            },
            {
                label: 'Expiration',
                name: 'expiration',
                type: 'date',
                rules: [{ required: true, message: 'Please select an expiration date' }],
            },
            {
                label: 'Best Before',
                name: 'bestBefore',
                type: 'date',
                rules: [{ required: true, message: 'Please select an best before date' }],
            },
            {
                label: 'Re-eval',
                name: 'reevaluation',
                type: 'date',
                rules: [{ required: true, message: 'Please select a reevaluation date' }],
            },
            {
                label: 'Re-test',
                name: 'retest',
                type: 'date',
                rules: [{ required: true, message: 'Please select a retest date' }],
            },
        ],
    };

    return { formDetails, tableDetails }
};

