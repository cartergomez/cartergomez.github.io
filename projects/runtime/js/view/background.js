var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var tree;
        var buildings = []
     
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'#38333C');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            var moon = draw.bitmap('img/moon.png'); // created a variable called moon. Draw.bitmap draws the image and stores it in the moon variable
            moon.x = 700; // moves the moon to the left or right
            moon.y = 40; // moves the moon up or down
            moon.scaleX = 0.5; // scales the image on the x axis
            moon.scaleY = 0.5; // scales the moon on the y axis
            background.addChild(moon);

            for (var i = 0; i <= 100; i++){ // everytime the doop runs it creates a circle with a random x and y respectice to the canvas ad it adds to the canvas
                var circle = draw.circle(2,'white','LightGray',2); // loops drawing of circles to make stars
                circle.x = canvasWidth*Math.random(); // creates a random number to place the circle on the x axis
                circle.y = groundY*Math.random(); // creates a random number to place the circle on the y axis
                background.addChild(circle); // adds the stars to the background
            }

            
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for(var i=0;i<5;++i) {
                var buildingHeight = 300; //creates a variable called buildingHeught that holds the height of the building
                var building = draw.rect(75,buildingHeight,'LightGray','Black',1);
                building.x = 200*i; //positions the x of each building 200 pixels from the next building
                building.y = groundY-buildingHeight; //sets the y of the building off of groundY - buildingHeight
                background.addChild(building); // adds building to background so it can be seen
                buildings.push(building); // pushes each individual building to the buildings array
            } 


















            
            
            
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/tree.png');
            tree.x = 0; //assigns an x value to the tree
            tree.y = groundY - 220; //declares the y location of the tree
            background.addChild(tree);
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 1; //taking the value of tree.x (x position) and decreasing by 1 pixel every time the update function runs

            if(tree.x < -200) {
            tree.x = canvasWidth;
            }
            
            // TODO 5: Part 2 - Parallax
            

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
