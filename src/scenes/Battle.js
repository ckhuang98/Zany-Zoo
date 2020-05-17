class Battle extends Phaser.Scene{
    constructor(){
        super("battleScene");
    }

    preload(){
        this.load.image('bear', './assets/images/bear.png');
    }

    create(){
        // Sets placehold background
        this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
        
        // Creates Player
        this.player = new Player(this, 200, 700, 'bear', 1, 5, 5, 5);
        this.add.existing(this.player);
        this.player.createAttacks();

        // Creates Animal
        this.animal = new Animal(this, 1200, 700, 'bear', 1, 3, 1);
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
            this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
        }
    }

    // recieves player selection and calls nextTurn()
    receivePlayerSelection(action, index){
        if(action == 'attack'){
            this.player.attack(this.animal);
            console.log('player attacks animal');
        }
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
    }

    exitBattle(){
        this.scene.sleep('battleUiScene');
        this.scene.switch('cityScene');
    }
}


