(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeCtrl', HomeCtrl)
        .directive("taxes", function () { return { templateUrl: 'app/areas/home/diretives/taxes.html' } })
        .directive("calculator", function () { return { templateUrl: 'app/areas/home/diretives/calculator.html' } })
        .directive("history", function () { return { templateUrl: 'app/areas/home/diretives/history.html' } });

    function HomeCtrl($scope, $location, User) {
        
        $scope.invoiceReset = function () {
            $scope.invoice = {
                amount: 0.00,
                withheld: 0,
                total: 0
            };
        };

        $scope.invoicesLSSave = function () {
            localStorage.setItem('invoices' + $scope.user.username, JSON.stringify($scope.invoices));
        };
        $scope.invoicesSave = function (invoice) {
            if (invoice.amount == 0) {
                toastr.error('Preencha os dados desta nota');
                return;
            }

            invoice.dateTime = new Date();
            $scope.invoices.push(invoice);

            $scope.invoicesLSSave();

            $scope.invoiceReset();

            toastr.success('A nota foi incluída no histórico');
        };
        $scope.invoicesClear = function () {
            $scope.invoices = [];
            localStorage.removeItem('invoices' + $scope.user.username);
        };
        $scope.invoicesLoad = function () {
            var invoices = angular.fromJson(localStorage.getItem('invoices' + $scope.user.username));
            $scope.invoices = (invoices != null) ? invoices : [];
        };
        $scope.invoicesRemove = function (invoice) {
            var index = $scope.invoices.indexOf(invoice)
            $scope.invoices.splice(index, 1);

            $scope.invoicesLSSave();
        }

        $scope.taxesLoad = function () {
            var taxes = angular.fromJson(localStorage.getItem('taxes'));
            if (taxes == null) {
                taxes = [
                    { code: 'IR', percent: 1.5, active: true, withheldGratherThan: 10 },
                    { code: 'PIS', percent: 1.65, active: true },
                    { code: 'COFINS', percent: 3, active: true },
                    { code: 'CSLL', percent: 4, active: true }
                ];
            }

            $scope.taxes = taxes;
        };
        $scope.taxesSave = function () {
            localStorage.setItem('taxes', JSON.stringify($scope.taxes));
            toastr.success('Taxas salvas com sucesso!');
        };

        $scope.calculator = function() {
            $scope.invoice.withheld = 0;
            angular.forEach($scope.taxes, function (tax) {
                tax.withheld = (tax.active) ? CalculateWithheld(tax) : 0;
                $scope.invoice.withheld += tax.withheld;
            });
            $scope.invoice.total = $scope.invoice.amount - $scope.invoice.withheld;
        }

        $scope.init = function () {
            $scope.user = User.get();
            if ($scope.user == null)
                $location.path('/');

            $scope.title = "Calculo de imposto retido";

            $scope.invoiceReset();
            $scope.invoicesLoad();
            $scope.taxesLoad();
            $scope.calculator();
        };

        $scope.init();

        function CalculateWithheld(tax) {
            var withheldTax = $scope.invoice.amount * (tax.percent / 100);

            return ($scope.invoice.amount > 5000 || withheldTax > tax.withheldGratherThan) ?
                withheldTax :
                0;
        }
    }

})();
