define([
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