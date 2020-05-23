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

        this.energyMenu = this.add.text(243, 740, `${this.energy}`, { fontFamily: 'Times New Roman', fontSize: '40px', color: '#FFFFFF'}).setOrigin(0.5);
        this.endMenu = this.add.text(592, 800, `${END}`, { fontFamily: 'Times New Roman', fontSize: '40px', color: '#FFFFFF'}).setOrigin(0.5);
        this.strMenu = this.add.text(293, 856, `${STR}`, { fontFamily: 'Times New Roman', fontSize: '40px', color: '#FFFFFF'}).setOrigin(0.5);
        this.witMenu = this.add.text(491, 857, `${WIT}`, { fontFamily: 'Times New Roman', fontSize: '40px', color: '#FFFFFF'}).setOrigin(0.5);
        this.dexMenu = this.add.text(785, 857, `${DEX}`, { fontFamily: 'Times New Roman', fontSize: '40px', color: '#FFFFFF'}).setOrigin(0.5);
        this.dayMenu = this.add.text(267, 800, `${15 - DAY}`, { fontFamily: 'Times New Roman', fontSize: '40px', color: '#FFFFFF'}).setOrigin(0.5);
        this.hpMenu = this.add.text(837, 798, `${2 * (END - 1) + 14}`, { fontFamily: 'Times New Roman', fontSize: '40px', color: '#FFFFFF'}).setOrigin(0.5);

        let inEvent = false;


        //library event if clicked
        this.library.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
            if(!inEvent){
                inEvent = true;
                //this.scene.start("battleScene");
                this.menu = this.add.image(450, 450, 'libraryMenu');
                this.plus = this.add.image(500, 430, 'plus').setOrigin(0, 0);
                this.minus = this.add.image(325, 430, 'minus').setOrigin(0, 0);
                this.exit = this.add.image(450, 750, 'exit');
                this.energyDisplay = this.add.text(450, 645, `${this.energy}`, { fontFamily: 'Times New Roman', fontSize: '60px', color: '#FFFFFF'}).setOrigin(0.5);
                this.skillDisplay = this.add.text(450, 465, `${WIT}`, { fontFamily: 'Times New Roman', fontSize: '60px', color: '#FFFFFF'}).setOrigin(0.5);

                this.plus.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy > 0){
                        WIT++;
                        this.energy--;
                        this.skillDisplay.setText(`${WIT}`);
                        this.energyDisplay.setText(`${this.energy}`);
                    }
                });
                this.minus.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy < 3){
                        WIT--;
                        this.energy++;
                        this.skillDisplay.setText(`${WIT}`);
                        this.energyDisplay.setText(`${this.energy}`);
                        }
                });
                this.exit.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy == 0){
                        if(DAY % 2 == 1){
                            DAY++;
                            console.log(DAY);
                            this.scene.start("cityScene");
                        }else{
                            console.log(DAY);
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
            if(!inEvent){
                inEvent = true;
                this.menu = this.add.image(450, 450, 'apartmentMenu');
                this.plus = this.add.image(500, 430, 'plus').setOrigin(0, 0);
                this.minus = this.add.image(325, 430, 'minus').setOrigin(0, 0);
                this.exit = this.add.image(450, 750, 'exit');
                this.energyDisplay = this.add.text(450, 640, `${this.energy}`, { fontFamily: 'Times New Roman', fontSize: '60px', color: '#FFFFFF'}).setOrigin(0.5);
                this.skillDisplay = this.add.text(450, 465, `${DEX}`, { fontFamily: 'Times New Roman', fontSize: '60px', color: '#FFFFFF'}).setOrigin(0.5);
                this.plus.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy > 0){
                        DEX++;
                        this.energy--;
                        this.skillDisplay.setText(`${DEX}`);
                        this.energyDisplay.setText(`${this.energy}`);
                    }
                });
                this.minus.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy < 3){
                        DEX--;
                        this.energy++;
                        this.skillDisplay.setText(`${DEX}`);
                        this.energyDisplay.setText(`${this.energy}`);
                        }
                });
                this.exit.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy == 0){
                        if(DAY % 2 == 1){
                            DAY++;
                            console.log(DAY);
                            this.scene.start("cityScene");
                        }else{
                            console.log(DAY);
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
                this.plusEndurance = this.add.image(495, 310, 'plus').setOrigin(0, 0);
                this.plusStrength = this.add.image(495, 450, 'plus').setOrigin(0, 0);
                this.minusEndurance = this.add.image(325, 310, 'minus').setOrigin(0, 0);
                this.minusStrength = this.add.image(325, 450, 'minus').setOrigin(0, 0);
                this.exit = this.add.image(450, 750, 'exit');
                this.energyDisplay = this.add.text(450, 640, `${this.energy}`, { fontFamily: 'Times New Roman', fontSize: '60px', color: '#FFFFFF'}).setOrigin(0.5);
                this.enduranceDisplay = this.add.text(450, 350, `${END}`, { fontFamily: 'Times New Roman', fontSize: '60px', color: '#FFFFFF'}).setOrigin(0.5);
                this.strengthDisplay = this.add.text(450, 490, `${STR}`, { fontFamily: 'Times New Roman', fontSize: '60px', color: '#FFFFFF'}).setOrigin(0.5);
                let firstClick = true;
                if(firstClick){
                    firstClick = false;
                    this.intialStr = STR;
                    this.intialEndur = END;
                }

                this.plusEndurance.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy > 0){
                        END++;
                        this.energy--;
                        this.enduranceDisplay.setText(`${END}`);
                        this.energyDisplay.setText(`${this.energy}`);
                    }
                });
                this.minusEndurance.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy < 3 && END > this.intialEndur){
                        END--;
                        this.energy++;
                        this.enduranceDisplay.setText(`${END}`);
                        this.energyDisplay.setText(`${this.energy}`);
                        }
                });

                this.plusStrength.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy > 0){
                        STR++;
                        this.energy--;
                        this.strengthDisplay.setText(`${STR}`);
                        this.energyDisplay.setText(`${this.energy}`);
                    }
                });
                this.minusStrength.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy < 3 && STR > this.intialStr){
                        STR--;
                        this.energy++;
                        this.strengthDisplay.setText(`${STR}`);
                        this.energyDisplay.setText(`${this.energy}`);
                        }
                });

                this.exit.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy == 0){
                        if(DAY % 2 == 1){
                            DAY++;
                            firstClick = true;
                            console.log(DAY);
                            this.scene.start("cityScene");
                        }else{
                            firstClick = true;
                            console.log(DAY);
                            this.scene.start("battleScene");
                        }
                    }else{
                    this.clearEventSpecial();
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
        this.endMenu.setText(`${END}`);
        this.strMenu.setText(`${STR}`);
        this.witMenu.setText(`${WIT}`);
        this.dexMenu.setText(`${DEX}`);
        this.dayMenu.setText(`${15 - DAY}`);
        this.hpMenu.setText(`${2 * (END - 1) + 14}`);
    }

    clearEvent(){
        this.menu.destroy();
        this.plus.destroy();
        this.minus.destroy();
        this.energyDisplay.destroy();
        this.exit.destroy();
        this.skillDisplay.destroy();
    }

    clearEventSpecial(){
        this.menu.destroy();
        this.plusEndurance.destroy();
        this.minusEndurance.destroy();
        this.plusStrength.destroy();
        this.minusStrength.destroy();
        this.energyDisplay.destroy();
        this.enduranceDisplay.destroy();
        this.strengthDisplay.destroy();
        this.exit.destroy();
    }
}