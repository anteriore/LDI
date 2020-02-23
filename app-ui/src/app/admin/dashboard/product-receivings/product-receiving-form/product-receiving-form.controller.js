function ProductReceivingFormController($state, ProductReceivingsService,
		UsersService, ProductIssuancesService, _) {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
		ctrl.name = ctrl.user.firstName + ' ' + ctrl.user.lastName;
		ctrl.company = JSON.parse(window.localStorage.getItem('company'));
		ctrl.prs = {
			receivedBy : ctrl.user,
			date : new Date(),
			company : ctrl.company
		};
		UsersService.get(ctrl.user.id).then(function(response) {
			ctrl.depots = response.data.depots;
		});
	};

	ctrl.$onChanges = function(changes) {
		if (changes.prs) {
			ctrl.prs = angular.copy(ctrl.prs);
		}
	};

	ctrl.sortType = 'pis';
	ctrl.sortReverse = false;

	function loadProductIssuance() {
		ctrl.company = JSON.parse(window.localStorage.getItem('company'));
		ProductIssuancesService.listByStatusAndDepot("Pending", ctrl.prs.depot.id)
				.then(function(response) {
					ctrl.pisList = response.data;
					console.log("response" + JSON.stringify(ctrl.prsList));
				});
	}

	ctrl.selectPIS = function(pis) {
		ctrl.prs.pis = pis;
	};
	
	ctrl.openPISModal = function(){
		loadProductIssuance();
		$("#findPISModal").modal("show");
	};
	ctrl.submitForm = function() {
		console.log('submitForm: ' + JSON.stringify(ctrl.prs));
		ctrl.onSubmit({
			$event : {
				prs : ctrl.prs
			}
		});
	};

}

angular.module('admin.dashboard').controller('ProductReceivingFormController',
		ProductReceivingFormController);
