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
        this.energy = 3;
        let inEvent = false;


        //library event if clicked
        this.library.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
            console.log('clicked');
            console.log(inEvent);
            if(!inEvent){
                inEvent = true;
                //this.scene.start("battleScene");
                this.menu = this.add.image(450, 450, 'libraryMenu');
                this.plus = this.add.image(500, 430, 'plus').setOrigin(0, 0);
                this.minus = this.add.image(325, 430, 'minus').setOrigin(0, 0);
                this.exit = this.add.image(450, 750, 'exit');
                this.energyDisplay = this.add.text(450, 645, `${this.energy}`, { fontFamily: 'Times New Roman', fontSize: '60px', color: '#FFFFFF'}).setOrigin(0.5);

                this.plus.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy > 0){
                    this.energy--;
                    this.energyDisplay.setText(`${this.energy}`);
                    }
                });
                this.minus.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy < 3){
                        this.energy++;
                        this.energyDisplay.setText(`${this.energy}`);
                        }
                });
                this.exit.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy == 0){
                        if(Day % 2 == 1){
                            Day++;
                            this.scene.start("cityScene");
                        }else{
                            this.scene.start("battleScene");
                        }
                    }else{
                    this.clearEvent();
                    inEvent=false;
                    }
                });
            }
        });


        //apartment event if clicked
        this.apartment.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
            console.log('clicked');
            console.log(inEvent);
            if(!inEvent){
                inEvent = true;
                this.menu = this.add.image(450, 450, 'apartmentMenu');
                this.plus = this.add.image(500, 430, 'plus').setOrigin(0, 0);
                this.minus = this.add.image(325, 430, 'minus').setOrigin(0, 0);
                this.exit = this.add.image(450, 750, 'exit');
                this.energyDisplay = this.add.text(450, 640, `${this.energy}`, { fontFamily: 'Times New Roman', fontSize: '60px', color: '#FFFFFF'}).setOrigin(0.5);
                this.plus.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy > 0){
                    this.energy--;
                    this.energyDisplay.setText(`${this.energy}`);
                    }
                });
                this.minus.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy < 3){
                        this.energy++;
                        this.energyDisplay.setText(`${this.energy}`);
                        }
                });
                this.exit.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy == 0){
                        if(Day % 2 == 1){
                            Day++;
                            this.scene.start("cityScene");
                        }else{
                            this.scene.start("battleScene");
                        }
                    }else{
                    this.clearEvent();
                    inEvent=false;
                    }
                });
            }
        });

        this.gym.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
            if(!inEvent){
                inEvent = true;
                this.menu = this.add.image(450, 450, 'gymMenu');
                this.plusEndurance = this.add.image(495, 450, 'plus').setOrigin(0, 0);
                this.plusStrength = this.add.image(495, 310, 'plus').setOrigin(0, 0);
                this.minusEndurance = this.add.image(325, 450, 'minus').setOrigin(0, 0);
                this.minusStrength = this.add.image(325, 310, 'minus').setOrigin(0, 0);
                //this.intialStr = str;
                //this.intialEndur = endur;

                this.exit = this.add.image(450, 750, 'exit');
                this.energyDisplay = this.add.text(450, 640, `${this.energy}`, { fontFamily: 'Times New Roman', fontSize: '60px', color: '#FFFFFF'}).setOrigin(0.5);
                this.plusEndurance.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy > 0){
                    this.energy--;
                    this.energyDisplay.setText(`${this.energy}`);
                    }
                });
                this.minusEndurance.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy < 3){//need intial str for bug
                        this.energy++;
                        this.energyDisplay.setText(`${this.energy}`);
                        }
                });

                this.plusStrength.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy > 0){
                    this.energy--;
                    this.energyDisplay.setText(`${this.energy}`);
                    }
                });
                this.minusStrength.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy < 3){//need intial str for bug
                        this.energy++;
                        this.energyDisplay.setText(`${this.energy}`);
                        }
                });

                this.exit.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy == 0){
                        if(Day % 2 == 1){
                            Day++;
                            this.scene.start("cityScene");
                        }else{
                            this.scene.start("battleScene");
                        }
                    }else{
                    this.clearEvent();
                    inEvent=false;
                    }
                });
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

    clearEvent(){
        this.menu.destroy();
        this.plus.destroy();
        this.minus.destroy();
        this.energyDisplay.destroy();
        this.exit.destroy();
    }

    clearEventSpecial(){
        this.menu.destroy();
        this.plusEndurance.destroy();
        this.minusEndurance.destroy();
        this.plusStrength.destroy();
        this.minusStrength.destroy();
        this.energyDisplay.destroy();
        this.exit.destroy();
    }
}