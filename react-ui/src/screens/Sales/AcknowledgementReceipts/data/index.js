import { useSelector } from 'react-redux';

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
        a = a.preparedBy.firstName + ' ' + a.preparedBy.lastName;
      } else {
        a = '';
      }

      if (typeof b.preparedBy !== 'undefined' && b.preparedBy !== null) {
        b = b.preparedBy.firstName + ' ' + b.preparedBy.lastName;
      } else {
        b = '';
      }
      return a.localeCompare(b);
    },
    render: (object) => {
      if (typeof object !== 'undefined' && object !== null) {
        return object.firstName + ' ' + object.lastName;
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
  const depots = useSelector((state) => state.maintenance.depots.list);
  const clients = {
    list : useSelector((state) => state.maintenance.clients.list),
    message: useSelector((state) => state.maintenance.clients.statusMessage),
  }

  const formDetails = {
    form_name: 'acknowledgement_receipt',
    form_items: [
      {
        label: 'AR Number',
        name: 'number',
        placeholder: "Acknowledgement Receipt Number",
        rules: [{ required: true }],
        //placeholder: 'AUTOGENERATED UPON CREATION',
        //readOnly: true,
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
      },
      {
        label: 'Client',
        name: 'client',
        type: 'selectSearch',
        selectName: 'name',
        choices: clients.list,
        message: clients.message,
        render: (client) => `[${client.code}] ${client.name}`,
        rules: [{ required: true }],
      },
      {
        label: 'Amount Paid',
        name: 'amountPaid',
        type: 'number',
        rules: [{ required: true }],
      },
    ],
  };

  return { formDetails };
};

export default FormDetails;
