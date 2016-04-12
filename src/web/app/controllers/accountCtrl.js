(function () {
    'use strict';

    angular
        .module('app')
        .controller('AccountCtrl', AccountCtrl);

    function AccountCtrl($scope, $location, User) {

        $scope.title = "Cálculo de imposto retido";

        $scope.login = function (user, pass) {
            if ((user == 'admin' || user == 'company') && pass == '123') {
                User.set(user);
                $location.path('/home');
                return true;
            }
            else {
                toastr.error("Login e senha inválidos");
                return false;
            }
        };

        $scope.logout = function () {
            User.set(null);
            $location.path('/');
        };
    }

})();
