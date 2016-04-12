/// <reference path="../wwwroot/lib/angular/angular.js" />
/// <reference path="../wwwroot/lib/angular-mocks/angular-mocks.js" />
/// <reference path="../wwwroot/lib/angular-route/angular-route.js" />
/// <reference path="../wwwroot/lib/toastr/toastr.js" />
/// <reference path="../wwwroot/app/taxes.min.js" />

describe('HomeCtrl', function () {

    beforeEach(module("app"));

    var scope, ctrl, user;

    beforeEach(inject(function ($location, $rootScope, $controller) {
        scope = $rootScope.$new();
        user = {
            get: function () {
                return angular.fromJson(sessionStorage.getItem('user'));
            },
            set: function (user) {
                sessionStorage.setItem('user', JSON.stringify({ 'username': user }));
            }
        };        

        user.set('admin');
        scope.taxes = taxes = [
                    { code: 'IR', percent: 1.5, active: true, withheldGratherThan: 10 },
                    { code: 'PIS', percent: 1.65, active: true },
                    { code: 'COFINS', percent: 3, active: true },
                    { code: 'CSLL', percent: 4, active: true }
        ];

        spyOn(toastr, 'error');
        spyOn(toastr, 'success');

        ctrl = $controller('HomeCtrl', { $scope: scope, User: user });
    }));

    it('Calcula nota de R$600,00', function () {

        scope.invoice.amount = 600;
        scope.calculator();

        expect(scope.invoice.amount).toBe(scope.invoice.total);
    });

    it('Calcula nota de R$4.000,00', function () {

        scope.invoice.amount = 4000;
        scope.calculator();

        expect(scope.invoice.total).toBe(3940);
    });

    it('Calcula nota de R$6.000,00', function () {

        scope.invoice.amount = 6000;
        scope.calculator();

        expect(scope.invoice.total).toBe(5391);
    });

    it('Calcula nota de R$435.422,98', function () {

        scope.invoice.amount = 435422.98;
        scope.calculator();

        expect(scope.invoice.total).toBe(391227.54753);
    });

    

    it('Salva uma nova nota no historico', function () {
       
        var invoice = {
            amount: 10,
            withheld: 1,
            total: 9
        };

        var lengthBefore = scope.invoices.length;
        scope.invoicesSave(invoice);
        var lengthAfter = scope.invoices.length;

        expect(lengthAfter).toBe(lengthBefore + 1);
    });

    it('Limpa o historico', function () {

        scope.invoicesClear();
        expect(scope.invoices.length).toBe(0);
    });
});



