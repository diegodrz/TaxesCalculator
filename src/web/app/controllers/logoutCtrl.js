(function () {
    'use strict';

    angular
        .module('app')
        .controller('LogoutCtrl', LogoutCtrl);

    function LogoutCtrl($scope, $location, User) {
        alert(1);
        User.set(null);
        $location.path('/');
        
    }

})();
