// jscs:disable
// jshint ignore:start
define([
    "FlightIndicator"
], function (FlightIndicator) {
    describe('FlightIndicator.spec.js', function () {
        var instance;
        beforeEach(function () {
            instance = new FlightIndicator();
        });
        describe("FlightIndicator", function () {
            it("TODO: Check if all members are available | EXPECTATION: FlightIndicator has all necessary members", function () {
                var numberOfMembers = 0;
                expect(Object.keys(instance).length).toEqual(numberOfMembers);
            });
            it("TODO: Check if all methods are available | EXPECTATION: FlightIndicator has all necessary methods", function () {
                var numberOfMethods = 0;
                var methodCount = Object.keys(Object.getPrototypeOf(instance)).length;
                expect(methodCount).toEqual(numberOfMethods);
            });
        });
    });
});

