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
    var speed = new FlightIndicator.Speed({
        containerId: "speed-container"
    });
    var altitude = new FlightIndicator.Altitude({
        containerId: "altitude-container"
    });
    var horizon = new FlightIndicator.Horizon({
        containerId: "horizon-container"
    });
    var verticalSpeed = new FlightIndicator.VerticalSpeed({
        containerId: "vertical-speed-container"
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
                var compassI = 0, stickI = 0, collectiveI = 0, speedI = 0, altitudeI = 0,
                    countDownStick = false, countUpStick = true,
                    countDownCollective = false, countUpCollective = true,
                    countDownSpeed = false, countUpSpeed = true;
                    countDownAltitude = false, countUpAltitude = true;
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
                function generateSpeedIncrement() {
                    if (countDownSpeed) {
                        speedI = speedI - 0.01;
                        if (speedI <= 0) {
                            countUpSpeed = true;
                            countDownSpeed = false;
                        }
                    } else if (countUpSpeed) {
                        speedI = speedI + 0.01;
                        if (speedI >= 1) {
                            countUpSpeed = false;
                            countDownSpeed = true;
                        }
                    }
                }
                function generateAltitudeIncrement() {
                    if (countDownAltitude) {
                        altitudeI = altitudeI - 0.0001;
                        if (altitudeI <= 0) {
                            countUpAltitude = true;
                            countDownAltitude = false;
                        }
                    } else if (countUpSpeed) {
                        altitudeI = altitudeI + 0.0001;
                        if (speedI >= 1) {
                            countUpAltitude = false;
                            countDownAltitude = true;
                        }
                    }
                }
                interval = setInterval(function () {
                    pedal.update(collectiveI, collectiveI);
                    compass.update(Math.sin(compassI / 500) * 360);
                    stick.update(stickI * 1, stickI * 1);
                    collective.update(collectiveI * 60);
                    speed.update(speedI * 160);
                    altitude.update(altitudeI * 99999);
                    horizon.update(40 * Math.sin(compassI / 50), (30 * Math.sin(compassI / 150)));
                    compassI++;
                    generateStickIncrement();
                    generateCollectiveIncrement();
                    generateSpeedIncrement();
                    generateAltitudeIncrement();
                }, 50);
                isStarted = true;
                $("#id-Start").find(".text").html("Stop");
            }
        }
    });
    n.create();
    $("#id-Start").css("background", "#40CAB4");
    $("#id-Start").css("border-radius", "5px");

});