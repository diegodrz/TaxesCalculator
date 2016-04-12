(function () {
    var services = angular.module('services', []);

    services.factory('User', function () {
        return {
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
    });
})();