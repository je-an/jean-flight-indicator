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
                instance.ball.setAttribute("transform", "");
            }
        });
        this.maxDegree = 17.5;
    };
    Inheritance.inheritPrototype(TurnIndicator, IndicatorBase);
    /** 
     * @param {Number} turnDegree - range from -x° to x°
     * @param {Number} slip - range from -x to x
     */
    TurnIndicator.prototype.update = function (turnDegree, slip) {
        if (this.isReady) {
            var box = this.vehicle.getBBox();
            var x = box.x + (box.width / 2);
            var y = box.y + (box.height / 2);
            this.vehicle.attributes.transform.nodeValue = "rotate(" + (turnDegree) + " " + x + " " + y + ")";

           /*  var xValue, yValue;
            // Set proper x value
            if (this.isPositiveNumber(x)) {
                xValue = this.calculatePercentage(x, this.bounds.high);
            } else if (this.isNegativeNumber(x)) {
                xValue = this.calculatePercentage(x, this.bounds.low);
            } else {
                xValue = 0;
            }
            // Set proper y value
            if (this.isPositiveNumber(y)) {
                yValue = this.calculatePercentage(y, this.bounds.high);
            } else if (this.isNegativeNumber(y)) {
                yValue = this.calculatePercentage(y, this.bounds.low);
            } else {
                yValue = 0;
            } */
            this.ball.attributes.transform.nodeValue = "translate(" + slip + ", 0)";

        }
    };
    return TurnIndicator;
});