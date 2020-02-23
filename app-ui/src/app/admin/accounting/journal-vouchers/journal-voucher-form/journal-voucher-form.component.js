var journalVoucherForm = {
  bindings: {
    jv: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './journal-voucher-form.html',
  controller: 'JournalVoucherFormController'
};

angular
  .module('admin.accounting')
  .component('journalVoucherForm', journalVoucherForm);
