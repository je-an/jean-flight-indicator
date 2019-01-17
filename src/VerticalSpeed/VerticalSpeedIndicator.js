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
                instance.varioElement = instance.svgElement.getElementById("vario-element");
                instance.varioElement.setAttribute("transform", "");
                instance.upValueText = instance.svgElement.getElementById("up-value-text");
                instance.downValueText = instance.svgElement.getElementById("down-value-text");
                instance.onIndicatorReady();
            }
        });
        this.speedPerPixel = 180 / 4000;
    };
    Inheritance.inheritPrototype(VerticalSpeedIndicator, IndicatorBase);
    /** @param {Number} varioSpeed - range from -4000ft to 4000ft */
    VerticalSpeedIndicator.prototype.update = function (varioSpeed) {
        if (this.isReady) {
            var varioText = varioSpeed, up, down;
            varioSpeed = varioSpeed > 4000 ? 4000 : varioSpeed;
            varioSpeed = varioSpeed < -4000 ? -4000 : varioSpeed;
            var box = this.varioElement.getBBox();
            var x = box.x + (box.width * 0.93);
            var y = box.y + (box.height / 2);
            this.varioElement.attributes.transform.nodeValue = "rotate(" + (this.speedPerPixel * varioSpeed) + " " + x + " " + y + ")";
            if (this.isPositiveNumber(varioText)) {
                up = this.formatVSpeedString(varioText);
                down = "00000";
            } else if (this.isNegativeNumber(varioText)) {
                up = "00000";
                down = this.formatVSpeedString(varioText);
            }
            this.upValueText.childNodes[0].textContent = up;
            this.downValueText.childNodes[0].textContent = down;
        }
    };
    return VerticalSpeedIndicator;
});