class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, endurance, wit, dexterity) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.endurance = endurance;
        this.wit = wit;
        this.dexterity = dexterity;
    }

    update(){

    }

    levelUpEndurance(){
        this.endurance += 1;
    }

    levelUpWit(){
        this.wit += 1;
    }

    levelUpDexterity(){
        this.dexterity +1;
    }
}