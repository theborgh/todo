// calculate square root of a number with Newton's method
var DELTA = 0.000001;
var squareRoot = function (num, guess) {
    var lastGuess = Infinity;
    if (guess === 0) {
        return 0;
    }
    while (Math.abs(guess * guess - num) > DELTA && Math.abs(lastGuess - guess) > DELTA) {
        lastGuess = guess;
        guess = (guess + num / guess) / 2;
        console.log("guess is: ".concat(guess));
    }
    return guess;
};
squareRoot(7, 1);
