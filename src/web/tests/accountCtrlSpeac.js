/// <reference path="../wwwroot/lib/angular/angular.js" />
/// <reference path="../wwwroot/lib/angular-mocks/angular-mocks.js" />
/// <reference path="../wwwroot/lib/angular-route/angular-route.js" />
/// <reference path="../wwwroot/lib/toastr/toastr.js" />
/// <reference path="../wwwroot/app/taxes.min.js" />

describe('AccountCtrl', function () {

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

        spyOn(toastr, 'error');

        ctrl = $controller('AccountCtrl', { $scope: scope, User: user });
    }));

    it('Titulo da pagina deve ser Login', function () {
        expect(scope.title).toBe('Login');

    });

    it('Login de usuario existente', function () {
        expect(scope.login('admin', '123')).toBe(true);
    });

    it('Login de usuario inexistente', function () {
        expect(scope.login('admin', '1234')).toBe(false);
    });
});