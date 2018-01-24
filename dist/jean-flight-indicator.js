(function (root, factory) { 
 	 if (typeof define === 'function' && define.amd) { 
	 	 define([], factory); 
	} else { 
	 	root.FlightIndicator = root.FlightIndicator || {}; 
	 	root.FlightIndicator = factory();
	}
}(this, function() {
var require, define;
(function (window) {
    var modules = { resolved: {}, unresolved: {} };
    function getResolvedModules(dependencies) {
        for (var i = 0, resolvedModules = []; i < dependencies.length; i++) {
            var resolvedModule = modules.resolved[dependencies[i]];
            if (resolvedModule) {
                resolvedModules.push(resolvedModule);
            }
        }
        return resolvedModules;
    }
    function checkUnresolved() {
        for (var id in modules.unresolved) {
            var module = modules.unresolved[id];
            var resolvedModules = getResolvedModules(module.dependencies);
            resolve(id, module.factory, module.dependencies, resolvedModules, false);
        }
    }
    function resolve(id, factory, dependencies, resolvedModules, saveUnresolved) {
        if (resolvedModules.length === dependencies.length) {
            modules.resolved[id] = factory.apply(factory, resolvedModules);
        } else if (saveUnresolved) {
            modules.unresolved[id] = {
                dependencies: dependencies,
                factory: factory
            }
        }
    }
    define = function (id, dependencies, factory) {
        if (modules.resolved[id]) {
            console.warn("There is already a module with id <" + id + "> defined. Therefore this module will be ignored");
            return;
        } else if ((typeof id !== "string") || (!Array.isArray(dependencies)) || (typeof factory !== "function")) {
            console.warn("Passed arguments for module are invalid");
            return;
        }
        if (dependencies.length === 0) {
            resolve(id, factory, dependencies, [], false);
        } else {
            resolve(id, factory, dependencies, getResolvedModules(dependencies), true);
        }
        checkUnresolved();
    };
    define.amd = {}; 
    require = function (dependencies, factory) {
        dependencies = Array.isArray(dependencies) ? dependencies : [dependencies];
        var resolvedModules = getResolvedModules(dependencies);
        if(resolvedModules.length === 1 && !factory){
            return resolvedModules[0];
        }
        if (resolvedModules.length === dependencies.length && factory) {
            factory.apply(factory, resolvedModules);
        } else {
            throw new Error("Not all modules are resolved");
        }
    };
})();
define("node_modules/jean-amd/dist/jean-amd", function(){});

define('TypeCheck',[], function () {
    return {
        /**
         * Checks if provided element type is string
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element type is string, false otherwise
         */
        isString: function (o) {
            return (typeof o === "string") ? true : false;
        },
        /** 
         * Checks if provided element type is boolean
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element type is boolean, false otherwise
         */
        isBoolean: function (o) {
            return (typeof o === "boolean") ? true : false;
        },
        /**
         * Checks if provided element type is boolean
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element type is boolean, false otherwise
         */
        isNumber: function (o) {
            return (typeof o === "number") ? true : false;
        },
        /**
         * Checks if provided element is an object
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element is empty, false otherwise
         */
        isObject: function (o) {
            var isObject = false;
            if (this.isString(o) || this.isFunction(o)) {
                return false;
            }
            if (this.isEmptyObject(o)) {
                return true;
            }
            for (var k in o) {
                if (o.hasOwnProperty(k)) {
                    isObject = true;
                    break;
                }
            }
            return isObject;
        },
        /**
         * Checks if provided element is an empty object
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element is empty, false otherwise
         */
        isEmptyObject: function (o) {
            var isEmpty = true;
            if (!this.isDefined(o) || this.isBoolean(o) || this.isFunction(o) ||
                this.isNumber(o) || this.isString(o) || Array.isArray(o)) {
                return false;
            }
            for (var k in o) {
                if (o.hasOwnProperty(k)) {
                    isEmpty = false;
                    break;
                }
            }
            return isEmpty;
        },
        /**
        * Checks if provided element is a function
        * @public
        * @memberof TypeCheck
        * @param {Any} o - element to be checked
        * @returns {Boolean} True, if element is a function, false otherwise
        */
        isFunction: function (o) {
            return (typeof o === "function") ? true : false;
        },
        /**
         * Checks if provided element is defined
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element is defined, false otherwise
         */
        isDefined: function (o) {
            return (o !== undefined && o != null);
        },
        /**
         * Checks if provided element is an array
         * @public 
         * @memberOf TypeCheck
         * @param {Any} o - element to be checked
         */
        isArray: function(o){
            return Array.isArray(o);
        },
        /**
         * Checks if all elements in this array have the same type
         * @public
         * @memberof TypeCheck
         * @throws {TypeError} - If options.type is not a string
         * @throws {TypeError} - If options.array is not a string
         * @param {Any[]} array - Array to be checked
         * @param {String} type - Type of elements in this array. Valid values are all which matches 
         *                        to the typeof operator
         * @returns {Boolean} - true if all elements in the array have the same type, false otherwise
         */
        isArrayTypeOf: function (array, type) {
            var isTypeOf = true;
            if (!this.isString(type)) {
                throw new TypeError("options.type is not a string");
            }
            if (!Array.isArray(array)) {
                throw new TypeError("options.array is not an array");
            }
            if (array.length === 0) {
                isTypeOf = false;
            }
            for (var i = 0, length = array.length; i < length; i++) {
                var o = array[i];
                if (typeof o !== type) {
                    isTypeOf = false;
                    break;
                }
            }
            return isTypeOf;
        }
    };
});
define('Inheritance',["TypeCheck"], function (TypeCheck) {
    return {
        /**
         * Inherits constructor values
         * @param {Function} testator - Testator constructor which must be called for inheritance
         * @param {Object} instance - Instance of the inheritor
         * @param {Any[]|Object} options - Options, which will be passed to the testator
         * @returns {Boolean} - True if constructor values are inherited, false otherwise
         */
        inheritConstructor: function (testator, instance, options) {
            var isInherited = false, options = options ? options : {};
            if (TypeCheck.isFunction(testator) && TypeCheck.isObject(instance)) {
                if (Array.isArray(options)) {
                    testator.apply(instance, options);
                } else {
                    testator.apply(instance, [options]);
                }
                isInherited = true;
            }
            return isInherited;
        },
        /**
         * Inherits prototype from testator to inheritor
         * @param {Function} inheritor - The method which will be inherited from testator
         * @param {Function} testator - The method which pass its prototype to inheritor
         * @returns {Boolean} - True if prototype values are inherited, false otherwise
         */
        inheritPrototype: function (inheritor, testator) {
            var isInherited = false;
            if (TypeCheck.isFunction(inheritor) && TypeCheck.isFunction(testator)) {
                inheritor.prototype = Object.create(testator.prototype);
                inheritor.prototype.constructor = inheritor;
                isInherited = true;
            }
            return isInherited;
        }
    }
});
define('NotImplementedError',[], function () {
    /**
     * Represents a error message for non implemented methods
     * @param {String} message - message of error
     */
    var NotImplementedError = function (message) {
        this.name = "NotImplementedError";
        this.message = (message || "Function must be implemented in Class");
    };
    NotImplementedError.prototype = Error.prototype; 
    return NotImplementedError;
}); 
define('Failure',[], function () {
    /**
     * Provides error throwing functionality 
     * @alias Failure 
     */
    return {
        /**
         * Throws an Error with the provided errorMessage
         * @throws {Error}
         * @param {String} [errorMessage=String.Empty] - Message which shall be displayed for this Error
         */
        throwError: function (errorMessage) {
            throw new Error(errorMessage);
        },
        /**
         * Throws an TypeError with the provided errorMessage
         * @throws {TypeError}
         * @param {String} [errorMessage=String.Empty] - Message which shall be displayed for this TypeError
         */
        throwTypeError: function (errorMessage) {
            throw new TypeError(errorMessage);
        }
    };
});
define('Interface',["NotImplementedError", "TypeCheck", "Failure"], function (NotImplementedError, TypeCheck, Failure) {
    return {
        /**
         * Checks if <memberList is implemented in constructor of <instance>
         * @public
         * @memberof Interface
         * @throws {TypeError} - If instance is undefined
         * @throws {TypeError} - If methodList is no a string array
         * @throws {NotImplementedError} - If method is not implemented
         * @param {String[]} memberList - Contains all method names
         * @param {Object} instance - Object which shall be checked
         * @returns {Boolean} - True, if members are implemented
         */
        areMembersImplemented: function (memberList, instance) {
            if (!TypeCheck.isObject(instance)) {
                Failure.throwTypeError("instance is not an object");
            }
            if (!TypeCheck.isArrayTypeOf(memberList, "string")) {
                Failure.throwTypeError("memberList is no a string array");
            }
            for (var i = 0; i < memberList.length; i++) {
                if (!instance.hasOwnProperty(memberList[i])) {
                    throw new TypeError("Member <" + memberList[i] + "> is not implemented");
                }
            }
            return true;
        },
        /**
         * Checks if <methodList>, is implemented in prototype of <instance>
         * @public
         * @memberof Interface
         * @throws {TypeError} - If instance is not an object
         * @throws {TypeError} - If methodList is no a string array
         * @throws {NotImplementedError} - If method is not implemented
         * @param {String[]} methodList - Contains all method names
         * @param {Object} instance - Object which shall be checked
         * @returns {Boolean} - True, if methods are implemented
         */
        areMethodsImplemented: function (methodList, instance) {
            if (!TypeCheck.isObject(instance)) {
                Failure.throwTypeError("instance is not an object");
            }
            if (!TypeCheck.isArrayTypeOf(methodList, "string")) {
                Failure.throwTypeError("methodList is no a string array");
            }
            var prototype = Object.getPrototypeOf(instance);
            for (var i = 0; i < methodList.length; i++) {
                if (!prototype.hasOwnProperty(methodList[i])) {
                    throw new NotImplementedError("Method " + methodList[i] + " is not implemented");
                }
            }
            return true;
        }
    };
}); 
define('BaseOptions',[
], function () {
    return {
        assets: "img/"
    };
});
define('IndicatorBase',[ // jscs:ignore
    "TypeCheck",
    "Interface",
    "Failure",
    "BaseOptions"
], function (TypeCheck, Interface, Failure, BaseOptions) { // jscs:ignore
    /**
     * Provides functionalty for displaying flight parameters 
     * @alias IndicatorBase 
     * @abstract
     * @constructor
     * @param {Object} options - options object
     * @param {String} options.containerId - Id of the container, the indicator shall be placed in
     */
    var IndicatorBase = function (options) {
        if (!TypeCheck.isString(options.containerId)) {
            Failure.throwTypeError("options.containerId is not a string");
        }
        /* Interface.areMembersImplemented(["svgElement"], this); */
        Interface.areMethodsImplemented(["update"], this);
        this.svgElement = null;
        this.options = options;
        this.container = null;
        this.isReady = false;
    };
    /** 
     * @param {Object} options - options object
     * @param {String} options.svgId - id of the svg object element 
     * @param {String} options.svgDataName - data name of the svg
     * @param {Function} options.onSvgReady - Gets called, if the svg is loaded into DOM
     */
    IndicatorBase.prototype.init = function (options) {
        var id = this.options.containerId;
        this.container = document.getElementById(id);
        if (!this.container) {
            Failure.throwTypeError("There is no indicator container with id: " + id);
        }
        this.container.innerHTML = this.options.template;

        var svg = document.getElementById(options.svgId), instance = this;
        svg.data = BaseOptions.assets + options.svgDataName;
        svg.addEventListener('load', function () {
            instance.svgElement = svg.contentDocument;
            instance.isReady = true;
            options.onSvgReady();
        }, true);
    };
    /** */
    IndicatorBase.prototype.calculatePercentage = function (value, bound) {
        return Math.abs(value) * bound;
    };
    /** */
    IndicatorBase.prototype.isPositiveNumber = function (number) {
        return number > 0;
    };
    /** */
    IndicatorBase.prototype.isNegativeNumber = function (number) {
        return number < 0;
    };
    /** */
    IndicatorBase.prototype.formatDegreeString = function (degree) {
        var s = "";
        degree = degree.toFixed(0);
        degree = degree.toString();
        switch (degree.length) {
            case 1:
                s = "00" + degree;
                break;
            case 2:
                s = "0" + degree;
                break;
            case 3:
                s = degree;
                break;
            case 4:
                s = degree;
                break;
        }
        return s;
    };
    /** */
    IndicatorBase.prototype.formatFeetString = function(feet){
        var s = "";
        feet = feet.toFixed(0);
        feet = feet.toString();
        switch (feet.length) {
            case 1:
                s = "0000" + feet;
                break;
            case 2:
                s = "000" + feet;
                break;
            case 3:
                s = "00" + feet;
                break;
            case 4:
                s = "0" + feet;
                break;
            case 5:
                s = feet;
                break;
        }
        return s;
    };
    /** */
    IndicatorBase.prototype.getElementCenter = function (element) {
        var box = element.getBBox();
        return {
            x: box.x + (box.width / 2),
            y: box.y + (box.height / 2)
        };
    };
    return IndicatorBase;
});
define('text',{load: function(id){throw new Error("Dynamic load not allowed: " + id);}});

define('text!compass-html',[],function () { return '<div id="compass-module" style="width: 100%">\r\n    <object id="compass-svg" style="width: 100%" data="" type="image/svg+xml"></object>\r\n</div>';});

define('CompassIndicator',[ // jscs:ignore
    "Inheritance",
    "IndicatorBase",
    "text!compass-html"
], function (Inheritance, IndicatorBase, html) { // jscs:ignore
    /**
     * Provides functionalty for displaying compass values
     * @alias CompassIndicator 
     * @constructor
     * @extends IndicatorBase
     * @param {Object} options - options object
     */
    var CompassIndicator = function (options) {
        var instance = this;
        options.template = html;
        Inheritance.inheritConstructor(IndicatorBase, this, options);
        this.init({
            svgId: "compass-svg",
            svgDataName: "compass.svg",
            onSvgReady: function () { // jscs:ignore
                instance.compassRose = instance.svgElement.getElementById("compass-rose");
                instance.compassValueText = instance.svgElement.getElementById("compass-value-text");
                instance.compassRose.setAttribute("transform", "");
            }
        });
    };
    Inheritance.inheritPrototype(CompassIndicator, IndicatorBase);
    /** @param {Number} degree - range from -360 to 360 */
    CompassIndicator.prototype.update = function (degree) {
        if (this.isReady) {
            degree = degree > 360 ? 360 : degree;
            degree = degree < -360 ? -360 : degree;

            var center = this.getElementCenter(this.compassRose);
            this.compassRose.attributes.transform.nodeValue = "rotate(" + -degree + " " + center.x + " " + center.y + ")";

            this.compassValueText.childNodes[0].textContent = this.formatDegreeString(degree);
        }
    };
    return CompassIndicator;
});

define('text!speed-html',[],function () { return '<div id="speed-module" style="width: 100%">\r\n    <object id="speed-svg" style="width: 100%" data="" type="image/svg+xml"></object>\r\n</div>';});

define('SpeedIndicator',[ // jscs:ignore
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
            box.x = box.x + (box.width / 2);
            box.y = box.y + box.height * 0.94; 
            this.speedNeedle.attributes.transform.nodeValue = "rotate(" + speedInKts * 2 + " " + box.x + " " + box.y + ")";
            this.speedValueText.childNodes[0].textContent = this.formatDegreeString(speedInKts);
        }
    };
    return SpeedIndicator;
});

define('text!altitude-html',[],function () { return '<div id="altitude-module" style="width: 100%">\r\n    <object id="altitude-svg" style="width: 100%" data="" type="image/svg+xml"></object>\r\n</div>';});

define('AltitudeIndicator',["Inheritance", "IndicatorBase", "text!altitude-html"], function (Inheritance, IndicatorBase, html) { // jscs:ignore
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

            this.hundredNeedle.attributes.transform.nodeValue = "rotate(" + degreePerHundredFeet * feet + " " + box.x + " " + box.y + ")";
            this.thousandNeedle.attributes.transform.nodeValue = "rotate(" + degreePerThousandFeet * feet + " " + box.x + " " + box.y + ")";
            this.tenthousandNeedle.attributes.transform.nodeValue = "rotate(" + degreePerTenthousandFeet * feet + " " + box.x + " " + box.y + ")";
            this.altitudeValueText.childNodes[0].textContent = this.formatFeetString(feet);
        }
    };
    return AltitudeIndicator;
});

