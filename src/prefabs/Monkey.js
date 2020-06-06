class Monkey extends Animal{
    constructor(scene, x, y, texture, frame, type){
        super(scene, x, y, texture, frame);
        this.type = type;
        this.scene.anims.create({
            key: 'monkeyIdle',
            frames: this.scene.anims.generateFrameNumbers('monkeyIdle', { start: 0, end: 49, first: 0}),
            frameRate: 26,
            repeat: -1
        });
        this.anims.play('monkeyIdle');
    }

    // attacks target and emits Message event
    attack(target){
        this.scene.sound.add('monkeySound').play();
        this.scene.events.emit("Message", "\"HIIIIIIIII-YA!\" the monkey screams at you, and smacks you with his tail.\n\nYou take " + this.damage + " damage.");
        target.takeDamage(this.damage);
    }
}