({
    baseUrl: '.',
    out: 'dist/jean-flight-indicator.js',
    optimize: 'none',
    name: 'node_modules/jean-amd/dist/jean-amd',
    include: ["src/FlightIndicator"],
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
        "\n \t return require('src/FlightIndicator'); \n" +
        "}));"
    },
     paths:{
        "Inheritance": "node_modules/jean-inheritance/src/Inheritance",
        "TypeCheck": "node_modules/jean-type-check/src/TypeCheck",
        "Failure": "node_modules/jean-failure/src/Failure",
        "Interface": "node_modules/jean-interface/src/Interface",
        "NotImplementedError": "node_modules/jean-interface/src/NotImplementedError",
        "CollectiveIndicator": "src/CollectiveIndicator",
        "PedalIndicator": "src/PedalIndicator",
        "StickIndicator": "src/StickIndicator",
        "IndicatorBase": "src/IndicatorBase"
    }
})