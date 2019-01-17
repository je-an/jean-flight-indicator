define([ // jscs:ignore
    "Inheritance",
    "IndicatorBase",
    "text!speed-html"
], function (Inheritance, IndicatorBase, html) { // jscs:ignore
    /**
     * Provides functionalty for displaying compass values
     * @alias SpeedIndicator 
     * @constructor
     * @extends IndicatorBase
     * @param {Object} options - options object
     */
    var SpeedIndicator = function (options) {
        var instance = this;
        options.template = html;
        Inheritance.inheritConstructor(IndicatorBase, this, options);
        this.init({
            svgId: "speed-svg",
            svgDataName: "speed.svg",
            onSvgReady: function () { // jscs:ignore
                instance.speedNeedle = instance.svgElement.getElementById("speed-needle");
                instance.speedValueText = instance.svgElement.getElementById("speed-value-text");
                instance.speedNeedle.setAttribute("transform", "");
                instance.onIndicatorReady();
            }
        });
    };
    Inheritance.inheritPrototype(SpeedIndicator, IndicatorBase);
    /** @param {Number} speedInKts - range from 0 to 160 */
    SpeedIndicator.prototype.update = function (speedInKts) {
        if (this.isReady) {
            speedInKts = speedInKts > 160 ? 160 : speedInKts;
            speedInKts = speedInKts < 0 ? 0 : speedInKts;
            var box = this.speedNeedle.getBBox();
            var x = box.x + (box.width / 2);
            var y = box.y + box.height * 0.94; 
            this.speedNeedle.attributes.transform.nodeValue = "rotate(" + speedInKts * 2 + " " + x + " " + y + ")";
            this.speedValueText.childNodes[0].textContent = this.formatSpeedDegreeString(speedInKts);
        }
    };
    return SpeedIndicator;
});