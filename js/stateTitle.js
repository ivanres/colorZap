var StateTitle={    
    
   preload:function()
    {
       game.load.image('logo', 'images/title/gameLogo.png');

       game.load.spritesheet('buttons', 'images/ui/buttons.png', 265, 75, 8);
       console.log("width", screen.width);

       if (screen.width < 1024){
         game.scale.forceOrientation(false, true);	
       }
       
    },
    
    create:function()
    {
        this.logo = game.add.sprite(game.world.centerX, 180, "logo");
        this.logo.anchor.set(0.5,0.5);

        //START BUTTON
        this.btnStart = game.add.button(game.world.centerX, game.world.height, 'buttons', this.startGame, this, 7, 6, 7);
		this.btnStart.anchor.set(0.5, 0.5);
        this.setListeners();
    },
    startGame: function() {
    	console.log('GAME START!');
    	game.state.start("StateMain");
    },

    setListeners: function() {
    	if (screen.width < 1024){
    		game.scale.enterIncorrectOrientation.add(this.wrongWay, this);
    		game.scale.leaveIncorrectOrientation.add(this.rightWay, this);
    	}
    	
    },
    wrongWay: function() {
    	console.log("wrongWay");
    	document.getElementById('wrongWay').style.display='block';
    },
    rightWay: function() {
    	console.log("rightWay");	
    	document.getElementById('wrongWay').style.display='none';
    },
    update:function()
    {       
        
    }    
    
}