// jscs:disable
// jshint ignore:start
$(document).ready(function () {
    var stick, pedal, collective;
    FlightIndicator.setOptions({
        assets: "../img/"
    });
    var heading = new FlightIndicator.Heading({
        containerId: "heading-container"
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
    var turn = new FlightIndicator.Turn({
        containerId: "turn-container"
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
                var headingI = 0, stickI = 0, collectiveI = 0, speedI = 0, altitudeI = 0, vSpeedI = 0,
                    turnI = 0, slipI = 0,
                    countDownStick = false, countUpStick = true,
                    countDownCollective = false, countUpCollective = true,
                    countDownSpeed = false, countUpSpeed = true,
                    countDownAltitude = false, countUpAltitude = true,
                    countDownVSpeed = false, countUpVSpeed = true,
                    countDownTurn = false, countUpTurn = true,
                    countDownSlip = false, countUpSlip = true;
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
                    } else if (countUpAltitude) {
                        altitudeI = altitudeI + 0.0001;
                        if (altitudeI >= 1) {
                            countUpAltitude = false;
                            countDownAltitude = true;
                        }
                    }
                }
                function generateVSpeedIncrement() {
                    if (countDownVSpeed) {
                        vSpeedI = vSpeedI - 25;
                        if (vSpeedI <= -4000) {
                            countUpVSpeed = true;
                            countDownVSpeed = false;
                        }
                    } else if (countUpVSpeed) {
                        vSpeedI = vSpeedI + 25;
                        if (vSpeedI >= 4000) {
                            countUpVSpeed = false;
                            countDownVSpeed = true;
                        }
                    }
                }
                function generateTurnIncrement() {
                    if (countDownTurn) {
                        turnI = turnI - 0.1;
                        if (turnI <= -17.5) {
                            countUpTurn = true;
                            countDownTurn = false;
                        }
                    } else if (countUpTurn) {
                        turnI = turnI + 0.1;
                        if (turnI >= 17.5) {
                            countUpTurn = false;
                            countDownTurn = true;
                        }
                    }
                }
                function generateSlipIncrement() {
                    if (countDownSlip) {
                        slipI = slipI - 0.48;
                        if (slipI <= -84) {
                            countUpSlip = true;
                            countDownSlip = false;
                        }
                    } else if (countUpSlip) {
                        slipI = slipI + 0.48;
                        if (slipI >= 84) {
                            countUpSlip = false;
                            countDownSlip = true;
                        }
                    }
                }
                interval = setInterval(function () {
                    pedal.update(collectiveI, collectiveI);
                    heading.update(Math.sin(headingI / 500) * 360);
                    stick.update(stickI * 1, stickI * 1);
                    collective.update(collectiveI * 60);
                    speed.update(speedI * 160);
                    altitude.update(altitudeI * 99999);
                    horizon.update(40 * Math.sin(headingI / 50), (30 * Math.sin(headingI / 150)));
                    verticalSpeed.update(vSpeedI);
                    turn.update(turnI, slipI);
                    headingI++;
                    generateStickIncrement();
                    generateCollectiveIncrement();
                    generateSpeedIncrement();
                    generateAltitudeIncrement();
                    generateVSpeedIncrement();
                    generateTurnIncrement();
                    generateSlipIncrement();
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