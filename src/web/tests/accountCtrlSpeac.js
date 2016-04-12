/// <reference path="../app/bower_components/angular/angular.js" />
/// <reference path="../app/bower_components/angular-mocks/angular-mocks.js" />
/// <reference path="../app/bower_components/angular-route/angular-route.js" />
/// <reference path="../app/bower_components/toastr/toastr.js" />

/// <reference path="../app/app.js" />
/// <reference path="../app/routes.js" />
/// <reference path="../app/services.js" />
/// <reference path="../app/controllers/accountCtrl.js" />


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
            },
            clear: function () {
                sessionStorage.removeItem('user');
            }
        };

        spyOn(toastr, 'error');

        ctrl = $controller('AccountCtrl', { $scope: scope, User: user });
    }));

    it('Login de usuario existente', function () {
        expect(scope.login('admin', '123')).toBe(true);
    });

    it('Login de usuario inexistente', function () {
        expect(scope.login('admin', '1234')).toBe(false);
    });
});