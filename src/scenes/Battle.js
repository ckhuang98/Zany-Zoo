class Battle extends Phaser.Scene{
    constructor(){
        super("battleScene");
    }

    preload(){
        this.load.image('bear', './assets/images/bear.png');
        this.load.image('player', './assets/images/sprite.png');
        this.load.image('background', './assets/images/minigameBackground.png');

        this.load.audio('click', './assets/sounds/click.mp3');
        this.load.audio('bearRoar', './assets/sounds/bearRoar.mp3');
        this.load.audio('slap', './assets/sounds/slap.mp3');
        this.load.audio('scream', './assets/sounds/scream.mp3');
        this.load.audio('swoosh', './assets/sounds/swoosh.mp3');
    }

    create(){
        // Sets placehold background
        this.background = this.add.tileSprite(0, 0, WIDTH, HEIGHT, 'background').setOrigin(0,0);
        
        // Creates Player
        this.player = new Player(this, 900, 500, 'player', 1, 5, 5, 5);
        this.add.existing(this.player);
        this.player.createAttacks();
        this.player.flipX = true;

        // Creates Animal
        this.animal = new Animal(this, 200, 200, 'bear', 1, 3, 1);
        this.add.existing(this.animal);

        // Keeps track of whose turn it is
        this.turnCounter = 0;

        this.scene.launch('battleUiScene');

        
    }

    // Moves the battle along
    nextTurn(){
        this.turnCounter++;
        if(this.turnCounter % 2 != 0){
            this.events.emit('PlayerTurn');
        } else{
            this.animal.attack(this.player);
            this.sound.add('bearRoar').play();
            console.log("Player Health: " + this.player.hp);
            this.time.addEvent({ delay: 2000, callback: this.nextTurn, callbackScope: this });
        }
    }

    // recieves player selection and calls nextTurn()
    receivePlayerSelection(action, index){
        if(action == 'attack'){
            this.player.attack(this.animal);
            console.log("Animal health: " + this.animal.hp);
        } 
        if(this.animal.isLiving && this.player.isLiving){
            this.time.addEvent({ delay: 2000, callback: this.nextTurn, callbackScope: this });
        } else{
            this.endBattle();
        }
        
    }

    /*
    // Checks if battle is over by checking animal and player is living or not
    checkEndBattle(){
        let victory = true;
        if(this.animal.living == true){
            victory = false;
        }
        let loseBattle = false;
        if(this.player.living == false){
            loseBattle = true;
        }
        return victory || loseBattle;
    }
    */
    
    // Ends battle, removes player and animal, and sleeps scene
    endBattle(){
        this.animal.destroy();
        console.log('Battle is over, you win!');
        this.scene.sleep('battleUiScene');
        //this.scene.switch('cityScene');
    }
    
    keyPressListener(event){
        if(event.code === "Space")
            this.scene.switch('menuScene');
    }
    

    exitBattle(){
        this.scene.sleep('battleUiScene');
        this.scene.switch('cityScene');
    }
}


