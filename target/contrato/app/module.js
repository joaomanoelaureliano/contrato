(function () {

	angular.module('app', [
		'ui.router',
        'ngResource'
	]);

    angular.module('app').config(AppConfig);

    AppConfig.$inject = ['$stateProvider','$urlRouterProvider'];

    function AppConfig($stateProvider,$urlRouterProvider) {

        $stateProvider
              .state('home', {
                url: '/',
                templateUrl: 'index.html'
              })
            .state({
                name: 'sistema',
                url: '/sistema',
                templateUrl: 'sistema.html'
            })
            .state('sistema.relatorioTodos', {
                url: '/contratos/todos',
                templateUrl: '/view/contrato/list-todos.html',
                controller: 'ContratoListController',
                controllerAs: 'vm'
            })
            .state('sistema.cadastroContratos',{
                url: '/contrato/novo',
                templateUrl: '/view/contrato/form.html',
                controller: 'ContratoFormController',
                controllerAs: 'vm'
            })
            .state('sistema.contratosEditar',{
                url: '/contrato/{id}',
                templateUrl: '/view/contrato/form.html',
                controller: 'ContratoFormController',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('/');
    }

})();