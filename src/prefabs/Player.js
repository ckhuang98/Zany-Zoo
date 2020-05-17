class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, endurance, wit, dexterity) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.endurance = endurance;
        this.wit = wit;
        this.dexterity = dexterity;
        this.damage = 1;
        this. hp = 10;
        this.ENDAttacks = [];
        this.ENDAttacksDmg = [];
        this.WITAttacks = [];
        this.WITAttackDmg = [];
        this.DEXAttacks = [];
        this.DEXAttackDmg = [];
        this.items = ['Cane'];
    }

    update(){
    }

    attack(target){
        target.takeDamage(this.damage);
    }

    takeDamage(damage){
        this.hp -= damage;
    }

    createAttacks(){
        if(this.endurance >= 1){
            this.ENDAttacks.push('Slap');
        }
        if(this.wit >= 1){
            this.WITAttacks.push('Scream');
        }
        if(this.dexterity >= 1){
            this.DEXAttacks.push('Cartwheel');
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