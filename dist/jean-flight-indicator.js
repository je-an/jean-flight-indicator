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
            var mod = factory.apply(factory, resolvedModules);
            modules.resolved[id] = mod ? mod : {};
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
            return !this.isArray(o) && o !== null && typeof o === 'object';
        },
        /**
         * Checks if provided element is an empty object
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element is empty, false otherwise
         */
        isEmptyObject: function (o) {
            var isEmpty = false;
            if (this.isObject(o) && Object.keys(o).length === 0) {
                isEmpty = true;
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
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} - true if o is an array, false otherwise
         */
        isArray: function (o) {
            return Array.isArray(o);
        },
        /**
         * Check id provided element is an empty array
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} - True if o is an empty array, false otherwise
         */
        isEmptyArray: function (o) {
            return this.isArray(o) && (o.length === 0);
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
        },
        /**
          * Checks if all objects within array have the same instance
          * @public
          * @memberof TypeCheck
          * @throws {TypeError} - If array is not an array
          * @throws {TypeError} - If constructor is not a function
          * @param {Object[]} array - The array which objects shall be checked
          * @param {Function} fn - the constructor function
          * @returns {Boolean} - True if all elements have the same instance, false otherwise
          */
        areObjectsInstanceOf: function (array, fn) {
            if (!this.isArray(array)) {
                throw new TypeError("array is not an array");
            }
            if (!this.isFunction(fn)) {
                throw new TypeError("fn is not a function");
            }
            var i, o, length = array.length, result = true;
            for (i = 0; i < length; i++) {
                o = array[i];
                if (!this.isObject(o) || !this.isInstanceOf(o, fn)) {
                    result = false;
                    break;
                }
            }
            return result;
        },
        /**
         * Checks if the objects have are instances of the provided constructors
         * @public
         * @memberof TypeCheck
         * @throws {TypeError} - If array is not an array
         * @throws {TypeError} - If constructors is not an array
         * @param {Object[]} objects - The array which objects shall be checked
         * @param {Function[]} constructors - An array of constructor functions
         * @returns {Boolean} - True if all elements have the same instance, false otherwise
         */
        areObjectsInstancesOf: function (objects, constructors) {
            var i, j, o, length = objects.length, constructorLength = constructors.length, result = true, noConstructorMatched;
            if (!this.isArray(objects)) {
                throw new TypeError("objects is not an array");
            }
            if (!this.isArray(constructors)) {
                throw new TypeError("constructors is not an array");
            }
            if (!this.isArrayTypeOf(constructors, "function")) {
                throw new TypeError("constructors is not an array of constructor functions");
            }
            for (i = 0; i < length; i++) {
                o = objects[i];
                noConstructorMatched = true;
                for (j = 0; j < constructorLength; j++) {
                    if (!this.isObject(o)) {
                        break;
                    }
                    if (this.isInstanceOf(o, constructors[j])) {
                        noConstructorMatched = false;
                        break;
                    }
                }
                if (noConstructorMatched === true) {
                    result = false;
                    break;
                }
            }
            return result;
        },
        /**
         * Checks if child is an instance of parent
         * @public
         * @memberof TypeCheck
         * @throws {TypeError} - If child is not an object
         * @throws {TypeError} - If parent is not a function
         * @param {Object} child - The object which shall be checked
         * @param {Function} parent - The function which shall be the constructor
         * @returns {Boolean} - True if child is an instance of parent, false otherwise
         */
        isInstanceOf: function (child, parent) {
            if (!this.isObject(child)) {
                throw new TypeError("child is not an object");
            }
            if (!this.isFunction(parent)) {
                throw new TypeError("parent is not a function");
            }
            return child instanceof parent;
        },
        /**
         * Checks if the provided value is a value of the provided object which is used as an enum
         * @throws {TypeError} - If value is not a string or a number
         * @throws {TypeError} - If o is not an object
         * @param {String|Number} value - the value
         * @param {Object} o - the object which shall be checked
         * @returns {Boolean} - True if value is part of o, false otherwise
         */
        isEnumValue: function (value, o) {
            if (!this.isString(value) && !this.isNumber(value)) {
                throw new TypeError("value must be a String or a Number");
            }
            if (!this.isObject(o)) {
                throw new TypeError("o is not an object");
            }
            var keys = Object.keys(o), length = keys.length, i, isValue = false;
            for (i = 0; i < length; i++) {
                if (o[keys[i]] === value) {
                    isValue = true;
                    break;
                }
            }
            return isValue;
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
            var i, length = memberList.length, member = "", notImplementedMembers = [];
            for (i = 0; i < length; i++) {
                member = memberList[i];
                if (!instance.hasOwnProperty(member)) {
                    notImplementedMembers.push(member);
                }
            }
            if (notImplementedMembers.length > 0) {
                throw new TypeError("Members " + notImplementedMembers.join(" ") + " are not implemented");
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
            var i, length = methodList.length, method = "", prototype = Object.getPrototypeOf(instance), notImplementedMethods = [];
            for (i = 0; i < length; i++) {
                method = methodList[i];
                if (!prototype.hasOwnProperty(method)) {
                    notImplementedMethods.push(method);
                }
            }
            if (notImplementedMethods.length > 0) {
                throw new NotImplementedError("Methods " + notImplementedMethods.join(" ") + " are not implemented");
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
    IndicatorBase.prototype.formatCompassDegreeString = function (degree) {
        var s = "";
        degree = degree.toFixed(0);
        if (this.isPositiveNumber(degree)) {
            degree = degree.toString();
            switch (degree.length) {
                case 1:
                    s = "000" + degree;
                    break;
                case 2:
                    s = "00" + degree;
                    break;
                case 3:
                    s = "0" + degree;
                    break;
            }
        } else if (this.isNegativeNumber(degree)) {
            degree = Math.abs(degree);
            degree = degree.toString();
            switch (degree.length) {
                case 1:
                    s = "-00" + degree;
                    break;
                case 2:
                    s = "-0" + degree;
                    break;
                case 3:
                    s = "-" + degree;
                    break;
            }
        } else {
            s = "0000";
        }
        return s;
    };
    /** */
    IndicatorBase.prototype.formatHorizonDegreeString = IndicatorBase.prototype.formatSpeedDegreeString = function (degree) {
        var s = "";
        degree = degree.toFixed(0);
        if (this.isPositiveNumber(degree)) {
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
        } else if (this.isNegativeNumber(degree)) {
            degree = Math.abs(degree);
            degree = degree.toString();
            switch (degree.length) {
                case 1:
                    s = "-0" + degree;
                    break;
                case 2:
                    s = "-" + degree;
                    break;
                case 3:
                    s = degree;
                    break;
                case 4:
                    s = degree;
                    break;
            }
        } else {
            s = "000";
        }
        return s;
    };
    /** */
    IndicatorBase.prototype.formatVSpeedString = IndicatorBase.prototype.formatAltitudeString = function (feet) {
        var s = "";
        feet = feet.toFixed(0);
        if (this.isPositiveNumber(feet)) {
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
                case 6:
                    s = feet;
                    break;
            }
        } else if (this.isNegativeNumber(feet)) {
            feet = Math.abs(feet);
            feet = feet.toString();
            switch (feet.length) {
                case 1:
                    s = "-000" + feet;
                    break;
                case 2:
                    s = "-00" + feet;
                    break;
                case 3:
                    s = "-0" + feet;
                    break;
                case 4:
                    s = "-" + feet;
                    break;
                case 5:
                    s = feet;
                    break;
                case 6:
                    s = feet;
                    break;
            }
        } else {
            s = "00000";
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

define('text!heading-html',[],function () { return '<div id="heading-module" style="width: 100%">\r\n    <object id="heading-svg" style="width: 100%" data="" type="image/svg+xml"></object>\r\n</div>';});

define('HeadingIndicator',[ // jscs:ignore
    "Inheritance",
    "IndicatorBase",
    "text!heading-html"
], function (Inheritance, IndicatorBase, html) { // jscs:ignore
    /**
     * Provides functionalty for displaying compass values
     * @alias HeadingIndicator 
     * @constructor
     * @extends IndicatorBase
     * @param {Object} options - options object
     */
    var HeadingIndicator = function (options) {
        var instance = this;
        options.template = html;
        Inheritance.inheritConstructor(IndicatorBase, this, options);
        this.init({
            svgId: "heading-svg",
            svgDataName: "heading.svg",
            onSvgReady: function () { // jscs:ignore
                instance.compassRose = instance.svgElement.getElementById("compass-rose");
                instance.compassValueText = instance.svgElement.getElementById("compass-value-text");
                instance.compassRose.setAttribute("transform", "");
            }
        });
    };
    Inheritance.inheritPrototype(HeadingIndicator, IndicatorBase);
    /** @param {Number} degree - range from -360 to 360 */
    HeadingIndicator.prototype.update = function (degree) {
        if (this.isReady) {
            degree = degree > 360 ? 360 : degree;
            degree = degree < -360 ? -360 : degree;

            var center = this.getElementCenter(this.compassRose);
            this.compassRose.attributes.transform.nodeValue = "rotate(" + -degree + " " + center.x + " " + center.y + ")";
            this.compassValueText.childNodes[0].textContent = this.formatCompassDegreeString(degree);
        }
    };
    return HeadingIndicator;
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
            var x = box.x + (box.width / 2);
            var y = box.y + box.height * 0.94; 
            this.speedNeedle.attributes.transform.nodeValue = "rotate(" + speedInKts * 2 + " " + x + " " + y + ")";
            this.speedValueText.childNodes[0].textContent = this.formatSpeedDegreeString(speedInKts);
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
            var x = box.x + (box.width / 2);
            var y = box.y + box.height * 0.94;

            var degreePerHundredFeet = this.degreePerHundredFeet,
                degreePerThousandFeet = this.degreePerThousandFeet,
                degreePerTenthousandFeet = this.degreePerTenthousandFeet;

            this.hundredNeedle.attributes.transform.nodeValue = "rotate(" + degreePerHundredFeet * feet + " " + x + " " + y + ")";
            this.thousandNeedle.attributes.transform.nodeValue = "rotate(" + degreePerThousandFeet * feet + " " + x + " " + y + ")";
            this.tenthousandNeedle.attributes.transform.nodeValue = "rotate(" + degreePerTenthousandFeet * feet + " " + x + " " + y + ")";
            this.altitudeValueText.childNodes[0].textContent = this.formatAltitudeString(feet);
        }
    };
    return AltitudeIndicator;
});

define('text!horizon-html',[],function () { return '<div id="horizon-module" style="width: 100%">\r\n    <object id="horizon-svg" style="width: 100%" data="" type="image/svg+xml"></object>\r\n</div>';});

define('HorizonIndicator',["Inheritance", "IndicatorBase", "text!horizon-html"], function (Inheritance, IndicatorBase, html) { // jscs:ignore
    /**
     * Provides functionalty for displaying pedal movement values
     * @alias HorizonIndicator 
     * @constructor
     * @extends IndicatorBase
     * @param {Object} options - options object
     */
    var HorizonIndicator = function (options) {
        var instance = this;
        options.template = html;
        Inheritance.inheritConstructor(IndicatorBase, this, options);
        this.init({
            svgId: "horizon-svg",
            svgDataName: "horizon.svg",
            onSvgReady: function () { // jscs:ignore
                instance.horizonElement = instance.svgElement.getElementById("horizon-element");
                instance.horizonElement.setAttribute("transform", "");
                instance.pitchValueText = instance.svgElement.getElementById("pitch-value-text");
                instance.rollValueText = instance.svgElement.getElementById("roll-value-text");
            }
        });
        this.pixelBounds = {
            PITCH_MAX: 128,
            PITCH_MIN: -128,
            PIXELS_PER_PITCH: 128 / 40
        };
        this.valueBounds = {
            PITCH_MAX: 40,
            PITCH_MIN: -40,

            ROLL_MAX: 30,
            ROLL_MIN: -30,
        };
    };
    Inheritance.inheritPrototype(HorizonIndicator, IndicatorBase);
    /** 
     * @param {Number} pitch - pitch value of aircraft -> range from 40 to -40
     * @param {Number} roll - roll value of aircraft -> range from 30 to -30
     */
    HorizonIndicator.prototype.update = function (pitch, roll) {
        if (this.isReady) {
            var pixelBound = this.pixelBounds, center, pitchText = pitch, rollText = roll;

            pitch = pitch > pixelBound.PITCH_MAX ? pixelBound.PITCH_MAX : pitch;
            pitch = pitch < pixelBound.PITCH_MIN ? pixelBound.PITCH_MIN : pitch;

            roll = roll > pixelBound.ROLL_MAX ? pixelBound.ROLL_MAX : roll;
            roll = roll < pixelBound.ROLL_MIN ? pixelBound.ROLL_MIN : roll;

            center = this.getElementCenter(this.horizonElement);
            this.horizonElement.attributes.transform.nodeValue = "translate(0, " + pixelBound.PIXELS_PER_PITCH * pitch + ")" + " rotate(" + roll + " " + center.x + " " + center.y + ")";
            this.pitchValueText.childNodes[0].textContent = this.formatHorizonDegreeString(pitchText);
            this.rollValueText.childNodes[0].textContent = this.formatHorizonDegreeString(rollText);
        }
    };
    return HorizonIndicator;
});

define('text!vertical-speed-html',[],function () { return '<div id="vertical-speed-module" style="width: 100%">\r\n    <object id="vertical-speed-svg" style="width: 100%" data="" type="image/svg+xml"></object>\r\n</div>';});

define('VerticalSpeedIndicator',[ // jscs:ignore
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

define('text!turn-html',[],function () { return '<div id="turn-module" style="width: 100%">\r\n    <object id="turn-svg" style="width: 100%" data="" type="image/svg+xml"></object>\r\n</div>';});

define('TurnIndicator',[ // jscs:ignore
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
            // Define value bounds
            x = x > 1 ? 1 : x;
            x = x < -1 ? -1 : x;
            y = y > 1 ? 1 : y;
            y = y < -1 ? -1 : y;

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
            this.collectiveValueText.childNodes[0].textContent = this.formatSpeedDegreeString(degree);
        }
    };
    return CollectiveIndicator;
});
define('src/base/FlightIndicator',[
    "TypeCheck",
    "HeadingIndicator",
    "SpeedIndicator",
    "AltitudeIndicator",
    "HorizonIndicator",
    "VerticalSpeedIndicator",
    "TurnIndicator",
    "StickIndicator",
    "PedalIndicator",
    "CollectiveIndicator",
    "BaseOptions"
], function (
    TypeCheck,
    HeadingIndicator,
    SpeedIndicator,
    AltitudeIndicator,
    HorizonIndicator,
    VerticalSpeedIndicator,
    TurnIndicator,
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
            Heading: HeadingIndicator,
            Speed: SpeedIndicator,
            Altitude: AltitudeIndicator,
            Horizon: HorizonIndicator,
            VerticalSpeed: VerticalSpeedIndicator,
            Stick: StickIndicator,
            Pedal: PedalIndicator,
            Collective: CollectiveIndicator,
            Turn: TurnIndicator,
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
