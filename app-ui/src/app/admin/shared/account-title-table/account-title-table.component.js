var accountTitleTable = {
	bindings : {
		accounttitles : '=',
		readonly : '<'
	},
	templateUrl : './account-title-table.html',
	controller : 'AccountTitleTableController'
};

angular.module('admin.shared').component('accountTitleTable', accountTitleTable);