/// <reference path="../lib/angular/angular.js" />
/// <reference path="../lib/angular-mocks/angular-mocks.js" />
/// <reference path="../lib/angular-route/angular-route.js" />
/// <reference path="../lib/toastr/toastr.js" />

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
