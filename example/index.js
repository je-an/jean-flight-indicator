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
            if (isStarted) {
                clearInterval(interval);
                isStarted = false;
                $("#id-Start").find(".text").html("Start");
            } else {
                var compassI = 0, stickI = 0, collectiveI = 0, countDownStick = false, countUpStick = true,
                    countDownCollective = false, countUpCollective = true;
                function generateStickIncrement() {
                    if (countDownStick) {
                        stickI = stickI - 0.01;
                        if (stickI <= -1) {
                            countDownStick = false;
                            countUpStick = true;
                        }
                    } else if (countUpStick) {
                        stickI = stickI + 0.01;
                        if (stickI >= 1) {
                            countUpStick = false;
                            countDownStick = true;
                        }
                    }
                }
                function generateCollectiveIncrement() {
                    if (countDownCollective) {
                        collectiveI = collectiveI - 0.01;
                        if (collectiveI <= 0) {
                            countUpCollective = true;
                            countDownCollective = false;
                        }
                    } else if (countUpCollective) {
                        collectiveI = collectiveI + 0.01;
                        if (collectiveI >= 1) {
                            countUpCollective = false;
                            countDownCollective = true;
                        }
                    }
                }
                interval = setInterval(function () {
                    pedal.update(collectiveI, collectiveI);
                    compass.update(Math.sin(compassI / 500) * 360);
                    stick.update(stickI * 1, stickI * 1);
                    collective.update(collectiveI * 60);
                    compassI++;
                    generateStickIncrement();
                    generateCollectiveIncrement();
                }, 50);
                isStarted = true;
                $("#id-Start").find(".text").html("Stop");
            }
        }
    });
    n.create();
    function updateCompass(i) {

    }
});