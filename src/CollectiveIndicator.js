define(["Inheritance", "IndicatorBase"], function (Inheritance, IndicatorBase) { // jscs:ignore
    /**
     * Provides functionalty for displaying collective movement values
     * @alias CollectiveIndicator 
     * @constructor
     * @extends IndicatorBase
     * @param {Object} options - options object
     */
    var CollectiveIndicator = function (options) {
        this.svgElement = null;
        Inheritance.inheritConstructor(IndicatorBase, this, options);
        this.init("collective-svg");
        this.collectiveElement = this.svgElement.getElementById("collective-element");
        this.collectiveValueText = this.svgElement.getElementById("collective-value-text");
        this.collectiveElement.setAttribute("transform", "");
    };
    Inheritance.inheritPrototype(CollectiveIndicator, IndicatorBase);
    /** */
    CollectiveIndicator.prototype.update = function (degree) {
        degree = degree > 60 ? 60 : degree;
        degree = degree < 0 ? 0 : degree;

        var coord = this.collectiveElement.getBBox();
        var centerX = coord.x;
        var centerY = coord.y + (coord.height / 2);
        this.collectiveElement.attributes.transform.nodeValue = "rotate(" + -degree + " " + centerX + " " + centerY + ")";

        degree = degree.toFixed(0);
        degree = degree.toString();
        switch (degree.length) {
            case 1:
                degree = "00" + degree;
                break;
            case 2:
                degree = "0" + degree;
                break;
            case 3:
                break;
        }
        this.collectiveValueText.childNodes[0].textContent = degree;
    };
    return CollectiveIndicator;
});