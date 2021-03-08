import { useSelector } from 'react-redux';
import moment from 'moment';

export const columns = [
  {
    title: 'Number',
    dataIndex: 'number',
    key: 'number',
    datatype: 'string',
  },
  {
    title: 'Payee',
    dataIndex: 'chequePrinting',
    key: 'chequePrinting',
    datatype: 'object',
    dataToString: (object) => {
      return `[${object?.payee?.code}] ${object?.payee?.name}`;
    },
  },
  {
    title: 'Cheque Number',
    dataIndex: 'chequePrinting',
    key: 'chequePrinting',
    datatype: 'object',
    dataToString: (object) => {
      return `[${object?.chequeNumber?.code}] ${object?.chequeNumber?.name}`;
    },
  },
  {
    title: 'Cheque Date',
    dataIndex: 'chequePrinting',
    key: 'chequePrinting',
    datatype: 'object',
    dataToString: (data) => moment(new Date(data?.chequeDate)).format('DD/MM/YYYY'),
  },
  {
    title: 'Bank Account',
    dataIndex: 'chequePrinting',
    key: 'chequePrinting',
    datatype: 'object',
    dataToString: (object) => {
      return `[${object?.bankAccount?.code}] ${object?.bankAccount?.name}`;
    },
  },
  {
    title: 'Amount',
    dataIndex: 'chequePrinting',
    key: 'chequePrinting',
    datatype: 'object',
    dataToString: (object) => {
      return `${object?.totalAmount}`;
    },
  },

];

const FormDetails = () => {
  const chequePrintings = useSelector((state) => state.accounting.chequePrintings.list);

  const formDetails = {
    form_name: 'cheque_disbursement',
    form_items: [
      {
        label: 'Cheque Printing',
        name: 'chequePrinting',
        type: 'selectSearch',
        selectName: 'name',
        choices: chequePrintings,
        render: (object) => `${object.number}`,
        rules: [{ required: true }],
      },
      {
        label: 'CP Number',
        name: 'number',
        rules: [{ required: true }],
        placeholder: 'CP Number',
      },
      {
        label: 'Payee',
        name: 'payee',
        render: (payee) => `[${payee?.code}] ${payee?.name}`,
        rules: [{ required: true }],
      },
      {
        label: 'Cheque Date',
        name: 'chequeDate',
        type: 'date',
        rules: [{ required: true }],
      },
      {
        label: 'Cheque Number',
        name: 'chequeNumber',
        rules: [{ required: true, message: 'Please provide a valid Cheque Number' }],
        placeholder: 'Cheque Number',
      },
      {
        label: 'Payee Name',
        name: 'payeeName',
        rules: [{ required: true, message: 'Please provide a valid Payee Name' }],
        placeholder: 'Payee Name',
      },
      /*{
        label: 'Bank Account',
        name: 'bankAccount',
        type: 'selectSearch',
        selectName: 'name',
        choices: bankAccounts,
        render: (object) => `[${object.code}] ${object.name}`,
        rules: [{ required: true }],
      },*/
      {
        label: 'Remarks',
        name: 'remarks',
        type: 'textArea',
        rules: [{ message: 'Please provide a valid remark' }],
        placeholder: 'Remarks',
      },
    ],
    processDisplayData: (data) => {
      const processedData = {
        ...data,
        //disbursementDate: data.disbursement.date,
      }
      return processedData
    }
  };

  /*const tableDetails = {
    label: 'Voucher',
    name: 'payables',
    key: 'payables',
    rules: [{ required: true }],
    //isVisible: vouchers.length > 0,
    fields: [
      {
        label: 'Number',
        name: 'number',
      },
      {
        label: 'Date',
        name: 'date',
        render: (data) => `${moment(new Date(data)).format('DD/MM/YYYY')}`
      },
      {
        label: 'Payee',
        name: 'vendor',
        render: (data) => `[${data.code}] ${data.name}`
      },
      {
        label: 'Remarks',
        name: 'remarks',
      },
      {
        label: 'Amount',
        name: 'totalAmount',
      },
    ],
    foreignKey: 'id',
    selectedKey: 'id',
    selectData: vouchers,
    selectFields: [
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
        title: 'Payee',
        dataIndex: 'vendor',
        render: (data) => `[${data.code}] ${data.name}`
      },
      {
        title: 'Remarks',
        dataIndex: 'remarks',
      },
      {
        title: 'Amount',
        dataIndex: 'totalAmount',
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
  };*/

  return { formDetails };
};

export default FormDetails;
