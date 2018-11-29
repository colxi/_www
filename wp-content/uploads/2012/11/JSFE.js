jsFightEngine = {
		keydown :  function(event){
			var _keyAction = this.config.keyConfig[event.keyCode];
			// if key action is not already on list
			if(this.keymonitor.indexOf(_keyAction) == -1){
				// add it
				this.keymonitor.push(_keyAction); 
				// it there is more than a single key pressed, 
				if(this.keymonitor.length >= 1){
					// check if special key assignement is neded
					if(this.keymonitor.indexOf("front") != -1){
						if(this.keymonitor.indexOf("jump") != -1 && this.keymonitor.indexOf("jumpfront") == -1) this.keymonitor.push("jumpfront");
					}else if(this.keymonitor.indexOf("back") != -1){
						if(this.keymonitor.indexOf("jump") != -1 && this.keymonitor.indexOf("jumpback") == -1) this.keymonitor.push("jumpback");
					};
				};
			};
			console.log(event.keyCode);
			event.preventDefault();
			event.stopPropagation();
			return false;
		},
		keyup :	function(event){
			var _keyAction  = this.config.keyConfig[event.keyCode];
			// if there is a special combo key assigned
				if(_keyAction == "front"){
					if(this.keymonitor.indexOf("jump") != -1) this.keymonitor.splice(this.keymonitor.indexOf("jumpfront"),1);
				}else if(_keyAction == "back"){
					if(this.keymonitor.indexOf("jump") != -1) this.keymonitor.splice(this.keymonitor.indexOf("jumpback"),1);
				}else if(_keyAction == "jump"){
					if(this.keymonitor.indexOf("front") != -1) this.keymonitor.splice(this.keymonitor.indexOf("jumpfront"),1);
					else if(this.keymonitor.indexOf("back") != -1) this.keymonitor.splice(this.keymonitor.indexOf("jumpback"),1);
				};
			// remove key from key monitor list
			this.keymonitor.splice(this.keymonitor.indexOf(_keyAction),1);
			// check key action assignement
			if(_keyAction){
				// some actions understand a Key release as a cancellation of the action
				if(_keyAction == "crouch" && this.player.currentAction.name == "crouch"){
					this.player.currentAction = this.player.actions.standup;
					this.player.currentAction.actualFrame  = 0;
				};
			};
			event.preventDefault();
			event.stopPropagation();
			return false;
		},
		keymonitor: [],
		keylog:[],
		config: {
			canvas		: null,  // canvas object
			c			: null, // canvas context
			fps			: 0,
			keyConfig	: {
				39		: "front",
				37		: "back",
				40		: "crouch",
				38		: "jump",
				81		: "punch",
				87		: "punchstrong",
				65		: "kick",
				83		: "kickstrong",
			},
		},
		tick: function(){
			var _keyAction = this.keymonitor[this.keymonitor.length - 1] || false;	
			//  if there is any key pushed currently...
			// and current player action can be canceled, and requested action is diferent than current action
			if(_keyAction && !this.player.currentAction.mustEnd && this.player.currentAction.name != _keyAction ){												
				// if that key has an action assigned, and player has that action implemented
				if(this.player.actions[_keyAction]){
					// assign new action
					this.player.currentAction 				= this.player.actions[_keyAction];
					this.player.currentAction.actualFrame	= 0;
				};
			};
			// if  current action has finished, put player in waiting mode...
			if(!this.player.currentAction.sprites[this.player.currentAction.actualFrame]) {
				// put character on waiting mode
				if(this.player.currentAction.name == "crouch") this.player.currentAction.actualFrame -= 1; 
				else{
					this.player.currentAction =  this.player.actions["standing"];
					this.player.currentAction.actualFrame = 0;
				};
			};
			var d = new Date();
			var lastCall = this.lastFrame ;
			this.lastFrame = d.getTime();
			var fps = Math.ceil(1000/(this.lastFrame - lastCall));
			
			var _currentSprite = this.player.currentAction.sprites[this.player.currentAction.actualFrame];
			// calculate player new position
			this.player.x_position += _currentSprite.move[0];
			this.player.y_position += _currentSprite.move[1];
			
			// draw background	
			this.config.c.clearRect(0, 0, this.config.canvas.width, this.config.canvas.height);
			this.config.c.drawImage(this.sprites.engine.background,0,0,800,330,0,0,800,330);
			// draw player character
			this.config.c.drawImage(this.sprites.player1.spriteSheet,_currentSprite.xpos,_currentSprite.ypos,_currentSprite.width,_currentSprite.height, this.player.x_position, this.player.y_position - _currentSprite.height, _currentSprite.width, _currentSprite.height);
			
			this.player.currentAction.actualFrame += 1;

			this.statusBar(fps+ " FPS " + " | Current: "+ this.player.currentAction.name + " | KeyMonitor: " + this.keymonitor);
			// debug -->
			//this.config.c.strokeStyle = '#f00'; // red
			//this.config.c.lineWidth   = 1;
			//this.config.c.strokeRect(this.player.x , (this.player.y - _currentSprite.height) , _currentSprite.width , _currentSprite.height);
			// <-- end debug
		},
		player : {},
		statusBar: function(_text){
			this.config.c.fillStyle = '#f0f0f0';
			this.config.c.font = '10px  Lucida Console';
			this.config.c.textBaseline = 'bottom';
			this.config.c.fillText(_text, 10, 20);
		},
		sprites:{
			engine: {
				background: new Image()
			},
			player1: {
				spriteSheet: new Image()
			},
			player2: {
				spriteSheet: new Image()
			}
		},
		init: function(id,fps,zoom,map,playerSprites){
			// initiation secuence, enviroment definitions
			this.config.noCache			= "?sID=" + Math.floor(Math.random()*100); 		// prevent browser caching images. Just for developing pruposes
			this.config.canvas 			= document.getElementById(id);					// catch object
			if(!this.config.canvas.tabIndex || this.config.canvas.tabIndex == -1) this.config.canvas.tabIndex = 1; // makes canvas focusable
			this.config.c 				= this.config.canvas.getContext('2d');			// catch context
			this.config.fps				= fps || 24;									// user defined or default fps
			this.config.c.scale(zoom || 1, zoom || 1);									// user defined or default
						
			// assign player 1
			this.player = player;
			this.player.currentAction 				= this.player.actions.standing;
			// load sprite sheet, and background
			this.player.spritesheet 				= playerSprites;
			this.sprites.player1.spriteSheet.src 	= this.player.spritesheet ;
			this.sprites.engine.background.src 	 	= map;
			
			// LOADING SECUENCE ACOMPLISHED, engine ignition
			// set key event listeners for key monitoring
			this.config.canvas.addEventListener("keydown",this.keydown.bind(this), false);
			this.config.canvas.addEventListener("keyup", this.keyup.bind(this) , false);
			// apply focus to recieve key strokes
			this.config.canvas.focus();
			this.currentAction = this.player.actions.standing;
			// init clock at defined frames per second interval
			this.statusBar("LOADING sprites (2Mb)... please wait.");
			this.sprites.player1.spriteSheet.onload= function(){
				this.player.x_position		 = 100;
				this.player.y_position		 = 280;
				this.player.currentAction	 = this.player.actions.standing;
				this.config.clock = setInterval(this.tick.bind(this), 1000 / this.config.fps);
			}.bind(this);
		}
	}
	