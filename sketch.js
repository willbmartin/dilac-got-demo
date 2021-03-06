function preload() {
}

function setup() {
	cnv = createCanvas(windowWidth-200,windowHeight/2);
	cnv.id('sketch');
	var x = (windowWidth - width) / 2;
  	var y = 3*(windowHeight - height) / 4;
	cnv.position(x,y);
	bg = [28, 29, 30];
	background(bg);

	windowHeight = cnv.height;
	windowWidth = cnv.width;

	//-------------------------

	points = [];//array to hold all episodes/points
	pointSize = 10;
	//episodes: 63, seasons: 7
	scaleX = 67;
	//rating scale: 0-5;
	scaleY = 5;
	scalePadding = 2*(windowWidth)/scaleX;

	//for squash() function
	slope = 1;//slope of plot lines
	midHt = windowHeight/2;
	squashed = false;
	mousePressed = false;

	//lightbox
	viewing = false;

	//--------------------------

	var test1 = new Point(CHARACTERS.THEON, "The Dragon and the Wolf", 67, 5, "./media/7_07theon.mp4", "Jon Snow forgives Theon.");
	var test2 = new Point(CHARACTERS.THEON, "A Golden Crown", 9, 1, "./media/1_09theon.mp4", "Theon confronts Robb Stark.");//9
	var test3 = new Point(CHARACTERS.THEON, "The Night Lands", 12, 3, "./media/2_02theon.mp4", "Theon retunrs home.");
	var test4 = new Point(CHARACTERS.THEON, "What is Dead May Never Die", 13, 4, "./media/2_03theon.mp4", "Theon betrays Robb.");
	var test5 = new Point(CHARACTERS.THEON, "The Old Gods and the New", 16, 5, "./media/2_06theon.mp4", "Theon takes Winterfell.");
	var test5 = new Point(CHARACTERS.THEON, "Mhysa", 30, 2, "./media/3_10theon.mp4", "Theon becomes Reek.");
	var test5 = new Point(CHARACTERS.THEON, "Stormborn", 62, 4, "./media/7_02theon.mp4", "Theon confronts Euron.");

	var test5 = new Point(CHARACTERS.JON, "Stormborn", 1, 1, "./media/7_02theon.mp4", "Theon confronts Euron.");
	var test5 = new Point(CHARACTERS.JON, "Stormborn", 20, 3, "./media/7_02theon.mp4", "Theon confronts Euron.");
	var test5 = new Point(CHARACTERS.JON, "Stormborn", 57, 5, "./media/7_02theon.mp4", "Theon confronts Euron.");
}

function draw() {
	background(bg);
	drawGUI();
	drawPoints();
	controller();
	checkPoints();
	// connectPoints(points[0]);
	if (mousePressed) {
		squash();
	}
}

function controller() {
	var jonButton = document.getElementById("jon");
	var danyButton = document.getElementById("dany");
	var tyrionButton = document.getElementById("tyrion");
	var cerseiButton = document.getElementById("cersei");
	jonButton.onclick = function(e) {
		CHARACTERS.JON.selected = !(CHARACTERS.JON.selected);
	}
	danyButton.onclick = function(e) {
		CHARACTERS.DANY.selected = !(CHARACTERS.DANY.selected);
	}
	// document.getElementById("jon").onclick = function(e) {
	// 	CHARACTERS.TYRION.selected = !(CHARACTERS.TYRION.selected);
	// }
	// document.getElementById("jon").onclick = function(e) {
	// 	CHARACTERS.CERSEI.selected = !(CHARACTERS.CERSEI.selected);
	// } 
	if (CHARACTERS.JON.selected) {
		connectPoints(points[0]);
		jonButton.style.filter = "grayscale(0%)";
	} else {
		jonButton.style.filter = "";
	}
	if (CHARACTERS.DANY.selected) {
		connectPoints(points[1]);
		danyButton.style.filter = "grayscale(0%)";
	} else {
		danyButton.style.filter = "";
	}
	if (CHARACTERS.TYRION.selected) {
		// connectPoints(points[0]);
		tyrionButton.style.filter = "grayscale(0%)";
	} else {
		tyrionButton.style.filter = "";
	}
	if (CHARACTERS.CERSEI.selected) {
		// connectPoints(points[0]);
		cerseiButton.style.filter = "grayscale(0%)";
	} else {
		cerseiButton.style.filter = "";
	}
}

var CHARACTERS = {
	JON: {value: 0, name: "Jon Snow", code: 'J', color: [24, 93, 95], selected: false},
	DANY: {value: 1, name: "Daenerys Targaryen", code: 'D', color: [255, 0, 0], selected: false},
	THEON: {value: 2, name: "Theon Greyjoy", code: 'T', color: 255, selected: false},
	TYRION: {value: 0, name: "Tyrion Lannister", code: 'T', color: [0, 0, 255], selected: false},
	CERSEI: {value: 0, name: "Cersei Lanniester", code: 'C', color: [0, 0, 255], selected: false},
};

