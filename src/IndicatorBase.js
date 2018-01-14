define(["TypeCheck", "Interface"], function (TypeCheck, Interface) { // jscs:ignore
    /**
     * Provides functionalty for displaying flight parameters 
     * @alias IndicatorBase 
     * @abstract
     * @constructor
     * @param {Object} options - options object
     */
    var IndicatorBase = function (options) {
        Interface.areMembersImplemented(["svgElement"], this);
        Interface.areMethodsImplemented(["update"], this);
        this.bounds = {
            high: 175,
            low: -175
        };
    };
    /** @param {String} id - id of the svg object element */
    IndicatorBase.prototype.init = function (id) {
        var a = document.getElementById(id);
        this.svgElement = a.contentDocument;
    };
    /** */
    IndicatorBase.prototype.calculatePercentage = function (value, bound) {
        return value * bound;
    };
    /** */
    IndicatorBase.prototype.isPositiveNumber = function (number) {
        return number > 0;
    };
    IndicatorBase.prototype.isNegativeNumber = function (number) {
        return number < 0;
    };
    return IndicatorBase;
});