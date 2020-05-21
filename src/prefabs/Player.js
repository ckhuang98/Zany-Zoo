class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        // Health
        this.hp = 2 * (END - 1) + 14;
        this.attacks = [];
        this.items = ['Cane'];
        this.isLiving = true;
        this.attackText = [
            'Slap', 'With all five fingers, you slap the bear right across the face.\n\n',
            'Scream', "\"REEEEEEEEEEEEE,\" screams the zookeeper. The bear stares at you and blinks confusedly.\n\n",
            'Cartwheel', "Gracefully, you cartwheel directly into the animal, slamming it with your body.\n\n",
            'Smash', "With the righteous force or your passion for zoos, you smash a rock over the bear's head. Ouch.\n\n",
            'Intimidate', "You stomp your feet and insult the bear's mother. It now feels bad about itself.\n\n",
            'Spin Attack', "You sort of do like, this spin, karate thing? An ancient kung fu move. It does some damage.\n\n",
            'Haymaker', "You wind up your fist behind your back and spring it upon the bear with all your zookeeping might.\n\n",
            'Persuade', "You have a long chat with the bear and convince it that it to do what you want.\n\n",
            'Jump Kick', "You jump! And then. . . you kick! You're so nimble, you don't even know what to do with yourself.\n\n",
            'Toss', "You pick up the bear and toss it aside. You feel pretty good about yourself after.\n\n",
            'Trap', "You trick the bear into sticking his hand into a pot of honey. He's bamboozled.\n\n",
            'Maneuver', "You jab and dodge your way around the bear so quickly that it can hardly keep track of you.\n\n",
            'Rage', "You go full on beast mode on this god dang bear. You go stupid. You go crazy.\n\n",
            'Trick', "With the ancient art of manipulation, you're able to distract the bear and successfully confuse it.\n\n",
            'Acrobatics', "You dance around this bear so quickly that you have it's head spinning.\n\n"

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