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
        this.init({
            svgId: "pedal-svg",
            svgDataName: "pedal.svg",
            onSvgReady: function () { // jscs:ignore
                instance.pedalLeftElement = instance.svgElement.getElementById("pedal-left-element");
                instance.pedalRightElement = instance.svgElement.getElementById("pedal-right-element");
                instance.pedalLeftElement.setAttribute("transform", "");
                instance.pedalRightElement.setAttribute("transform", "");
                instance.onIndicatorReady();
            }
        });
        this.bounds = {
            high: 373
        };
    };
    Inheritance.inheritPrototype(PedalIndicator, IndicatorBase);
    /** 
     * @param {Number} leftY - y value for movement of left pedal -> range from 1 to 0
     * @param {Number} rightY - y value for movement of right pedal -> range from 1 to 0
     */
    PedalIndicator.prototype.update = function (leftY, rightY) {
        if (this.isReady) {
            leftY = leftY > 1 ? 1 : leftY;
            leftY = leftY < 0 ? 0 : leftY;
            rightY = rightY > 1 ? 1 : rightY;
            rightY = rightY < 0 ? 0 : rightY;

            var yleftValue, yRightValue;
            yleftValue = this.calculatePercentage(leftY, this.bounds.high);
            yRightValue = this.calculatePercentage(rightY, this.bounds.high);
    
            this.pedalLeftElement.attributes.transform.nodeValue = "translate(0, " + (yleftValue) + ")";
            this.pedalRightElement.attributes.transform.nodeValue = "translate(0, " + (yRightValue) + ")";
        }
    };
    return PedalIndicator;
});