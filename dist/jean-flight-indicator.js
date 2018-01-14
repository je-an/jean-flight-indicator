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
define('IndicatorBase',["TypeCheck", "Interface"], function (TypeCheck, Interface) { // jscs:ignore
    /**
     * Provides functionalty for displaying flight parameters 
     * @alias IndicatorBase 
     * @abstract
     * @constructor
     * @param {Object} options - options object
     */
    var IndicatorBase = function (options) {
        Interface.areMembersImplemented(["svgElement"], this);
        Interface.areMethodsImplemented(["update"], this);
        this.bounds = {
            high: 175,
            low: -175
        };
    };
    /** @param {String} id - id of the svg object element */
    IndicatorBase.prototype.init = function (id) {
        var a = document.getElementById(id);
        this.svgElement = a.contentDocument;
    };
    /** */
    IndicatorBase.prototype.calculatePercentage = function (value, bound) {
        return value * bound;
    };
    /** */
    IndicatorBase.prototype.isPositiveNumber = function (number) {
        return number > 0;
    };
    IndicatorBase.prototype.isNegativeNumber = function (number) {
        return number < 0;
    };
    return IndicatorBase;
});
define('StickIndicator',["Inheritance", "IndicatorBase"], function (Inheritance, IndicatorBase) { // jscs:ignore
    /**
     * Provides functionalty for displaying stick movement values 
     * @alias StickIndicator 
     * @constructor
     * @extends IndicatorBase
     * @param {Object} options - options object
     */
    var StickIndicator = function (options) {
        this.svgElement = null;
        Inheritance.inheritConstructor(IndicatorBase, this, options);
        this.init("stick-svg");
        this.stickElement = this.svgElement.getElementById("stick-element");
        this.stickElement.setAttribute("transform", "");
    };
    Inheritance.inheritPrototype(StickIndicator, IndicatorBase);
    /** 
     * @param {Number} x - x value for movement of stick -> Range from -1 to 1
     * @param {Number} y - y value for movement of stick -> Range from -1 to 1
     */
    StickIndicator.prototype.update = function (x, y) {
        var xValue, yValue;
        // TODO: BoundCheck einbauen
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

        this.stickElement.attributes.transform.nodeValue = "translate(" + xValue + ", " + (-yValue) + ")";
    };
    return StickIndicator;
});
define('PedalIndicator',["Inheritance", "IndicatorBase"], function (Inheritance, IndicatorBase) { // jscs:ignore
    /**
     * Provides functionalty for displaying pedal movement values
     * @alias PedalIndicator 
     * @constructor
     * @extends IndicatorBase
     * @param {Object} options - options object
     */
    var PedalIndicator = function (options) {
        this.svgElement = null;
        Inheritance.inheritConstructor(IndicatorBase, this, options);
        this.init("pedal-svg");
        this.pedalLeftElement = this.svgElement.getElementById("pedal-left-element");
        this.pedalRightElement = this.svgElement.getElementById("pedal-right-element");
        this.pedalLeftElement.setAttribute("transform", "");
        this.pedalRightElement.setAttribute("transform", "");
    };
    Inheritance.inheritPrototype(PedalIndicator, IndicatorBase);
    /** */
    PedalIndicator.prototype.update = function (leftY, rightY) {
        var yleftValue, yRightValue;
        // TODO: BoundCheck einbauen
        // Set proper x value
        if (this.isPositiveNumber(leftY)) {
            yleftValue = this.calculatePercentage(leftY, this.bounds.high);
        } else if (this.isNegativeNumber(leftY)) {
            yleftValue = this.calculatePercentage(leftY, this.bounds.low);
        } else {
            yleftValue = 0;
        }
        // Set proper y value
        if (this.isPositiveNumber(rightY)) {
            yRightValue = this.calculatePercentage(rightY, this.bounds.high);
        } else if (this.isNegativeNumber(rightY)) {
            yRightValue = this.calculatePercentage(rightY, this.bounds.low);
        } else {
            yRightValue = 0;
        }
        this.pedalLeftElement.attributes.transform.nodeValue = "translate(0, " + (yleftValue) + ")";
        this.pedalRightElement.attributes.transform.nodeValue = "translate(0, " + (yRightValue) + ")";
    };
    return PedalIndicator;
});
define('CollectiveIndicator',["Inheritance", "IndicatorBase"], function (Inheritance, IndicatorBase) { // jscs:ignore
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
define('src/FlightIndicator',[
    "StickIndicator",
    "PedalIndicator",
    "CollectiveIndicator"
], function (
    StickIndicator,
    PedalIndicator,
    CollectiveIndicator
) {
        /**
         * Provides functionalty for displaying flight parameters 
         * @alias FlightIndicator 
         * @constructor
         */
        return {
            Stick: StickIndicator,
            Pedal: PedalIndicator,
            Collective: CollectiveIndicator
        };
    });

 	 return require('src/FlightIndicator'); 
}));
