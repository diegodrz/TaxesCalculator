/// <reference path="../wwwroot/lib/angular/angular.js" />
/// <reference path="../wwwroot/lib/angular-mocks/angular-mocks.js" />
/// <reference path="../wwwroot/lib/angular-route/angular-route.js" />
/// <reference path="../wwwroot/lib/toastr/toastr.js" />
/// <reference path="../wwwroot/app/taxes.min.js" />

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
