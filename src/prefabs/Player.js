class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.hp = 2 * (END - 1) + 14;
        this.attacks = [];
        this.items = ['Cane'];
        this.isLiving = true;
        this.attackText = [
            'Slap', 'With all five fingers, you slap the bear right across the face.\n\n',
            'Scream', "\"REEEEEEEEEEEEE,\" screams the zookeeper. The bear stares at you and blinks confusedly.\n\n",
            'Cartwheel', "Gracefully, you cartwheel directly into the animal, slamming it with your body.\n\n"
        ];
    }

    updateHp(){

    }

    attack(target, type, damage, index){
        let text = this.attackText[index + 1];
        if(target.type === type){
            text += "You deals " + damage + " damage";
        } else{
            if(target.type === 'str'){
                if(type === 'wit'){
                    damage *= 0.5;
                    text += "You deals " + damage + " damage. That could've gone better...";
                } else{
                    damage *= 2
                    text += "You deals " + damage + " damage. Wow! That worked really well!";
                }
            } else if(target.type === 'wit'){
                if(type === 'dex'){
                    damage *= 0.5
                    text += "You deals " + damage + " damage. That could've gone better...";
                } else{
                    damage *= 2
                    text += "You deals " + damage + " damage. Wow! That worked really well!";
                }
            } else{
                if(type === 'str'){
                    damage *= 0.5
                    text += "You deals " + damage + " damage. That could've gone better...";
                } else{
                    damage *= 2
                    text += "You deals " + damage + " damage. Wow! That worked really well!";
                }
            }
        }
        target.takeDamage(damage);

        this.scene.events.emit("Message", text);
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
        if(STR >= 0){
            this.attacks.push('Slap');
            this.attacks.push(4);
        }
        if(WIT >= 0){
            this.attacks.push('Scream');
            this.attacks.push(4);
        }
        if(DEX >= 0){
            this.attacks.push('Cartwheel');
            this.attacks.push(4);
        }
    }


    levelUpEndurance(){
        if(END < 20){
            END++;
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