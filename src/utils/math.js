// NOTE: The contents of this file were taken straight from another project.
// I have never found a math library which adds all the below functions that I like, so I made my own a while back and use it randomly here and there.
// Perhaps I could make my own npm library for it, what do you think?

//////////////////
// Math helpers //
//////////////////

export const getPercentageOf = (inp, percentage) => {
    return (percentage / 100) * inp;
};

export const getPercentageOfXIsY = (total, fraction) => {
    return (fraction / total) * 100;
};

export const zeroInfinity = (inp) => {
    return isFinite(inp) ? inp : 0;
};

/**
 * Map an input number from one range to another
 * @param inp Input value
 * @param min Minimum input value
 * @param max Maximum input value
 * @param from New range - from
 * @param to New range - to
 */
export const map = (inp, min, max, from, to) => {
    return from + ((to - from) / (max - min)) * (inp - min);
};
/**
 * Convert an input number to a limited value.
 * @param value Input value
 * @param limit Upper bound limit
 */
export function limitValue(value, limit) {
    return value < limit ? value : limit;
}
/**
 * Clamp a value.
 * Will return the value is it falls between the clamp params, else it will return the clamp it breaks.
 * @param value Input value
 * @param lower Lower limit
 * @param upper Upper limit
 */
export function clamp(value, lower, upper) {
    if (value < lower)
        return lower;
    if (value > upper)
        return upper;
    return value;
}

/**
 * Helper function.
 * Return a random value between input values.
 * @param lower Minimum value for random
 * @param upper Maximum value for random
 */
export function randomBetween(lower, upper) {
    return Math.random() * (upper - lower) + lower;
}

/**
 * From an input value, return the rounded value based on rounding param.
 * EG: roundTo(12345, 50) will return 12350, roundTo(12345, 1000) will return 12000, etc
 * @param value Input value
 * @param round Rounding amount
 */
export function roundTo(value, round) {
    return Math.round(value / round) * round;
}

export function roundUpTo(value, round) {
    return Math.ceil(value / round) * round;
}

/**
 * Combined function for randomBetween and roundTo. Will return a random number between lower and upper,
 * which is then rounded to nearest value in round param.
 * randomWithRounding(0, 10) -> 3
 * randomWithRounding(0, 100, 1) -> 53
 * randomWithRounding(0, 100, 5) -> 55
 * randomWithRounding(0, 100, 10) -> 50
 * randomWithRounding(50000, 1000000, 1000) -> 340000
 * randomWithRounding(50000, 1000000, 500) -> 340500
 */
export function randomBetweenRounded(lower, upper, round) {
    return roundTo(randomBetween(lower, upper), round);
}

/////////////////////
// Logical helpers //
/////////////////////
/**
 * Return randomly a true or false value. Can be weighted to make either option more likely.
 * @param weighting To force chance to be more likely one way or the other. 0 for always false, 1 for always true. Default = 0.5
 */
export function randomBoolean(weighting = 0.5) {
    return Math.random() < weighting;
}
