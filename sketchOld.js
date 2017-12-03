function preload() {
	bg = loadImage("./media/bg.jpg");
	jonIcon = loadImage("./media/jon.jpg");
	danyIcon = loadImage("./media/dany.jpg");
	theonImg = loadImage("./media/theonRaw.jpg");
}

function setup() {
	createCanvas(windowWidth,windowHeight);
	background(bg);
	div = createDiv(CHARACTERS.THEON.info);
	//
	points = [];//array to hold all episodes/points
	pointSize = 10;
	//episodes: 63, seasons: 7
	scaleX = 67;
	//rating scale: 0-5;
	scaleY = 5;

	//for squash() function
	slope = 1;//slope of plot lines
	midHt = windowHeight/2;
	squashed = false;
	mousePressed = false;

	
	var test1 = new Point(CHARACTERS.THEON, "The Dragon and the Wolf", 67, 5, "./media/7_07theon.mp4", "Jon Snow forgives Theon.");
	var test2 = new Point(CHARACTERS.THEON, "A Golden Crown", 9, 1, "./media/1_09theon.mp4", "Theon confronts Robb Stark.");
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
	
	// keyPressed();
	checkPoints();
	if (mousePressed) {
		// squashed = true;
		squash();
	}
	charInfo();
}

function controller() {
	if (CHARACTERS.JON.selected) {
		connectPoints(points[0]);
	}
	if (CHARACTERS.THEON.selected) {
		connectPoints(points[1]);
	}
}

var CHARACTERS = {
	JON: {value: 0, name: "Jon Snow", code: 'J', color: [0, 0, 255], selected: false},
	DANY: {value: 1, name: "Daenerys Targaryen", code: 'D', color: [255, 0, 0], selected: false},
	THEON: {value: 2, name: "Theon Greyjoy", code: 'T', color: 255, selected: false, info: "Prince Theon Greyjoy is the only living son and heir of Lord Balon Greyjoy of the Iron Islands, and younger brother of Yara Greyjoy. Following his father's failed rebellion against the Iron Throne, Theon is taken as a hostage/ward to Lord Eddard Stark of Winterfell. After Eddard's execution in King's Landing, Theon pledges his loyalty to Eddard's eldest son, Robb Stark, in the subsequent War of the Five Kings, but ultimately betrays Robb and sides with his father in invading the North, which leads to his capture by House Bolton. He is tortured and forced into servitude by Ramsay Snow, who turns him into a broken pet named Reek. Theon, however, redeems himself by helping Ramsay's wife, Sansa Stark, escape from Winterfell and find refuge with her half-brother (revealed to be cousin) Jon Snow, who later retakes Winterfell and defeats Ramsay. Slowly returning to his former self, Theon returns to the Iron Islands, where he learns of his father's death at the hands of his own uncle, Euron Greyjoy. In retaliation, Theon flees with Yara to seek out an alliance with Daenerys Targaryen in Meereen, where they pledge House Greyjoy's forces to her. Despite abandoning Yara during the assault on the Targaryen Fleet, he later appeals to Daenerys's forces to retrieve her from Euron's custody."}
};

//draws x-axis
function drawGUI() {
	stroke(255);
	
	var startX = 2*windowWidth/(scaleX+2);
	var endX = (scaleX+1)*windowWidth/(scaleX+2);
  	line(startX, midHt, endX, midHt);
  	var tickX = startX;
  	for (var i = 0; i < scaleX; i++) {
    	line(tickX, midHt - 5, tickX, midHt + 5);
    	text(i+1, tickX, midHt + 15);
    	tickX += (windowWidth)/(scaleX+2);
  	}
}

//draws char info under x-axis
function charInfo() {
	if (!squashed) {
		image(theonImg, 100, midHt+50, 300,180);
		div.position(420, midHt+50);
		div.style("background-color", "white");
	} else {
		div.hide();
	}
	
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

// function keyPressed() {
//   if (keyCode == ENTER) {
//     squash();
//   }
// }

//checks if mouse is clicked on point
function mouseClicked() {
	for (var i = 0; i < points.length; i++) {
		//checking collision of mouse on point
		if (mouseX > points[i].getX() - pointSize
				&& mouseX < points[i].getX() + pointSize
				&& mouseY < points[i].getY() + pointSize
				&& mouseY > points[i].getY() - pointSize) {
			mousePressed = true;
		} else {
			console.log("test2");
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
		return ((this.ep+1)*windowWidth)/(scaleX+2);
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
				this.infoBox.position(x,y-200);
				if (mousePressed) {
					// var vid = createVideo(this.src);
					vid.show();
					vid.size(windowWidth-100,windowHeight-100);
					vid.position(25, 50);
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
		points[i].draw(true);
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