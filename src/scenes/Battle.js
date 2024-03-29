class Battle extends Phaser.Scene{
    constructor(){
        super("battleScene");
    }

    create(){
        // Sets placehold background
        this.background = this.add.tileSprite(0, 0, WIDTH, HEIGHT, 'background').setOrigin(0,0);

        // Adds music
        this.battleMusic = this.sound.add('battleMusic');
        this.battleMusic.play({
            loop: true,
            volume: .5,
            mute: false
        });
        
        // Creates Player
        this.player = new Player(this, 750, 500, 'player', 1);
        this.add.existing(this.player);
        this.player.createAttacks();
        this.player.createItems();
        console.log(this.player.items);
        

        // Displays player
        this.playerHp = this.add.text(760, 330, "", { color: '#ffffff', align: 'left', fontSize: 25}).setOrigin(0.5);
        this.playerHp.setText("HP: " + this.player.hp);

        // Creates Animal
        this.animal = null;
        if(DAY == 2 || DAY == 8){
            this.animal = new Bear(this, 125, 150, 'bear', 1, 'str');
        } else if(DAY == 4 || DAY == 10){
            this.animal = new Pig(this, 125, 150, 'pig', 1, 'wit');
        } else if(DAY == 6 || DAY == 12){
            this.animal = new Monkey(this, 125, 150, 'monkey', 1, 'dex');
        }
        this.add.existing(this.animal);

        // Displays animal health
        this.animalHp = this.add.text(125, 300, "", { color: '#ffffff', align: 'left', fontSize: 25}).setOrigin(0.5);
        this.animalHp.setText("HP: " + this.animal.hp);

        

        // Keeps track of whose turn it is
        this.turnCounter = 0;

        // Adjusts Combat Reward based on days
        if(DAY % 7 == 0){
            REWARD = 15;
        }

        this.menus = this.add.container();
        this.actionsMenu = new ActionsMenu(this, 575, 725);
        this.attacksMenu = new AttacksMenu(this, 8, 725);

        // add menu to container
        this.menus.add(this.actionsMenu);
        this.menus.add(this.attacksMenu);

        // Grabs the attack arrays from BattleScene
        this.attacks = [];
        for(let i = 0; i < this.player.attacks.length; i += 2){
            this.attacks.push(this.player.attacks[i]);
        }
        this.items = this.player.items;

        // Flag for attacksMenu to determine whether to emit attack or item
        this.selectedItems = false;

        // Event listener for player's turn
        this.events.on('PlayerTurn', this.onPlayerTurn, this);

        // Listerner for actionsMenu Confirm()
        this.events.on('SelectAttacks', this.showAttacks, this);

        this.events.on('SelectItems', this.showItems, this);

        this.events.on('attack', this.attackEnemy, this);

        this.events.on('item', this.useItem, this);

        this.sys.events.once('shutdown', this.shutdown, this);

        // Displays Combat Text
        this.combatText = new Phaser.GameObjects.Text(
            this, 250, 795, "", { color: '#ffffff', align: 'left', fontSize: 25, wordWrap: { width: 500, basicWordWrap: true }}
        ).setOrigin(0.5);
        this.add.existing(this.combatText);

        this.events.on("Message", this.showMessage, this);

        this.nextTurn();
        
    }

    // Moves the battle along, keeps track of player turn.
    nextTurn(){
        this.turnCounter++;
        if(this.animal.isLiving && this.player.isLiving){
            if(this.turnCounter % 2 != 0){
                this.events.emit('PlayerTurn');
            } else{
                this.animal.attack(this.player);
                this.playerHp.setText("HP: " + this.player.hp);
                this.time.addEvent({ delay: 5000, callback: this.nextTurn, callbackScope: this });
            }  
        } else {
            if(this.animal.isLiving == true){
                this.events.emit("Message", "You've been defeated...");
                let timer = setTimeout(() =>{
                    this.exitBattle();
                }, 5000);
            } else{
                this.events.emit("Message", "You won! You find yourself rewarded with " + REWARD + " dollars!");
                MONEY += REWARD;
                let timer = setTimeout(() =>{
                    this.exitBattle();
                }, 5000);
            }
        }
    }

    // Function that calls on Player's turn.
    onPlayerTurn(){
        this.currentMenu = this.actionsMenu;
    }

    // Function that calls when Player selects a type of attack they want to use.
    showAttacks(){
        this.selectedItems = false;
        this.attacksMenu.clear();
        
        for(let i = 0; i < this.attacks.length; i++){
            this.attacksMenu.addMenuItem(this.attacks[i], () => {this.events.emit('attack', i);});
        }

        this.currentMenu = this.attacksMenu;
    }

    // Displays the items player has
    showItems(){
        this.selectedItems = true;          // Set items flag to true

        this.attacksMenu.clear();
        // If player has no item, display message and return player to action menu
        if(this.items.length < 1){
            this.events.emit("Message", "You do not have any items to use...");
            let timer = setTimeout(() =>{
                this.currentMenu = this.actionsMenu;
            }, 5000);
            return;
        }

        for(let i = 0; i < this.items.length; i++){
            this.attacksMenu.addMenuItem(this.items[i], () => {this.events.emit('item', i);});
        }
        this.currentMenu = this.attacksMenu;
    }

    attackEnemy(index){
        this.attacksMenu.clear();

        this.currentMenu = null;
        this.receivePlayerSelection('attack', index);
    }

    useItem(index){
        this.attacksMenu.clear();

        this.currentMenu = null;
        this.receivePlayerSelection('item', index);
    }

    // recieves player selection and calls nextTurn()
    receivePlayerSelection(action, index){
        if(action == 'attack'){
            if(index == 0){
                let type = "str";
                for(let i = 0; i < this.player.attackText.length; i += 6){
                    if(this.player.attacks[index] === this.player.attackText[i]){
                        let damage = this.player.attacks[index + 1];
                        if(this.player.attacks[index] === 'Strength: Slap'){
                            this.sound.add('Slap').play();
                        }
                        else if(this.player.attacks[index] === 'Strength: Smash'){
                            this.sound.add('Smash').play();
                        }
                        else if(this.player.attacks[index] === 'Strength: Haymaker'){
                            this.sound.add('Haymaker').play();
                        }
                        else if(this.player.attacks[index] === 'Strength: Toss'){
                            this.sound.add('Toss').play();
                        }
                        else if(this.player.attacks[index] === 'Strength: Rage'){
                            this.sound.add('Rage').play();
                        }
                        this.player.attack(this.animal, type, damage, i);
                    }
                }
            } else if(index == 1){
                let type = "wit";
                for(let i = 2; i < this.player.attackText.length; i += 6){
                    if(this.player.attacks[index + 1] === this.player.attackText[i]){
                        let damage = this.player.attacks[index + 2];
                        if(this.player.attacks[index + 1] === 'Wit: Scream'){
                            this.sound.add('Scream').play();
                        }
                        else if(this.player.attacks[index + 1] === 'Wit: Intimidate'){
                            this.sound.add('Intimidate').play();
                        }
                        else if(this.player.attacks[index + 1] === 'Wit: Persuade'){
                            this.sound.add('Persuade').play();
                        }
                        else if(this.player.attacks[index + 1] === 'Wit: Trap'){
                            this.sound.add('Trap').play();
                        }
                        else if(this.player.attacks[index + 1] === 'Wit: Trick'){
                            this.sound.add('Trick').play();
                        }
                        this.player.attack(this.animal, type, damage, i);
                    }
                }
            } else if(index == 2){
                let type = "dex";
                for(let i = 4; i < this.player.attackText.length; i += 6){
                    if(this.player.attacks[index + 2] === this.player.attackText[i]){
                        let damage = this.player.attacks[index + 3];
                        if(this.player.attacks[index + 2] === 'Dexterity: Cartwheel'){
                            this.sound.add('Cartwheel').play();
                        }
                        else if(this.player.attacks[index + 2] === 'Dexterity: Spin Attack'){
                            this.sound.add('Spin Attack').play();
                        }
                        else if(this.player.attacks[index + 2] === 'Dexterity: Jump Kick'){
                            this.sound.add('Jump Kick').play();
                        }
                        else if(this.player.attacks[index + 2] === 'Dexterity: Maneuver'){
                            this.sound.add('Manuever').play();
                        }
                        else if(this.player.attacks[index + 2] === 'Dexterity: Acrobatics'){
                            this.sound.add('Acrobatics').play();
                        }
                        this.player.attack(this.animal, type, damage, i);
                    }
                }

            }
            this.animalHp.setText("HP: " + this.animal.hp);
            this.time.addEvent({ delay: 5000, callback: this.nextTurn, callbackScope: this });
        } else if(action == 'item'){
            if(this.player.items[index] == 'Red Potion'){
                this.sound.add('Slurp').play();
                this.events.emit("Message", "SLURRRP. You drink greedily from the red potion you just pulled out of your pocket.");
                this.player.hp += 35;
                if(this.player.hp > (3 * (END - 1) + 18)){
                    this.player.hp =  3 * (END - 1) + 18;
                }
                this.playerHp.setText("HP: " + this.player.hp);
                REDPOTION--;
                if(REDPOTION == 0){
                    this.player.items.splice(index, 1);
                }
            } else if(this.player.items[index] == 'Blue Potion'){
                this.sound.add('Slurp').play();
                this.events.emit("Message", "SLURRRP. You drink greedily from the blue potion you just pulled out of your pocket.");
                this.player.hp += 70;
                if(this.player.hp >  3 * (END - 1) + 18){
                    this.player.hp =  3 * (END - 1) + 18;
                }
                this.playerHp.setText("HP: " + this.player.hp);
                BLUEPOTION--;
                if(BLUEPOTION == 0){
                    this.player.items.splice(index, 1);
                }
            }
            this.time.addEvent({ delay: 5000, callback: this.nextTurn, callbackScope: this });
        }
    }

    showMessage(text) {
        console.log(text);
        this.actionsMenu.menuItems[0].disableInteractive()
        this.actionsMenu.menuItems[1].disableInteractive();
        this.combatText.setText(text);
        this.combatText.visible = true;
        if(this.hideEvent)
            this.hideEvent.remove(false);

        // Displays text for 3.5 seconds and then hides it.
        this.hideEvent = this.time.addEvent({ delay: 5000, callback: this.hideMessage, callbackScope: this });
    }

    // Hides displayed text
    hideMessage() {
        this.actionsMenu.menuItems[0].setInteractive();
        this.actionsMenu.menuItems[1].setInteractive();
        this.hideEvent = null;
        this.combatText.visible = false;
    }


    exitBattle(){
        this.battleMusic.stop();
        this.scene.start('cityScene');
    }

    shutdown(){
        console.log('ui shutdown');
        this.input.keyboard.off('keydown');

        // Event listener for player's turn
        this.events.off('PlayerTurn');

        // Listerner for actionsMenu Confirm()
        this.events.off('SelectAttacks');

        this.events.off('SelectItems');

        this.events.off('attack');

        this.events.off('item');
        this.actionsMenu.destroy();
        this.attacksMenu.destroy();
        this.combatText.destroy();
    }
}

