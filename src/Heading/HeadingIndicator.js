define([ // jscs:ignore
    "Inheritance",
    "IndicatorBase",
    "text!heading-html"
], function (Inheritance, IndicatorBase, html) { // jscs:ignore
    /**
     * Provides functionalty for displaying compass values
     * @alias HeadingIndicator 
     * @constructor
     * @extends IndicatorBase
     * @param {Object} options - options object
     */
    var HeadingIndicator = function (options) {
        var instance = this;
        options.template = html;
        Inheritance.inheritConstructor(IndicatorBase, this, options);
        this.init({
            svgId: "heading-svg",
            svgDataName: "heading.svg",
            onSvgReady: function () { // jscs:ignore
                instance.compassRose = instance.svgElement.getElementById("compass-rose");
                instance.compassValueText = instance.svgElement.getElementById("compass-value-text");
                instance.compassRose.setAttribute("transform", "");
                instance.onIndicatorReady();
            }
        });
    };
    Inheritance.inheritPrototype(HeadingIndicator, IndicatorBase);
    /** @param {Number} degree - range from -360 to 360 */
    HeadingIndicator.prototype.update = function (degree) {
        if (this.isReady) {
            degree = degree > 360 ? 360 : degree;
            degree = degree < -360 ? -360 : degree;

            var center = this.getElementCenter(this.compassRose);
            this.compassRose.attributes.transform.nodeValue = "rotate(" + -degree + " " + center.x + " " + center.y + ")";
            this.compassValueText.childNodes[0].textContent = this.formatCompassDegreeString(degree);
        }
    };
    return HeadingIndicator;
});