//jshint ignore:start
// jscs:disable
var ValueGenerator = function (amount) {
    var i = 0, instance = this, countDown = false, countUp = true;
    this.amount = amount;
    this.sinusBetweenValue;
    this.interval = setInterval(function () {
        console.log(Math.sin(i));
        if (countDown) {
            i = i - 0.01;
            if(i <= 0){
                countDown = false;
                countUp = true;
            }
        } else if (countUp) {
            i = i + 0.01;
            if (i >= 1) {
                countUp = false;
                countDown = true;
            }
        }

    }, typeof amount === "number" ? amount : 50);
};

ValueGenerator.prototype.createCompassValue = function (sinusValue) {
    return
}


