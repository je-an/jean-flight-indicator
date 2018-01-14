define(["TypeCheck", "Interface", "Failure"], function (TypeCheck, Interface, Failure) { // jscs:ignore
    /**
     * Provides functionalty for displaying flight parameters 
     * @alias IndicatorBase 
     * @abstract
     * @constructor
     * @param {Object} options - options object
     * @param {String} options.containerId - Id of the container, the indicator shall be placed in
     */
    var IndicatorBase = function (options) {
        if (!TypeCheck.isString(options.containerId)) {
            Failure.throwTypeError("options.containerId is not a string");
        }
        /* Interface.areMembersImplemented(["svgElement"], this); */
        Interface.areMethodsImplemented(["update"], this);
        this.svgBounds = {
            high: 175,
            low: -175
        };
        this.svgElement = null;
        this.options = options;
        this.container = null;
        this.isReady = false;
    };
    /** @param {String} svgId - id of the svg object element */
    IndicatorBase.prototype.init = function (svgId, fn) {
        var id = this.options.containerId;
        this.container = document.getElementById(id);
        if (!this.container) {
            Failure.throwTypeError("There is no indicator container with id: " + id);
        }
        this.container.innerHTML = this.options.template;

        var svg = document.getElementById(svgId), instance = this;
        svg.addEventListener('load', function () {
            instance.svgElement = svg.contentDocument;
            instance.isReady = true;
            fn();
        }, true);
    };
    /** */
    IndicatorBase.prototype.calculatePercentage = function (value, bound) {
        return value * bound;
    };
    /** */
    IndicatorBase.prototype.isPositiveNumber = function (number) {
        return number > 0;
    };
    /** */
    IndicatorBase.prototype.isNegativeNumber = function (number) {
        return number < 0;
    };
    /** */
    IndicatorBase.prototype.formatDegreeString = function (degree) {
        var s = "";
        degree = degree.toFixed(0);
        degree = degree.toString();
        switch (degree.length) {
            case 1:
                s = "00" + degree;
                break;
            case 2:
                s = "0" + degree;
                break;
            case 3:
                break;
        }
        return s;
    };
    /** */
    IndicatorBase.prototype.getElementCenter = function (element) {
        var coord = element.getBBox();
        return {
            x: coord.x + (coord.width / 2),
            y: coord.y + (coord.height / 2)
        };
    };
    return IndicatorBase;
});