define([
    "TypeCheck",
    "StickIndicator",
    "PedalIndicator",
    "CollectiveIndicator",
    "CompassIndicator",
    "BaseOptions"
], function (
    TypeCheck,
    StickIndicator,
    PedalIndicator,
    CollectiveIndicator,
    CompassIndicator,
    BaseOptions
) {
        /**
         * Provides functionalty for displaying flight parameters 
         * @alias FlightIndicator 
         * @constructor
         */
        return {
            Stick: StickIndicator,
            Pedal: PedalIndicator,
            Collective: CollectiveIndicator,
            Compass: CompassIndicator,
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