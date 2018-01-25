define([
    "TypeCheck",
    "CompassIndicator",
    "SpeedIndicator",
    "AltitudeIndicator",
    "HorizonIndicator",
    "StickIndicator",
    "PedalIndicator",
    "CollectiveIndicator",
    "BaseOptions"
], function (
    TypeCheck,
    CompassIndicator,
    SpeedIndicator,
    AltitudeIndicator,
    HorizonIndicator,
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
            Horizon: HorizonIndicator,
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