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

        // select current menu
        this.currentMenu = this.actionsMenu;

        // add menu to container
        this.menus.add(this.actionsMenu);
        this.menus.add(this.attacksMenu);

        this.battleScene = this.scene.get('battleScene');

        this.attacks = this.battleScene.player.attacks;
        this.attacksMenu.remap(this.attacks);

        this.input.keyboard.on('keydown', this.onKeyInput, this);
        

    }

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



    
}

