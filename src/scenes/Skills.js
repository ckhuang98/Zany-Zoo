class Skills extends Phaser.Scene {
    constructor() {
        super("skillsScene");
    }
    preload(){
        this.load.path = "./assets/images/";
        this.load.image('skillsMenu', 'skillsMenu.png');
        this.load.image('plus', 'plus.png');
        this.load.image('minus', 'minus.png');
        this.load.image('confirm', 'confirm.png');
    }

    create(){
        this.add.tileSprite(0, 0, 900, 900, 'skillsMenu').setOrigin(0, 0);

        //initialization
        this.points = 5;
        this.maxPoints = 5;

        END = 1;
        STR = 1;
        WIT = 1;
        DEX = 1;
        DAY = 1;
        MONEY = 0;
        REWARD = 10;
        REDPOTION = 0;
        BLUEPOTION = 0;

        // interactable images
        this.plusEndurance = this.add.image(780, 320, 'plus');
        this.minusEndurance = this.add.image(100, 320, 'minus');
        this.plusStrength = this.add.image(770, 425, 'plus');
        this.minusStrength = this.add.image(130, 425, 'minus');
        this.plusWit = this.add.image(662, 530, 'plus');
        this.minusWit = this.add.image(275, 530, 'minus');
        this.plusDexterity = this.add.image(805, 625, 'plus');
        this.minusDexterity = this.add.image(130, 625, 'minus');
        this.confirm = this.add.image(450, 825, 'confirm');

        //skill display
        this.enduranceDisplay = this.add.text(690, 325, `${END}`, { fontFamily: 'Times New Roman', fontSize: '60px', color: '#FFFFFF'}).setOrigin(0.5);
        this.strengthDisplay = this.add.text(680, 430, `${STR}`, { fontFamily: 'Times New Roman', fontSize: '60px', color: '#FFFFFF'}).setOrigin(0.5);
        this.witDisplay = this.add.text(570, 535, `${WIT}`, { fontFamily: 'Times New Roman', fontSize: '60px', color: '#FFFFFF'}).setOrigin(0.5);
        this.dexterityDisplay = this.add.text(715, 630, `${DEX}`, { fontFamily: 'Times New Roman', fontSize: '60px', color: '#FFFFFF'}).setOrigin(0.5);
        this.pointsDisplay = this.add.text(735, 740, `${this.points}`, { fontFamily: 'Times New Roman', fontSize: '60px', color: '#FFFFFF'}).setOrigin(0.5);

        //endurance display and iteraction
        this.plusEndurance.setInteractive().on('pointerdown',()=>{
            if(this.points > 0){
            this.points--;
            END++;
            this.enduranceDisplay.setText(`${END}`);
            this.pointsDisplay.setText(`${this.points}`);    
            } 
        });
        this.minusEndurance.setInteractive().on('pointerdown',()=>{
            if(this.points < this.maxPoints){
            this.points++;
            END--;
            this.enduranceDisplay.setText(`${END}`); 
            this.pointsDisplay.setText(`${this.points}`);    
            } 
        });

        //strength display and iteraction
        this.plusStrength.setInteractive().on('pointerdown',()=>{
            if(this.points > 0){
            this.points--;
            STR++;
            this.strengthDisplay.setText(`${STR}`); 
            this.pointsDisplay.setText(`${this.points}`);   
            } 
        });
        this.minusStrength.setInteractive().on('pointerdown',()=>{
            if(this.points < this.maxPoints){
            this.points++;
            STR--;
            this.strengthDisplay.setText(`${STR}`); 
            this.pointsDisplay.setText(`${this.points}`);    
            } 
        });

         //wit display and iteraction
        this.plusWit.setInteractive().on('pointerdown',()=>{
            if(this.points > 0){
            this.points--;
            WIT++;
            this.witDisplay.setText(`${WIT}`); 
            this.pointsDisplay.setText(`${this.points}`);   
            } 
        });
        this.minusWit.setInteractive().on('pointerdown',()=>{
            if(this.points < this.maxPoints){
            this.points++;
            WIT--;
            this.witDisplay.setText(`${WIT}`); 
            this.pointsDisplay.setText(`${this.points}`);   
            } 
        });

        //dexterity display and iteraction
        this.plusDexterity.setInteractive().on('pointerdown',()=>{
            if(this.points > 0){
            this.points--;
            DEX++;
            this.dexterityDisplay.setText(`${DEX}`);
            this.pointsDisplay.setText(`${this.points}`);   
            } 
        });
        this.minusDexterity.setInteractive().on('pointerdown',()=>{
            if(this.points < this.maxPoints){
            this.points++;
            DEX--;
            this.dexterityDisplay.setText(`${DEX}`);
            this.pointsDisplay.setText(`${this.points}`);   
            } 
        });

        this.confirm.setInteractive().on('pointerdown',()=>{
            if(this.points == 0){
                this.scene.start("bossBattleScene");
            } 
        });
    }

    update(){

    }
}