define([ // jscs:ignore
    "Inheritance",
    "IndicatorBase",
    "text!turn-html"
], function (Inheritance, IndicatorBase, html) { // jscs:ignore
    /**
     * Provides functionalty for displaying turn indication
     * @alias TurnIndicator 
     * @constructor
     * @extends IndicatorBase
     * @param {Object} options - options object
     */
    var TurnIndicator = function (options) {
        var instance = this;
        options.template = html;
        Inheritance.inheritConstructor(IndicatorBase, this, options);
        this.init({
            svgId: "turn-svg",
            svgDataName: "turn.svg",
            onSvgReady: function () { // jscs:ignore
                instance.vehicle = instance.svgElement.getElementById("vehicle");
                instance.vehicle.setAttribute("transform", "");
                instance.ball = instance.svgElement.getElementById("ball");
            }
        });
        this.maxDegree = 17.5;
    };
    Inheritance.inheritPrototype(TurnIndicator, IndicatorBase);
    /** 
     * @param {Number} turnDegree - range from -x° to x°
     * @param {Number} slip - range from -x to x
     */
    TurnIndicator.prototype.update = function (turnDegree) {
        if (this.isReady) {
            var box = this.vehicle.getBBox();
            var x = box.x + (box.width / 2);
            var y = box.y + (box.height / 2);
            this.vehicle.attributes.transform.nodeValue = "rotate(" + (turnDegree) + " " + x + " " + y + ")";

        }
    };
    return TurnIndicator;
});