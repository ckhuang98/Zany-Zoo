class Monkey extends Animal{
    constructor(scene, x, y, texture, frame, type){
        super(scene, x, y, texture, frame);
        this.type = type;
    }

    // attacks target and emits Message event
    attack(target){
        this.scene.events.emit("Message", "\"HIIIIIIIII-YA!\" the monkey screams at you, and smacks you with his tail.\n\nYou take " + this.damage + " damage.");
        target.takeDamage(this.damage);
    }
}