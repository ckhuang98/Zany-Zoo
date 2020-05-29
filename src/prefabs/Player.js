class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        // Health
        this.hp = 2 * (END - 1) + 14;
        this.maxHp = this.hp;
        this.attacks = [];
        this.items = [];
        this.isLiving = true;
        this.attackText = [
            'Slap', 'With all five fingers, you slap the animal right across the face.\n\n',
            'Scream', "\"REEEEEEEEEEEEE,\" screams the zookeeper. The animal stares at you and blinks confusedly.\n\n",
            'Cartwheel', "Gracefully, you cartwheel directly into the animal, slamming it with your body.\n\n",
            'Smash', "With the righteous force or your passion for zoos, you smash a rock over the animal's head. Ouch.\n\n",
            'Intimidate', "You stomp your feet and insult the animal's mother. It now feels bad about itself.\n\n",
            'Spin Attack', "You sort of do like, this spin, karate thing? An ancient kung fu move. It does some damage.\n\n",
            'Haymaker', "You wind up your fist behind your back and spring it upon the creature with all your zookeeping might.\n\n",
            'Persuade', "You have a long chat with the animal and convince it that it to do what you want.\n\n",
            'Jump Kick', "You jump! And then. . . you kick! You're so nimble, you don't even know what to do with yourself.\n\n",
            'Toss', "You pick up the animal and toss it aside. You feel pretty good about yourself after.\n\n",
            'Trap', "You lure the creature into a delicious cheese trap. It's bamboozled.\n\n",
            'Maneuver', "You jab and dodge your way around the animal so quickly that it can hardly keep track of you.\n\n",
            'Rage', "You go full on beast mode on this god dang critter. You go stupid. You go crazy.\n\n",
            'Trick', "With the ancient art of manipulation, you're able to distract the animal and successfully confuse it.\n\n",
            'Acrobatics', "You dance around this critter so quickly that you have it's head spinning.\n\n"

        ];
    }

    updateHp(){

    }

    // Attacks target. Keeps track of damage for the rock paper sissor fighting system
    // Index is used to navigate the attack arrays.
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
            DAY++;
        }
    }

    createAttacks(){
        if(STR >= 0 && STR < 7){
            this.attacks.push('Slap');
            this.attacks.push(4);
        } else if(STR >= 7 && STR < 11){
            this.attacks.push('Smash');
            this.attacks.push(8);
        } else if(STR >= 11 && STR < 22){
            this.attacks.push('Haymaker');
            this.attacks.push(12);
        } else if(STR >= 22 && STR < 33){
            this.attacks.push('Toss');
            this.attacks.push(16)
        } else{
            this.attacks.push('Rage');
            this.attacks.push(20);
        }
        if(WIT >= 0 && WIT < 7){
            this.attacks.push('Scream');
            this.attacks.push(4);
        } else if(WIT >= 7 && WIT < 11){
            this.attacks.push('Intimidate');
            this.attacks.push(8);
        } else if(WIT >= 11 && WIT < 22){
            this.attacks.push('Persuade');
            this.attacks.push(12);
        } else if(WIT >= 22 && WIT < 33){
            this.attacks.push('Trap');
            this.attacks.push(16)
        } else{
            this.attacks.push('Trick');
            this.attacks.push(20);
        }
        if(DEX >= 0 && DEX < 7){
            this.attacks.push('Cartwheel');
            this.attacks.push(4);
        } else if(DEX >= 7 && DEX < 11){
            this.attacks.push('Spin Attack');
            this.attacks.push(8);
        } else if(DEX >= 11 && DEX < 22){
            this.attacks.push('Jump Kick');
            this.attacks.push(12);
        } else if(DEX >= 22 && WIT < 33){
            this.attacks.push('Maneuver');
            this.attacks.push(16)
        } else{
            this.attacks.push('Acrobatics');
            this.attacks.push(20);
        }
    }

    createItems(){
        if(BOUGHTPOTION)
            this.items.push('Potion');
    }

}