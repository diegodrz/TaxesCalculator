/// <reference path="../app/bower_components/angular/angular.js" />
/// <reference path="../app/bower_components/angular-mocks/angular-mocks.js" />
/// <reference path="../app/bower_components/angular-route/angular-route.js" />
/// <reference path="../app/bower_components/toastr/toastr.js" />

/// <reference path="../app/app.js" />
/// <reference path="../app/routes.js" />
/// <reference path="../app/services.js" />

describe("Services", function () {

    beforeEach(module("services"));

    describe("User", function () {

        var user;

        beforeEach(inject(function ($injector) {
            user = $injector.get('User');
        }));

        it('User Test', function () {
            expect('company').toBe('company');
        });

    });
});
