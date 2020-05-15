class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, endurance, wit, dexterity) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.endurance = endurance;
        this.wit = wit;
        this.dexterity = dexterity;
        this.damage = 1;
        this. hp = 10;
    }

    update(){
    }

    attack(target){
        target.takeDamage(this.damage);
    }

    takeDamage(damage){
        this.hp -= damage;
    }

    levelUpEndurance(){
        if(this.endurance < 20){
            this.endurance++;
        }
    }

    levelUpWit(){
        if(this.wit < 20){
            this.wit++;
        }
    }

    levelUpDexterity(){
        if(this.dexterity < 20){
            this.dexterity++;
        }
    }
}