class City extends Phaser.Scene {
    constructor(){
        super("cityScene");
    }

    preload(){
        this.load.path = "./assets/images/";
        //all interactable select images and building images
        this.load.image('cityBackground', 'CityBackground.png');
        this.load.image('library', 'library.png');
        this.load.image('selectLibrary', 'selectLibrary.png');
        this.load.image('gym', 'gym.png');
        this.load.image('selectGym', 'selectGym.png');
        this.load.image('apartment', 'apartment.png');
        this.load.image('selectApartment', 'selectApartment.png');
        this.load.image('store', 'store.png');
        this.load.image('selectStore', 'selectStore.png');
        this.load.image('dayOff', 'dayOff.png');
        this.load.image('workDay', 'workDay.png');

        //all menus that can be created
        this.load.image('gymMenu', 'gymMenu.png');
        this.load.image('apartmentMenu', 'apartmentMenu.png');
        this.load.image('libraryMenu', 'libraryMenu.png');
        this.load.image('storeMenu', 'storeMenu.png');
        this.load.image('itemMenu', 'itemMenu.png');

        //all buttons and displayable images
        this.load.image('exit', 'exit.png');
        this.load.image('exitSmall', 'exitSmall.png');
        this.load.image('buy', 'buy.png');
        this.load.image('shoe', 'shoe.png');
        this.load.image('protein', 'protein.png');
        this.load.image('book', 'book.png');
        this.load.image('controller', 'controller.png');
        this.load.image('redPotion', 'redPotion.png');
        this.load.image('bluePotion', 'bluePotion.png');
        this.load.image('n/a', 'nothing.png');
        this.load.image('itemButton', 'itemButton.png');
        this.load.image('itemSelect', 'itemSelect.png');

    }

