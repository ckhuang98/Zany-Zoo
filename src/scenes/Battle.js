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
        this.load.audio('Slap', './assets/sounds/slap.mp3');
        this.load.audio('Scream', './assets/sounds/scream.mp3');
        this.load.audio('Cartwheel', './assets/sounds/swoosh.mp3');
    }

    create(){
        // Sets placehold background
        this.background = this.add.tileSprite(0, 0, WIDTH, HEIGHT, 'background').setOrigin(0,0);
        
        // Creates Player
        this.player = new Player(this, 750, 500, 'player', 1);
        this.add.existing(this.player);
        this.player.createAttacks();
        this.player.flipX = true;

        // HELP PHILIP!
        this.playerHp = this.add.text(760, 330, "", { color: '#ffffff', align: 'left', fontSize: 25}).setOrigin(0.5);
        this.playerHp.setText("HP: " + this.player.hp);

        // Creates Animal
        this.animal = new Bear(this, 125, 150, 'bear', 1, 'str');
        this.add.existing(this.animal);

        // SAVE ME PHILIP!!!!!
        this.animalHp = this.add.text(125, 300, "", { color: '#ffffff', align: 'left', fontSize: 25}).setOrigin(0.5);
        this.animalHp.setText("HP: " + this.animal.hp);


        // Keeps track of whose turn it is
        this.turnCounter = 0;
        if(DAY % 7 == 0){
            REWARD = 15;
        }


        this.scene.launch('battleUiScene');

        
    }

    // Moves the battle along
    nextTurn(){
        this.turnCounter++;

        if(this.animal.isLiving && this.player.isLiving){
            if(this.turnCounter % 2 != 0){
                this.events.emit('PlayerTurn');
            } else{
                this.animal.attack(this.player);
                this.playerHp.setText("HP: " + this.player.hp);
                this.sound.add('bearRoar').play();
                this.time.addEvent({ delay: 3500, callback: this.nextTurn, callbackScope: this });
            }  
        } else {
            if(this.animal.isLiving == true){
                this.events.emit("Message", "You've been defeated...");
                let timer = setTimeout(() =>{
                    this.exitBattle();
                }, 3500);
            } else{
                this.events.emit("Message", "You won! You find yourself rewarded with " + REWARD + " dollars!");
                MONEY += REWARD;
                let timer = setTimeout(() =>{
                    this.exitBattle();
                }, 3500);
            }
        }
    }

    // recieves player selection and calls nextTurn()
    receivePlayerSelection(action, index){
        if(action == 'attack'){
            if(index == 0){
                let type = "str";
                for(let i = 0; i < this.player.attackText.length; i += 6){
                    if(this.player.attacks[index] === this.player.attackText[i]){
                        let damage = this.player.attacks[index + 1];
                        if(this.player.attacks[index] === 'Slap'){
                            this.sound.add('Slap').play();
                        }
                        this.player.attack(this.animal, type, damage, i);
                    }
                }
            } else if(index == 1){
                let type = "wit";
                for(let i = 2; i < this.player.attackText.length; i += 6){
                    if(this.player.attacks[index + 1] === this.player.attackText[i]){
                        let damage = this.player.attacks[index + 2];
                        if(this.player.attacks[index + 1] === 'Scream'){
                            this.sound.add('Scream').play();
                        }
                        this.player.attack(this.animal, type, damage, i);
                    }
                }
            } else{
                let type = "dex";
                for(let i = 4; i < this.player.attackText.length; i += 6){
                    if(this.player.attacks[index + 2] === this.player.attackText[i]){
                        let damage = this.player.attacks[index + 3];
                        if(this.player.attacks[index + 2] === 'Cartwheel'){
                            this.sound.add('Cartwheel').play();
                        }
                        this.player.attack(this.animal, type, damage, i);
                    }
                }

            }
            this.animalHp.setText("HP: " + this.animal.hp);
            this.time.addEvent({ delay: 3500, callback: this.nextTurn, callbackScope: this });
        
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

    
    keyPressListener(event){
        if(event.code === "Space")
            this.scene.switch('menuScene');
    }
    

    exitBattle(){
        this.scene.stop('battleUiScene');
        this.scene.start('cityScene');
    }
}

