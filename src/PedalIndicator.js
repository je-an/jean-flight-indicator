define(["Inheritance", "IndicatorBase"], function (Inheritance, IndicatorBase) { // jscs:ignore
    /**
     * Provides functionalty for displaying pedal movement values
     * @alias PedalIndicator 
     * @constructor
     * @extends IndicatorBase
     * @param {Object} options - options object
     */
    var PedalIndicator = function (options) {
        this.svgElement = null;
        Inheritance.inheritConstructor(IndicatorBase, this, options);
        this.init("pedal-svg");
        this.pedalLeftElement = this.svgElement.getElementById("pedal-left-element");
        this.pedalRightElement = this.svgElement.getElementById("pedal-right-element");
        this.pedalLeftElement.setAttribute("transform", "");
        this.pedalRightElement.setAttribute("transform", "");
    };
    Inheritance.inheritPrototype(PedalIndicator, IndicatorBase);
    /** */
    PedalIndicator.prototype.update = function (leftY, rightY) {
        var yleftValue, yRightValue;
        // TODO: BoundCheck einbauen
        // Set proper x value
        if (this.isPositiveNumber(leftY)) {
            yleftValue = this.calculatePercentage(leftY, this.bounds.high);
        } else if (this.isNegativeNumber(leftY)) {
            yleftValue = this.calculatePercentage(leftY, this.bounds.low);
        } else {
            yleftValue = 0;
        }
        // Set proper y value
        if (this.isPositiveNumber(rightY)) {
            yRightValue = this.calculatePercentage(rightY, this.bounds.high);
        } else if (this.isNegativeNumber(rightY)) {
            yRightValue = this.calculatePercentage(rightY, this.bounds.low);
        } else {
            yRightValue = 0;
        }
        this.pedalLeftElement.attributes.transform.nodeValue = "translate(0, " + (yleftValue) + ")";
        this.pedalRightElement.attributes.transform.nodeValue = "translate(0, " + (yRightValue) + ")";
    };
    return PedalIndicator;
});