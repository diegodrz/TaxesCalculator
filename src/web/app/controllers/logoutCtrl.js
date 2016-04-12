(function () {
    'use strict';

    angular
        .module('app')
        .controller('LogoutCtrl', LogoutCtrl);

    function LogoutCtrl($scope, $location, User) {
        User.set(null);
        $location.path('/');
        
    }

})();