//draws x-axis
function drawGUI() {
	stroke(255);

	var startX = (windowWidth-scalePadding)/(scaleX);
	var endX = (scaleX)*(windowWidth-scalePadding)/(scaleX);
  	line(startX, midHt, endX, midHt);
  	var tickX = startX;
  	for (var i = 0; i < scaleX; i++) {
    	line(tickX, midHt - 5, tickX, midHt + 5);
    	// text(i+1, tickX, midHt + 15);
    	tickX += (windowWidth-scalePadding)/(scaleX);
  	}
	
	// var startX = 2*windowWidth/(scaleX+2);
	// var endX = (scaleX+1)*windowWidth/(scaleX+2);
 //  	line(startX, midHt, endX, midHt);
 //  	var tickX = startX;
 //  	for (var i = 0; i < scaleX; i++) {
 //    	line(tickX, midHt - 5, tickX, midHt + 5);
 //    	// text(i+1, tickX, midHt + 15);
 //    	tickX += (windowWidth)/(scaleX+2);
 //  	}
}

//changes mid-height variable to screen maxY, moving all objects down screen. changes slope to flatten character lines
function squash() {
  if (!squashed) {
    if (midHt < height - 20) {
      midHt+=10;
    }
    if (slope > .00000000000001) {
      slope *= .9;
    }
  } else {
    if (midHt > height/2 - 20) {
      midHt-=3;
    }
    if (slope < 1) {
      slope *= 1.1;
    }
  }
}

// function keyTyped() {
//   if (keyCode == ENTER) {
//   	lightbox();
//   }
// }

function lightbox(isViewing) {
	if (!isViewing) {
		viewing = true;
		resizeCanvas(window.innerWidth-200,500);
    	var x = (window.innerWidth - width) / 2;
  		var y = (window.innerHeight - height) / 4;
		cnv.position(x,y);
	}
}

//checks if mouse is clicked on point
function mouseClicked() {
	for (var i = 0; i < points.length; i++) {
		//checking collision of mouse on point
		if (mouseX > points[i].getX() - pointSize
				&& mouseX < points[i].getX() + pointSize
				&& mouseY < points[i].getY() + pointSize
				&& mouseY > points[i].getY() - pointSize) {
			mousePressed = true;
		} 
	}
}

//data structure to store character clips
//param: character enum, title of clip, episode number, rating 1-5, clip source "./media/____", info/quote to display on hover
function Point(character, title, ep, rate, src, info) {
	//
	this.character = character;
	this.title = title;
	this.ep = ep;
	this.rate = rate-1;
	this.src = src;
	this.info = info;
	this.isMouseOver = false;
	this.isClicked = false;
	//
	var infoHTML = "<h3>" + title + "</h3>"
				+ "<p>" + info + "</p>";
	//
	this.infoBox = createDiv(infoHTML);
	this.infoBox.id("infoBox");
	this.infoBox.hide();

	var vid = createVideo(this.src);
	vid.hide();
	//
	this.getX = function() {
		return ((this.ep)*(windowWidth-scalePadding))/(scaleX);//((this.ep+1)*windowWidth)/(scaleX+2);
	}
	this.getY = function() {
		return (midHt)-(slope*(this.rate*windowHeight)/(2*scaleY));
	}
	this.draw = function(bool) {
		var x = this.getX();
		var y = this.getY();
		if (bool) {
			stroke(this.character.color);
			fill(this.character.color);
			ellipse(x, y, pointSize, pointSize);
			if (this.isMouseOver) {
				this.infoBox.show();
				this.infoBox.position(cnv.x + x + 15, cnv.y + y + 15);
				if (mousePressed) {
					lightbox(viewing);
					// var vid = createVideo(this.src);
					vid.show();
					vid.size(width-100,height-100);
					vid.position(cnv.x+50, cnv.y+50);
					vid.showControls();
				}
			} else { 
				this.infoBox.hide();
			}
		}
	}
	//
	points.push(this);
	points.sort(function(a,b){return a.ep - b.ep});
}

//draws all points
function drawPoints() {
	for (var i = 0; i < points.length; i++) {
		points[i].draw(points[i].character.selected);
	}
}

//checks mouse collision on points
function checkPoints() {
	for (var i = 0; i < points.length; i++) {
		//checking collision of mouse on point
		if (mouseX > points[i].getX() - pointSize
				&& mouseX < points[i].getX() + pointSize
				&& mouseY < points[i].getY() + pointSize
				&& mouseY > points[i].getY() - pointSize) {
			points[i].isMouseOver = true;
		} else {
			points[i].isMouseOver = false;
		}
	}
}



//connects all points drawn with lines
function connectPoints(start) {
	var former = start;
	for (var i = 0; i < points.length; i++) {
		if (points[i].character == former.character) {
			stroke(points[i].character.color);
			line(former.getX(), former.getY(), points[i].getX(), points[i].getY());
			former = points[i];
		}
	}
	// for (var i = 0; i < points.length - 1; i++) {
	// 	stroke(points[i].color);
	// 	line(points[i].getX(), points[i].getY(), points[i+1].getX(), points[i+1].getY());
	// }
}
