class BattleUi extends Phaser.Scene{
    constructor(){
        super("battleUiScene");
    }




    create(){
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0x031f4c, 1);        
        this.graphics.strokeRect(2, 1100, 800, 300);
        this.graphics.fillRect(2, 1100, 800, 300);
        this.graphics.strokeRect(804, 1100, 598, 300);
        this.graphics.fillRect(804, 1100, 598, 300);

        // container to hold the menus
        this.menus = this.add.container();
        this.actionsMenu = new ActionsMenu(this, 804, 1100);
        this.attacksMenu = new AttacksMenu(this, 8, 1100);
        this.attackType;

        // select current menu
        this.currentMenu = this.actionsMenu;

        // add menu to container
        this.menus.add(this.actionsMenu);
        this.menus.add(this.attacksMenu);

        this.battleScene = this.scene.get('battleScene');

        // Grabs the attack arrays from BattleScene
        this.ENDAttacks = this.battleScene.player.ENDAttacks;
        this.WITAttacks = this.battleScene.player.WITAttacks;
        this.DEXAttacks = this.battleScene.player.DEXAttacks;
        this.items = this.battleScene.player.items;

        // Event listener for keystrokes
        this.input.keyboard.on('keydown', this.onKeyInput, this);

        // Event listener for player's turn
        this.battleScene.events.on('PlayerTurn', this.onPlayerTurn, this);

        // Listerner for actionsMenu Confirm()
        this.events.on('SelectAttacks', this.showAttacks, this);

        this.events.on('attack', this.attackEnemy, this);
        

    }

    // Function that calls on keystrokes
    onKeyInput(event){
        if(this.currentMenu){
            if(event.code == "ArrowUp"){
                this.currentMenu.moveSelectionUp();
            } else if(event.code === "ArrowDown") {
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
    showAttacks(menuItemIndex){
        
        // Depending on player selection, remaps attack menu to display the correct options
        if(menuItemIndex == 0){
            this.attacksMenu.remap(this.ENDAttacks);
            this.attackType = 'endurance';
        } else if(menuItemIndex == 1){
            this.attacksMenu.remap(this.WITAttacks);
            this.attackType = 'wit';
        } else if(menuItemIndex == 2){
            this.attacksMenu.remap(this.DEXAttacks);
            this.attackType = 'dexterity';
        } else{
            this.attacksMenu.remap(this.items);
        }

        this.currentMenu = this.attacksMenu;
        this.attacksMenu.select();
    }

    attackEnemy(){
        let index = this.attacksMenu.menuItemIndex;
        this.actionsMenu.deselect();
        this.attacksMenu.deselect();
        this.currentMenu = null;
        this.battleScene.receivePlayerSelection('attack', index);
    }





    
}

