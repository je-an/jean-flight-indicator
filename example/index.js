// jscs:disable
// jshint ignore:start
$(document).ready(function () {
    var stick, pedal, collective;
    FlightIndicator.setOptions({
        assets: "../img/"
    });
    var compass = new FlightIndicator.Compass({
        containerId: "compass-container"
    });
    var stick = new FlightIndicator.Stick({
        containerId: "stick-container"
    });
    var pedal = new FlightIndicator.Pedal({
        containerId: "pedal-container"
    });
    var collective = new FlightIndicator.Collective({
        containerId: "collective-container"
    });

    var isStarted = false, interval;
    var n = new Navbar({
        containerId: "jean-navbar-container",
        title: "Flight Indicators",
        icon: "favicon.ico",
        sections: ["Start"],
        onSectionClick: function (id) {
            var increment = 0;
            if (isStarted) {
                clearInterval(interval);
                isStarted = false;
                $("#id-Start").find(".text").html("Start");
            } else {
                interval = setInterval(function () {
                    var x = 0.75 * Math.sin(increment / 100),
                        y = -0.75 * Math.sin(increment / 100);

                    compass.update((x / 4) * 360);
                    stick.update(x, y);
                    pedal.update(x, y);
                    collective.update(x * 60);
                    increment++;
                }, 50);
                isStarted = true;
                $("#id-Start").find(".text").html("Stop");
            }
        }
    });
    n.create();
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
});