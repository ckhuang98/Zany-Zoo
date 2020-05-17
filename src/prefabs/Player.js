class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, endurance, wit, dexterity) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.endurance = endurance;
        this.wit = wit;
        this.dexterity = dexterity;
        this.damage = 1;
        this. hp = 10;
        this.attacks = [];
        this.items = ['Cane'];
        this.isLiving = true;
    }

    update(){
    }

    attack(target){
        target.takeDamage(this.damage);
        console.log('Player attacks for ' + this.damage);
    }

    takeDamage(damage){
        this.hp -= damage;
        if(this.hp <= 0) {
            this.hp = 0;
            this.isLiving = false;
            this.visible = false;   
            this.menuItem = null;
        }
    }

    createAttacks(){
        if(this.endurance >= 1){
            this.attacks.push('Slap');
        }
        if(this.wit >= 1){
            this.attacks.push('Scream');
        }
        if(this.dexterity >= 1){
            this.attacks.push('Cartwheel');
        }
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