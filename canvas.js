var squareY = 200;
var start = false;
var startText = "START";

var mass;
var pulleyMass;
var springConstant;
var initialDisplacement;
var initialVelocity;

var naturalFrequency;
var frequency;
var period;
var phi;
var amplitude;

var displacement;
var velocity;
var kineticEnergy;
var potentialEnergy;

var timer = 0;
var timeSeconds = timer / 12;
var currentFrameRate = 12;
var animationSpeed = "x1";

const startButton = { x: 20, y: 175, sizeX: 80, sizeY: 50 };
const resetButton = { x: 20, y: 250, sizeX: 80, sizeY: 50 };
const speedUpButton = { x: 450, y: 500, sizeX: 35, sizeY: 35};
const speedDownButton = { x: 400, y: 500, sizeX: 35, sizeY: 35};

/**
 * Returns true if mouse is on the button
 * @param {object} button 
 * @returns {boolean}
 */
function mouseOnButton(button) {
    if (mouseX >= button.x &&
        mouseX <= (button.x + button.sizeX) &&
        mouseY >= button.y &&
        mouseY <= (button.y + button.sizeY)) {
        return true;
    }
    else {
        return false;
    }
}

function setup() {
    let canvas = createCanvas(1000, 578);
    background(230);
    frameRate(currentFrameRate);
    textAlign(CENTER, CENTER);
    strokeWeight(2);
    canvas.parent('canvas');
}

