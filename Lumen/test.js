var stars = []; //array that holds our stars.

var numStars = 400; //How many stars do you want?
var minStarSize = 1;
var maxStarSize = 3;
var bgImg;
var bgImg2;
var mtnImg;
var x1 = 0;
var x2;

var scrollingSpeed = 0.02;
var starScrollSpeed = -0.02;
var stateVal = 0;
var alphaVal = 0;
const Y_AXIS = 1;
let cAlpha = 0;

var sound0;
var sound0Vol;
var sound3;
var sound3Vol;

function preload() {
  bgImg = loadImage("https://i.imgur.com/hBm533Y.jpg");
  bgImg2 = loadImage("https://i.imgur.com/hBm533Y.jpg");
  mtnImg = loadImage("https://i.imgur.com/JUpNcRG.png");

  soundFormats('mp3', 'ogg');
  sound0 = loadSound('sounds/citySound2.mp3')
  sound3 = loadSound('sounds/citySound1.mp3')
  sound0Vol = 0;
  sound3Vol = 0;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  x2 = width;

  for (var i = 0; i < numStars; i++) {
    x = random(width);
    y = random(height - 156);
    r = floor(random(minStarSize, maxStarSize));
    stars.push(new Star(x, y, r));
  }
  sound0.setVolume(0);
  sound0.play();
  sound0.loop();
  sound3.setVolume(0);
  sound3.play();
  sound3.loop();
}

function draw() {
  image(bgImg, x1, 0, width, height);
  image(bgImg2, x2, 0, width, height);
  image(mtnImg, 0, height-156, width/2, 156);
  image(mtnImg, width/2, height-156, width/2, 156);

  x1 -= scrollingSpeed;
  x2 -= scrollingSpeed;

  if (x1 < -width) {
    x1 = width;
  }
  if (x2 < -width) {
    x2 = width;
  }

  for (var i = stars.length - 1; i >= 0; i--) {
    if (stars[i].render() === false) {
      x = windowWidth - 1;
      y = stars[i].y;
      r = floor(random(minStarSize, maxStarSize));
      stars.push(new Star(x, y, r));
      stars.splice(i, 1);
    }
    stars[i].x -= starScrollSpeed;
  }

  if (frameCount % 250 == 0) {
    star = random(stars);
    star.shoot();
  }

  if (stateVal == 3) {
		if(cAlpha < .97) {
			cAlpha += .005;
		}
		let c1String = 'rgba(0,0,0,' + cAlpha + ')';
		let c2String = 'rgba(104, 65, 10,' + cAlpha + ')';
		let c1 = color(c1String);
		let c2 = color(c2String);//255, 178, 102
    setGradient(0, 0, windowWidth, windowHeight, c1, c2, Y_AXIS);
    if(sound3Vol < 1) {
      sound3Vol += .1;
      sound3.setVolume(sound3Vol)
    }
    if(sound0Vol > 0) {
      sound0Vol -= .1;
      sound0.setVolume(sound0Vol);
    }
  } 

  if (stateVal == 2) {
		if(cAlpha < .63) {
			cAlpha += .005;
		} else if (cAlpha > .66) {
      cAlpha -= .005;
    }
		let c1String = 'rgba(0,0,0,' + cAlpha + ')';
		let c2String = 'rgba(104, 65, 10,' + cAlpha + ')';
		let c1 = color(c1String);
		let c2 = color(c2String);
    setGradient(0, 0, windowWidth, windowHeight, c1, c2, Y_AXIS);
    
    if(sound3Vol > .6) {
      sound3Vol -= .1;
      sound3.setVolume(sound3Vol)
    } else if (sound3Vol < .6) {
      sound3Vol += .1;
      sound3.setVolume(sound3Vol)
    }
    if(sound0Vol > 0) {
      sound0Vol -= .1;
      sound0.setVolume(sound0Vol);
    }
  } 
  
  if (stateVal == 1) {
		if(cAlpha < .33) {
			cAlpha += .005;
		} else if (cAlpha > .36) {
      cAlpha -= .005;
    }
		let c1String = 'rgba(0,0,0,' + cAlpha + ')';
		let c2String = 'rgba(104, 65, 10,' + cAlpha + ')';
		let c1 = color(c1String);
		let c2 = color(c2String);
    setGradient(0, 0, windowWidth, windowHeight, c1, c2, Y_AXIS);
    
    if(sound3Vol > .3) {
      sound3Vol -= .1;
      sound3.setVolume(sound3Vol)
    } else if (sound3Vol < .3) {
      sound3Vol += .1;
      sound3.setVolume(sound3Vol)
    }
    if(sound0Vol > 0) {
      sound0Vol -= .1;
      sound0.setVolume(sound0Vol);
    }
	} 

	if (stateVal == 0) {
		if(cAlpha > .01) {
			cAlpha -= .005;
		}
		let c1String = 'rgba(0,0,0,' + cAlpha + ')';
		let c2String = 'rgba(104, 65, 10,' + cAlpha + ')';
		let c1 = color(c1String);
		let c2 = color(c2String);
    setGradient(0, 0, windowWidth, windowHeight, c1, c2, Y_AXIS);
    if(sound3Vol > 0) {
      sound3Vol -= .1;
      sound3.setVolume(sound3Vol)
    }
    if(sound0Vol < 1) {
      sound0Vol += .1;
      sound0.setVolume(sound0Vol);
    }
  }
  
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis === Y_AXIS) {
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter-.1);
      stroke(c);
      line(x, i, x + w, i);
    }
  }
}

function Star(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;

  this.alphaVal = 255;
  this.xoff = 0;
  this.yoff = 0;
  this.shooting = false;

  this.render = function() {
    //shoot the star. A little alpha to fade it out.
    if (this.shooting) {
      this.x += this.xoff;
      this.y += this.yoff;
      this.alphaVal -= 5;
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
    fill(red, green, blue, this.alphaVal);

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
		if(stateVal == 3) {
      stateVal = 0;
    } else {
      stateVal += 1;
    }
	} 
}