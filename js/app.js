
// Enemies our player must avoid

var Enemy = function(x, y) {

  /*Variables applied to each of our instances go here,
   The image/sprite for our enemies, this uses
   a helper we've provided to easily load images*/

  this.x = x;
  this.y = y;
  this.sprite = 'images/enemy-bug.png';
};

 /*Update the enemy's position, required method for game
 Parameter: dt, a time delta between ticks*/

Enemy.prototype.update = function(dt) {

  /* multiply any movement by the dt parameter
   which will ensure the game runs at the same speed for
   all computers.*/

  for (var i = 0; i < allEnemies.length; i++) {
    if (allEnemies[i].x > 500) {
      allEnemies[i].x = -50;
      var speed = Math.floor((Math.random() + i * 70) + 45);
      allEnemies[i].x += speed * dt;
    }
    var speed = Math.floor((Math.random() + i * 60) + 40);
    allEnemies[i].x += speed * dt;
  }
};
// Draws the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* This is the player class
and has an update(), render() and
a handleInput() method.*/

var Player = function(x, y) {
  Enemy.call(this, x, y);
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
};
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;
// Draws the player on the screen, required method for game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Updates the player position on the game as the player reaches water
Player.prototype.update = function() {
  if (player.y < 0) {
    alert("Congratulations!! You won the game");
    player.x = 202;
    player.y = 405;
  }
};
// Gets the keyboard input and move the player accordingly
Player.prototype.handleInput = function(key) {
// Move the player to the left by 1 detailed
  if (key === 'left') {

    // if player reached  water, reset the game.

    if (player.y < 0) {
      player.update();
    }
    player.x -= 100;
    if (player.x < 0) {
      player.x += 100;
    }
  }
  //Move the player to the right by 1 tile
  if (key === 'right') {

    // if player reached  water, reset the game.

    if (player.y < 0) {
      player.update();
    }
    player.x += 100;
    if (player.x > 450) {
      player.x -= 100;
    }
  }
  //if down arrow pressed move player down by 1 tile
  if (key === 'down') {
    // if player reached  water,then pressing down key should reset the game.
    player.y += 99;
    if (player.y > 450) {
      player.x = 202;
      player.y = 405;
    }
    if (player.y < -85) {
      player.update();
    }
  }
  // if  up arrow key is pressed move player up by 1 tile
  if (key === 'up') {
    player.y -= 79;
    // if player reached  water, then pressing up key should reset the game.

    if (player.y < -7) {
      player.update();
    }
  }
};

/*Now instantiation of player and enemy objects.
 Place all enemy objects in an array called allEnemies
 Place the player object in a variable called player*/

const player = new Player(202, 405);
var allEnemies = [];
allEnemies[0] = new Enemy(1, 210);
allEnemies[1] = new Enemy(1, 140);
allEnemies[2] = new Enemy(1, 70);
// Check for collision between enemy and Player
Enemy.prototype.checkCollisions = function() {
  for (var i = 0; i < allEnemies.length; i++) {
    if (player.x <= 35 + allEnemies[i].x && 35 + player.x >= allEnemies[i].x &&
      player.y <= allEnemies[i].y + 35 && 37 + player.y >= allEnemies[i].y) {
      player.x = 200;
      player.y = 400;
    }
  }
};

/* This listens for key presses and sends the keys to your
 Player.handleInput() method. You don't need to modify this.*/

document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
