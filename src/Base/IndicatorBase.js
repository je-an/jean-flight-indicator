define([ // jscs:ignore
    "TypeCheck",
    "Interface",
    "Failure",
    "BaseOptions"
], function (TypeCheck, Interface, Failure, BaseOptions) { // jscs:ignore
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
        this.svgElement = null;
        this.options = options;
        this.container = null;
        this.isReady = false;
    };
    /** 
     * @param {Object} options - options object
     * @param {String} options.svgId - id of the svg object element 
     * @param {String} options.svgDataName - data name of the svg
     * @param {Function} options.onSvgReady - Gets called, if the svg is loaded into DOM
     */
    IndicatorBase.prototype.init = function (options) {
        var id = this.options.containerId;
        this.container = document.getElementById(id);
        if (!this.container) {
            Failure.throwTypeError("There is no indicator container with id: " + id);
        }
        this.container.innerHTML = this.options.template;

        var svg = document.getElementById(options.svgId), instance = this;
        svg.data = BaseOptions.assets + options.svgDataName;
        svg.addEventListener('load', function () {
            instance.svgElement = svg.contentDocument;
            instance.isReady = true;
            options.onSvgReady();
        }, true);
    };
    /** */
    IndicatorBase.prototype.calculatePercentage = function (value, bound) {
        return Math.abs(value) * bound;
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
                s = degree;
                break;
            case 4:
                s = degree;
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