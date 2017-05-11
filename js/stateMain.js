var StateMain={    
    
   preload:function()
    {
       game.load.image('red', 'images/main/blocks/red.png');
       game.load.image('blue', 'images/main/blocks/blue.png');
       game.load.image('green', 'images/main/blocks/green.png');
       game.load.image('yellow', 'images/main/blocks/yellow.png');

       game.load.spritesheet('rings', 'images/main/rings.png', 60/*width*/, 65/*height*/, 5/*nb of cells*/);
       game.load.spritesheet('balls', 'images/main/balls.png', 35/*width*/, 35/*height*/, 5/*nb of cells*/);
       game.load.spritesheet('soundButtons', 'images/ui/soundButtons.png', 32, 32, 2);

       game.load.audio('points', 'sounds/points.mp3');
       game.load.audio('gameOver', 'sounds/gameOver.mp3');

    },
    
    create:function()
    {

        //VARS
        this.speed = 200;
        this.incSpeed = 20;
        this.maxSpeed = 450;

        score = 0;

        game.physics.startSystem(Phaser.Physics.Arcade);

        this.pointSound = game.add.audio('points');
        this.gameOverSound = game.add.audio('gameOver');

        console.log("ready!")
        var red=game.add.image(0, 0, 'red');
        var blue=game.add.image(0, 100, 'blue');
        var green=game.add.image(100, 0, 'green');
        var yellow=game.add.image(100, 100, 'yellow');

        red.inputEnabled=true;
        red.name='red';

        blue.inputEnabled=true;
        blue.name='blue';

        green.inputEnabled=true;
        green.name='green';

        yellow.inputEnabled=true;
        yellow.name='yellow';

        red.events.onInputDown.add(this.changeColor, this);
        blue.events.onInputDown.add(this.changeColor, this);
        green.events.onInputDown.add(this.changeColor, this);
        yellow.events.onInputDown.add(this.changeColor, this);

        this.blockGroup = game.add.group();
        this.blockGroup.add(red);
        this.blockGroup.add(blue);
        this.blockGroup.add(green);
        this.blockGroup.add(yellow);

        this.blockGroup.x = game.world.centerX - this.blockGroup.width/2;
        this.blockGroup.y = game.height-250;

        //RING
        this.ring = game.add.image(game.world.centerX, this.blockGroup.y-100, "rings");
        this.ring.anchor.set(0.5, 0.5);


        //BALL
        this.ball = game.add.sprite(0, 0, 'balls'); //Only sprites can have physics applied to them
        this.ball.anchor.set(0.5, 0.5);
        //add physics to the object
        game.physics.arcade.enable(this.ball);

        //SCORE TEXT
        this.scoreText = game.add.text(game.world.centerX, 150, "0");
        this.scoreText.fill="#ffffff";
        this.scoreText.fontSize=64;
        this.scoreText.anchor.set(0.5, 0.5);

        this.scoreLabel = game.add.text(game.world.centerX, 100, "Score");
        this.scoreLabel.fill="#ffffff";
        this.scoreLabel.fontSize=32;
        this.scoreLabel.anchor.set(0.5, 0.5);

        this.soundButton = game.add.image(20,20,"soundButtons");
        this.soundButton.inputEnabled = true;
        this.soundButton.frame = soundOn ? 0 : 1;

        this.setListeners();
        this.resetBall();

        this.time = this.getTime();

    },
    getTime: function() {
        return (new Date()).getTime()
    },
    setListeners: function() {
        game.input.onUp.add(this.resetRing, this);
        this.soundButton.events.onInputDown.add(this.toggleSound, this);
    },
    toggleSound: function() {
        soundOn = !soundOn;
        this.soundButton.frame = soundOn ? 0 : 1;
    },
    resetBall: function() {
        var color = game.rnd.integerInRange(0, 5);
        var xx = game.rnd.integerInRange(0, game.world.width);
        var yy = game.rnd.integerInRange(0, 100);

        this.ball.frame = color;
        this.ball.x = xx;
        this.ball.y = yy;

        //this.ball.body.velocity.setTo(0, 100);
        var rot = game.physics.arcade.moveToXY(this.ball, this.ring.x, this.ring.y, this.speed);
        this.ball.rotation = rot;

        this.speed+= this.incSpeed;
        if (this.speed > this.maxSpeed){
            this.speed = this.maxSpeed;
        }

    },
    changeColor: function(target) {
        console.log(target.name);
        switch (target.name) {
            case "red":
                this.ring.frame=3;
                break;
            case "blue":
                this.ring.frame=1;
                break;
            case "green":
                this.ring.frame=2;
                break;
            case "yellow":
                this.ring.frame=4;
                break

        }
    },
    resetRing: function() {
        this.ring.frame=0;
    },
    
    update:function()
    {       
        /*
        var milis = this.getTime() - this.time
        console.log('fps:', 1000/milis);
        this.time = this.getTime();
        */

        var diffX = Math.abs(this.ring.x - this.ball.x);
        var diffY = Math.abs(this.ring.y - this.ball.y);

        if (diffX < 10 && diffY < 10 ){
            this.ball.body.velocity.setTo(0, 0);

            if (this.ball.frame == this.ring.frame){
                this.resetBall();
                score++;
                this.scoreText.text=score;
                if (soundOn) this.pointSound.play();
            } else {
                
                if (soundOn) this.gameOverSound.play();
                game.state.start("StateOver");
            }
        }


    }    
    
}