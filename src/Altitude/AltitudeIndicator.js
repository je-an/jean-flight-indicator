define(["Inheritance", "IndicatorBase", "text!altitude-html"], function (Inheritance, IndicatorBase, html) { // jscs:ignore
    /**
     * Provides functionality for displaying altitude values
     * @alias AltitudeIndicator 
     * @constructor
     * @extends IndicatorBase
     * @param {Object} options - options object
     */
    var AltitudeIndicator = function (options) {
        var instance = this;
        options.template = html;
        Inheritance.inheritConstructor(IndicatorBase, this, options);
        this.init({
            svgId: "altitude-svg",
            svgDataName: "altitude.svg",
            onSvgReady: function () { // jscs:ignore
                instance.altitudeValueText = instance.svgElement.getElementById("altitude-value-text");
                instance.hundredNeedle = instance.svgElement.getElementById("needle-alt-hundred");
                instance.thousandNeedle = instance.svgElement.getElementById("needle-alt-thousand");
                instance.tenthousandNeedle = instance.svgElement.getElementById("needle-alt-tenthousand");
                instance.hundredNeedle.setAttribute("transform", "");
                instance.thousandNeedle.setAttribute("transform", "");
                instance.tenthousandNeedle.setAttribute("transform", "");
            }
        });
        this.degreePerHundredFeet = 360 / 1000;
        this.degreePerThousandFeet = 360 / 10000;
        this.degreePerTenthousandFeet = 360 / 100000;
    };
    Inheritance.inheritPrototype(AltitudeIndicator, IndicatorBase);
    /** @param {Number} feet - range from 0ft to 99.999ft */
    AltitudeIndicator.prototype.update = function (feet) {
        if (this.isReady) {
            feet = feet > 100000 ? 100000 : feet;
            feet = feet < 0 ? 0 : feet;

            var box = this.hundredNeedle.getBBox();
            box.x = box.x + (box.width / 2);
            box.y = box.y + box.height * 0.94;

            var degreePerHundredFeet = this.degreePerHundredFeet,
                degreePerThousandFeet = this.degreePerThousandFeet,
                degreePerTenthousandFeet = this.degreePerTenthousandFeet;

            console.log(feet);
            this.hundredNeedle.attributes.transform.nodeValue = "rotate(" + degreePerHundredFeet * feet + " " + box.x + " " + box.y + ")";
            this.thousandNeedle.attributes.transform.nodeValue = "rotate(" + degreePerThousandFeet * feet + " " + box.x + " " + box.y + ")";
            this.tenthousandNeedle.attributes.transform.nodeValue = "rotate(" + degreePerTenthousandFeet * feet + " " + box.x + " " + box.y + ")";
            this.altitudeValueText.childNodes[0].textContent = this.formatFeetString(feet);
        }
    };
    return AltitudeIndicator;
});