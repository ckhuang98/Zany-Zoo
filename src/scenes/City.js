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
            }else{
                inEvent = false;
            }
        });
    
        this.library.setInteractive().on('pointerover',()=>{
            console.log(inEvent);
            if(!inEvent){
            this.library.setTexture('selectLibrary');
            console.log('over');
            }
        });
        this.gym.setInteractive().on('pointerover',()=>{
            console.log(inEvent);
            if(!inEvent){
            this.gym.setTexture('selectGym');
            console.log('over');
            }
        });
        this.apartment.setInteractive().on('pointerover',()=>{
            console.log(inEvent);
            if(!inEvent){
            this.apartment.setTexture('selectApartment');
            console.log('over');
            }
        });

        this.background.setInteractive().on('pointerover',()=>{
            console.log(inEvent);
            if(!inEvent){
            this.library.setTexture('library');
            this.gym.setTexture('gym');
            this.apartment.setTexture('apartment');
            console.log('away');
            }
        });
    
    }

    update(){
        
    }
}