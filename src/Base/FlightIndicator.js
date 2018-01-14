define([
    "StickIndicator",
    "PedalIndicator",
    "CollectiveIndicator",
    "CompassIndicator"
], function (
    StickIndicator,
    PedalIndicator,
    CollectiveIndicator,
    CompassIndicator
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
            setOptions: function (options) {

            }
        };
    });