define('text!stick-html',[],function () { return '<div id="stick-module" style="width: 100%">\r\n    <object id="stick-svg" style="width: 100%" data="" type="image/svg+xml"></object>\r\n</div>';});

define('StickIndicator',["Inheritance", "IndicatorBase", "text!stick-html"], function (Inheritance, IndicatorBase, html) { // jscs:ignore
    /**
     * Provides functionalty for displaying stick movement values 
     * @alias StickIndicator 
     * @constructor
     * @extends IndicatorBase
     * @param {Object} options - options object
     */
    var StickIndicator = function (options) {
        var instance = this;
        options.template = html;
        Inheritance.inheritConstructor(IndicatorBase, this, options);
        this.init({
            svgId: "stick-svg",
            svgDataName: "stick.svg",
            onSvgReady: function () { // jscs:ignore
                instance.stickElement = instance.svgElement.getElementById("stick-element");
                instance.stickElement.setAttribute("transform", "");
            }
        });
        this.bounds = {
            high: 175,
            low: -175
        };
    };
    Inheritance.inheritPrototype(StickIndicator, IndicatorBase);
    /** 
     * @param {Number} x - x value for movement of stick -> Range from -1 to 1
     * @param {Number} y - y value for movement of stick -> Range from -1 to 1
     */
    StickIndicator.prototype.update = function (x, y) {
        if (this.isReady) {
            var xValue, yValue;
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
            }
            this.stickElement.attributes.transform.nodeValue = "translate(" + xValue + ", " + -yValue + ")";
        }
    };
    return StickIndicator;
});

