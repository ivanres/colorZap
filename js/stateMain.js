var StateMain={    
    
   preload:function()
    {
       game.load.image('red', 'images/main/blocks/red.png');
       game.load.image('blue', 'images/main/blocks/blue.png');
       game.load.image('green', 'images/main/blocks/green.png');
       game.load.image('yellow', 'images/main/blocks/yellow.png');
    },
    
    create:function()
    {
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

        this.grp = game.add.group();
        this.grp.add(red);
        this.grp.add(blue);
        this.grp.add(green);
        this.grp.add(yellow);

        this.grp.x = game.world.centerX - this.grp.width/2;
        this.grp.y = game.height-250;

    },
    changeColor: function(target) {
        console.log(target.name);
    },
    
    update:function()
    {       
        
    }    
    
}