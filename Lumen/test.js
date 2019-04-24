var stars = []; //array that holds our stars.

var numStars = 200; //How many stars do you want? 
var minStarSize = 1;
var maxStarSize = 6;
var bgImg;
var bgImg2;
var x1 = 0;
var x2;

var scrollSpeed = .15;

var inputVal = false;

function preload(){
	bgImg = loadImage("http://i.imgur.com/WwYEKlu.jpg");
    bgImg2 = loadImage("https://i.imgur.com/eHWl09m.jpg");
}

function setup() { 
  createCanvas(windowWidth,windowHeight);
  
  x2 = width;
  
  //create a bunch of stars in random locations
	for (var i = 0; i < numStars; i++) {
		x = random(width);
		y = random(height-height/10);
		r = floor(random(minStarSize,maxStarSize)); 

		stars.push(new Star(x,y,r));
	}
    //bg2.resize(windowWidth-20,windowHeight-20);
}

function draw() { 
  image(bgImg, x1, 0, width, height);
  image(bgImg2, x2, 0, width, height);
  
  x1 -= scrollSpeed;
  x2 -= scrollSpeed;
  
  if (x1 < -width){
    x1 = width;
  }
  if (x2 < -width){
    x2 = width;
  }
  
	for (var i = stars.length - 1; i >= 0; i--) {

		//calling it in the if statement runs it. 
		//If it returns false, the star is no longer on the screen.
		if(stars[i].render() === false){
            
            //replace with new one
			x = windowWidth-1;
			y = stars[i].y;
			r = floor(random(minStarSize,maxStarSize));
			stars.push(new Star(x,y,r));
            
			//star is off screen, remove it from the array
			stars.splice(i, 1);
			
			
		};
        stars[i].x -= scrollSpeed;
	}

	//every 250 frames, pick a star and shoot it!
	if(frameCount % 250 == 0 ){
		star = random(stars); 
		star.shoot();
	}
    
    if(inputVal == true) {
        rect(0,0,100,100);
        rect.background;
    }
    
}


function Star(x,y,r){
	this.x = x;
	this.y = y;
	this.r = r;

	this.alpha = 255;
	this.xoff = 0;
	this.yoff = 0;
	this.shooting = false;


	this.render = function(){

		//shoot the star. A little alpha to fade it out.
		if(this.shooting){
			this.x += this.xoff;
			this.y += this.yoff;
			this.alpha -= 5;
		}


		//shimmer
		if (random(1) < 0.005 ) {
			red 	= floor(random(0,127));
			green 	= floor(random(0,127));
			blue 	= floor(random(0,127));
		}else{
			//default color
			red 	= 175; //stars arent harsh white, tone it down a bit.
			green 	= 175;
			blue 	= 175;
		}

		noStroke();
		fill(red,green,blue,this.alpha);

		//draw the star
		ellipse(this.x,this.y,this.r);

		//check if off screen
		if(this.x < 0){
			//if its off screen, we need to tell the main draw loop, so that it can be removed
			//from the array of stars.
			return false;
		}
	}

	this.shoot = function(){
		this.shooting = true;
		this.xoff = random(-20,20);
		this.yoff = random(-20,20);
	}
}