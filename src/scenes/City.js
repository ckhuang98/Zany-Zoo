class City extends Phaser.Scene {
    constructor(){
        super("cityScene");
    }

    preload(){
        this.load.path = "./assets/images/";
        this.load.image('cityBackground', 'CityBackground.png');
        this.load.image('library', 'library.png');
        this.load.image('selectLibrary', 'selectLibrary.png');
        this.load.image('gym', 'gym.png');
        this.load.image('selectGym', 'selectGym.png');
        this.load.image('apartment', 'apartment.png');
        this.load.image('selectApartment', 'selectApartment.png');
        this.load.image('apartmentMenu', 'apartmentMenu.png');
        this.load.image('libraryMenu', 'libraryMenu.png');
        this.load.image('gymMenu', 'gymMenu.png');
        this.load.image('exit', 'exit.png');
    }

    create(){
        this.background = this.add.tileSprite(0, 0, 900, 900, 'cityBackground').setOrigin(0, 0);
        this.library = this.add.image(450, 455, 'library');
        this.gym = this.add.image(720, 470, 'gym');
        this.apartment = this.add.image(185, 270, 'apartment');
        let inEvent = false;



        this.library.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
            console.log('clicked');
            console.log(inEvent);
            if(!inEvent){
                inEvent = true;
                this.scene.start("battleScene");
                /*this.menu = this.add.image(450, 450, 'libraryMenu');
                this.plus = this.add.image(500, 430, 'plus').setOrigin(0, 0);
                this.minus = this.add.image(325, 430, 'minus').setOrigin(0, 0);*/
            }else{
                inEvent = false;
            }
        });

        this.apartment.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
            console.log('clicked');
            console.log(inEvent);
            if(!inEvent){
                inEvent = true;
                this.scene.start("battleScene");
                /*this.menu = this.add.image(450, 450, 'libraryMenu');
                this.plus = this.add.image(500, 430, 'plus').setOrigin(0, 0);
                this.minus = this.add.image(325, 430, 'minus').setOrigin(0, 0);*/
            }else{
                inEvent = false;
            }
        });

        this.gym.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
            console.log('clicked');
            console.log(inEvent);
            if(!inEvent){
                inEvent = true;
                this.scene.start("battleScene");
                /*this.menu = this.add.image(450, 450, 'libraryMenu');
                this.plus = this.add.image(500, 430, 'plus').setOrigin(0, 0);
                this.minus = this.add.image(325, 430, 'minus').setOrigin(0, 0);*/
            }else{
                inEvent = false;
            }
        });
    
        this.library.setInteractive().on('pointerover',()=>{
            if(!inEvent){
            this.library.setTexture('selectLibrary');
            }
        });
        this.gym.setInteractive().on('pointerover',()=>{
            if(!inEvent){
            this.gym.setTexture('selectGym');
            }
        });
        this.apartment.setInteractive().on('pointerover',()=>{
            if(!inEvent){
            this.apartment.setTexture('selectApartment');
            }
        });

        this.background.setInteractive().on('pointerover',()=>{;
            if(!inEvent){
            this.library.setTexture('library');
            this.gym.setTexture('gym');
            this.apartment.setTexture('apartment');
            }
        });
    
    }

    update(){
        
    }
}