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
                instance.onIndicatorReady();
            }
        });
        this.maxTurn = 17.5;
        this.maxSlip = 84;
    };
    Inheritance.inheritPrototype(TurnIndicator, IndicatorBase);
    /** 
     * @param {Number} turn - range from -3°/sec to 3°/sec
     * @param {Number} slip - range from -1 to 1
     */
    TurnIndicator.prototype.update = function (turn, slip) {
        if (this.isReady) {
            var box = this.vehicle.getBBox();
            var x = box.x + (box.width / 2);
            var y = box.y + (box.height / 2);
            
            turn = turn > 3 ? 3 : turn;
            turn = turn < -3 ? -3 : turn;

            slip = slip > 1 ? 1 : slip;
            slip = slip < -1 ? -1 : slip;

            this.vehicle.attributes.transform.nodeValue = "rotate(" + (turn / 3) * this.maxTurn + " " + x + " " + y + ")";
            this.ball.attributes.transform.nodeValue = "translate(" + slip * this.maxSlip + ", 0)";
        }
    };
    return TurnIndicator;
});