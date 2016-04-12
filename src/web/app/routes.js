(function () {
    var routes = angular.module('routes', [
        'ngRoute'
    ]);

    routes.config(function ($routeProvider) {
        $routeProvider
        .when('/', {
            controller: 'AccountCtrl',
            templateUrl: 'app/areas/account/views/index.html'
        })
        .when('/home', {
            controller: 'HomeCtrl',
            templateUrl: 'app/areas/home/views/index.html'
        })
        .otherwise({
            controller: 'HomeCtrl',
            templateUrl: '404.html'
        });
    });
})();