define('text!pedal-html',[],function () { return '<div id="pedal-module" style="width: 100%">\r\n        <object id="pedal-svg" style="width: 100%" data="" type="image/svg+xml"></object>\r\n    </div>';});

define('PedalIndicator',["Inheritance", "IndicatorBase", "text!pedal-html"], function (Inheritance, IndicatorBase, html) { // jscs:ignore
    /**
     * Provides functionalty for displaying pedal movement values
     * @alias PedalIndicator 
     * @constructor
     * @extends IndicatorBase
     * @param {Object} options - options object
     */
    var PedalIndicator = function (options) {
        var instance = this;
        options.template = html;
        Inheritance.inheritConstructor(IndicatorBase, this, options);
        this.init({
            svgId: "pedal-svg",
            svgDataName: "pedal.svg",
            onSvgReady: function () { // jscs:ignore
                instance.pedalLeftElement = instance.svgElement.getElementById("pedal-left-element");
                instance.pedalRightElement = instance.svgElement.getElementById("pedal-right-element");
                instance.pedalLeftElement.setAttribute("transform", "");
                instance.pedalRightElement.setAttribute("transform", "");
            }
        });
        this.bounds = {
            high: 373
        };
    };
    Inheritance.inheritPrototype(PedalIndicator, IndicatorBase);
    /** 
     * @param {Number} leftY - y value for movement of left pedal -> range from 1 to 0
     * @param {Number} rightY - y value for movement of right pedal -> range from 1 to 0
     */
    PedalIndicator.prototype.update = function (leftY, rightY) {
        if (this.isReady) {
            leftY = leftY > 1 ? 1 : leftY;
            leftY = leftY < 0 ? 0 : leftY;
            rightY = rightY > 1 ? 1 : rightY;
            rightY = rightY < 0 ? 0 : rightY;

            var yleftValue, yRightValue;
            yleftValue = this.calculatePercentage(leftY, this.bounds.high);
            yRightValue = this.calculatePercentage(rightY, this.bounds.high);
    
            this.pedalLeftElement.attributes.transform.nodeValue = "translate(0, " + (yleftValue) + ")";
            this.pedalRightElement.attributes.transform.nodeValue = "translate(0, " + (yRightValue) + ")";
        }
    };
    return PedalIndicator;
});

