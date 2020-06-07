class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        // Health
        this.hp = 3 * (END - 1) + 18;
        this.maxHp = this.hp;
        this.attacks = [];
        this.items = [];
        this.isLiving = true;
        this.attackText = [
            'Strength: Slap', 'With all five fingers, you slap the animal right across the face.\n\n',
            'Wit: Scream', "\"REEEEEEEEEEEEE,\" screams the zookeeper. The animal stares at you and blinks confusedly.\n\n",
            'Dexterity: Cartwheel', "Gracefully, you cartwheel directly into the animal, slamming it with your body.\n\n",
            'Strength: Smash', "With the righteous force of your passion for zoos, you smash a rock over the animal's head. Ouch.\n\n",
            'Wit:  Intimidate', "You stomp your feet and insult the animal's mother. It now feels bad about itself.\n\n",
            'Dexterity: Spin Attack', "You sort of do like, this spin, karate thing? An ancient kung fu move. It does some damage.\n\n",
            'Strength: Haymaker', "You wind up your fist behind your back and spring it upon the creature with all your zookeeping might.\n\n",
            'Wit: Persuade', "You have a long chat with the animal and convince it that it to do what you want.\n\n",
            'Dexterity: Jump Kick', "You jump! And then. . . you kick! You're so nimble, you don't even know what to do with yourself.\n\n",
            'Strength: Toss', "You pick up the animal and toss it aside. You feel pretty good about yourself after.\n\n",
            'Wit: Trap', "You lure the creature into a delicious cheese trap. It's bamboozled.\n\n",
            'Dexterity: Maneuver', "You jab and dodge your way around the animal so quickly that it can hardly keep track of you.\n\n",
            'Strength: Rage', "You go full on beast mode on this god dang critter. You go stupid. You go crazy.\n\n",
            'Wit: Trick', "With the ancient art of manipulation, you're able to distract the animal and successfully confuse it.\n\n",
            'Dexterity: Acrobatics', "You dance around this critter so quickly that you have it's head spinning.\n\n"
        ];
        this.scene.anims.create({
            key: 'playerIdle',
            frames: this.scene.anims.generateFrameNumbers('playerIdle', { start: 0, end: 48, first: 0}),
            frameRate: 26,
            repeat: -1
        });
        this.anims.play('playerIdle');
    }

    updateHp(){

    }

    // Attacks target. Keeps track of damage for the rock paper sissor fighting system
    // Index is used to navigate the attack arrays.
    attack(target, type, damage, index){
        let text = this.attackText[index + 1];
        if(target.type === type){
            text += "You deal " + damage + " damage";
        } else{
            if(target.type === 'str'){
                if(type === 'wit'){
                    damage *= 0.5;
                    text += "You deal " + damage + " damage. That could've gone better...";
                } else{
                    damage *= 2
                    text += "You deal " + damage + " damage. Wow! That worked really well!";
                }
            } else if(target.type === 'wit'){
                if(type === 'dex'){
                    damage *= 0.5
                    text += "You deal " + damage + " damage. That could've gone better...";
                } else{
                    damage *= 2
                    text += "You deal " + damage + " damage. Wow! That worked really well!";
                }
            } else{
                if(type === 'str'){
                    damage *= 0.5
                    text += "You deal " + damage + " damage. That could've gone better...";
                } else{
                    damage *= 2
                    text += "You deal " + damage + " damage. Wow! That worked really well!";
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
        if(STR >= 0 && STR < 5){
            this.attacks.push('Strength: Slap');
            this.attacks.push(4);
        } else if(STR >= 5 && STR < 10){
            this.attacks.push('Strength: Smash');
            this.attacks.push(8);
        } else if(STR >= 10 && STR < 15){
            this.attacks.push('Strength: Haymaker');
            this.attacks.push(12);
        } else if(STR >= 15 && STR < 20){
            this.attacks.push('Strength: Toss');
            this.attacks.push(16)
        } else{
            this.attacks.push('Strength: Rage');
            this.attacks.push(20);
        }
        if(WIT >= 0 && WIT < 5){
            this.attacks.push('Wit: Scream');
            this.attacks.push(4);
        } else if(WIT >= 5 && WIT < 10){
            this.attacks.push('Wit: Intimidate');
            this.attacks.push(8);
        } else if(WIT >= 10 && WIT < 15){
            this.attacks.push('Wit: Persuade');
            this.attacks.push(12);
        } else if(WIT >= 15 && WIT < 20){
            this.attacks.push('Wit: Trap');
            this.attacks.push(16)
        } else{
            this.attacks.push('Wit: Trick');
            this.attacks.push(20);
        }
        if(DEX >= 0 && DEX < 5){
            this.attacks.push('Dexterity: Cartwheel');
            this.attacks.push(4);
        } else if(DEX >= 5 && DEX < 10){
            this.attacks.push('Dexterity: Spin Attack');
            this.attacks.push(8);
        } else if(DEX >= 10 && DEX < 15){
            this.attacks.push('Dexterity: Jump Kick');
            this.attacks.push(12);
        } else if(DEX >= 15 && WIT < 20){
            this.attacks.push('Dexterity: Maneuver');
            this.attacks.push(16)
        } else{
            this.attacks.push('Dexterity: Acrobatics');
            this.attacks.push(20);
        }
    }

    createItems(){
        if(REDPOTION >= 1){
            this.items.push('Red Potion');
        }
        if(BLUEPOTION >= 1){
            this.items.push('Blue Potion');
        }
    }

}