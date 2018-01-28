({
    baseUrl: '.',
    out: 'dist/jean-flight-indicator.js',
    optimize: 'none',
    name: 'node_modules/jean-amd/dist/jean-amd',
    include: ["src/base/FlightIndicator"],
    wrap: {
        start: 
        "(function (root, factory) { \n" +
        " \t if (typeof define === 'function' && define.amd) { \n" +
        "\t \t define([], factory); \n" +
        "\t} else { \n" +
        "\t \troot.FlightIndicator = root.FlightIndicator || {}; \n" +
        "\t \troot.FlightIndicator = factory();\n" +
        "\t}\n" +
        "}(this, function() {",
        end:
        "\n \t return require('src/base/FlightIndicator'); \n" +
        "}));"
    },
     paths:{
        "text": "node_modules/text/text",
        "Inheritance": "node_modules/jean-inheritance/src/Inheritance",
        "TypeCheck": "node_modules/jean-type-check/src/TypeCheck",
        "Failure": "node_modules/jean-failure/src/Failure",
        "Interface": "node_modules/jean-interface/src/Interface",
        "NotImplementedError": "node_modules/jean-interface/src/NotImplementedError",
        
        "BaseOptions": "src/Base/BaseOptions",
        "IndicatorBase": "src/Base/IndicatorBase",

        "HeadingIndicator": "src/Heading/HeadingIndicator",
        "heading-html": "src/Heading/html/heading.html",

        "SpeedIndicator": "src/Speed/SpeedIndicator",
        "speed-html": "src/Speed/html/speed.html",

        "AltitudeIndicator": "src/Altitude/AltitudeIndicator",
        "altitude-html": "src/Altitude/html/altitude.html",

        "HorizonIndicator": "src/Horizon/HorizonIndicator",
        "horizon-html": "src/Horizon/html/horizon.html",

        "VerticalSpeedIndicator": "src/VerticalSpeed/VerticalSpeedIndicator",
        "vertical-speed-html": "src/VerticalSpeed/html/vertical-speed.html",

        "StickIndicator": "src/Stick/StickIndicator",
        "stick-html": "src/Stick/html/stick.html",

        "PedalIndicator": "src/Pedal/PedalIndicator",
        "pedal-html": "src/Pedal/html/pedal.html",

        "CollectiveIndicator": "src/Collective/CollectiveIndicator",
        "collective-html": "src/Collective/html/collective.html",
    },
    stubModules: ["text"]
})