(function () {
  'use strict'

  angular.module('app')
    .controller('ContratoListController', ContratoListController);
  
  ContratoListController.$inject = ['ContratoService', 'DialogBuilder']
  
    function ContratoListController(ContratoService, DialogBuilder) {
        var vm = this;
        vm.data = {};
        vm.filtro = '';
        vm.page = {
            number: 1,
            size: '15'
        }
        
        vm.atualizar = load;
        vm.resetFiltro = function () {
            vm.filtro = '';
            load();
        }

        vm.goToPage = function (page) {
            vm.page.number = page;
            load();
        }

        function load() {
            ContratoService.findAll(vm.filtro, vm.page)
                .then(function (dados) {
                    angular.forEach(dados.registros,function(dataF){

                        var ven = moment(dataF.dt_final, 'DD/MM/YYYY').diff(moment(new Date()),'months',true);

                        dataF.vencimento = ven <= 0;
                        dataF.vencimento2 = (ven <= 6);
                       

                    });

                    vm.data = dados
                });
        }

        vm.excluir = function (item) {
            DialogBuilder.confirm('Tem certeza que deseja remover o contrato?')
                .then(function (result) {
                    if (result.value) {
                        ContratoService.remove(item.id)
                            .then(function () {
                                load();
                                DialogBuilder.message('Contrato excluído com sucesso!');
                            });
                    } else {
                        DialogBuilder.message({
                            title: 'Exclusão cancelada pelo usuário!',
                            type: 'error'
                        });
                    }
                });
        };
        load();
    }
})();