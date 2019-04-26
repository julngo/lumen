var stars = []; //array that holds our stars.

var numStars = 200; //How many stars do you want?
var minStarSize = 1;
var maxStarSize = 6;
var bgImg;
var bgImg2;
var x1 = 0;
var x2;

var scrollSpeed = 0.15;

var inputVal = true;
var alpha = 0;

const Y_AXIS = 1;
const X_AXIS = 2;

let cAlpha = 0;

function preload() {
  bgImg = loadImage("http://i.imgur.com/WwYEKlu.jpg");
  bgImg2 = loadImage("https://i.imgur.com/eHWl09m.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  x2 = width;

  //create a bunch of stars in random locations
  for (var i = 0; i < numStars; i++) {
    x = random(width);
    y = random(height - height / 10);
    r = floor(random(minStarSize, maxStarSize));

    stars.push(new Star(x, y, r));
  }
  //bg2.resize(windowWidth-20,windowHeight-20);
}

function draw() {
  image(bgImg, x1, 0, width, height);
  image(bgImg2, x2, 0, width, height);

  x1 -= scrollSpeed;
  x2 -= scrollSpeed;

  if (x1 < -width) {
    x1 = width;
  }
  if (x2 < -width) {
    x2 = width;
  }

  for (var i = stars.length - 1; i >= 0; i--) {
    //calling it in the if statement runs it.
    //If it returns false, the star is no longer on the screen.
    if (stars[i].render() === false) {
      //replace with new one
      x = windowWidth - 1;
      y = stars[i].y;
      r = floor(random(minStarSize, maxStarSize));
      stars.push(new Star(x, y, r));

      //star is off screen, remove it from the array
      stars.splice(i, 1);
    }
    stars[i].x -= scrollSpeed;
  }

  //every 250 frames, pick a star and shoot it!
  if (frameCount % 250 == 0) {
    star = random(stars);
    star.shoot();
  }


	//CODE THIS BETTER
  if (inputVal == false) {
		if(cAlpha < .97) {
			cAlpha += .005;
		}
		let c1String = 'rgba(0,0,0,' + cAlpha + ')';
		let c2String = 'rgba(137, 88, 25,' + cAlpha + ')';
		let c1 = color(c1String);
		let c2 = color(c2String);//255, 178, 102
		setGradient(0, 0, windowWidth, windowHeight, c1, c2, Y_AXIS);
	} 
	if (inputVal == true) {
		if(cAlpha > .01) {
			cAlpha -= .005;
		}
		let c1String = 'rgba(0,0,0,' + cAlpha + ')';
		let c2String = 'rgba(255, 178, 102,' + cAlpha + ')';
		let c1 = color(c1String);
		let c2 = color(c2String);//255, 178, 102
		setGradient(0, 0, windowWidth, windowHeight, c1, c2, Y_AXIS);
	}
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  
  //https://p5js.org/examples/color-linear-gradient.html
  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

function Star(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;

  this.alpha = 255;
  this.xoff = 0;
  this.yoff = 0;
  this.shooting = false;

  this.render = function() {
    //shoot the star. A little alpha to fade it out.
    if (this.shooting) {
      this.x += this.xoff;
      this.y += this.yoff;
      this.alpha -= 5;
    }

    //shimmer
    if (random(1) < 0.005) {
      red = floor(random(0, 127));
      green = floor(random(0, 127));
      blue = floor(random(0, 127));
    } else {
      //default color
      red = 175; //stars arent harsh white, tone it down a bit.
      green = 175;
      blue = 175;
    }

    noStroke();
    fill(red, green, blue, this.alpha);

    //draw the star
    ellipse(this.x, this.y, this.r);

    //check if off screen
    if (this.x < 0) {
      //if its off screen, we need to tell the main draw loop, so that it can be removed
      //from the array of stars.
      return false;
    }
  };

  this.shoot = function() {
    this.shooting = true;
    this.xoff = random(-20, 20);
    this.yoff = random(-20, 20);
  };
}

function keyPressed() {
	if (keyCode === TAB) {
		if (inputVal == false) {
			inputVal = true;
		} else {
			inputVal = false;
		}
		
	} 
}