    create(){
        //main city menu display
        this.background = this.add.tileSprite(0, 0, 900, 900, 'cityBackground').setOrigin(0, 0);
        this.library = this.add.image(450, 455, 'library');
        this.store = this.add.image(755, 331, 'store');
        this.gym = this.add.image(720, 472, 'gym');
        this.apartment = this.add.image(185, 270, 'apartment');
        this.itemMenu = this.add.image(450, 745, 'itemButton');

        this.menuScene = this.scene.get('menuScene');
        if(!this.menuScene.bgm.isPlaying){
            this.menuScene.bgm.play({
                loop: true,
                volume: .5,
                mute: false
            });
        }

        //to keep track of energy used throughout day
        this.energy = 3;
        this.maxEnergy = 3;//to adjust and balance the game, a variable is used for convenience
        this.maxSkill = 20;

        //keeps track of all player stats
        this.energyMenu = this.add.text(243, 740, `${this.energy}`, { fontFamily: 'Times New Roman', fontSize: '40px', color: '#FFFFFF'}).setOrigin(0.5);
        this.endMenu = this.add.text(592, 800, `${END}`, { fontFamily: 'Times New Roman', fontSize: '40px', color: '#FFFFFF'}).setOrigin(0.5);
        this.strMenu = this.add.text(293, 856, `${STR}`, { fontFamily: 'Times New Roman', fontSize: '40px', color: '#FFFFFF'}).setOrigin(0.5);
        this.witMenu = this.add.text(495, 857, `${WIT}`, { fontFamily: 'Times New Roman', fontSize: '40px', color: '#FFFFFF'}).setOrigin(0.5);
        this.dexMenu = this.add.text(808, 857, `${DEX}`, { fontFamily: 'Times New Roman', fontSize: '40px', color: '#FFFFFF'}).setOrigin(0.5);
        this.dayMenu = this.add.text(267, 800, `${15 - DAY}`, { fontFamily: 'Times New Roman', fontSize: '40px', color: '#FFFFFF'}).setOrigin(0.5);
        this.hpMenu = this.add.text(837, 798, `${3 * (END - 1) + 18}`, { fontFamily: 'Times New Roman', fontSize: '40px', color: '#FFFFFF'}).setOrigin(0.5);
        this.moneyMenu = this.add.text(840, 738, `${MONEY}`, { fontFamily: 'Times New Roman', fontSize: '40px', color: '#FFFFFF'}).setOrigin(0.5);

        let inEvent = false;//keeps track of menu's being used to lock other menu's
        let firstClick = true;//used for the gym to keep track of intial stats to prevent unlimited level up bug


        //library event if clicked
        this.library.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
            if(!inEvent){
                inEvent = true;

                //interactive display
                this.menu = this.add.image(450, 450, 'libraryMenu');
                this.plus = this.add.image(495, 425, 'plus').setOrigin(0, 0);
                this.minus = this.add.image(325, 425, 'minus').setOrigin(0, 0);
                this.exit = this.add.image(450, 750, 'exit');
                this.energyDisplay = this.add.text(448, 648, `${this.energy}`, { fontFamily: 'Times New Roman', fontSize: '60px', color: '#FFFFFF'}).setOrigin(0.5);
                this.skillDisplay = this.add.text(448, 465, `${WIT}`, { fontFamily: 'Times New Roman', fontSize: '60px', color: '#FFFFFF'}).setOrigin(0.5);

                //add or subtract skill
                this.plus.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy > 0 && WIT < this.maxSkill){
                        WIT++;
                        this.energy--;
                        this.skillDisplay.setText(`${WIT}`);
                        this.energyDisplay.setText(`${this.energy}`);
                    }
                });
                this.minus.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy < this.maxEnergy){
                        WIT--;
                        this.energy++;
                        this.skillDisplay.setText(`${WIT}`);
                        this.energyDisplay.setText(`${this.energy}`);
                        }
                });

                //exit menu
                this.exit.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy == 0){
                        this.startNewScene();
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

                //interactive display
                this.menu = this.add.image(450, 450, 'apartmentMenu');
                this.plus = this.add.image(500, 430, 'plus').setOrigin(0, 0);
                this.minus = this.add.image(325, 430, 'minus').setOrigin(0, 0);
                this.exit = this.add.image(450, 750, 'exit');
                this.energyDisplay = this.add.text(450, 640, `${this.energy}`, { fontFamily: 'Times New Roman', fontSize: '60px', color: '#FFFFFF'}).setOrigin(0.5);
                this.skillDisplay = this.add.text(450, 468, `${DEX}`, { fontFamily: 'Times New Roman', fontSize: '60px', color: '#FFFFFF'}).setOrigin(0.5);

                //add or subtract skill
                this.plus.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy > 0 && DEX < this.maxSkill){
                        DEX++;
                        this.energy--;
                        this.skillDisplay.setText(`${DEX}`);
                        this.energyDisplay.setText(`${this.energy}`);
                    }
                });
                this.minus.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy < this.maxEnergy){
                        DEX--;
                        this.energy++;
                        this.skillDisplay.setText(`${DEX}`);
                        this.energyDisplay.setText(`${this.energy}`);
                        }
                });

                //exit menu
                this.exit.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy == 0){
                        this.startNewScene();
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

                //interactive display
                this.menu = this.add.image(450, 450, 'gymMenu');
                this.plusEndurance = this.add.image(499, 290, 'plus').setOrigin(0, 0);
                this.plusStrength = this.add.image(499, 455, 'plus').setOrigin(0, 0);
                this.minusEndurance = this.add.image(325, 290, 'minus').setOrigin(0, 0);
                this.minusStrength = this.add.image(325, 455, 'minus').setOrigin(0, 0);
                this.exit = this.add.image(450, 750, 'exit');
                this.energyDisplay = this.add.text(450, 655, `${this.energy}`, { fontFamily: 'Times New Roman', fontSize: '60px', color: '#FFFFFF'}).setOrigin(0.5);
                this.enduranceDisplay = this.add.text(450, 330, `${END}`, { fontFamily: 'Times New Roman', fontSize: '60px', color: '#FFFFFF'}).setOrigin(0.5);
                this.strengthDisplay = this.add.text(450, 492, `${STR}`, { fontFamily: 'Times New Roman', fontSize: '60px', color: '#FFFFFF'}).setOrigin(0.5);

                //prevent unlimited level up bug
                if(firstClick){
                    firstClick = false;
                    this.initialStr = STR;
                    this.initialEndur = END;
                }

                //add or subtract skill
                this.plusEndurance.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy > 0 && END < this.maxSkill){
                        END++;
                        this.energy--;
                        this.enduranceDisplay.setText(`${END}`);
                        this.energyDisplay.setText(`${this.energy}`);
                    }
                });
                this.minusEndurance.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy < this.maxEnergy && END > this.initialEndur){
                        END--;
                        this.energy++;
                        this.enduranceDisplay.setText(`${END}`);
                        this.energyDisplay.setText(`${this.energy}`);
                        }
                });
                
                //add or subtract skill
                this.plusStrength.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy > 0 && STR < this.maxSkill){
                        STR++;
                        this.energy--;
                        this.strengthDisplay.setText(`${STR}`);
                        this.energyDisplay.setText(`${this.energy}`);
                    }
                });
                this.minusStrength.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy < this.maxEnergy && STR > this.initialStr){
                        STR--;
                        this.energy++;
                        this.strengthDisplay.setText(`${STR}`);
                        this.energyDisplay.setText(`${this.energy}`);
                        }
                });

                //exit menu
                this.exit.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(this.energy == 0){
                        this.startNewScene();
                    }else{
                        this.clearEventSpecial();
                        inEvent=false;
                    }
                });
            }
        });
    
        this.store.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
            if(!inEvent){
                inEvent = true;

                //interactive display
                this.menu = this.add.image(450, 450, 'storeMenu');
                this.shoe = this.add.image(170, 430, 'shoe').setOrigin(0,0);
                this.protein = this.add.image(340, 425, 'protein').setOrigin(0,0);
                this.book = this.add.image(510, 430, 'book').setOrigin(0,0);
                this.controller = this.add.image(690, 425, 'controller').setOrigin(0,0);
                this.redPotion = this.add.image(332, 595, 'redPotion').setOrigin(0,0);
                this.bluePotion = this.add.image(562, 595, 'bluePotion').setOrigin(0,0);
                this.selectedItem = this.add.image(268, 760, 'n/a').setOrigin(0,0);
                this.exit = this.add.image(650, 740, 'exitSmall').setOrigin(0,0);
                this.buy = this.add.image(480, 740, 'buy').setOrigin(0,0);
                this.currentMoney = this.add.text(735, 105, `${MONEY}`, { fontFamily: 'Times New Roman', fontSize: '40px', color: '#FFFFFF'});
                this.cost = this.add.text(385, 705, "0", { fontFamily: 'Times New Roman', fontSize: '30px', color: '#FFFFFF'});
                this.resetFlags();

                //clickable items to buy if the player has enough money
                this.shoe.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(MONEY >= 15){
                        if(!this.buyShoe && END <= (this.maxSkill - 2)){//select item
                            this.selectedItem.setTexture('shoe');
                            this.cost.setText("15");
                            this.resetFlags();
                            this.buyShoe = true;
                        }else{//deselect item
                            this.buyShoe = false;
                            this.selectedItem.setTexture('n/a');
                            this.cost.setText("0");
                        }
                    }
                });
                this.protein.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(MONEY >= 15){
                        if(!this.buyProtein && STR <= (this.maxSkill - 2)){//select item
                            this.selectedItem.setTexture('protein');
                            this.cost.setText("15");
                            this.resetFlags();
                            this.buyProtein = true;
                        }else{//deselect item
                            this.buyProtein = false;
                            this.selectedItem.setTexture('n/a');
                            this.cost.setText("0");
                        }
                    }
                });
                this.book.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(MONEY >= 15){
                        if(!this.buyBook && WIT <= (this.maxSkill - 2)){//select item
                            this.selectedItem.setTexture('book');
                            this.cost.setText("15");
                            this.resetFlags();
                            this.buyBook = true;
                        }else{//deselect item
                            this.buyBook = false;
                            this.selectedItem.setTexture('n/a');
                            this.cost.setText("0");
                        }
                    }
                });
                this.controller.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(MONEY >= 15){
                        if(!this.buyController && DEX <= (this.maxSkill - 2)){//select item
                            this.selectedItem.setTexture('controller');
                            this.cost.setText("15");
                            this.resetFlags();
                            this.buyController = true;
                        }else{//deselect item
                            this.buyController = false;
                            this.selectedItem.setTexture('n/a');
                            this.cost.setText("0");
                        }
                    }
                });
                this.redPotion.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(MONEY >= 10){
                        if(!this.buyRedPotion){//select item
                        this.selectedItem.setTexture('redPotion');
                        this.cost.setText("10");
                        this.resetFlags();
                        this.buyRedPotion = true;
                        }else{//deselect item
                            this.buyRedPotion = false;
                            this.selectedItem.setTexture('n/a');
                            this.cost.setText("0");
                        }
                    }
                });
                this.bluePotion.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    if(MONEY >= 25){
                        if(!this.buyBluePotion){//select item
                        this.selectedItem.setTexture('bluePotion');
                        this.cost.setText("25");
                        this.resetFlags();
                        this.buyBluePotion = true;
                        }else{//deselect item
                            this.buyBluePotion = false;
                            this.selectedItem.setTexture('n/a');
                            this.cost.setText("0");
                        }
                    }
                });

                this.buy.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    //checks to see what the player confirmed to buy
                    if(this.buyShoe){
                        END += 2;
                        MONEY -= 15;
                    }else if(this.buyProtein){
                        STR += 2;
                        MONEY -= 15;
                    }else if(this.buyBook){
                        WIT += 2;
                        MONEY -= 15;
                    }else if(this.buyController){
                        DEX += 2;
                        MONEY -= 15;
                    }else if(this.buyRedPotion){
                        REDPOTION++;
                        MONEY -= 10;
                    }else if(this.buyBluePotion){
                        BLUEPOTION++;
                        MONEY -= 25;
                    }
                    this.currentMoney.setText(`${MONEY}`);
                    this.selectedItem.setTexture("n/a");
                    this.resetFlags();
                });

                this.exit.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    inEvent = false;
                    this.clearStoreEvent();
                });
            }
        });

        this.itemMenu.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
            if(!inEvent){
                inEvent = true;
                this.menu = this.add.image(450, 450, 'itemMenu');
                this.exit = this.add.image(370, 700, 'exitSmall').setOrigin(0,0);
                this.redPotDisplay = this.add.text(300, 700, `x${REDPOTION}`, { fontFamily: 'Times New Roman', fontSize: '60px', color: '#FFFFFF'}).setOrigin(0.5);
                this.bluePotDisplay = this.add.text(600, 700, `x${BLUEPOTION}`, { fontFamily: 'Times New Roman', fontSize: '60px', color: '#FFFFFF'}).setOrigin(0.5);
                this.exit.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    inEvent = false;
                    this.clearItemEvent();
                });
            }
        });

        //highlights building choices and resets others
        this.library.setInteractive().on('pointerover',()=>{
            if(!inEvent){
                this.itemMenu.setTexture('itemButton');
                this.library.setTexture('selectLibrary');
                this.store.setTexture('store');
                this.gym.setTexture('gym');
                this.apartment.setTexture('apartment');
            }
        });

        //highlights choices and resets others
        this.gym.setInteractive().on('pointerover',()=>{
            if(!inEvent){
                this.itemMenu.setTexture('itemButton');
                this.gym.setTexture('selectGym');
                this.store.setTexture('store');
                this.library.setTexture('library');
                this.apartment.setTexture('apartment');
            }
        });

        //highlights building choices and resets others
        this.apartment.setInteractive().on('pointerover',()=>{
            if(!inEvent){
                this.itemMenu.setTexture('itemButton');
                this.apartment.setTexture('selectApartment');
                this.store.setTexture('store'); 
                this.library.setTexture('library');
                this.gym.setTexture('gym');
            }
        });

        //highlights building choices and resets others
        this.store.setInteractive().on('pointerover',()=>{
            if(!inEvent){
                this.itemMenu.setTexture('itemButton');
                this.store.setTexture('selectStore');    
                this.apartment.setTexture('apartment');
                this.library.setTexture('library');
                this.gym.setTexture('gym');
            }
        });

        //highlights item menu and resets others
        this.itemMenu.setInteractive().on('pointerover',()=>{
            if(!inEvent){
                this.itemMenu.setTexture('itemSelect');
                this.gym.setTexture('gym');
                this.store.setTexture('store');
                this.library.setTexture('library');
                this.apartment.setTexture('apartment');
            }
        });

        //unhighlights all if touching the background
        this.background.setInteractive().on('pointerover',()=>{;
            if(!inEvent){
                this.itemMenu.setTexture('itemButton');
                this.store.setTexture('store');
                this.library.setTexture('library');
                this.gym.setTexture('gym');
                this.apartment.setTexture('apartment');
            }
        });      
    }

    //store event flags to track which purchase the player made
    resetFlags(){
        this.buyShoe = false;
        this.buyProtein = false;
        this.buyBook = false;
        this.buyController = false;
        this.buyRedPotion = false;
        this.buyBluePotion = false;
    }

    //updates all stats if changes are made
    update(){
        this.endMenu.setText(`${END}`);
        this.strMenu.setText(`${STR}`);
        this.witMenu.setText(`${WIT}`);
        this.dexMenu.setText(`${DEX}`);
        this.dayMenu.setText(`${15 - DAY}`);
        this.energyMenu.setText(`${this.energy}`);
        this.hpMenu.setText(`${3 * (END - 1) + 18}`);
        this.moneyMenu.setText(`${MONEY}`);
    }

    startNewScene(){
        //sets scene based on day if odd it was players day off if even player goes to work
        if(DAY % 2 == 1){
            DAY++;
            this.exit.destroy();
            this.inEvent = true;
            this.dayOff = this.add.image(0, 0, 'dayOff').setOrigin(0.0, 0.0);
            this.continue = this.add.image(450, 800, 'continueButton');
            this.dayOff.setInteractive().on('pointerover',()=>{;
                this.continue.setTexture('continueButton');
            }); 
            this.continue.setInteractive().on('pointerover',()=>{;
                this.continue.setTexture('continueSelect');
            }); 
            this.continue.setInteractive().on('pointerdown',()=>{;
                this.scene.start("cityScene");
            }); 
        }else if(DAY == 14){
            this.menuScene.bgm.stop();
            this.scene.start("bossBattleScene");
        }else{
            this.exit.destroy();
            this.inEvent = true;
            this.workDay = this.add.image(0, 0, 'workDay').setOrigin(0.0, 0.0);
            this.continue = this.add.image(450, 800, 'continueButton');
            this.workDay.setInteractive().on('pointerover',()=>{;
                this.continue.setTexture('continueButton');
            }); 
            this.continue.setInteractive().on('pointerover',()=>{;
                this.continue.setTexture('continueSelect');
            }); 
            this.continue.setInteractive().on('pointerdown',()=>{;
                this.menuScene.bgm.stop();
                this.scene.start("battleScene");
            });
        }
    }

    //clears library or apartment event
    clearEvent(){
        this.menu.destroy();
        this.plus.destroy();
        this.minus.destroy();
        this.energyDisplay.destroy();
        this.exit.destroy();
        this.skillDisplay.destroy();
    }

    //clears gym special case menu
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

    clearItemEvent(){
        this.menu.destroy();
        this.exit.destroy();
        this.redPotDisplay.destroy();
        this.bluePotDisplay.destroy();
    }

    //clears store event menu
    clearStoreEvent(){
        this.menu.destroy();
        this.shoe.destroy();
        this.protein.destroy();
        this.book.destroy();
        this.controller.destroy();
        this.redPotion.destroy();
        this.bluePotion.destroy();
        this.selectedItem.destroy();
        this.exit.destroy();
        this.buy.destroy();
        this.currentMoney.destroy();
        this.cost.destroy();
    }
}