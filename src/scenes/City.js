class City extends Phaser.Scene {
    constructor(){
        super("cityScene");
    }

    preload(){
        this.load.image('cityBackground', './assets/images/CityBackground.png');
        this.load.image('button', './assets/images/Button.png');
    }

    create(){
        /*this.add.tileSprite(0, 0, 1000, 1000, 'cityBackground').setOrigin(0, 0);
        this.button1 = this.add.image(200, 700, 'button');
        this.button2 = this.add.image(500, 700, 'button');
        this.button3 = this.add.image(790, 700, 'button');

        this.button1.inputEnabled = true;
        this.button1.events.onInputDown.add(listener, this);*/
    }

    update(){
        
    }

    listener(){
        //console.log("test")   
    }
}