
/**
 * Returns a number number rounded by the number of decimals given
 * @param {number} number 
 * @param {int} decimals 
 * @returns {number}
 * @example roundByDecimals(1.54863, 3) => 1.549
 */
function roundByDecimals(number, decimals) {
    const tenPow = Math.pow(10, decimals)
    return Math.round(number * tenPow) / tenPow;
}

/**
 * Returns a number calculated according to the natural frequency formula
 * @param {number} springK  spring constant
 * @param {number} mass1 
 * @param {number} mass2 
 * @returns {number}
 */
function naturalFrequencyCalc(springK, mass1, mass2) {

    return Math.sqrt(2 * springK / (2 * mass1 + mass2));
}

/**
 * Returns a number calculated according to the frequency formula
 * @param {number} springK  spring constant
 * @param {number} mass1 
 * @param {number} mass2 
 * @returns {number}
 */
function frequencyCalc(springK, mass1, mass2) {

    let w = naturalFrequencyCalc(springK, mass1, mass2)

    return w / (2 * Math.PI);
}

/**
 * Returns a number calculated according to the period formula
 * @param {number} springK  spring constant
 * @param {number} mass1 
 * @param {number} mass2 
 * @returns {number}
 */
function periodCalc(springK, mass1, mass2) {

    let freq = frequencyCalc(springK, mass1, mass2)

    return 1 / freq;
}

/**
 * Returns a number calculated according to the phase change formula
 * @param {number} springK  spring constant
 * @param {number} mass1 
 * @param {number} mass2 
 * @param {number} initDisp initial displacement
 * @param {number} initVel  initial velocity
 * @returns {number}
 */
function phiCalc(springK, mass1, mass2, initDisp, initVel) {

    let w = naturalFrequencyCalc(springK, mass1, mass2); //Natural frequency
    if (initDisp == 0 && initVel == 0) {
        return 0;
    }
    if (w * initDisp / initVel < 0) {
        return Math.PI + Math.atan(w * initDisp / initVel);
    }
    else {
        return Math.atan(w * initDisp / initVel);
    }
}

/**
 * Returns a number calculated according to the amplitude formula
 * @param {number} springK  spring constant
 * @param {number} mass1 
 * @param {number} mass2 
 * @param {number} initDisp initial displacement
 * @param {number} initVel  initial velocity
 * @returns {number}
 */
function amplitudeCalc(springK, mass1, mass2, initDisp, initVel) {

    let w = naturalFrequencyCalc(springK, mass1, mass2); //Natural frequency
    let phi = phiCalc(springK, mass1, mass2, initDisp, initVel); //Phase chage

    if (phi != 0) {
        return Math.abs(initDisp / Math.sin(phi));
    }
    else {
        return Math.abs(initVel / (w * Math.cos(phi)));
    }
}

/**
 * Returns a number calculated according to the wave displacement formula in any time given
 * @param {number} springK 
 * @param {number} mass1 
 * @param {number} mass2 
 * @param {number} initDisp 
 * @param {number} initVel 
 * @param {number} time 
 * @returns {number}
 */
function displacementCalc(springK, mass1, mass2, initDisp, initVel, time) {

    let w = naturalFrequencyCalc(springK, mass1, mass2)
    let amp = amplitudeCalc(springK, mass1, mass2, initDisp, initVel);
    let phi = phiCalc(springK, mass1, mass2, initDisp, initVel);

    return amp * Math.sin(w * time + phi);
}

/**
 * Returns a number calculated according to the wave velocity formula in any time given
 * @param {number} springK 
 * @param {number} mass1 
 * @param {number} mass2 
 * @param {number} initDisp 
 * @param {number} initVel 
 * @param {number} time 
 * @returns {number}
 */
function velocityCalc(springK, mass1, mass2, initDisp, initVel, time) {

    let w = naturalFrequencyCalc(springK, mass1, mass2)
    let amp = amplitudeCalc(springK, mass1, mass2, initDisp, initVel);
    let phi = phiCalc(springK, mass1, mass2, initDisp, initVel);

    return w * amp * Math.cos(w * time + phi);
}

/**
 * Returns a number calculated acording to the kinetic energy formula
 * @param {number} springK 
 * @param {number} mass1 
 * @param {number} mass2 
 * @param {number} initDisp 
 * @param {number} initVel 
 * @param {number} time 
 * @returns {number}
 */
function kineticEnergyCalc(springK, mass1, mass2, initDisp, initVel, time) {

    let velocity = velocityCalc(springK, mass1, mass2, initDisp, initVel, time)

    return (mass1 + mass2 / 2) * (Math.pow(velocity, 2)) / 2
}

/**
 * Returns a number calculated acording to the potential energy formula
 * @param {number} springK 
 * @param {number} mass1 
 * @param {number} mass2 
 * @param {number} initDisp 
 * @param {number} initVel 
 * @param {number} time 
 * @returns {number}
 */
function potentialEnergyCalc(springK, mass1, mass2, initDisp, initVel, time) {

    let displacement = displacementCalc(springK, mass1, mass2, initDisp, initVel, time);

    return springK * (Math.pow(displacement, 2)) / 2;
}
