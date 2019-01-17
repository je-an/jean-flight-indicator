define(["Inheritance", "IndicatorBase", "text!collective-html"], function (Inheritance, IndicatorBase, html) { // jscs:ignore
    /**
     * Provides functionalty for displaying collective movement values
     * @alias CollectiveIndicator 
     * @constructor
     * @extends IndicatorBase
     * @param {Object} options - options object
     */
    var CollectiveIndicator = function (options) {
        var instance = this;
        options.template = html;
        Inheritance.inheritConstructor(IndicatorBase, this, options);
        this.init({
            svgId: "collective-svg",
            svgDataName: "collective.svg",
            onSvgReady: function () { // jscs:ignore
                instance.collectiveElement = instance.svgElement.getElementById("collective-element");
                instance.collectiveValueText = instance.svgElement.getElementById("collective-value-text");
                instance.collectiveElement.setAttribute("transform", "");
                instance.onIndicatorReady();
            }
        });
    };
    Inheritance.inheritPrototype(CollectiveIndicator, IndicatorBase);
    /** @param {Number} degree - range from 0 to 60 */
    CollectiveIndicator.prototype.update = function (degree) {
        if (this.isReady) {
            degree = degree > 60 ? 60 : degree;
            degree = degree < 0 ? 0 : degree;

            var coord = this.collectiveElement.getBBox();
            var centerX = coord.x;
            var centerY = coord.y + (coord.height / 2);
            this.collectiveElement.attributes.transform.nodeValue = "rotate(" + -degree + " " + centerX + " " + centerY + ")";
            this.collectiveValueText.childNodes[0].textContent = this.formatSpeedDegreeString(degree);
        }
    };
    return CollectiveIndicator;
});