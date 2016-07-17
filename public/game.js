window.onload = function() {
  console.log('game is loaded!');
  var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

  function preload() {
      game.load.baseURL = 'http://examples.phaser.io/assets/';
      game.load.crossOrigin = 'anonymous';

      game.load.image('car', 'sprites/car90.png');
  }

  var car;
  var cursors;
  var remotes;

  function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    car = game.add.sprite(400, 300, 'car');
    car.name = 'car';
    car.anchor.set(0.5);

    game.physics.enable(car, Phaser.Physics.ARCADE);

    car.body.collideWorldBounds = true;
    car.body.bounce.set(0.8);
    car.body.allowRotation = true;
    car.body.immovable = true;

    cursors = game.input.keyboard.createCursorKeys();

    cursors.left.onDown.add(function(){
      turn(-200);
    }, game);

    cursors.right.onDown.add(function(){
      turn(200);
    }, game);

    setTimeout(function(){
      // Everybody gets to race!
      console.log('listening on sockets');
      socket.on('ctrl', function (data) {
        console.log(data);
        if (data.turn) {
          cursors[data.turn].onDown.dispatch();
        }
        
        if (data.move) {
          moveForward();
        }
      });
    }, 2000);
  }

  function update() {
    car.body.velocity.x = 0;
    car.body.velocity.y = 0;
    car.body.angularVelocity = 0;

    if (cursors.left.isDown) {
      cursors.left.onDown.dispatch();
    } else if (cursors.right.isDown) {
      cursors.right.onDown.dispatch();
    }

    if (cursors.up.isDown) {
      moveForward();
    }
  }

  function render() {

  }

  function turn(vel){
    car.body.angularVelocity = vel;
  }

  function moveForward(){
    car.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(car.angle, 300));
  }
};
