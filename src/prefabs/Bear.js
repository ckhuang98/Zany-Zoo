class Bear extends Animal{
    constructor(scene, x, y, texture, frame, type){
        super(scene, x, y, texture, frame);
        this.type = type;
        this.scene.anims.create({
            key: 'bearIdle',
            frames: this.scene.anims.generateFrameNumbers('bearIdle', { start: 0, end: 48, first: 0}),
            frameRate: 26,
            repeat: -1
        });
        this.anims.play('bearIdle');
    }

    // attacks target and emits Message event
    attack(target){
        this.scene.sound.add('bearRoar').play({
            volume: .25,
        });
        this.scene.events.emit("Message", "The bear swipes at you with his fluffiest paw.\n\nYou take " + this.damage + " damage.");
        target.takeDamage(this.damage);
    }
}