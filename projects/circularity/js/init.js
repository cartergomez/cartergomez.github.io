var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables
        var circle; //declared variable circle. left undefined. Will use later to hold individal circle
        var circles = [] //empty array waiting to hold circles.

        // TODO 2 : Create a function that draws a circle 
        function drawCircle(){
            circle = draw.randomCircleInArea(canvas, true, true, '#999', 2); //draws the cirlce and stores it in the variable circle
            physikz.addRandomVelocity(circle, canvas, 10, 10); //adds a random velocity to the circle
            view.addChild(circle);
            circles.push(circle); //pushes that single circle to the array circles
        }
        // TODO 3 / 8 : Call the drawCircle() function 
        /*
        drawCircle(); //calls the function to draw a circle
        drawCircle(); 
        drawCircle();
        drawCircle();
        drawCircle();
        */
        
        for (var i  = 0; i <= 100; i++) { //creates an infinite loop for the cirlces without the repetitive code.
            drawCircle();
        }
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            // TODO 4 : Update the circle's position //
           /*
            physikz.updatePosition(circles[0]);
            physikz.updatePosition(circles[1]);
            physikz.updatePosition(circles[2]);
            physikz.updatePosition(circles[3]);
            physikz.updatePosition(circles[4]);
            // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
            game.checkCirclePosition(circles[0]);
            game.checkCirclePosition(circles[1]);
            game.checkCirclePosition(circles[2]);
            game.checkCirclePosition(circles[3]);
            game.checkCirclePosition(circles[4]);
            */
            // TODO 9 : Iterate over the array
            for (var k = 0; k <= circles.length - 1; k++) {
                physikz.updatePosition(circles[k])
                game.checkCirclePosition(circles[k]) //iterates over the previous array updating and cheking the position of all the circles.
            }
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {

            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
            if ( circle.x > canvas.width ) { //creates a "boarder" to where when a circle goes off a space of the scree it is then returned on the opposite side, creating a loop.
                circle.x = 0;
            }
            if ( circle.x < 0 ) {
                circle.x = - canvas.width;
            }
            if ( circle.y < 0 ) {
                circle.y = canvas.height;
            }
            if ( circle.y > canvas.height ) {
                circle.y = 0;
            }
            
            // TODO 7 : YOUR CODE STARTS HERE //////////////////////
   


            // YOUR TODO 7 CODE ENDS HERE //////////////////////////
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
    }
