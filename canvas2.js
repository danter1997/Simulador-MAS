function setup() {
    let canvas = createCanvas(500, 600);
    background(230);
    frameRate(1);
    textAlign(CENTER, CENTER);
    strokeWeight(2);
    canvas.parent('canvas2');
}

function draw(){
    background(230);
    noFill();
    textAlign(CENTER, CENTER);
    
    //Free body diagram
    line(340, 85, 460, 85); //X axis
    line(400, 25, 400, 145); //Y axis
    line(400, 125, 410, 115); //bottom arrow
    line(400, 125, 390, 115);
    line(400, 45, 410, 55); //top arrow
    line(400, 45, 390, 55);

    //Problem draw
    line(25, 25, 25, 145); //Wall
    line(25, 85, 50, 85); //Wall-Spring line

    //Spring
    for(i = 0; i < 4; i++){
        line(60 + 20 * i, 65, 60 + 20 * i, 105);
    }
    for(i = 0; i < 3; i++){
        line(80 + 20 * i, 65, 60 + 20 * i, 105);
    }
    line(50, 85, 60, 65);
    line(120, 105, 130, 85);

    line(130, 85, 200, 85); //Spring-Pulley line
    circle(200, 115, 60); //Pulley
    line(230, 115, 230, 205); //Pulley-Mass line
    square(200, 205, 60); //Mass
    line(200, 115, 221, 94); //Radious
    line(230, 190, 220, 180); //Mass arrow
    line(230, 190, 240, 180);
    line(150, 85, 160, 95); //Pulley arrow
    line(150, 85, 160, 75);

    //Arc
    arc(340, 525, 75, 75, - PI / 4, 0); //angle
    arc(340, 525, 250, 250, - PI / 4, 0, PIE); //arc
    
    //text
    fill(0);
    textSize(23);
    text("mg", 435, 120);
    text("T", 420, 50);
    text("R", 190, 125); //Pulley radious

    textSize(32);
    text("m", 200, 205, 60, 60); //mass
    text("M", 150, 150); //puley mass
    text("K", 90, 45); //spring constant
    text("R", 370, 460); //arc radious
    text("X", 470, 460); //distance
    text("T", 250, 160); //tension
    text("T", 175, 65);
    
    textSize(28);
    text(String.fromCharCode(952), 385, 510); //tetha
    textAlign(LEFT, CENTER);
    text("m = Masa", 10, 375);
    text("M = Masa de la polea", 10, 410);
    text("R = Radio", 10, 445);
    text("K = Constante elástica", 10, 480);
    text("T = Tensión", 10, 515);
}