function draw() {
    //User-entered values
    mass = document.getElementById("mass").value * 1;
    pulleyMass = document.getElementById("pulleyMass").value * 1;
    springConstant = document.getElementById("springConstant").value * 1;
    initialDisplacement = document.getElementById("initialDisplacement").value * 1;
    initialVelocity = document.getElementById("initialVelocity").value * 1;
    //Static values
    naturalFrequency = naturalFrequencyCalc(springConstant, mass, pulleyMass);
    frequency = frequencyCalc(springConstant, mass, pulleyMass);
    period = periodCalc(springConstant, mass, pulleyMass);
    phi = phiCalc(springConstant, mass, pulleyMass, initialDisplacement, initialVelocity);
    amplitude = amplitudeCalc(springConstant, mass, pulleyMass, initialDisplacement, initialVelocity);
    //Variable values
    displacement = displacementCalc(springConstant, mass, pulleyMass, initialDisplacement, initialVelocity, timeSeconds);
    velocity = velocityCalc(springConstant, mass, pulleyMass, initialDisplacement, initialVelocity, timeSeconds);
    kineticEnergy = kineticEnergyCalc(springConstant, mass, pulleyMass, initialDisplacement, initialVelocity, timeSeconds);
    potentialEnergy = potentialEnergyCalc(springConstant, mass, pulleyMass, initialDisplacement, initialVelocity, timeSeconds);
    
    //Initial values
    background(230);
    fill(255);
    rect(1, 1, 500, 550); //Animation space
    textSize(18);
    textAlign(LEFT, CENTER);

    //Energy graph (pie chart)
    const totalEnergy = kineticEnergy + potentialEnergy;
    fill(255, 100, 100);
    circle(650, 100, 150);
    fill(150, 255, 150);
    if(roundByDecimals(potentialEnergy, 3) != 0){
        arc(650, 100, 150, 150, 0, potentialEnergy * 2 * PI / totalEnergy, PIE);
    }
    if (initialDisplacement == 0 && initialVelocity == 0) {
        //Conditional if there is no movement
        fill(200);
        circle(650, 100, 150);
    }
    noStroke();
    fill(255, 0, 0);
    text("Energía Cinética: " + roundByDecimals(kineticEnergy, 3) + " Joules", 575, 200);
    fill(0, 150, 0);
    text("Energía Potencial: " + roundByDecimals(potentialEnergy, 3) + " Joules", 575, 225);
    stroke(0);

    //Movement graph
    textAlign(CENTER, CENTER);
    fill(0);
    text("Xo", 530, 315);
    text("Vo", 530, 465);
    fill(255);
    rect(550, 250, 400, 301);
    
    strokeWeight(3);
    stroke(150, 0, 255);
    for (i = 0; i < 400; i++) {
        //Displacement graph
        let d = -1 * displacementCalc(springConstant, mass, pulleyMass, initialDisplacement, initialVelocity, i * period / 200); //displacement
        point(i + 550, d * 70 / 11 + 325);
    }
    stroke(255, 255, 0);
    for (i = 0; i < 400; i++) {
        //Velocity graph
        let d = -1 * velocityCalc(springConstant, mass, pulleyMass, initialDisplacement, initialVelocity, i * period / 200); //displacement
        point(i + 550, d * 70 / 45 + 475);
    }
    noStroke();
    strokeWeight(2);
    fill(255);
    if(timeSeconds <= 2 * period){
        //White square on the graph that moves over time
        let squarePosition = 200 * timeSeconds / period
        rect(squarePosition + 550, 250, 400 - squarePosition, 300)
    }

    fill(0);
    text("Tiempo(seg): ", 475, 569)
    for (i = 0; i < 2 * period; i++) {
        let lines = 200 / period;
        stroke(150);
        line(i * lines + 550, 250, i * lines + 550, 550)
        noStroke();
        text(i, i * lines + 550, 570)
    }
    stroke(0);
    line(550, 400, 950, 400);
    noFill();
    rect(550, 250, 400, 301);
    fill(0);
    
    //Mass movement
    textSize(20);
    stroke(0);
    textAlign(LEFT, CENTER);
    if (Math.abs(amplitude) > 5) {
        //Mass will move from Xmax to Xmin if amplitude exceeds 5
        squareY = (5 * displacement / Math.abs(amplitude) + 15) * 20;
        line(400, 200, 415, 200); /*Guide X min*/ 
        line(400, 300, 415, 300); /*Guide 0 mts*/ 
        line(400, 400, 415, 400); /*Guide X max*/
        noStroke();
        text("X min", 430, 200);
        text("X = 0", 430, 300);
        text("X max", 430, 400);
    }
    else {
        //Mass will move between -5 and 5 meters proportional to the amplitude
        squareY = (displacement + 15) * 20;
        line(400, 200, 415, 200); /*Guide -5 mts*/
        line(400, 300, 415, 300); /*Guide 0 mts*/
        line(400, 400, 415, 400); /*Guide 5 mts*/
        noStroke();
        text("-5 mts", 430, 200);
        text(" 0 mts", 430, 300);
        text(" 5 mts", 430, 400);
    }
    if (amplitude == 0) {
        //Mass won't move
        squareY = 300;
    }

    stroke(0)
    line(25, 25, 25, 125); //Wall
    line(25, 75, 60, 75); //Wall-Spring line
    line(300, 75, squareY / 2, 75); //Spring-Pulley line

    //Spring
    const springLines = squareY / 20 - 10;                  //Constants allow to move the spring proportionally
    const springLinesMovement = -1 * (springLines - 60);    //to the mass movement and to create the
    const springLinesCompression = 5 + 1.5 * springLines;   //contraction effect

    for (i = 1; i <= 7; i++) {
        //Draw vertical lines of the spring
        line(springLinesMovement + springLinesCompression * i,
            90,
            springLinesMovement + springLinesCompression * i,
            60);
    }

    for (i = 1; i <= 6; i++) {
        //Draw diagonal lines of the spring
        line(springLinesMovement + springLinesCompression * i,
            90,
            springLinesCompression + springLinesMovement + springLinesCompression * i,
            60);
    }
    line(60, 75, springLinesMovement + springLinesCompression, 60);
    line(springLinesMovement + springLinesCompression * 7, 90, squareY / 2, 75);
    
    //Letter below the spring
    textSize(20);
    fill(0);
    noStroke();
    text("K = " + springConstant + " N/m", 60, 115)
    fill(200);
    stroke(0);

    circle(300, 125, 100); //Pulley
    line(350, 125, 350, squareY); //Pulley-Mass line
    square(325, squareY, 50); //Mass
    
    //Letter m in the mass
    textAlign(CENTER, CENTER);
    fill(0);
    textSize(30);
    text("m", 350, squareY + 25)

    //Start button
    textSize(20);
    stroke(0);
    if(mouseOnButton(startButton)){
        fill(100, 100, 255);
        rect(startButton.x, startButton.y, startButton.sizeX, startButton.sizeY);
        noStroke();
        fill(255);
        text(startText, startButton.x, startButton.y, startButton.sizeX, startButton.sizeY);
    }
    else{
        fill(255);
        rect(startButton.x, startButton.y, startButton.sizeX, startButton.sizeY);
        noStroke();
        fill(0);
        text(startText, startButton.x, startButton.y, startButton.sizeX, startButton.sizeY);
    }

    //Reset button
    stroke(0);
    if(mouseOnButton(resetButton)){
        fill(100, 100, 255);
        rect(resetButton.x, resetButton.y, resetButton.sizeX, resetButton.sizeY);
        noStroke();
        fill(255);
        text("RESET", resetButton.x, resetButton.y, resetButton.sizeX, resetButton.sizeY);
    }
    else{
        fill(255);
        rect(resetButton.x, resetButton.y, resetButton.sizeX, resetButton.sizeY);
        noStroke();
        fill(0);
        text("RESET", resetButton.x, resetButton.y, resetButton.sizeX, resetButton.sizeY);
    }

    //Speed Up Button
    fill(0);
    textSize(20);
    textAlign(RIGHT, BOTTOM);
    text("Velocidad: ", 395, 528);
    textSize(35);
    stroke(0);
    
    if(mouseOnButton(speedUpButton)){
        fill(100, 100, 255);
        rect(speedUpButton.x, speedUpButton.y, speedUpButton.sizeX, speedUpButton.sizeY);
        noStroke();
        fill(255);
        text("+", speedUpButton.x, speedUpButton.y, speedUpButton.sizeX, speedUpButton.sizeY);
    }
    else{
        fill(255);
        rect(speedUpButton.x, speedUpButton.y, speedUpButton.sizeX, speedUpButton.sizeY);
        noStroke();
        fill(0);
        text("+", speedUpButton.x, speedUpButton.y, speedUpButton.sizeX, speedUpButton.sizeY);
    }

    if (mouseOnButton(startButton) || mouseOnButton(resetButton)) {
        cursor(HAND);
    }
    else {
        cursor(ARROW);
    }

    //Speed Down button
    stroke(0);
    if(mouseOnButton(speedDownButton)){
        fill(100, 100, 255);
        rect(speedDownButton.x, speedDownButton.y, speedDownButton.sizeX, speedDownButton.sizeY);
        noStroke();
        fill(255);
        text("-", speedDownButton.x, speedDownButton.y, speedDownButton.sizeX, speedDownButton.sizeY);
    }
    else{
        fill(255);
        rect(speedDownButton.x, speedDownButton.y, speedDownButton.sizeX, speedDownButton.sizeY);
        noStroke();
        fill(0);
        text("-", speedDownButton.x, speedDownButton.y, speedDownButton.sizeX, speedDownButton.sizeY);
    }

    if (mouseOnButton(startButton) ||
        mouseOnButton(resetButton) ||
        mouseOnButton(speedUpButton) ||
        mouseOnButton(speedDownButton)) {
        cursor(HAND);
    }
    else {
        cursor(ARROW);
    }

    //current speed label
    fill(0);
    textSize(18);
    switch(currentFrameRate) {
        case 6:
            animationSpeed = "x0.5";
            break;
        case 12:
            animationSpeed = "x1";
            break;
        case 24:
            animationSpeed = "x2";
            break;
        case 36:
            animationSpeed = "x3";
            break;
        case 48:
            animationSpeed = "x4";
            break;
        case 60:
            animationSpeed = "x5";
            break;
    }
    text("Velocidad de animación: " + animationSpeed, 485, 30);


    //Values to show in screen
    noStroke();
    fill(0);
    textSize(18);
    textAlign(LEFT, CENTER);
    text("Frecuencia natural: " + roundByDecimals(naturalFrequency, 3) + " rad/seg", 15, 350);
    text("Frecuencia: " + roundByDecimals(frequency, 3) + " Hz", 15, 375);
    text("Periodo: " + roundByDecimals(period, 3) + " seg", 15, 400);
    text("Desfase: " + roundByDecimals(phi, 3) + " rad", 15, 425);
    text("Amplitud: " + Math.abs(roundByDecimals(amplitude, 3)), 15, 450);
    text("Posición: " + roundByDecimals(displacement, 3) + " mts", 15, 475);
    text("Velocidad: " + roundByDecimals(velocity, 3) + " mts/seg", 15, 500);
    text("Time: " + roundByDecimals(timeSeconds, 1) + " seg", 15, 525);

    //Letter M in the pulley
    fill(0)
    stroke(0);
    textAlign(CENTER, CENTER);
    translate(300, 125);
    rotate(PI * (squareY - 200) / 100);
    textSize(40);
    text("M", 0, 0);
    rotate(-PI * (squareY - 200) / 100);
    
    //Timing the animation
    if (start) {
        timer += 1;
    }
    timeSeconds = timer / 12; 
    
    frameRate(currentFrameRate); //animation speed change
}

function mouseClicked() {
    if (mouseOnButton(startButton)) {
        //If mouse is on start/stop button
        if (start) {
            start = false;
            startText = "START";

        } else {
            start = true;
            startText = "STOP";
        }
    }

    if (mouseOnButton(resetButton)) {
        //If mouse is on reset button
        start = false;
        startText = "START"
        timer = 0;
    }
    
    if (mouseOnButton(speedUpButton)) {
        //If mouse is on speed up button
        switch(currentFrameRate){
            case 6:
                currentFrameRate = 12
                break;
            case 12:
                currentFrameRate = 24;
                break;
            case 24:
                currentFrameRate = 36;
                break;
            case 36:
                currentFrameRate = 48;
                break;
            case 48:
                currentFrameRate = 60;
                break;
            default:
                break;
        }
    }

    if (mouseOnButton(speedDownButton)) {
        //If mouse is on speed down button
        switch(currentFrameRate){
            case 12:
                currentFrameRate = 6;
                break;
            case 24:
                currentFrameRate = 12;
                break;
            case 36:
                currentFrameRate = 24;
                break;
            case 48:
                currentFrameRate = 36;
                break;
            case 60:
                currentFrameRate = 48;
                break;
            default:
                break;
        }
    }

}