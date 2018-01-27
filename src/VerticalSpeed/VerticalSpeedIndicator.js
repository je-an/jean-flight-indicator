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
            }
        });
        this.speedPerPixel = 180 / 4000;
    };
    Inheritance.inheritPrototype(VerticalSpeedIndicator, IndicatorBase);
    /** @param {Number} varioSpeed - range from -4000ft to 4000ft */
    VerticalSpeedIndicator.prototype.update = function (varioSpeed) {
        if (this.isReady) {
            varioSpeed = varioSpeed > 4000 ? 4000 : varioSpeed;
            varioSpeed = varioSpeed < -4000 ? -4000 : varioSpeed;
            var box = this.varioElement.getBBox();
            box.x = box.x + (box.width * 0.93);
            box.y = box.y + (box.height / 2);
            this.varioElement.attributes.transform.nodeValue = "rotate(" + (this.speedPerPixel * varioSpeed) + " " + box.x + " " + box.y + ")";
        }
    };
    return VerticalSpeedIndicator;
});