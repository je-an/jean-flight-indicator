define([ // jscs:ignore
    "Inheritance",
    "IndicatorBase",
    "text!vertical-speed-html"
], function (Inheritance, IndicatorBase, html) { // jscs:ignore
    /**
     * Provides functionalty for displaying compass values
     * @alias VerticalSpeedIndicator 
     * @constructor
     * @extends IndicatorBase
     * @param {Object} options - options object
     */
    var VerticalSpeedIndicator = function (options) {
        var instance = this;
        options.template = html;
        Inheritance.inheritConstructor(IndicatorBase, this, options);
        this.init({
            svgId: "vertical-speed-svg",
            svgDataName: "vertical-speed.svg",
            onSvgReady: function () { // jscs:ignore
                instance.speedNeedle = instance.svgElement.getElementById("vario-element");
            }
        });
    };
    Inheritance.inheritPrototype(VerticalSpeedIndicator, IndicatorBase);
    /** @param {Number} speedInKts - range from 0 to 160 */
    VerticalSpeedIndicator.prototype.update = function (speedInKts) {
        if (this.isReady) {
            speedInKts = speedInKts > 160 ? 160 : speedInKts;
            speedInKts = speedInKts < 0 ? 0 : speedInKts;
            var box = this.speedNeedle.getBBox();
            box.x = box.x + (box.width / 2);
            box.y = box.y + box.height * 0.94; 
            this.speedNeedle.attributes.transform.nodeValue = "rotate(" + speedInKts * 2 + " " + box.x + " " + box.y + ")";
            this.speedValueText.childNodes[0].textContent = this.formatDegreeString(speedInKts);
        }
    };
    return VerticalSpeedIndicator;
});