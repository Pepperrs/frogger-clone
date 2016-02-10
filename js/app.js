// Enemies our player must avoid
var Enemy = function () {
    this.speed = Math.ceil(Math.random() * 5);

    this.x = -90;
    this.y = 50 + Math.ceil(Math.random() * 3) * 83;

    this.width = 100;
    this.height = 80;
    //decide the bugs heading and decide its image and starting point accordingly
    if (Math.round(Math.random()) > 0.5) {
        this.heading = 1; // goes right
        this.sprite = 'images/enemy-bug.png';
    }
    else {
        this.heading = -1; //goes left
        this.x = this.x + 707;
        this.sprite = 'images/enemy-bug-reverse.png';
    }

    //determine the bugs starting position

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    var difficulty = 101;
    this.x = this.x + (this.speed * dt) * difficulty * this.heading;

    // This removes the Enemy if it has passed the canvas
    if (this.x < -110 || this.x > 610) {
        var indexOfOutOfBoundsEnemy = allEnemies.indexOf(this);
        if (indexOfOutOfBoundsEnemy > -1) {
            allEnemies.splice(indexOfOutOfBoundsEnemy, 1);
        }
    }
    // This code tests for collisions of the current enemy and the player
    // the code has been copied from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if (player.x < this.x + this.width &&
        player.x + player.width > this.x &&
        player.y < this.y + this.height &&
        player.height + player.y > this.y) {
        endGame(false);
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Player Class
var Player = function () {

    //set the start grid
    this.x = 213;
    this.y = 50 + 5 * 83;
    this.width = 80;
    this.height = 80;
    //set the character image
    this.sprite = 'images/char-pink-girl.png';
};

// Draws the player
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handles Player input and ends the game, when the user has arrived at the top level
//prevents the player to go out of bounds
Player.prototype.handleInput = function (input) {
    switch (input) {
        case "left":
            if (this.x > 50) this.x = this.x - 101;
            break;
        case "up":
            (this.y > 150 ) ? this.y = this.y - 83 : endGame(true);
            break;
        case "right":
            if (this.x < 404) this.x = this.x + 101;
            break;
        case "down":
            if (this.y < 390) this.y = this.y + 83;
            break;
        default:
            console.log('false input');
            break;
    }

};

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
// Place the player object in a variable called player
var player = new Player();

//Allows mobile users to play the game
var goLeft = function () {
    player.handleInput('left');

//Allows mobile users to play the game
};
var goUp = function () {
    player.handleInput('up');

//Allows mobile users to play the game
};
var goDown = function () {
    player.handleInput('down');

//Allows mobile users to play the game
};
var goRight = function () {
    player.handleInput('right')

};

// This function provides means to reload the page with positive or negative endings
var endGame = function (success) {
    if (success) {
        window.alert("YOU WIN!");
        location.reload();
    }
    else {
        window.alert("It's a bug not a feature.");
        location.reload();
    }

};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
