var accountTitleForm = {
  bindings: {
    accounttitle: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './account-title-form.html',
  controller: 'AccountTitleFormController'
};

angular
  .module('admin.maintenance')
  .component('accountTitleForm', accountTitleForm);
