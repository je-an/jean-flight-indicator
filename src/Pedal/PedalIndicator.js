define(["Inheritance", "IndicatorBase", "text!pedal-html"], function (Inheritance, IndicatorBase, html) { // jscs:ignore
    /**
     * Provides functionalty for displaying pedal movement values
     * @alias PedalIndicator 
     * @constructor
     * @extends IndicatorBase
     * @param {Object} options - options object
     */
    var PedalIndicator = function (options) {
        var instance = this;
        options.template = html;
        Inheritance.inheritConstructor(IndicatorBase, this, options);
        this.init("pedal-svg", function () {
            instance.pedalLeftElement = instance.svgElement.getElementById("pedal-left-element");
            instance.pedalRightElement = instance.svgElement.getElementById("pedal-right-element");
            instance.pedalLeftElement.setAttribute("transform", "");
            instance.pedalRightElement.setAttribute("transform", "");
        });
    };
    Inheritance.inheritPrototype(PedalIndicator, IndicatorBase);
    /** */
    PedalIndicator.prototype.update = function (leftY, rightY) {
        if (this.isReady) {
            var yleftValue, yRightValue;
            // TODO: BoundCheck einbauen
            // Set proper x value
            if (this.isPositiveNumber(leftY)) {
                yleftValue = this.calculatePercentage(leftY, this.svgBounds.high);
            } else if (this.isNegativeNumber(leftY)) {
                yleftValue = this.calculatePercentage(leftY, this.svgBounds.low);
            } else {
                yleftValue = 0;
            }
            // Set proper y value
            if (this.isPositiveNumber(rightY)) {
                yRightValue = this.calculatePercentage(rightY, this.svgBounds.high);
            } else if (this.isNegativeNumber(rightY)) {
                yRightValue = this.calculatePercentage(rightY, this.svgBounds.low);
            } else {
                yRightValue = 0;
            }
            this.pedalLeftElement.attributes.transform.nodeValue = "translate(0, " + (yleftValue) + ")";
            this.pedalRightElement.attributes.transform.nodeValue = "translate(0, " + (yRightValue) + ")";
        }
    };
    return PedalIndicator;
});