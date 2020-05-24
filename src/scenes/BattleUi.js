class BattleUi extends Phaser.Scene{
    constructor(){
        super("battleUiScene");
    }

    create(){

        // container to hold the menus
        this.menus = this.add.container();
        this.actionsMenu = new ActionsMenu(this, 575, 725);
        this.attacksMenu = new AttacksMenu(this, 8, 725);

        // select current menu
        this.currentMenu = this.actionsMenu;

        // add menu to container
        this.menus.add(this.actionsMenu);
        this.menus.add(this.attacksMenu);

        // Variable to hold scene data.
        this.battleScene = this.scene.get('battleScene');

        // Grabs the attack arrays from BattleScene
        this.attacks = [];
        for(let i = 0; i < this.battleScene.player.attacks.length; i += 2){
            this.attacks.push(this.battleScene.player.attacks[i]);
        }
        this.items = this.battleScene.player.items;

        // Flag for attacksMenu to determine whether to emit attack or item
        this.selectedItems = false;

        // Event listener for keystrokes
        this.input.keyboard.on('keydown', this.onKeyInput, this);

        // Event listener for player's turn
        this.battleScene.events.on('PlayerTurn', this.onPlayerTurn, this);

        // Listerner for actionsMenu Confirm()
        this.events.on('SelectAttacks', this.showAttacks, this);

        this.events.on('SelectItems', this.showItems, this);

        this.events.on('attack', this.attackEnemy, this);

        this.events.on('item', this.useItem, this);

        this.battleScene.nextTurn();

        this.message = new Message(this, this.battleScene.events);
        this.add.existing(this.message);
        

        // Event listner for item messages in the ui scene.
        this.message2 = new Message(this, this.events);
        this.add.existing(this.message2);

    }

    // Function that calls on keystrokes
    onKeyInput(event){
        if(this.currentMenu){
            if(event.code == "ArrowUp"){
                this.battleScene.sound.add('click').play();
                this.currentMenu.moveSelectionUp();
            } else if(event.code === "ArrowDown") {
                this.battleScene.sound.add('click').play();
                this.currentMenu.moveSelectionDown();
            } else if(event.code === "ArrowRight" || event.code === "Shift") {
 
            } else if(event.code === "Space" || event.code === "ArrowLeft") {
                this.currentMenu.confirm();
            }
        }   
    }

    // Function that calls on Player's turn.
    onPlayerTurn(){
        this.currentMenu = this.actionsMenu;
        this.actionsMenu.select();
    }

    // Function that calls when Player selects a type of attack they want to use.
    showAttacks(){
        this.selectedItems = false;
        this.attacksMenu.remap(this.attacks);

        this.currentMenu = this.attacksMenu;
        this.attacksMenu.select();
    }

    attackEnemy(){
        let index = this.attacksMenu.menuItemIndex;
        this.actionsMenu.deselect();
        this.attacksMenu.deselect();
        this.attacksMenu.clear();

        this.currentMenu = null;
        this.battleScene.receivePlayerSelection('attack', index);
    }

    // Displays the items player has
    showItems(){
        this.selectedItems = true;          // Set items flag to true

        // If player has no item, display message and return player to action menu
        if(BOUGHTPOTION == false || this.items.length < 1){
            this.events.emit("Message", "You do not have any items to use...");
            let timer = setTimeout(() =>{
                this.currentMenu = this.actionsMenu;
                this.actionsMenu.select();
            }, 3500);
            return;
        }

        this.attacksMenu.remap(this.items);
        this.currentMenu = this.itemsMenu;
        this.attacksMenu.select();
    }

    useItem(){
        let index = this.itemsMenu.menuItemIndex;
        this.actionsMenu.deselect();
        this.attacksMenu.deselect();
        this.attacksMenu.clear();

        this.currentMenu = null;
        this.battleScene.receivePlayerSelection('item', index);
    }



    
}

