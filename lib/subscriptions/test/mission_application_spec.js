var assert = require('assert');
var MembershipApplication = require("../models/membership_application");

describe("Membership application requirements", function () {
    var validApp;

    before(function () {
        //arrange the data here
        validApp = new MembershipApplication({
            first: "Test",
            last: "User",
            email: "test@test.com",
            age: 30,
            height: 66,
            weight: 180
        });
    });

    describe("Application valid if...", function () {
        it("all validators successful", function () {
            assert(validApp.isValid(), "Not Valid!");
        });

        it('is past the valid until if date ', function () {
            var app = new MembershipApplication({validUntil :Date.parse("01/01/2010")})
            assert(app.expired());
        });

        it("email is 4 or more chars and contains an @", function () {
            assert(validApp.emailIsValid());
        });
        it("height is between 65 and 75 inches", function () {
            assert(validApp.heightIsValid());
        });
        it("age is between 15 and 100", function () {
            assert(validApp.ageIsValid());
        });
        it("first and last name are provided", function () {
            assert(validApp.weightIsValid());
        });
        it("reports valid name", function () {
            assert(validApp.nameIsValid());
        });
    });

    describe("Application invalid if...", function () {
        it('email  is 4 characters or less ', function () {
            var app = new MembershipApplication({email: "dd"});
            assert(!app.emailIsValid());
        });
        it('email does not contain @', function () {
            var app = new MembershipApplication({email: "dddfsadfkalfm.com"});
            assert(!app.emailIsValid());
        });
        it('email is omitted', function () {
            var app = new MembershipApplication({});
            assert(!app.emailIsValid());
        });
        it('height is less than 60 inches', function () {
            var app = new MembershipApplication({height: 10});
            assert(!app.heightIsValid());
        });
        it('height is more than 75 inches', function () {
            var app = new MembershipApplication({height: 80});
            assert(!app.heightIsValid());
        });
        it('height is omitted', function () {
            var app = new MembershipApplication({});
            assert(!app.heightIsValid());
        });
        it('age is more than 100', function () {
            var app = new MembershipApplication({age : 101});
            assert(!app.ageIsValid());
        });
        it('age is less than 15', function () {
            var app = new MembershipApplication({age : 10});
            assert(!app.ageIsValid());
        });
        it('age is omitted', function () {
            var app = new MembershipApplication({});
            assert(!app.ageIsValid());
        });
        it('weight is less than 100', function () {
            var app = new MembershipApplication({weight : 99});
            assert(!app.weightIsValid());
        });
        it('weight if more than 300', function () {
            var app = new MembershipApplication({weight : 305});
            assert(!app.weightIsValid());
        });
        it('weight is omitted', function () {
            var app = new MembershipApplication({});
            assert(!app.weightIsValid());
        });
        it('first name is omitted', function () {
            var app = new MembershipApplication({});
            assert(!app.nameIsValid());
        });
        it('last name is omitted', function () {
            var app = new MembershipApplication({});
            assert(!app.nameIsValid());
        });


    });
});