define([
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
                BaseOptions.assets = TypeCheck.isString(options.assets) ? options.assets : onStandardAssetPathUsed();
            }
        };
    });