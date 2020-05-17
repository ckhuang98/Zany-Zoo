class Battle extends Phaser.Scene{
    constructor(){
        super("battleScene");
    }

    preload(){
        this.load.image('bear', './assets/images/bear.png');
        this.load.image('player', './assets/images/sprite.png');
    }

    create(){
        // Sets placehold background
        this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
        
        // Creates Player
        this.player = new Player(this, 200, 700, 'bear', 1, 5, 5, 5);
        this.add.existing(this.player);
        this.player.createAttacks();

        // Creates Animal
        this.animal = new Animal(this, 1200, 700, 'bear', 1, 2, 1);
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
            console.log();
            this.time.addEvent({ delay: 1000, callback: this.nextTurn, callbackScope: this });
        }
    }

    // recieves player selection and calls nextTurn()
    receivePlayerSelection(action, index){
        if(action == 'attack'){
            this.player.attack(this.animal);
        } 
        if(this.animal.isLiving && this.player.isLiving){
            this.time.addEvent({ delay: 1000, callback: this.nextTurn, callbackScope: this });
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
        this.player.destroy();
        this.animal.destroy();
        console.log('Battle is over');
        this.scene.sleep('battleUiScene');
        //this.scene.switch('cityScene');
    }

    

    exitBattle(){
        this.scene.sleep('battleUiScene');
        this.scene.switch('cityScene');
    }
}