define('text!collective-html',[],function () { return '<div id="collective-module" style="width: 100%">\r\n    <object id="collective-svg" style="width: 100%" data="" type="image/svg+xml"></object>\r\n</div>';});

define('CollectiveIndicator',["Inheritance", "IndicatorBase", "text!collective-html"], function (Inheritance, IndicatorBase, html) { // jscs:ignore
    /**
     * Provides functionalty for displaying collective movement values
     * @alias CollectiveIndicator 
     * @constructor
     * @extends IndicatorBase
     * @param {Object} options - options object
     */
    var CollectiveIndicator = function (options) {
        var instance = this;
        options.template = html;
        Inheritance.inheritConstructor(IndicatorBase, this, options);
        this.init({
            svgId: "collective-svg",
            svgDataName: "collective.svg",
            onSvgReady: function () { // jscs:ignore
                instance.collectiveElement = instance.svgElement.getElementById("collective-element");
                instance.collectiveValueText = instance.svgElement.getElementById("collective-value-text");
                instance.collectiveElement.setAttribute("transform", "");
            }
        });
    };
    Inheritance.inheritPrototype(CollectiveIndicator, IndicatorBase);
    /** @param {Number} degree - range from 0 to 60 */
    CollectiveIndicator.prototype.update = function (degree) {
        if (this.isReady) {
            degree = degree > 60 ? 60 : degree;
            degree = degree < 0 ? 0 : degree;

            var coord = this.collectiveElement.getBBox();
            var centerX = coord.x;
            var centerY = coord.y + (coord.height / 2);
            this.collectiveElement.attributes.transform.nodeValue = "rotate(" + -degree + " " + centerX + " " + centerY + ")";
            this.collectiveValueText.childNodes[0].textContent = this.formatDegreeString(degree);
        }
    };
    return CollectiveIndicator;
});
define('src/base/FlightIndicator',[
    "TypeCheck",
    "CompassIndicator",
    "SpeedIndicator",
    "AltitudeIndicator",
    "StickIndicator",
    "PedalIndicator",
    "CollectiveIndicator",
    "BaseOptions"
], function (
    TypeCheck,
    CompassIndicator,
    SpeedIndicator,
    AltitudeIndicator,
    StickIndicator,
    PedalIndicator,
    CollectiveIndicator,
    BaseOptions
) {
        /**
         * Provides functionality for displaying flight parameters 
         * @alias FlightIndicator 
         * @constructor
         */
        return {
            Compass: CompassIndicator,
            Speed: SpeedIndicator,
            Altitude: AltitudeIndicator,
            Stick: StickIndicator,
            Pedal: PedalIndicator,
            Collective: CollectiveIndicator,
            /**
             * @param {Object} options - options object
             * @param {String} options.assets - path to svgs and other assets
             */
            setOptions: function (options) {
                function onStandardAssetPathUsed() { // jscs:ignore
                    console.info("The standard asset path is used");
                    return BaseOptions.assets;
                }
                BaseOptions.assets = TypeCheck.isString(options.assets) ? options.assets : onStandardAssetPathUsed()
            }
        };
    });

 	 return require('src/base/FlightIndicator'); 
}));
